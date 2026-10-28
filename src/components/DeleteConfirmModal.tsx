import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Objective } from '../types/objective';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  objective: Objective | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  objective,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !objective) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="p-6">
          {/* Ícone e Título de Alerta */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Cancelar e fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 id="delete-dialog-title" className="text-lg font-bold text-slate-800 mb-2">
            Confirmar exclusão de objetivo
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Tem certeza de que deseja excluir este objetivo? Os dados associados a ele serão removidos do seu armazenamento.
          </p>

          {/* Cartão de destaque do objetivo selecionado */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Objetivo a ser removido:
            </p>
            <p className="text-sm font-bold text-slate-800 line-clamp-2">
              {objective.title}
            </p>
            {objective.description && (
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {objective.description}
              </p>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Voltar / Manter
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Sim, Excluir Objetivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
