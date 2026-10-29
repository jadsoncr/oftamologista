import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';
import { ASSETS } from '../data/assets';
import { ScheduleLink } from './ScheduleLink';

export const Hero: React.FC = () => {
  const { config } = useClinicConfig();

  return (
    <section id="inicio" className="relative bg-[#F8F7F3] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E7E9E6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main 2-column editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic composition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Identification Kicker (No pills, clean unboxed tracked uppercase) */}
            <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#58656A] mb-4">
              Oftalmologia clínica
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.15rem] font-normal text-[#173B43] tracking-tight leading-[1.12] text-balance">
              Oftalmologista em Copacabana: cuidado com a saúde dos seus olhos
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#58656A] font-normal leading-relaxed max-w-xl text-balance">
              Dr. Bruno Gomes é médico oftalmologista. O cuidado previsto reúne consulta clínica, exame de vista, orientação sobre grau e óculos e acompanhamento da saúde ocular. O atendimento está planejado para Copacabana, no Rio de Janeiro. O endereço do consultório ainda aguarda confirmação.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <ScheduleLink className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-wide text-white bg-[#173B43] hover:bg-[#112C32] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B43]">
                <span>Agendar uma consulta</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </ScheduleLink>

              <a
                href="/#sobre"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-medium tracking-wide text-[#173B43] hover:text-[#112C32] border border-[#58656A]/30 hover:border-[#173B43] bg-transparent hover:bg-black/[0.02] rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <span>Conheça o médico</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#58656A]" />
              </a>
            </div>

            {/* Discreet location & credentials note below buttons */}
            <div className="mt-8 pt-6 border-t border-[#E7E9E6]/70 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-base text-[#173B43]">
              <span>Copacabana, Rio de Janeiro</span>
              <span aria-hidden="true" className="text-[#58656A]">·</span>
              <span>MÉDICO</span>
              <span aria-hidden="true" className="text-[#58656A]">·</span>
              <span>{config.doctor.crmConfirmed && config.doctor.crm ? config.doctor.crm : 'CRM-RJ a confirmar'}</span>
              <span aria-hidden="true" className="text-[#58656A]">·</span>
              <span>{config.doctor.rqe ? `RQE ${config.doctor.rqe}` : 'RQE a confirmar'}</span>
            </div>
          </div>

          {/* Right Column: High-fidelity clinical portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="relative rounded-lg overflow-hidden border border-[#E7E9E6] bg-white aspect-[4/5]">
                <picture>
                  <source srcSet={ASSETS.drBrunoPortraitWebp} type="image/webp" />
                  <img
                    src={ASSETS.drBrunoPortrait}
                    alt="Dr. Bruno Gomes, médico oftalmologista, de jaleco no consultório"
                    width={ASSETS.portraitWidth}
                    height={ASSETS.portraitHeight}
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top"
                  />
                </picture>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-[#0D2227]/75 text-white">
                  <p className="font-serif text-base font-normal tracking-tight">{config.doctor.name}</p>
                  <p className="text-sm font-sans text-white/90 tracking-wide uppercase mt-1">
                    Médico {config.doctor.specialty.replace(/^Médico\s+/i, '')}
                    {config.doctor.rqe ? ` · RQE ${config.doctor.rqe}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3-Column Editorial Foundations Strip */}
        <div className="mt-16 lg:mt-24 pt-10 border-t border-[#E7E9E6] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-[#173B43]">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#4A6B60]">01. Consulta Clínica</p>
            <h3 className="font-serif text-lg font-normal text-[#173B43]">Atenção Individualizada</h3>
            <p className="text-xs text-[#58656A] leading-relaxed">
              Escuta cuidadosa de cada paciente, investigando queixas visuais, histórico clínico e hábitos cotidianos com tempo adequado.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#4A6B60]">02. Rigor Técnico</p>
            <h3 className="font-serif text-lg font-normal text-[#173B43]">Precisão Diagnóstica</h3>
            <p className="text-xs text-[#58656A] leading-relaxed">
              Exames refrativos detalhados e avaliação da saúde ocular com equipamentos ópticos de alta precisão.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#4A6B60]">03. Acompanhamento</p>
            <h3 className="font-serif text-lg font-normal text-[#173B43]">Clareza & Continuidade</h3>
            <p className="text-xs text-[#58656A] leading-relaxed">
              Explicações claras em linguagem acessível sobre diagnóstico, adaptação a correções e prevenção da visão ao longo do tempo.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
