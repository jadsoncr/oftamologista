import React, { useState } from 'react';
import { X, Save, RotateCcw, Download, Check, Sparkles, User, MapPin, Phone, Briefcase } from 'lucide-react';
import { useClinicConfig } from '../context/ConfigContext';
import { ClinicConfig } from '../types';

export const EditConfigModal: React.FC = () => {
  const { config, updateConfig, resetConfig, isEditModalOpen, closeEditModal } = useClinicConfig();
  
  const [activeTab, setActiveTab] = useState<'doctor' | 'office' | 'contact' | 'services'>('doctor');
  const [formState, setFormState] = useState<ClinicConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if modal is reopened
  React.useEffect(() => {
    if (isEditModalOpen) {
      setFormState(config);
      setSaveSuccess(false);
    }
  }, [isEditModalOpen, config]);

  if (!isEditModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(() => formState);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      closeEditModal();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar as informações padrão do protótipo?')) {
      resetConfig();
      closeEditModal();
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'dr_bruno_gomes_config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:px-6 bg-[#173B43] text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-normal">Painel de Configuração do Site</span>
              <span className="text-xs bg-white/10 text-white/90 font-sans tracking-wider px-2 py-0.5 rounded border border-white/20">
                PROTÓTIPO
              </span>
            </div>
            <p className="text-xs text-white/70 mt-0.5">
              Personalize dados do médico, consultório, WhatsApp e áreas de atendimento em tempo real.
            </p>
          </div>

          <button
            onClick={closeEditModal}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('doctor')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'doctor'
                ? 'border-[#173B43] text-[#173B43] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Dados do Médico</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('office')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'office'
                ? 'border-[#173B43] text-[#173B43] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Consultório & Horários</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'contact'
                ? 'border-[#173B43] text-[#173B43] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp & Contato</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'services'
                ? 'border-[#173B43] text-[#173B43] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Áreas de Atuação</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* TAB 1: DOCTOR */}
          {activeTab === 'doctor' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome do Médico
                  </label>
                  <input
                    type="text"
                    value={formState.doctor.name}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        doctor: { ...formState.doctor, name: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Especialidade Principal
                  </label>
                  <input
                    type="text"
                    value={formState.doctor.specialty}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        doctor: { ...formState.doctor, specialty: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registro de Especialista (RQE)
                  </label>
                  <input
                    type="text"
                    value={formState.doctor.rqe}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        doctor: { ...formState.doctor, rqe: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CRM e Estado
                  </label>
                  <input
                    type="text"
                    value={formState.doctor.crm}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        doctor: { ...formState.doctor, crm: e.target.value }
                      })
                    }
                    placeholder="Ex: CRM-RJ 123456"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Formação Universitária / Acadêmica
                </label>
                <input
                  type="text"
                  value={formState.doctor.university}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      doctor: { ...formState.doctor, university: e.target.value }
                    })
                  }
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Biografia Profissional
                </label>
                <textarea
                  rows={4}
                  value={formState.doctor.bio}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      doctor: { ...formState.doctor, bio: e.target.value }
                    })
                  }
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Instagram (Handle e Link)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formState.doctor.instagramHandle}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        doctor: { ...formState.doctor, instagramHandle: e.target.value }
                      })
                    }
                    placeholder="@gomes.bruno_oft"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                  <input
                    type="text"
                    value={formState.doctor.instagram}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        doctor: { ...formState.doctor, instagram: e.target.value }
                      })
                    }
                    placeholder="https://www.instagram.com/..."
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OFFICE */}
          {activeTab === 'office' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                Altere aqui o endereço fictício do protótipo pelo endereço oficial definitivo quando estiver pronto.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Logradouro e Número</label>
                  <input
                    type="text"
                    value={formState.office.street}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        office: { ...formState.office, street: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sala / Andar</label>
                  <input
                    type="text"
                    value={formState.office.room}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        office: { ...formState.office, room: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bairro</label>
                  <input
                    type="text"
                    value={formState.office.neighborhood}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        office: { ...formState.office, neighborhood: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={formState.office.city}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        office: { ...formState.office, city: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CEP</label>
                  <input
                    type="text"
                    value={formState.office.zipCode}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        office: { ...formState.office, zipCode: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Acesso via Metrô / Transporte</label>
                <input
                  type="text"
                  value={formState.office.metroAccess}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      office: { ...formState.office, metroAccess: e.target.value }
                    })
                  }
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Informações de Estacionamento</label>
                <input
                  type="text"
                  value={formState.office.parkingInfo}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      office: { ...formState.office, parkingInfo: e.target.value }
                    })
                  }
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & WHATSAPP */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Número do WhatsApp (apenas dígitos, com DDI + DDD)
                  </label>
                  <input
                    type="text"
                    value={formState.contact.whatsappNumber}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        contact: { ...formState.contact, whatsappNumber: e.target.value }
                      })
                    }
                    placeholder="5521999998888"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43] font-mono"
                    required
                  />
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Formato: 55 + DDD (21) + 9 dígitos
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefone Formatado para Exibição
                  </label>
                  <input
                    type="text"
                    value={formState.contact.whatsappFormatted}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        contact: { ...formState.contact, whatsappFormatted: e.target.value }
                      })
                    }
                    placeholder="Número confirmado do consultório"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mensagem Padrão do WhatsApp
                </label>
                <textarea
                  rows={3}
                  value={formState.contact.defaultWhatsAppMessage}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      contact: { ...formState.contact, defaultWhatsAppMessage: e.target.value }
                    })
                  }
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  required
                />
                <span className="text-xs text-slate-500 mt-0.5 block">
                  Texto solicitado no projeto: "Olá! Gostaria de obter informações sobre consultas com o Dr. Bruno Gomes. Poderiam me informar os horários disponíveis e como funciona o agendamento?"
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Telefone Fixo do Consultório</label>
                  <input
                    type="text"
                    value={formState.contact.phone}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        contact: { ...formState.contact, phone: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email de Contato</label>
                  <input
                    type="email"
                    value={formState.contact.email}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        contact: { ...formState.contact, email: e.target.value }
                      })
                    }
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Edite os 4 serviços demonstrativos previstos na proposta inicial:
              </p>

              {formState.services.map((srv, idx) => (
                <div key={srv.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Serviço 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Título</label>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={e => {
                        const updated = [...formState.services];
                        updated[idx].title = e.target.value;
                        setFormState({ ...formState, services: updated });
                      }}
                      className="w-full text-sm p-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição Curta</label>
                    <input
                      type="text"
                      value={srv.shortDescription}
                      onChange={e => {
                        const updated = [...formState.services];
                        updated[idx].shortDescription = e.target.value;
                        setFormState({ ...formState, services: updated });
                      }}
                      className="w-full text-sm p-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#173B43]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action footer inside form */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar padrão</span>
              </button>

              <button
                type="button"
                onClick={handleExportJson}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar JSON</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#173B43] hover:bg-[#112C32] rounded-lg shadow-sm transition-colors"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Salvo com sucesso!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
