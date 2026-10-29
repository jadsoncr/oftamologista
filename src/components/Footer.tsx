import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';

export const Footer: React.FC = () => {
  const { config, openEditModal } = useClinicConfig();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8F7F3] text-[#58656A] text-xs border-t border-[#E7E9E6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        
        {/* Main 3-column minimalist layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E7E9E6]">
          
          {/* Col 1: Identity & Professional Credentials */}
          <div className="md:col-span-5 space-y-3">
            <div>
              <p className="font-serif text-xl font-normal text-[#173B43]">
                {config.doctor.name}
              </p>
              <p className="text-base text-[#173B43] mt-1">
                MÉDICO · {config.doctor.crmConfirmed && config.doctor.crm ? config.doctor.crm : 'CRM-RJ a confirmar'} · RQE {config.doctor.rqe || 'a confirmar'}
              </p>
            </div>

            <p className="text-xs text-[#58656A] leading-relaxed max-w-sm">
              Consulta clínica, exame de vista e acompanhamento da saúde ocular. Atendimento planejado em Copacabana, Rio de Janeiro.
            </p>

            <div className="pt-2">
              <a
                href={config.doctor.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#173B43] hover:text-[#4A6B60] transition-colors"
              >
                <span>Instagram {config.doctor.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-sans font-semibold tracking-wider uppercase text-[#173B43]">
              Navegação
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#inicio" className="hover:text-[#173B43] transition-colors">Início</a>
              </li>
              <li>
                <a href="/#sobre" className="hover:text-[#173B43] transition-colors">Sobre o Dr. Bruno</a>
              </li>
              <li>
                <a href="/#atuacao" className="hover:text-[#173B43] transition-colors">Áreas de Atuação</a>
              </li>
              <li>
                <a href="/#consultorio" className="hover:text-[#173B43] transition-colors">Consultório</a>
              </li>
              <li>
                <a href="/#contato" className="hover:text-[#173B43] transition-colors">Contato</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Consulting Location & Contact */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-sans font-semibold tracking-wider uppercase text-[#173B43]">
              Consultório
            </p>
            <div className="space-y-1 text-xs">
              <p className="font-medium text-[#173B43]">
                {config.office.addressConfirmed && config.office.street
                  ? `${config.office.street}${config.office.room ? `, ${config.office.room}` : ''}`
                  : 'Endereço a confirmar'}
              </p>
              <p>{config.office.neighborhood} — {config.office.city}, {config.office.state}</p>
              <p className="text-[#58656A]">
                WhatsApp: {config.contact.whatsappConfirmed && config.contact.whatsappFormatted
                  ? config.contact.whatsappFormatted
                  : 'a confirmar'}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-xs text-[#58656A] hover:text-[#173B43] transition-colors underline underline-offset-2 decoration-[#E7E9E6]"
              >
                Política de Privacidade
              </button>

              <span aria-hidden="true" className="text-[#E7E9E6]">·</span>

              {/* Discreet prototype editor link for administrators */}
              <button
                type="button"
                onClick={openEditModal}
                className="text-xs text-[#58656A]/60 hover:text-[#173B43] transition-colors"
                title="Configurações de demonstração do protótipo"
              >
                Ajustes do Protótipo
              </button>
            </div>
          </div>

        </div>

        {/* Ethical Medical Notice (CFM) - Quiet & restrained */}
        <div className="py-6 border-b border-[#E7E9E6] text-xs text-[#58656A]/80 leading-relaxed max-w-4xl">
          <p>
            <strong>Aviso de Conformidade Ética (CFM):</strong> O conteúdo deste site possui finalidade exclusivamente informativa e educacional sobre saúde ocular. As informações não substituem a avaliação clínica individualizada realizada presencialmente por médico oftalmologista devidamente qualificado. Em cumprimento às resoluções do Conselho Federal de Medicina, não são divulgados preços de procedimentos, tabelas nem garantias de resultado.
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#58656A]/80">
          <p>
            © {new Date().getFullYear()} {config.doctor.name} · Oftalmologia · CRM-{config.doctor.crmState} a confirmar · RQE {config.doctor.rqe || 'a confirmar'}
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#58656A] hover:text-[#173B43] transition-colors focus-visible:outline-none"
            aria-label="Voltar ao início da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D2227]/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-xl border border-[#E7E9E6] space-y-4">
            <h3 className="font-serif text-2xl text-[#173B43]">
              Privacidade & Tratamento de Dados
            </h3>
            <div className="text-xs text-[#58656A] leading-relaxed space-y-3">
              <p>
                Este site preza pelo sigilo e pela privacidade de seus visitantes. Nenhum dado de saúde pessoal é coletado ou armazenado sem seu consentimento explícito.
              </p>
              <p>
                O agendamento pelo WhatsApp só entra no ar depois da confirmação do número. Quando isso acontecer, a mensagem fica na criptografia da própria plataforma e serve apenas para marcar a consulta ou tirar uma dúvida de horário.
              </p>
              <p>
                Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e o sigilo médico profissional, seus dados de contato não são compartilhados com terceiros para fins publicitários.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E7E9E6] flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#173B43] hover:bg-[#112C32] rounded-md transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
