import React from 'react';
import { Target, SearchX, Plus, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  isFiltered: boolean;
  onOpenCreate: () => void;
  onClearFilters?: () => void;
  onLoadExamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onOpenCreate,
  onClearFilters,
  onLoadExamples,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-100">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Nenhum objetivo encontrado
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Não localizamos nenhum objetivo com os termos de busca ou filtros selecionados. Tente ajustar os filtros para ver suas outras metas.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors cursor-pointer"
          >
            Limpar Filtros e Ver Todos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-amber-200/70 p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-sm relative overflow-hidden">
      {/* Detalhe de fundo acolhedor */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-orange-100/50 blur-2xl pointer-events-none" />

      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-500/20">
        <Target className="w-8 h-8 stroke-[2.2]" />
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Sua jornada começa com o primeiro passo!
      </h3>

      <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-md mx-auto">
        Você ainda não tem nenhum objetivo cadastrado. Tirar a meta da cabeça e colocá-la em palavras é a técnica mais eficaz para quebrar a inércia e vencer o adiamento.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenCreate}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Cadastrar Meu Primeiro Objetivo</span>
        </button>

        {onLoadExamples && (
          <button
            onClick={onLoadExamples}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Carregar Exemplos de Estudo</span>
          </button>
        )}
      </div>
    </div>
  );
};
