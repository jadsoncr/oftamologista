import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';
import { ScheduleLink } from './ScheduleLink';

export const ServicesSection: React.FC = () => {
  const { config } = useClinicConfig();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = config.services.find(s => s.id === selectedServiceId);

  return (
    <section id="atuacao" className="py-20 lg:py-28 bg-[#F8F7F3] border-b border-[#E7E9E6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#58656A] mb-3">
            Áreas de Atuação
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[#173B43] tracking-tight leading-[1.18] text-balance">
            Oftalmologia geral, uveítes e exames da consulta.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#58656A] leading-relaxed">
            A consulta particular reúne oftalmologia geral e uveítes. Os exames abaixo entram quando a avaliação do dia indica, e não em toda visita.
          </p>
        </div>

        {/* Editorial Service List with fine hairline dividers */}
        <div className="border-t border-[#E7E9E6] divide-y divide-[#E7E9E6]">
          {config.services.map((service, index) => (
            <article
              id={service.id}
              key={service.id}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start group"
            >
              {/* Service Number & Title */}
              <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                <span className="font-sans text-xs font-semibold text-[#4A6B60] tabular-nums tracking-wider shrink-0">
                  0{index + 1}.
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173B43] group-hover:text-[#24525C] transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Description & Audience */}
              <div className="lg:col-span-5 space-y-2">
                <p className="text-sm text-[#58656A] leading-relaxed">
                  {service.shortDescription}
                </p>
                <p className="text-sm text-[#58656A] leading-relaxed">
                  {service.detailedInfo}
                </p>
                <p className="text-xs text-[#58656A]/80 font-normal">
                  <span className="font-medium text-[#173B43]/80">Indicação:</span> {service.audience}
                </p>
              </div>

              {/* Actions */}
              <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-start gap-3 sm:gap-4 pt-2 lg:pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className="text-xs font-semibold text-[#173B43] hover:text-[#4A6B60] transition-colors underline underline-offset-4 decoration-[#E7E9E6] hover:decoration-[#78958A]"
                >
                  Saiba mais
                </button>

                <ScheduleLink
                  message={`Olá. Gostaria de informações sobre ${service.title} com o Dr. Bruno Gomes.`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#58656A] hover:text-[#173B43] transition-colors"
                >
                  <span>Consultar</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </ScheduleLink>
              </div>
            </article>
          ))}
        </div>

        {/* Quiet disclaimer */}
        <p className="mt-8 text-xs text-[#58656A]/75 text-right">
          Procedimentos e exames complementares específicos são sempre indicados individualmente após avaliação médica presencial.
        </p>

      </div>

      {/* Detail Modal for Selected Service */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D2227]/60 backdrop-blur-xs">
          <div className="bg-[#F8F7F3] rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-xl border border-[#E7E9E6] animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#E7E9E6]">
              <div>
                <p className="text-xs font-sans font-semibold tracking-wider uppercase text-[#4A6B60]">
                  Área de Atuação
                </p>
                <h3 className="font-serif text-2xl font-normal text-[#173B43] mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedServiceId(null)}
                className="text-[#58656A] hover:text-[#173B43] p-1.5 rounded-md hover:bg-[#E7E9E6]/60 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4 text-sm text-[#58656A] leading-relaxed">
              <div>
                <h4 className="text-xs font-semibold text-[#173B43] uppercase tracking-wider mb-1">
                  O que compreende este atendimento
                </h4>
                <p>{selectedService.detailedInfo}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#173B43] uppercase tracking-wider mb-1">
                  Indicações gerais
                </h4>
                <p>{selectedService.audience}</p>
              </div>

              <div className="pt-3 border-t border-[#E7E9E6] text-sm text-[#58656A]">
                * Os exames diagnósticos são personalizados conforme histórico de saúde ocular, sintomas e achados clínicos na lâmpada de fenda.
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E9E6] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedServiceId(null)}
                className="px-4 py-2.5 text-xs font-medium text-[#58656A] hover:text-[#173B43] transition-colors"
              >
                Fechar
              </button>
              <ScheduleLink
                message={`Olá. Gostaria de consultar horários para ${selectedService.title} com o Dr. Bruno Gomes.`}
                className="px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#173B43] hover:bg-[#112C32] rounded-md inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Solicitar agendamento</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </ScheduleLink>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
