import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { ObjectiveFilterOptions, ObjectiveStatus, STATUS_CONFIG } from '../types/objective';

interface FilterBarProps {
  filters: ObjectiveFilterOptions;
  onFilterChange: (newFilters: Partial<ObjectiveFilterOptions>) => void;
  statusCounts: Record<string, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  statusCounts,
}) => {
  const statusOptions: { key: 'todos' | ObjectiveStatus; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'em_andamento', label: STATUS_CONFIG.em_andamento.label },
    { key: 'nao_iniciado', label: STATUS_CONFIG.nao_iniciado.label },
    { key: 'concluido', label: STATUS_CONFIG.concluido.label },
    { key: 'pausado', label: STATUS_CONFIG.pausado.label },
  ];

  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Campo de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Buscar por título ou descrição..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200/60 rounded-full w-4 h-4 flex items-center justify-center"
              title="Limpar busca"
            >
              ×
            </button>
          )}
        </div>

        {/* Ordenação */}
        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as ObjectiveFilterOptions['sortBy'],
              })
            }
            aria-label="Ordenar objetivos"
            className="w-full sm:w-auto text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="deadline_asc">Prazo: Mais próximos primeiro</option>
            <option value="deadline_desc">Prazo: Mais distantes primeiro</option>
            <option value="created_desc">Mais recentes adicionados</option>
            <option value="title_asc">Título: Ordem alfabética</option>
          </select>
        </div>
      </div>

      {/* Abas de Status com contadores */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 no-scrollbar border-t border-slate-100">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 hidden sm:block" />
        {statusOptions.map((option) => {
          const isActive = filters.status === option.key;
          const count = statusCounts[option.key] || 0;

          return (
            <button
              key={option.key}
              onClick={() => onFilterChange({ status: option.key })}
              className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-slate-800'
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-slate-600 border border-slate-200/60'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
