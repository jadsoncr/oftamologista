import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';
import { ASSETS } from '../data/assets';

export const DoctorAbout: React.FC = () => {
  const { config } = useClinicConfig();

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white border-b border-[#E7E9E6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section kicker */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#58656A] mb-3">
            Apresentação Profissional
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[#173B43] tracking-tight leading-[1.18] text-balance">
            Oftalmologia geral e uveítes, com formação na UERJ.
          </h2>
        </div>

        {/* Editorial Grid: Photography + Typographic Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contextual clinical photograph */}
          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-[#E7E9E6] bg-[#F8F7F3]">
              <picture>
                <source srcSet={ASSETS.drBrunoPortraitWebp} type="image/webp" />
                <img
                  src={ASSETS.drBrunoPortrait}
                  alt="Retrato autorizado do Dr. Bruno Gomes, médico oftalmologista"
                  width={ASSETS.portraitWidth}
                  height={ASSETS.portraitHeight}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </picture>
            </div>
            <p className="text-sm text-[#58656A] leading-relaxed mt-4">
              Retrato autorizado do médico. Fotos da sala e da recepção entram quando houver imagem do consultório real.
            </p>
          </div>

          {/* Right Column: Narrative bio & organized typographic data */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header info */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#173B43]">
                {config.doctor.name}
              </h3>
              <p className="text-base text-[#173B43] mt-2">
                MÉDICO · {config.doctor.specialty.replace(/^Médico\s+/i, '')} · {config.doctor.subspecialty} · RQE {config.doctor.rqe || 'a confirmar'}
              </p>
              <p className="text-sm text-[#58656A] mt-1">
                Registro profissional: Bruno da Silva Gomes
              </p>
            </div>

            {/* Objective Bio Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#58656A] leading-relaxed">
              <p className="text-[#173B43] font-medium text-base sm:text-lg">
                Consulta particular em Copacabana, com foco em oftalmologia geral e uveítes.
              </p>
              <p>
                {config.doctor.bio}
              </p>
              <ul className="space-y-1">
                {config.doctor.complementaryEducation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Clean Typographic Credentials with fine hairline rules (no repetitive cards) */}
            <div className="border-t border-[#E7E9E6] pt-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-sans font-semibold tracking-wider uppercase text-[#58656A]">
                    Registro de Especialista
                  </p>
                  <p className="font-serif text-xl text-[#173B43] mt-1">
                    {config.doctor.rqe ? `RQE ${config.doctor.rqe}` : 'A confirmar'}
                  </p>
                  <p className="text-xs text-[#58656A] mt-0.5">
                    {config.doctor.rqeConfirmed ? 'Oftalmologia' : 'Número informado no projeto, pendente de validação'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-sans font-semibold tracking-wider uppercase text-[#58656A]">
                    Conselho Profissional
                  </p>
                  <p className="font-serif text-xl text-[#173B43] mt-1">
                    {config.doctor.crmConfirmed && config.doctor.crm ? config.doctor.crm : 'A confirmar'}
                  </p>
                  <p className="text-xs text-[#58656A] mt-0.5">
                    Conselho Regional de Medicina ({config.doctor.crmState})
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E7E9E6] pt-5">
                <p className="text-xs font-sans font-semibold tracking-wider uppercase text-[#58656A]">
                  Formação Acadêmica
                </p>
                <p className="text-sm font-medium text-[#173B43] mt-1.5">
                  {config.doctor.educationConfirmed && config.doctor.university
                    ? config.doctor.university
                    : 'A confirmar antes da publicação'}
                </p>
                <p className="text-xs text-[#58656A] mt-1">
                  Residência em Oftalmologia e subespecialidade em uveítes. O título em Clínica Médica ainda não foi concluído.
                </p>
              </div>

            </div>

            {/* Discrete Professional Instagram Link */}
            <div className="pt-2">
              <a
                href={config.doctor.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173B43] hover:text-[#4A6B60] transition-colors"
              >
                <span>Acompanhar orientações no Instagram {config.doctor.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
