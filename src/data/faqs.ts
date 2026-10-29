export interface FaqItem {
  question: string;
  answer: string;
}

/** Textos visíveis na página. O JSON-LD, quando existir, precisa repetir estas frases. */
export const FAQS: FaqItem[] = [
  {
    question: 'A dilatação da pupila é realizada em todas as consultas?',
    answer:
      'Não necessariamente. A dilatação depende da avaliação clínica inicial e da queixa apresentada, como o exame da retina, do nervo óptico ou uma primeira consulta. Quando indicada, pode haver embaçamento passageiro para perto e maior sensibilidade à luz por algumas horas. Por isso, convém levar óculos escuros e, se a pessoa for dirigir, preferir outro transporte ou um acompanhante.',
  },
  {
    question: 'O que levar no dia da consulta?',
    answer:
      'Leve os óculos de uso habitual, para longe e para perto, a última receita oftalmológica, se houver, as embalagens de colírios ou de outros medicamentos de uso contínuo e um documento com foto.',
  },
  {
    question: 'Como será o agendamento?',
    answer:
      'O telefone e o WhatsApp do consultório ainda não foram confirmados, então esta página não publica um número para agendamento. O canal de contato entra no ar junto com esses dados.',
  },
  {
    question: 'A consulta inclui orientação sobre grau e óculos?',
    answer:
      'A orientação sobre grau e óculos faz parte do escopo clínico previsto para o consultório. A confirmação de que cada consulta inclui a renovação da receita depende do médico, antes da publicação definitiva.',
  },
  {
    question: 'O site informa convênio ou valor da consulta?',
    answer:
      'Não. Preço, convênio e reembolso não estão publicados. Esses dados só podem aparecer depois da confirmação do consultório, e sem promessa de cobertura.',
  },
  {
    question: 'Onde fica o consultório?',
    answer:
      'A área prevista de atendimento é Copacabana, no Rio de Janeiro. O logradouro, o CEP e qualquer referência de deslocamento só serão publicados depois da confirmação do endereço.',
  },
];
