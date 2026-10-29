import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';

export const WhatsAppCTASection: React.FC = () => {
  const { config, getWhatsAppUrl } = useClinicConfig();
  const [selectedMessage, setSelectedMessage] = useState(config.contact.defaultWhatsAppMessage);
  const whatsappUrl = getWhatsAppUrl(selectedMessage);

  const predefinedMessages = [
    {
      label: 'Primeira Consulta Geral',
      text: config.contact.defaultWhatsAppMessage
    },
    {
      label: 'Consulta de uveíte',
      text: `Olá. Gostaria de agendar uma consulta particular sobre uveíte com o ${config.doctor.name}.`
    },
    {
      label: 'Acompanhamento clínico',
      text: `Olá. Gostaria de saber como agendar um retorno de acompanhamento com o ${config.doctor.name}.`
    }
  ];

  return (
    <section id="contato" className="py-20 lg:py-28 bg-[#173B43] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clear, dignified conversion messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            <p className="text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#4A6B60]">
              Agendamento & Informações
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.14] text-balance">
              Agende a sua consulta com clareza e atenção.
            </h2>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
              {whatsappUrl
                ? 'O consultório particular é agendado por este WhatsApp. A mensagem pede só o contato para marcar a consulta, sem dados de saúde.'
                : 'O WhatsApp do consultório ainda não foi confirmado. Esta página não publica número de demonstração e o agendamento fica indisponível até essa confirmação.'}
            </p>

            {/* Direct primary action */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-wide text-[#173B43] bg-white hover:bg-[#F8F7F3] rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Agendar uma consulta</span>
                  <ArrowUpRight className="w-4 h-4 text-[#173B43]" />
                </a>
              ) : (
                <p className="inline-flex items-center px-8 py-4 text-xs font-semibold tracking-wide text-[#173B43] bg-white/80 rounded-md">
                  Contato a confirmar
                </p>
              )}

              <div className="text-xs text-white/90">
                <p className="font-sans font-semibold text-white">
                  {config.contact.whatsappConfirmed && config.contact.whatsappFormatted
                    ? config.contact.whatsappFormatted
                    : 'Número a confirmar'}
                </p>
                <p className="text-white/85">WhatsApp do consultório</p>
              </div>
            </div>

            {/* Reassurance notes */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/85">
              <span>Particular</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Pagamento por PIX</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Quarta-feira, manhã</span>
            </div>

          </div>

          {/* Right Column: Pre-consultation topic selector */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F282E] border border-white/10 rounded-lg p-6 sm:p-8 space-y-5 shadow-sm">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#4A6B60]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
                    Mensagem de Contato
                  </span>
                </div>
                <span className="text-xs text-white/90">WhatsApp</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/90 block">
                  Selecione o motivo principal do seu contato:
                </label>
                <div className="flex flex-col gap-2">
                  {predefinedMessages.map((msg, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedMessage(msg.text)}
                      className={`text-left p-3 rounded-md text-xs transition-colors border ${
                        selectedMessage === msg.text
                          ? 'border-[#78958A] bg-white/10 text-white font-medium'
                          : 'border-white/10 bg-transparent text-white/90 hover:bg-white/5'
                      }`}
                    >
                      {msg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message preview balloon */}
              <div className="p-4 rounded-md bg-white/[0.04] border border-white/10 space-y-1.5">
                <p className="text-xs text-white/90 uppercase tracking-wider">Texto que será enviado:</p>
                <p className="text-sm text-white leading-relaxed">
                  "{selectedMessage}"
                </p>
              </div>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-white/15 hover:bg-white/25 text-white text-xs font-semibold tracking-wide transition-colors text-center"
                >
                  <span>Enviar pelo WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <p className="text-xs text-white/90 leading-relaxed">
                  O envio fica desligado enquanto o número não estiver confirmado.
                </p>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
