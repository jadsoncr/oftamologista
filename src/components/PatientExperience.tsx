import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { ScheduleLink } from './ScheduleLink';

export const PatientExperience: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const steps = [
    {
      step: '01',
      title: 'Contato com o consultório',
      description: 'O consultório particular é agendado pelo WhatsApp (21) 98374-6853. Informe o motivo da visita, sem descrever sintomas, exames ou medicamentos na mensagem.',
    },
    {
      step: '02',
      title: 'Disponibilidade de horários',
      description: 'Neste endereço, as consultas são às quartas-feiras, pela manhã. O horário exato de abertura e de encerramento ainda não foi informado.',
    },
    {
      step: '03',
      title: 'Orientações para o atendimento',
      description: 'No dia, leve os óculos em uso e a receita anterior, se houver. A necessidade de dilatar a pupila é definida na consulta.',
    }
  ];

  const faqs = FAQS;

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#E7E9E6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section title & subtitle */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#58656A] mb-3">
            Jornada do Atendimento
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[#173B43] tracking-tight leading-[1.18] text-balance">
            Como funciona a sua consulta
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#58656A] leading-relaxed">
            Um fluxo transparente e organizado para que a sua avaliação ocorra com tranquilidade, pontualidade e acolhimento.
          </p>
        </div>

        {/* 3 Steps horizontal flow with fine hairline borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-[#E7E9E6] pt-10">
          {steps.map((item, idx) => (
            <div key={idx} className="flex flex-col justify-between space-y-4">
              <div>
                <span className="font-sans text-xs font-semibold text-[#4A6B60] tabular-nums tracking-wider">
                  Etapa {item.step}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#173B43] mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#58656A] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2">
                <ScheduleLink className="inline-flex items-center gap-1 text-xs font-medium text-[#173B43] hover:text-[#4A6B60] transition-colors">
                  <span>Ver contato</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </ScheduleLink>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 lg:mt-28 pt-12 border-t border-[#E7E9E6]">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#58656A] mb-2">
              Orientações Práticas
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173B43]">
              Perguntas Frequentes
            </h3>
          </div>

          <div className="divide-y divide-[#E7E9E6] border-t border-b border-[#E7E9E6]">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-5">
                  <button
                    id={`faq-button-${index}`}
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full min-h-12 text-left flex items-center justify-between gap-6 group rounded-sm"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className="font-serif text-lg sm:text-xl font-normal text-[#173B43] group-hover:text-[#24525C] transition-colors">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-md text-[#58656A] group-hover:text-[#173B43] transition-colors shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    hidden={!isOpen}
                    className="pt-3 pb-2 pr-8 text-base text-[#58656A] leading-relaxed"
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
