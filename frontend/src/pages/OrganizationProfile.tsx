import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Building2,
  Copy,
  Shield,
  Loader2,
} from 'lucide-react';
import client from '../api/client';

export const OrganizationProfile: React.FC = () => {
  const { data: org, isLoading } = useQuery({
    queryKey: ['org-details'],
    queryFn: async () => {
      const { data } = await client.get('/organizations/me');
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-10">
      <header>
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          Perfil de <span className="text-primary">Organización</span>
        </h1>
        <p className="text-gray-500 font-medium mt-2">Configuración de identidad del tenant.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <section className="glass-card p-8 rounded-[32px] border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Información General
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Nombre de la ONG</label>
                <p className="text-xl font-bold text-white bg-white/5 p-4 rounded-2xl border border-white/5">{org?.name}</p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Slug (ID único del tenant)</label>
                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-primary font-mono font-bold flex-1">{org?.slug}</p>
                  <button
                    type="button"
                    onClick={() => org?.slug && navigator.clipboard.writeText(org.slug)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                    title="Copiar slug"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Plan</label>
                <p className="text-sm font-bold text-white bg-white/5 p-4 rounded-2xl border border-white/5 inline-block px-6">{org?.plan || 'FREE'}</p>
              </div>

              {org?.createdAt && (
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Creada</label>
                  <p className="text-sm text-gray-400">{new Date(org.createdAt).toLocaleDateString('es-CL')}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[32px] border border-white/5 bg-primary/5 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 mx-auto mb-4">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-white font-black uppercase italic tracking-tighter">Tenant activo</h3>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">Todos los recursos que crees quedan aislados a esta organización.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
