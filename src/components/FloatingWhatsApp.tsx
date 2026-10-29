import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';

export const FloatingWhatsApp: React.FC = () => {
  const { config, getWhatsAppUrl } = useClinicConfig();
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappUrl = getWhatsAppUrl();
  if (!whatsappUrl) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Editorial tooltip notice */}
      {showTooltip && (
        <div className="mb-2 bg-[#F8F7F3] text-[#173B43] text-xs p-3.5 rounded-lg shadow-lg border border-[#E7E9E6] max-w-[240px] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#E7E9E6]">
            <span className="font-serif text-sm font-normal text-[#173B43]">{config.doctor.name}</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#58656A] hover:text-[#173B43] p-0.5"
              aria-label="Fechar mensagem"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs text-[#58656A] leading-relaxed">
            Fale diretamente com nossa equipe para consultar horários e agendar a sua consulta.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 px-4 py-3.5 bg-[#173B43] hover:bg-[#112C32] text-white rounded-full shadow-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B43] active:scale-95"
        aria-label="Conversar pelo WhatsApp para agendamento de consulta com o Dr. Bruno Gomes"
      >
        <MessageCircle className="w-5 h-5 text-white shrink-0" />
        <span className="text-xs font-semibold tracking-wide whitespace-nowrap pr-1">
          Agendar Consulta
        </span>
      </a>
    </div>
  );
};
