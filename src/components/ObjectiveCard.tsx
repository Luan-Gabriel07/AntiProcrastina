import React from 'react';
import {
  Calendar,
  Clock,
  Edit2,
  Trash2,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  AlertCircle,
} from 'lucide-react';
import { Objective, ObjectiveStatus, STATUS_CONFIG } from '../types/objective';
import { formatDateBR, getDeadlineStatus } from '../utils/dateUtils';

interface ObjectiveCardProps {
  objective: Objective;
  onEdit: (objective: Objective) => void;
  onDeleteRequest: (objective: Objective) => void;
  onQuickStatusChange: (id: string, newStatus: ObjectiveStatus) => void;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  objective,
  onEdit,
  onDeleteRequest,
  onQuickStatusChange,
}) => {
  const statusCfg = STATUS_CONFIG[objective.status];
  const isCompleted = objective.status === 'concluido';
  const deadlineInfo = getDeadlineStatus(objective.deadline, isCompleted);

  return (
    <article
      className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden relative group ${
        isCompleted
          ? 'border-emerald-200/80 bg-emerald-50/20'
          : deadlineInfo.isOverdue
          ? 'border-rose-200 bg-rose-50/10'
          : deadlineInfo.isToday
          ? 'border-amber-300 ring-1 ring-amber-200/60'
          : 'border-slate-200/80 hover:border-amber-200'
      }`}
    >
      {/* Top bar com Status e Indicador de Prazo */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Badge de Status interativo */}
          <div className="relative inline-block">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusCfg.bgClass} ${statusCfg.textClass} ${statusCfg.borderClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotClass}`} />
              {statusCfg.label}
            </span>
          </div>

          {/* Badge de Prazo/Urgência */}
          <span
            className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-medium ${deadlineInfo.badgeClass}`}
            title={`Prazo final: ${formatDateBR(objective.deadline)}`}
          >
            <Clock className="w-3 h-3" />
            {deadlineInfo.label}
          </span>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`text-base sm:text-lg font-bold text-slate-800 leading-snug mb-2 group-hover:text-amber-700 transition-colors ${
            isCompleted ? 'line-through text-slate-500' : ''
          }`}
        >
          {objective.title}
        </h3>

        {/* Descrição */}
        {objective.description ? (
          <p
            className={`text-xs sm:text-sm text-slate-600 line-clamp-3 whitespace-pre-line leading-relaxed ${
              isCompleted ? 'text-slate-400' : ''
            }`}
          >
            {objective.description}
          </p>
        ) : (
          <p className="text-xs text-slate-400 italic">Sem descrição detalhada.</p>
        )}
      </div>

      {/* Rodapé do Card com Ações e Prazo */}
      <div className="px-4 sm:px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        {/* Data legível */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Prazo: {formatDateBR(objective.deadline)}</span>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-1.5">
          {/* Ações rápidas de Status */}
          {objective.status !== 'concluido' ? (
            <button
              onClick={() => onQuickStatusChange(objective.id, 'concluido')}
              type="button"
              title="Marcar como Concluído"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/60 rounded-lg transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Concluir</span>
            </button>
          ) : (
            <button
              onClick={() => onQuickStatusChange(objective.id, 'em_andamento')}
              type="button"
              title="Reabrir objetivo"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-100/60 rounded-lg transition-colors cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Reabrir</span>
            </button>
          )}

          {/* Seletor rápido de Status alternativo */}
          {objective.status === 'nao_iniciado' && (
            <button
              onClick={() => onQuickStatusChange(objective.id, 'em_andamento')}
              type="button"
              title="Iniciar agora"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-100/60 rounded-lg transition-colors cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Iniciar</span>
            </button>
          )}

          {objective.status === 'em_andamento' && (
            <button
              onClick={() => onQuickStatusChange(objective.id, 'pausado')}
              type="button"
              title="Pausar temporariamente"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <PauseCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Pausar</span>
            </button>
          )}

          {objective.status === 'pausado' && (
            <button
              onClick={() => onQuickStatusChange(objective.id, 'em_andamento')}
              type="button"
              title="Retomar objetivo"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-100/60 rounded-lg transition-colors cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Retomar</span>
            </button>
          )}

          {/* Botão Editar */}
          <button
            onClick={() => onEdit(objective)}
            type="button"
            className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Editar objetivo"
            aria-label={`Editar objetivo ${objective.title}`}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          {/* Botão Excluir */}
          <button
            onClick={() => onDeleteRequest(objective)}
            type="button"
            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-100/60 rounded-lg transition-colors cursor-pointer"
            title="Excluir objetivo"
            aria-label={`Excluir objetivo ${objective.title}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
