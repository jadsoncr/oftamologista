import { ClinicConfig } from '../types';

export const DEFAULT_CLINIC_CONFIG: ClinicConfig = {
  doctor: {
    name: 'Dr. Bruno Gomes',
    specialty: 'Médico Oftalmologista',
    subspecialty: 'Uveítes',
    rqe: '47870',
    rqeConfirmed: true,
    crm: 'CRM-RJ 1095218',
    crmConfirmed: true,
    crmState: 'RJ',
    university: 'UERJ',
    educationConfirmed: true,
    bio: 'Médico oftalmologista formado pela UERJ. Fez residência em Oftalmologia e subespecialidade em Uveítes na mesma instituição. No consultório, a consulta é particular e inclui os exames indicados para o caso, com explicação do que foi observado. O título de especialista em Clínica Médica está em andamento e ainda não é apresentado como concluído.',
    instagram: 'https://www.instagram.com/gomes.bruno_oft',
    instagramHandle: '@gomes.bruno_oft',
    complementaryEducation: [
      'Residência em Oftalmologia pela UERJ',
      'Subespecialidade em Uveítes pela UERJ',
      'Título em Clínica Médica: em andamento',
    ],
    focusAreas: ['Oftalmologia geral', 'Uveítes'],
  },
  contact: {
    whatsappNumber: '5521983746853',
    whatsappFormatted: '(21) 98374-6853',
    whatsappConfirmed: true,
    phone: '',
    phoneConfirmed: false,
    email: '',
    emailConfirmed: false,
    defaultWhatsAppMessage:
      'Olá. Gostaria de agendar uma consulta particular com o Dr. Bruno Gomes.',
  },
  office: {
    isFictitiousNotice: false,
    addressConfirmed: true,
    hoursConfirmed: true,
    street: 'Rua Miguel Lemos, 41',
    room: '13º andar',
    neighborhood: 'Copacabana',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '22071-000',
    latitude: '',
    longitude: '',
    metroAccess: '',
    parkingInfo: '',
    accessibilityInfo: '',
    otherSites: [
      {
        name: "Caxias D'Or",
        detail:
          'Oftalmologia geral em Duque de Caxias. O horário é marcado no site da Rede D’Or, separado deste consultório.',
        href: 'https://www.rededorsaoluiz.com.br/paciente/marcar-consulta',
      },
      {
        name: "Glória D'Or",
        detail: 'Ainda não está em atendimento.',
        upcoming: true,
      },
    ],
    openingHours: [
      { days: 'Quarta-feira', hours: 'Manhã' },
    ],
  },
  services: [
    {
      id: 'consulta-uveites',
      title: 'Consulta em oftalmologia e uveítes',
      shortDescription:
        'Consulta particular para oftalmologia geral e para uveítes, com tempo para explicar o que foi visto.',
      detailedInfo:
        'A visita começa pela queixa, pelo histórico e pelo exame clínico. Uveíte, revisão de grau e outras queixas oculares são avaliadas nesse atendimento. A conduta é definida na consulta, sem promessa de resultado.',
      audience: 'Adultos que procuram oftalmologia geral ou uma avaliação de uveíte.',
      isDemonstrative: false,
    },
    {
      id: 'refracao',
      title: 'Refração',
      shortDescription: 'Medida do grau para longe e para perto, quando indicada na consulta.',
      detailedInfo:
        'A refração compara a correção em uso com a medida do dia. A receita, se houver, é definida na visita.',
      audience: 'Quem usa óculos ou quer revisar o grau.',
      isDemonstrative: false,
    },
    {
      id: 'biomicroscopia',
      title: 'Biomicroscopia',
      shortDescription: 'Exame das estruturas da frente do olho na lâmpada de fenda.',
      detailedInfo:
        'A biomicroscopia observa pálpebras, córnea, câmara anterior, íris e cristalino. Faz parte da consulta quando o exame clínico pede.',
      audience: 'Pacientes em consulta oftalmológica.',
      isDemonstrative: false,
    },
    {
      id: 'fundoscopia',
      title: 'Fundoscopia',
      shortDescription: 'Exame do fundo do olho, inclusive retina e nervo óptico.',
      detailedInfo:
        'A fundoscopia avalia a retina e o nervo óptico. A dilatação da pupila, quando necessária, é decidida na consulta.',
      audience: 'Pacientes em que o fundo do olho precisa ser examinado.',
      isDemonstrative: false,
    },
    {
      id: 'mapeamento-de-retina',
      title: 'Mapeamento de retina',
      shortDescription: 'Exame mais amplo da retina, feito quando a consulta indica.',
      detailedInfo:
        'O mapeamento percorre a retina além do polo posterior. Não é um exame prometido em toda visita: entra quando a avaliação clínica pede.',
      audience: 'Quem precisa de uma avaliação mais ampla da retina.',
      isDemonstrative: false,
    },
    {
      id: 'tonometria',
      title: 'Tonometria',
      shortDescription: 'Medida da pressão intraocular durante a consulta.',
      detailedInfo:
        'A tonometria registra a pressão do olho no dia. O significado do número é explicado na visita, sem previsão de diagnóstico.',
      audience: 'Pacientes em consulta oftalmológica.',
      isDemonstrative: false,
    },
    {
      id: 'gonioscopia',
      title: 'Gonioscopia',
      shortDescription: 'Exame do ângulo da câmara anterior, quando indicado.',
      detailedInfo:
        'A gonioscopia observa o ângulo por onde o humor aquoso escoa. É feita na consulta quando há indicação clínica.',
      audience: 'Pacientes em que o ângulo da câmara anterior precisa ser visto.',
      isDemonstrative: false,
    },
    {
      id: 'microscopia-especular',
      title: 'Microscopia especular',
      shortDescription: 'Exame das células da camada interna da córnea, quando indicado.',
      detailedInfo:
        'A microscopia especular avalia o endotélio da córnea. Entra na consulta quando o exame clínico indica.',
      audience: 'Pacientes com indicação para avaliar a córnea.',
      isDemonstrative: false,
    },
  ],
};
