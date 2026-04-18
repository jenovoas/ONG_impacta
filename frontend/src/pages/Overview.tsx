import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  Users,
  Target,
  Activity,
  ArrowUpRight,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-6 rounded-3xl flex items-center gap-6"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-black text-white mt-1">{value}</h3>
    </div>
  </motion.div>
);

export const Overview: React.FC = () => {
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ['org-summary'],
    queryFn: async () => {
      const { data } = await client.get('/organizations/me/summary');
      return data;
    },
  });

  const { data: donations = [], isLoading: loadingDonations } = useQuery({
    queryKey: ['donations', 'recent'],
    queryFn: async () => {
      const { data } = await client.get('/donations');
      return data;
    },
  });

  const recent = donations.slice(0, 5);
  const totalAmount = Number(summary?.totalAmount ?? 0);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          Panel de <span className="text-primary">Control</span>
        </h1>
        <p className="text-gray-500 font-medium mt-2">Bienvenido de nuevo al Steward Protocol v1.0</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Recaudación Total"
          value={loadingSummary ? '—' : `$${totalAmount.toLocaleString('es-CL')}`}
          icon={DollarSign}
          color="bg-primary"
          delay={0.1}
        />
        <StatCard
          title="Donaciones"
          value={loadingSummary ? '—' : summary?.donationsCount ?? 0}
          icon={TrendingUp}
          color="bg-secondary"
          delay={0.2}
        />
        <StatCard
          title="Miembros Activos"
          value={loadingSummary ? '—' : summary?.membersCount ?? 0}
          icon={Users}
          color="bg-tertiary"
          delay={0.3}
        />
        <StatCard
          title="Campañas Activas"
          value={loadingSummary ? '—' : summary?.campaignsCount ?? 0}
          icon={Target}
          color="bg-surface-bright"
          delay={0.4}
        />
      </div>

      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Activity className="text-primary w-6 h-6" />
            Actividad Reciente
          </h2>
          <Link to="/dashboard/donations" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            Ver todo <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingDonations ? (
          <p className="text-gray-500 text-sm">Cargando…</p>
        ) : recent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm font-medium">Aún no hay donaciones registradas.</p>
            <p className="text-gray-600 text-xs mt-2">Cuando entren donaciones, aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recent.map((d: any) => {
              const donorName = d.member ? `${d.member.firstName} ${d.member.lastName}` : 'Anónimo';
              const amount = Number(d.amount ?? 0);
              const statusLabel = d.status === 'SUCCEEDED' ? 'Completado' : d.status === 'PENDING' ? 'Pendiente' : 'Fallido';
              return (
                <div key={d.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{donorName}</p>
                    <p className="text-gray-500 text-xs">{new Date(d.createdAt).toLocaleDateString('es-CL')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-secondary font-black">+${amount.toLocaleString('es-CL')}</p>
                    <p className="text-gray-600 text-[10px] uppercase font-bold">{statusLabel}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
