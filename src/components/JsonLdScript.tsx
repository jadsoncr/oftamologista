import React from 'react';
import { useClinicConfig } from '../context/ConfigContext';
import { buildJsonLd } from '../data/publication';

export const JsonLdScript: React.FC = () => {
  const { config } = useClinicConfig();
  const data = buildJsonLd(config);
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
};
