import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClinicConfig } from '../types';
import { DEFAULT_CLINIC_CONFIG } from '../data/defaultConfig';
import { canPublishWhatsApp, sanitizeConfig } from '../data/publication';

interface ConfigContextValue {
  config: ClinicConfig;
  updateConfig: (updater: (prev: ClinicConfig) => ClinicConfig) => void;
  resetConfig: () => void;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
  getWhatsAppUrl: (customText?: string) => string | null;
}

const STORAGE_KEY = 'dr_bruno_gomes_clinic_config_v3';

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ClinicConfig>(DEFAULT_CLINIC_CONFIG);
  const [storageReady, setStorageReady] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setConfig(sanitizeConfig(JSON.parse(saved) as ClinicConfig));
      }
    } catch {
      // ignora JSON inválido e mantém a configuração padrão
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignora falha de armazenamento
    }
  }, [config, storageReady]);

  const updateConfig = (updater: (prev: ClinicConfig) => ClinicConfig) => {
    setConfig((prev) => sanitizeConfig(updater(prev)));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CLINIC_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignora
    }
  };

  const getWhatsAppUrl = (customText?: string) => {
    if (!canPublishWhatsApp(config)) return null;
    const text = customText || config.contact.defaultWhatsAppMessage;
    const cleanNumber = config.contact.whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isEditModalOpen,
        openEditModal: () => setIsEditModalOpen(true),
        closeEditModal: () => setIsEditModalOpen(false),
        getWhatsAppUrl,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useClinicConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error('useClinicConfig must be used within a ConfigProvider');
  }
  return ctx;
};
