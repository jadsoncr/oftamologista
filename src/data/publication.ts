import { ClinicConfig } from '../types';
import { DEFAULT_CLINIC_CONFIG } from './defaultConfig';
import { FAQS } from './faqs';

const DEMO_PHONE_DIGITS = ['5521987654321', '21987654321', '2132104000'];
const DEMO_STREET = /palmeiras/i;
const DEMO_POSTAL = '22051-000';
const DEMO_EMAIL = /@drbrunogomes\.med\.br$/i;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function isDemoPhone(value: string): boolean {
  const digits = digitsOnly(value);
  return DEMO_PHONE_DIGITS.some((demo) => digits === demo || digits.endsWith(demo));
}

export function canPublishWhatsApp(config: ClinicConfig): boolean {
  const number = config.contact.whatsappNumber.trim();
  return Boolean(
    config.contact.whatsappConfirmed &&
      number &&
      !isDemoPhone(number) &&
      digitsOnly(number).length >= 12,
  );
}

export function canPublishPhone(config: ClinicConfig): boolean {
  const phone = config.contact.phone.trim();
  return Boolean(config.contact.phoneConfirmed && phone && !isDemoPhone(phone));
}

export function canPublishEmail(config: ClinicConfig): boolean {
  const email = config.contact.email.trim();
  return Boolean(config.contact.emailConfirmed && email && !DEMO_EMAIL.test(email));
}

export function canPublishAddress(config: ClinicConfig): boolean {
  const office = config.office;
  return Boolean(
    office.addressConfirmed &&
      office.street.trim() &&
      office.neighborhood.trim() &&
      office.city.trim() &&
      office.state.trim() &&
      !DEMO_STREET.test(office.street) &&
      office.zipCode.trim() !== DEMO_POSTAL,
  );
}

export function canPublishHours(config: ClinicConfig): boolean {
  return Boolean(config.office.hoursConfirmed && config.office.openingHours.length > 0);
}

export function canPublishCoordinates(config: ClinicConfig): boolean {
  const { latitude, longitude } = config.office;
  if (!canPublishAddress(config)) return false;
  if (!latitude.trim() || !longitude.trim()) return false;
  const lat = Number(latitude);
  const lng = Number(longitude);
  return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}

/** Entidade médica só entra no JSON-LD com identificação suficiente e confirmada. */
export function canPublishBusinessEntity(config: ClinicConfig): boolean {
  return Boolean(
    config.doctor.crmConfirmed &&
      config.doctor.crm.trim() &&
      config.doctor.rqeConfirmed &&
      config.doctor.rqe.trim() &&
      canPublishAddress(config) &&
      canPublishWhatsApp(config) &&
      canPublishHours(config),
  );
}

const PLACEHOLDER_URLS = new Set(['', 'MY_APP_URL', 'undefined', 'null']);

/** Domínio absoluto vindo só de VITE_SITE_URL. Localhost e placeholders não geram canonical. */
export function resolveSiteUrl(): string {
  const raw = (import.meta.env.VITE_SITE_URL || '').trim();
  if (PLACEHOLDER_URLS.has(raw)) return '';
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return '';
    return url.origin;
  } catch {
    return '';
  }
}

export function sanitizeConfig(input: ClinicConfig): ClinicConfig {
  const config: ClinicConfig = {
    ...DEFAULT_CLINIC_CONFIG,
    ...input,
    doctor: { ...DEFAULT_CLINIC_CONFIG.doctor, ...input.doctor },
    contact: { ...DEFAULT_CLINIC_CONFIG.contact, ...input.contact },
    office: {
      ...DEFAULT_CLINIC_CONFIG.office,
      ...input.office,
      openingHours: input.office?.openingHours ?? [],
    },
    services: input.services?.length ? input.services : DEFAULT_CLINIC_CONFIG.services,
  };

  if (!config.office.addressConfirmed || DEMO_STREET.test(config.office.street) || config.office.zipCode.trim() === DEMO_POSTAL) {
    config.office.addressConfirmed = false;
    config.office.street = '';
    config.office.room = '';
    config.office.zipCode = '';
    config.office.latitude = '';
    config.office.longitude = '';
    config.office.metroAccess = '';
    config.office.parkingInfo = '';
    config.office.accessibilityInfo = '';
    config.office.isFictitiousNotice = true;
  }

  if (!config.contact.whatsappConfirmed || isDemoPhone(config.contact.whatsappNumber)) {
    config.contact.whatsappConfirmed = false;
    config.contact.whatsappNumber = '';
    config.contact.whatsappFormatted = '';
  }

  if (!config.contact.phoneConfirmed || isDemoPhone(config.contact.phone)) {
    config.contact.phoneConfirmed = false;
    config.contact.phone = '';
  }

  if (!config.contact.emailConfirmed || DEMO_EMAIL.test(config.contact.email)) {
    config.contact.emailConfirmed = false;
    config.contact.email = '';
  }

  if (!config.office.hoursConfirmed) {
    config.office.openingHours = [];
  }

  if (!config.doctor.crmConfirmed) config.doctor.crm = '';
  if (!config.doctor.educationConfirmed) config.doctor.university = '';

  return config;
}

export function canIndex(config: ClinicConfig): boolean {
  return Boolean(resolveSiteUrl() && canPublishBusinessEntity(config));
}

export function buildJsonLd(config: ClinicConfig): Record<string, unknown> | null {
  const graph: Record<string, unknown>[] = [];

  if (canPublishBusinessEntity(config)) {
    const physician: Record<string, unknown> = {
      '@type': 'Physician',
      '@id': '#medico',
      name: config.doctor.name,
      medicalSpecialty: 'https://schema.org/Ophthalmologic',
    };
    if (config.doctor.crmConfirmed && config.doctor.crm.trim()) {
      physician.identifier = config.doctor.crm.trim();
    }
    if (config.doctor.educationConfirmed && config.doctor.university.trim()) {
      physician.alumniOf = {
        '@type': 'EducationalOrganization',
        name: config.doctor.university.trim(),
      };
    }
    if (config.doctor.instagram.trim()) {
      physician.sameAs = [config.doctor.instagram.trim()];
    }

    const clinic: Record<string, unknown> = {
      '@type': 'MedicalClinic',
      '@id': '#consultorio',
      name: `Consultório ${config.doctor.name}`,
      medicalSpecialty: 'https://schema.org/Ophthalmologic',
      employee: { '@id': '#medico' },
      address: {
        '@type': 'PostalAddress',
        streetAddress: [config.office.street, config.office.room].filter(Boolean).join(', '),
        addressLocality: config.office.neighborhood,
        addressRegion: config.office.state,
        postalCode: config.office.zipCode,
        addressCountry: 'BR',
      },
    };
    physician.workLocation = { '@id': '#consultorio' };

    if (canPublishWhatsApp(config)) {
      clinic.telephone = `+${digitsOnly(config.contact.whatsappNumber)}`;
    }
    if (canPublishCoordinates(config)) {
      clinic.geo = {
        '@type': 'GeoCoordinates',
        latitude: config.office.latitude.trim(),
        longitude: config.office.longitude.trim(),
      };
    }
    const siteUrl = resolveSiteUrl();
    if (siteUrl) {
      clinic.url = `${siteUrl}/`;
      physician.url = `${siteUrl}/`;
    }
    graph.push(physician, clinic);
  }

  if (FAQS.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  if (graph.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
