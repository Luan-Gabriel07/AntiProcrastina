import React from 'react';
import { Target, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Objective } from '../types/objective';

interface StatsOverviewProps {
  objectives: Objective[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ objectives }) => {
  const total = objectives.length;
  const inProgress = objectives.filter((o) => o.status === 'em_andamento').length;
  const completed = objectives.filter((o) => o.status === 'concluido').length;
  const notStarted = objectives.filter((o) => o.status === 'nao_iniciado').length;
  const paused = objectives.filter((o) => o.status === 'pausado').length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section aria-label="Resumo dos objetivos" className="mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card: Total */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-amber-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Total de Objetivos
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {total}
            </span>
            <span className="text-xs text-slate-400">
              {total === 1 ? 'cadastrado' : 'cadastrados'}
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <span className="font-semibold text-amber-700">{completionRate}%</span> concluídos
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Card: Em andamento */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Em Andamento
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              {inProgress}
            </span>
            <span className="text-xs text-slate-400">em ação</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Foque em dar um micro-passo agora
          </p>
        </div>

        {/* Card: Não iniciados */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Não Iniciados
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-800">
              {notStarted}
            </span>
            <span className="text-xs text-slate-400">
              {paused > 0 ? `(${paused} pausados)` : 'na fila'}
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            A menor tarefa reduz o atrito de começar
          </p>
        </div>

        {/* Card: Concluídos */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Concluídos
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {completed}
            </span>
            <span className="text-xs text-emerald-600 font-medium">vitórias</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Celebre cada pequena entrega!
          </p>
        </div>
      </div>
    </section>
  );
};
