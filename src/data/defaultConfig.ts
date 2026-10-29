import { ClinicConfig } from '../types';

export const DEFAULT_CLINIC_CONFIG: ClinicConfig = {
  doctor: {
    name: 'Dr. Bruno Gomes',
    specialty: 'Médico Oftalmologista',
    subspecialty: '',
    rqe: '47870',
    rqeConfirmed: false,
    crm: '',
    crmConfirmed: false,
    crmState: 'RJ',
    university: '',
    educationConfirmed: false,
    bio: 'Médico oftalmologista. O cuidado previsto é clínico: escuta da queixa, exame de vista e acompanhamento da saúde ocular, com explicação do que foi observado.',
    instagram: 'https://www.instagram.com/gomes.bruno_oft',
    instagramHandle: '@gomes.bruno_oft',
    complementaryEducation: [
      'Formação associada à UERJ: pendente de validação pelo médico',
      'RQE informado no projeto: 47870, pendente de validação pelo médico',
      'CRM-RJ: número ainda não informado',
    ],
    focusAreas: [
      'Consulta oftalmológica',
      'Exame de vista',
      'Orientação sobre grau e óculos',
      'Acompanhamento clínico',
    ],
  },
  contact: {
    whatsappNumber: '',
    whatsappFormatted: '',
    whatsappConfirmed: false,
    phone: '',
    phoneConfirmed: false,
    email: '',
    emailConfirmed: false,
    defaultWhatsAppMessage:
      'Olá. Gostaria de saber como agendar uma consulta com o Dr. Bruno Gomes.',
  },
  office: {
    isFictitiousNotice: true,
    addressConfirmed: false,
    hoursConfirmed: false,
    street: '',
    room: '',
    neighborhood: 'Copacabana',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '',
    latitude: '',
    longitude: '',
    metroAccess: '',
    parkingInfo: '',
    accessibilityInfo: '',
    openingHours: [],
  },
  services: [
    {
      id: 'consulta-exame-de-vista',
      title: 'Consulta oftalmológica',
      shortDescription:
        'Consulta clínica para ouvir a queixa, examinar a visão e explicar o que foi observado.',
      detailedInfo:
        'O escopo previsto reúne a conversa sobre sintomas, histórico e rotina, a medida da acuidade e o exame na lâmpada de fenda. A conduta é definida na visita, sem promessa de resultado.',
      audience: 'Adultos que procuram revisão da visão ou têm uma queixa ocular.',
      isDemonstrative: true,
    },
    {
      id: 'exame-de-vista',
      title: 'Exame de vista',
      shortDescription:
        'Avaliação do grau e da saúde ocular dentro da consulta, quando indicada pelo exame.',
      detailedInfo:
        'A refração compara a correção atual com a medida do dia. Miopia, hipermetropia, astigmatismo e vista cansada podem ser discutidos nesse exame. A receita, se houver, sai da consulta presencial.',
      audience: 'Quem usa óculos ou quer revisar o grau.',
      isDemonstrative: true,
    },
    {
      id: 'orientacao-oculos',
      title: 'Orientação sobre grau e óculos',
      shortDescription:
        'Explicação da medida encontrada e do uso de óculos, dentro do que a consulta mostrar.',
      detailedInfo:
        'O médico comenta a diferença em relação aos óculos atuais e o que observar na adaptação. Lentes de contato só entram na orientação se fizerem parte da consulta confirmada pelo médico.',
      audience: 'Quem vai trocar de óculos ou tirar dúvida sobre a receita anterior.',
      isDemonstrative: true,
    },
    {
      id: 'acompanhamento-clinico',
      title: 'Acompanhamento clínico',
      shortDescription:
        'Retorno para acompanhar a saúde ocular e combinar o intervalo da próxima revisão.',
      detailedInfo:
        'O retorno serve para rever sintomas, conforto visual e a orientação já dada. O intervalo depende do que for visto na consulta.',
      audience: 'Quem precisa de revisão periódica da saúde ocular.',
      isDemonstrative: true,
    },
  ],
};
