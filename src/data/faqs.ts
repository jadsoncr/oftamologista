export interface FaqItem {
  question: string;
  answer: string;
}

/** Textos visíveis na página. O JSON-LD repete estas frases. */
export const FAQS: FaqItem[] = [
  {
    question: 'Como agendar uma consulta no consultório?',
    answer:
      'O consultório particular fica na Rua Miguel Lemos, 41, 13º andar, em Copacabana. O agendamento é pelo WhatsApp (21) 98374-6853. O atendimento nesse endereço é às quartas-feiras, pela manhã. O horário de início e de término da manhã não foi informado.',
  },
  {
    question: 'O consultório atende convênio?',
    answer:
      'Não. O consultório da Rua Miguel Lemos é particular e o pagamento informado é por PIX. O valor da consulta não está publicado. Consultas no Caxias D’Or são marcadas à parte, no site da Rede D’Or, e não aparecem aqui como convênio.',
  },
  {
    question: 'Onde mais o Dr. Bruno atende?',
    answer:
      'Além do consultório particular em Copacabana, há atendimento de oftalmologia geral no Caxias D’Or, em Duque de Caxias, com marcação em rededorsaoluiz.com.br/paciente/marcar-consulta. O Glória D’Or ainda não está em atendimento.',
  },
  {
    question: 'O que levar no dia da consulta?',
    answer:
      'Leve os óculos de uso habitual, para longe e para perto, a última receita oftalmológica, se houver, as embalagens de colírios ou de outros medicamentos de uso contínuo e um documento com foto.',
  },
  {
    question: 'A dilatação da pupila é realizada em todas as consultas?',
    answer:
      'Não necessariamente. A dilatação depende da avaliação clínica e da queixa, como o exame da retina. Quando indicada, pode haver embaçamento passageiro para perto e maior sensibilidade à luz por algumas horas. Convém levar óculos escuros e, se a pessoa for dirigir, ir acompanhada ou usar outro transporte.',
  },
  {
    question: 'Quais exames podem ser feitos na consulta?',
    answer:
      'Quando indicados, a consulta pode incluir refração, biomicroscopia, fundoscopia, mapeamento de retina, tonometria, gonioscopia e microscopia especular. Nem todo exame entra em toda visita.',
  },
];
