import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle, Sparkles, Check } from 'lucide-react';
import {
  Objective,
  ObjectiveFormData,
  ObjectiveStatus,
  STATUS_CONFIG,
} from '../types/objective';

interface ObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ObjectiveFormData) => void;
  editingObjective: Objective | null;
}

export const ObjectiveModal: React.FC<ObjectiveModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingObjective,
}) => {
  const [formData, setFormData] = useState<ObjectiveFormData>({
    title: '',
    description: '',
    deadline: '',
    status: 'nao_iniciado',
  });

  const [errors, setErrors] = useState<{
    title?: string;
    deadline?: string;
  }>({});

  useEffect(() => {
    if (editingObjective) {
      setFormData({
        title: editingObjective.title,
        description: editingObjective.description || '',
        deadline: editingObjective.deadline || '',
        status: editingObjective.status,
      });
    } else {
      // Data padrão: 3 dias a partir de hoje
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 3);
      const formattedDate = defaultDate.toISOString().split('T')[0];

      setFormData({
        title: '',
        description: '',
        deadline: formattedDate,
        status: 'nao_iniciado',
      });
    }
    setErrors({});
  }, [editingObjective, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: { title?: string; deadline?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Por favor, informe o título do objetivo.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'O título deve ter pelo menos 3 caracteres.';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Selecione uma data limite para o objetivo.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(formData);
    onClose();
  };

  // Sugestões de micro-passos para desarmar a procrastinação
  const handleMicroStepSuggestion = (suggestion: string) => {
    setFormData((prev) => ({
      ...prev,
      title: suggestion,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50/50 to-orange-50/30">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-800">
              {editingObjective ? 'Editar Objetivo de Estudo' : 'Cadastrar Novo Objetivo'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {editingObjective
                ? 'Ajuste os detalhes ou altere o status da sua meta'
                : 'Defina um objetivo claro para sair da inércia com menos atrito'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Campo Título */}
          <div>
            <label
              htmlFor="objective-title"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              id="objective-title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
              placeholder="Ex.: Ler 20 páginas de Economia, Fazer 10 exercícios..."
              className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-amber-500/20 focus:border-amber-500'
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.title}
              </p>
            )}

            {/* Dica de Micro-passo para novos objetivos */}
            {!editingObjective && (
              <div className="mt-2 text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5">
                <span className="flex items-center gap-1 text-amber-700 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Sugestões rápidas:
                </span>
                <button
                  type="button"
                  onClick={() => handleMicroStepSuggestion('Escrever o sumário do trabalho de TCC')}
                  className="bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
                >
                  Sumário do TCC
                </button>
                <button
                  type="button"
                  onClick={() => handleMicroStepSuggestion('Resolver 5 questões de Matemática')}
                  className="bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
                >
                  5 questões de Matemática
                </button>
              </div>
            )}
          </div>

          {/* Campo Descrição */}
          <div>
            <label
              htmlFor="objective-description"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Descrição & Anotações <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <textarea
              id="objective-description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descreva o primeiro micro-passo, links de materiais ou critérios de conclusão..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none text-slate-800 placeholder:text-slate-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Dica: divida em partes menores caso o objetivo pareça grande demais.
            </p>
          </div>

          {/* Linha dupla: Prazo e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Campo Prazo */}
            <div>
              <label
                htmlFor="objective-deadline"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Prazo Final <span className="text-rose-500">*</span>
              </label>
              <input
                id="objective-deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => {
                  setFormData({ ...formData, deadline: e.target.value });
                  if (errors.deadline) setErrors({ ...errors, deadline: undefined });
                }}
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.deadline
                    ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/30'
                    : 'border-slate-200 focus:ring-amber-500/20 focus:border-amber-500'
                }`}
              />
              {errors.deadline && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.deadline}
                </p>
              )}
            </div>

            {/* Campo Status */}
            <div>
              <label
                htmlFor="objective-status"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Status Atual
              </label>
              <select
                id="objective-status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as ObjectiveStatus,
                  })
                }
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-slate-700"
              >
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botões do Rodapé */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{editingObjective ? 'Salvar Alterações' : 'Cadastrar Objetivo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
