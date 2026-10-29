import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';
import { ScheduleLink } from './ScheduleLink';

export const Navbar: React.FC = () => {
  const { config } = useClinicConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F3]/95 backdrop-blur-md border-b border-[#E7E9E6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single typographic wordmark */}
        <a
          href="/#inicio"
          className="group flex flex-col justify-center whitespace-nowrap shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#173B43] group-hover:text-[#24525C] transition-colors">
            {config.doctor.name}
          </span>
          <span className="text-xs font-sans font-medium text-[#58656A] tracking-[0.16em] uppercase -mt-0.5">
            Oftalmologia
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-[#58656A]">
          <a
            href="/#inicio"
            className="hover:text-[#173B43] transition-colors whitespace-nowrap shrink-0"
          >
            Início
          </a>
          <a
            href="/#sobre"
            className="hover:text-[#173B43] transition-colors whitespace-nowrap shrink-0"
          >
            Sobre
          </a>
          <a
            href="/#atuacao"
            className="hover:text-[#173B43] transition-colors whitespace-nowrap shrink-0"
          >
            Áreas de Atuação
          </a>
          <a
            href="/#consultorio"
            className="hover:text-[#173B43] transition-colors whitespace-nowrap shrink-0"
          >
            Consultório
          </a>
          <a
            href="/#contato"
            className="hover:text-[#173B43] transition-colors whitespace-nowrap shrink-0"
          >
            Contato
          </a>
        </nav>

        {/* Zone 3: 1 primary discrete action button */}
        <div className="flex items-center gap-4 shrink-0">
          <ScheduleLink className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#173B43] hover:bg-[#112C32] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173B43]">
            <span>Agendar uma consulta</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </ScheduleLink>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#173B43] hover:bg-[#E7E9E6]/60 rounded-md transition-colors focus-visible:outline-none"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E7E9E6] bg-[#F8F7F3] px-6 py-6 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-4 text-base font-medium text-[#173B43]">
            <a
              href="/#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#24525C] transition-colors border-b border-[#E7E9E6]/60"
            >
              Início
            </a>
            <a
              href="/#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#24525C] transition-colors border-b border-[#E7E9E6]/60"
            >
              Sobre o Dr. Bruno
            </a>
            <a
              href="/#atuacao"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#24525C] transition-colors border-b border-[#E7E9E6]/60"
            >
              Áreas de Atuação
            </a>
            <a
              href="/#consultorio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#24525C] transition-colors border-b border-[#E7E9E6]/60"
            >
              Consultório & Localização
            </a>
            <a
              href="/#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#24525C] transition-colors"
            >
              Contato & Agendamento
            </a>

            <div className="pt-2">
              <ScheduleLink
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#173B43] hover:bg-[#112C32] text-white font-medium rounded-md text-xs tracking-wide transition-colors text-center"
              >
                <span>Agendar uma consulta</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </ScheduleLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
