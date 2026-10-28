import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { ObjectiveCard } from './components/ObjectiveCard';
import { ObjectiveModal } from './components/ObjectiveModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { AntiProcrastinationTips } from './components/AntiProcrastinationTips';
import { storageService } from './services/storageService';
import {
  Objective,
  ObjectiveFormData,
  ObjectiveFilterOptions,
  ObjectiveStatus,
} from './types/objective';
import { Check, Info } from 'lucide-react';

export default function App() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filtros e busca
  const [filters, setFilters] = useState<ObjectiveFilterOptions>({
    search: '',
    status: 'todos',
    sortBy: 'deadline_asc',
  });

  // Modais de Criação/Edição e Exclusão
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingObjective, setEditingObjective] = useState<Objective | null>(null);
  const [objectiveToDelete, setObjectiveToDelete] = useState<Objective | null>(null);

  // Painel de dicas comportamentais
  const [showTips, setShowTips] = useState<boolean>(false);

  // Feedback visual (Toast)
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'info';
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Carrega dados do localStorage ao montar o componente
  useEffect(() => {
    const loaded = storageService.getObjectives();
    setObjectives(loaded);
    setIsLoading(false);
  }, []);

  // Manipulador de salvar (criação ou edição)
  const handleSaveObjective = (formData: ObjectiveFormData) => {
    if (editingObjective) {
      const updated = storageService.updateObjective(editingObjective.id, formData);
      if (updated) {
        setObjectives((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        showToast('Objetivo atualizado com sucesso!');
      }
    } else {
      const created = storageService.createObjective(formData);
      setObjectives((prev) => [created, ...prev]);
      showToast('Novo objetivo cadastrado! Dê o primeiro micro-passo hoje.');
    }
    setEditingObjective(null);
  };

  // Manipulador de alteração rápida de status pelo card
  const handleQuickStatusChange = (id: string, newStatus: ObjectiveStatus) => {
    const updated = storageService.updateObjective(id, { status: newStatus });
    if (updated) {
      setObjectives((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      if (newStatus === 'concluido') {
        showToast('Parabéns! Mais um objetivo concluído com sucesso!');
      } else {
        showToast('Status do objetivo atualizado.');
      }
    }
  };

  // Confirmação de exclusão
  const handleConfirmDelete = () => {
    if (!objectiveToDelete) return;
    const success = storageService.deleteObjective(objectiveToDelete.id);
    if (success) {
      setObjectives((prev) =>
        prev.filter((item) => item.id !== objectiveToDelete.id)
      );
      showToast('Objetivo excluído com segurança.', 'info');
    }
    setObjectiveToDelete(null);
  };

  // Carregar exemplos de estudo quando a lista estiver vazia
  const handleLoadExamples = () => {
    storageService.clearAll();
    const demo = storageService.getObjectives();
    setObjectives(demo);
    showToast('Exemplos de estudo carregados com sucesso!');
  };

  // Cálculo de contadores para as abas de filtro
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      todos: objectives.length,
      nao_iniciado: 0,
      em_andamento: 0,
      concluido: 0,
      pausado: 0,
    };
    objectives.forEach((o) => {
      if (counts[o.status] !== undefined) {
        counts[o.status] += 1;
      }
    });
    return counts;
  }, [objectives]);

  // Lista filtrada e ordenada
  const filteredObjectives = useMemo(() => {
    return objectives
      .filter((item) => {
        // Filtro de status
        if (filters.status !== 'todos' && item.status !== filters.status) {
          return false;
        }

        // Filtro de busca textual
        if (filters.search.trim()) {
          const query = filters.search.toLowerCase().trim();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description?.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'deadline_asc') {
          return (a.deadline || '').localeCompare(b.deadline || '');
        }
        if (filters.sortBy === 'deadline_desc') {
          return (b.deadline || '').localeCompare(a.deadline || '');
        }
        if (filters.sortBy === 'created_desc') {
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        }
        if (filters.sortBy === 'title_asc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [objectives, filters]);

  const hasFilterActive =
    Boolean(filters.search.trim()) || filters.status !== 'todos';

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Cabeçalho */}
      <Header
        onOpenCreateModal={() => {
          setEditingObjective(null);
          setIsModalOpen(true);
        }}
        onToggleTips={() => setShowTips((prev) => !prev)}
        showTips={showTips}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Painel de Dicas Comportamentais (Alternável) */}
        {showTips && (
          <AntiProcrastinationTips onClose={() => setShowTips(false)} />
        )}

        {/* Resumo de Indicadores / Estatísticas */}
        <StatsOverview objectives={objectives} />

        {/* Barra de Filtros, Pesquisa e Ordenação */}
        {objectives.length > 0 && (
          <FilterBar
            filters={filters}
            onFilterChange={(newFilters) =>
              setFilters((prev) => ({ ...prev, ...newFilters }))
            }
            statusCounts={statusCounts}
          />
        )}

        {/* Lista de Objetivos ou Estados Vazios */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-400">
            Carregando seus objetivos...
          </div>
        ) : objectives.length === 0 ? (
          <EmptyState
            isFiltered={false}
            onOpenCreate={() => {
              setEditingObjective(null);
              setIsModalOpen(true);
            }}
            onLoadExamples={handleLoadExamples}
          />
        ) : filteredObjectives.length === 0 ? (
          <EmptyState
            isFiltered={hasFilterActive}
            onOpenCreate={() => {
              setEditingObjective(null);
              setIsModalOpen(true);
            }}
            onClearFilters={() =>
              setFilters({ search: '', status: 'todos', sortBy: 'deadline_asc' })
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredObjectives.map((obj) => (
              <ObjectiveCard
                key={obj.id}
                objective={obj}
                onEdit={(item) => {
                  setEditingObjective(item);
                  setIsModalOpen(true);
                }}
                onDeleteRequest={(item) => setObjectiveToDelete(item)}
                onQuickStatusChange={handleQuickStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* Rodapé Acolhedor */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong className="text-slate-600">AntiProcrastina</strong> — Do plano à ação, no seu ritmo.
          </p>
          <p className="text-slate-400">
            Persistência local ativada: seus dados estão salvos com segurança neste navegador.
          </p>
        </div>
      </footer>

      {/* Modal de Criação / Edição */}
      <ObjectiveModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingObjective(null);
        }}
        onSave={handleSaveObjective}
        editingObjective={editingObjective}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={Boolean(objectiveToDelete)}
        objective={objectiveToDelete}
        onClose={() => setObjectiveToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notificação de Sucesso/Info */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-xl animate-in slide-in-from-bottom-5 duration-200 text-xs sm:text-sm font-medium">
          {toastMessage.type === 'success' ? (
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Info className="w-3.5 h-3.5" />
            </div>
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
