export interface ClinicConfig {
  doctor: {
    name: string;
    specialty: string;
    subspecialty: string;
    rqe: string;
    rqeConfirmed: boolean;
    crm: string;
    crmConfirmed: boolean;
    crmState: string;
    university: string;
    educationConfirmed: boolean;
    bio: string;
    instagram: string;
    instagramHandle: string;
    complementaryEducation: string[];
    focusAreas: string[];
  };
  contact: {
    whatsappNumber: string;
    whatsappFormatted: string;
    whatsappConfirmed: boolean;
    phone: string;
    phoneConfirmed: boolean;
    email: string;
    emailConfirmed: boolean;
    defaultWhatsAppMessage: string;
  };
  office: {
    isFictitiousNotice: boolean;
    addressConfirmed: boolean;
    hoursConfirmed: boolean;
    street: string;
    room: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    metroAccess: string;
    parkingInfo: string;
    accessibilityInfo: string;
    otherSites: {
      name: string;
      detail: string;
      href?: string;
      upcoming?: boolean;
    }[];
    openingHours: {
      days: string;
      hours: string;
    }[];
  };
  services: {
    id: string;
    title: string;
    shortDescription: string;
    detailedInfo: string;
    audience: string;
    /** Escopo previsto no protótipo. Não entra em dados estruturados. */
    isDemonstrative: boolean;
  }[];
}
