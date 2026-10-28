export type ObjectiveStatus = 'nao_iniciado' | 'em_andamento' | 'concluido' | 'pausado';

export interface Objective {
  id: string;
  title: string;
  description: string;
  deadline: string; // formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm
  status: ObjectiveStatus;
  createdAt: string;
  updatedAt: string;
}

export type ObjectiveFormData = {
  title: string;
  description: string;
  deadline: string;
  status: ObjectiveStatus;
};

export interface ObjectiveFilterOptions {
  search: string;
  status: 'todos' | ObjectiveStatus;
  sortBy: 'deadline_asc' | 'deadline_desc' | 'created_desc' | 'title_asc';
}

export const STATUS_CONFIG: Record<
  ObjectiveStatus,
  {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    dotClass: string;
    description: string;
  }
> = {
  nao_iniciado: {
    label: 'Não iniciado',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-800',
    borderClass: 'border-amber-200',
    dotClass: 'bg-amber-500',
    description: 'Ainda aguardando o primeiro passo.',
  },
  em_andamento: {
    label: 'Em andamento',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-800',
    borderClass: 'border-blue-200',
    dotClass: 'bg-blue-500',
    description: 'Em progresso ativo neste momento.',
  },
  concluido: {
    label: 'Concluído',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-800',
    borderClass: 'border-emerald-200',
    dotClass: 'bg-emerald-500',
    description: 'Objetivo finalizado com sucesso!',
  },
  pausado: {
    label: 'Pausado',
    bgClass: 'bg-slate-100',
    textClass: 'text-slate-700',
    borderClass: 'border-slate-300',
    dotClass: 'bg-slate-400',
    description: 'Temporariamente em espera.',
  },
};
