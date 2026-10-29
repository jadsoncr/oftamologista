import React from 'react';
import { useClinicConfig } from '../context/ConfigContext';

interface ScheduleLinkProps {
  className?: string;
  children: React.ReactNode;
  message?: string;
}

/** Link de agendamento. Sem número confirmado, leva à seção de contato da própria página. */
export const ScheduleLink: React.FC<ScheduleLinkProps> = ({ className, children, message }) => {
  const { getWhatsAppUrl } = useClinicConfig();
  const href = getWhatsAppUrl(message);

  if (!href) {
    return (
      <a href="/#contato" className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
};
