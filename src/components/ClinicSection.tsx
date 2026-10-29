import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';
import { canPublishAddress, canPublishHours } from '../data/publication';
import { ScheduleLink } from './ScheduleLink';

export const ClinicSection: React.FC = () => {
  const { config } = useClinicConfig();
  const [copied, setCopied] = useState(false);
  const addressReady = canPublishAddress(config);
  const hoursReady = canPublishHours(config);

  const fullAddress = addressReady
    ? `${config.office.street}, ${config.office.room}, ${config.office.neighborhood}, ${config.office.city} — ${config.office.state}`
    : '';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="consultorio" className="py-20 lg:py-28 bg-[#F8F7F3] border-b border-[#E7E9E6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#58656A] mb-3">
            Estrutura & Localização
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[#173B43] tracking-tight leading-[1.18] text-balance">
            O Consultório
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#58656A] leading-relaxed">
            A área prevista é Copacabana, no Rio de Janeiro. O logradouro, o CEP, o telefone e os horários permanecem fora da página até serem confirmados. Fotos do consultório também aguardam imagem autorizada.
          </p>
        </div>

        {/* Address, Access and Hours - Editorial 2-column breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[#E7E9E6] pt-12">
          
          {/* Left Column: Address & Transportation */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-sans font-semibold tracking-wider uppercase text-[#4A6B60]">
                  Endereço do Consultório
                </span>
                
                {addressReady ? (
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-xs text-[#58656A] hover:text-[#173B43] transition-colors focus-visible:outline-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4A6B60]" />
                      <span className="text-[#4A6B60] font-medium">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 opacity-70" />
                      <span>Copiar endereço</span>
                    </>
                  )}
                </button>
                ) : null}
              </div>

              <p className="font-serif text-2xl sm:text-3xl text-[#173B43]">
                {addressReady ? `${config.office.street}, ${config.office.room}` : 'Endereço a confirmar'}
              </p>
              <p className="text-sm text-[#58656A] mt-1">
                {config.office.neighborhood} — {config.office.city}, {config.office.state}
                {addressReady && config.office.zipCode ? ` · CEP ${config.office.zipCode}` : ''}
              </p>

              {config.office.isFictitiousNotice && (
                <p className="mt-3 text-sm text-[#58656A] leading-relaxed">
                  O endereço usado na demonstração foi retirado. Ele volta à página somente depois da confirmação do consultório, junto com o CEP.
                </p>
              )}
            </div>

            {/* Access details */}
            {addressReady && (config.office.metroAccess || config.office.parkingInfo || config.office.accessibilityInfo) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E7E9E6]">
                {config.office.metroAccess ? (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#173B43]">Como chegar</p>
                    <p className="text-xs text-[#58656A] leading-relaxed">{config.office.metroAccess}</p>
                  </div>
                ) : null}
                {config.office.parkingInfo ? (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#173B43]">Estacionamento</p>
                    <p className="text-xs text-[#58656A] leading-relaxed">{config.office.parkingInfo}</p>
                  </div>
                ) : null}
                {config.office.accessibilityInfo ? (
                  <div className="sm:col-span-2 space-y-1 pt-2">
                    <p className="text-xs font-semibold text-[#173B43]">Acessibilidade</p>
                    <p className="text-xs text-[#58656A] leading-relaxed">{config.office.accessibilityInfo}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            {addressReady ? (
              <div className="pt-2 flex items-center gap-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173B43] hover:text-[#4A6B60] transition-colors"
                >
                  <span>Ver endereço no Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
                <span aria-hidden="true" className="text-[#E7E9E6]">|</span>
                <ScheduleLink
                  message="Olá. Gostaria de orientações sobre como chegar ao consultório do Dr. Bruno Gomes."
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#58656A] hover:text-[#173B43] transition-colors"
                >
                  <span>Dúvidas sobre o acesso</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </ScheduleLink>
              </div>
            ) : null}
          </div>

          {/* Right Column: Operating Hours in a Clean Typographical List */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-sans font-semibold tracking-wider uppercase text-[#4A6B60]">
                Horários de Atendimento
              </span>
              <h3 className="font-serif text-2xl text-[#173B43] mt-1">
                Consultas Pré-Agendadas
              </h3>
            </div>

            {hoursReady ? (
              <div className="border-t border-[#E7E9E6] divide-y divide-[#E7E9E6]">
                {config.office.openingHours.map((slot, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between text-sm">
                    <span className="text-[#173B43] font-medium">{slot.days}</span>
                    <span className="text-xs text-[#58656A] font-mono tabular-nums">{slot.hours}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#58656A] leading-relaxed border-t border-[#E7E9E6] pt-4">
                Horários a confirmar. Dias e faixas, inclusive sábado, só entram na página quando o consultório os validar.
              </p>
            )}

            <p className="text-xs text-[#58656A] leading-relaxed">
              O atendimento previsto é com horário marcado, para haver tempo de exame e explicação.
            </p>

            <div className="pt-4">
              <ScheduleLink className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wide text-white bg-[#173B43] hover:bg-[#112C32] rounded-md transition-colors w-full sm:w-auto">
                <span>Ir para o contato</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </ScheduleLink>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
