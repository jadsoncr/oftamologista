import React from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DoctorAbout } from './components/DoctorAbout';
import { ServicesSection } from './components/ServicesSection';
import { PatientExperience } from './components/PatientExperience';
import { ClinicSection } from './components/ClinicSection';
import { WhatsAppCTASection } from './components/WhatsAppCTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EditConfigModal } from './components/EditConfigModal';
import { NotFound } from './components/NotFound';
import { JsonLdScript } from './components/JsonLdScript';
import { isPublishedPath, normalizePath } from './data/routes';

export default function App({ url = '/' }: { url?: string }) {
  const path = normalizePath(typeof window !== 'undefined' ? window.location.pathname : url);
  const isHome = isPublishedPath(path);

  return (
    <ConfigProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#173B43] antialiased selection:bg-[#E7E9E6] selection:text-[#173B43] font-sans">
        <Navbar />
        <main className="flex-1">
          {isHome ? (
            <>
              <JsonLdScript />
              <Hero />
              <DoctorAbout />
              <ServicesSection />
              <PatientExperience />
              <ClinicSection />
              <WhatsAppCTASection />
            </>
          ) : (
            <NotFound />
          )}
        </main>
        <Footer />
        {isHome ? <FloatingWhatsApp /> : null}
        <EditConfigModal />
      </div>
    </ConfigProvider>
  );
}
