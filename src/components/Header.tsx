import React from 'react';
import { Target, Plus, Lightbulb } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onToggleTips: () => void;
  showTips: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreateModal,
  onToggleTips,
  showTips,
}) => {
  return (
    <header className="bg-white border-b border-amber-100/80 sticky top-0 z-20 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Target className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
                  Anti<span className="text-amber-600">Procrastina</span>
                </h1>
                <span className="text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  v1.0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Transforme intenção em ação: organize suas metas e vença a procrastinação
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleTips}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-150 border ${
                showTips
                  ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="Dicas práticas para superar o adiamento"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="hidden xs:inline">Dicas Anti-Adiamento</span>
              <span className="xs:hidden">Dicas</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Novo Objetivo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
