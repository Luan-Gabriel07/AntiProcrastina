/**
 * Utilitários para formatação e cálculo amigável de datas em PT-BR
 */

export function formatDateBR(dateString: string): string {
  if (!dateString) return 'Sem prazo definido';
  try {
    const [year, month, day] = dateString.split('-');
    if (year && month && day) {
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export interface DeadlineStatus {
  isOverdue: boolean;
  isToday: boolean;
  isTomorrow: boolean;
  daysRemaining: number;
  label: string;
  badgeClass: string;
}

export function getDeadlineStatus(deadlineString: string, isCompleted: boolean): DeadlineStatus {
  if (!deadlineString) {
    return {
      isOverdue: false,
      isToday: false,
      isTomorrow: false,
      daysRemaining: 999,
      label: 'Sem prazo',
      badgeClass: 'text-slate-500 bg-slate-100',
    };
  }

  if (isCompleted) {
    return {
      isOverdue: false,
      isToday: false,
      isTomorrow: false,
      daysRemaining: 0,
      label: 'Concluído',
      badgeClass: 'text-emerald-700 bg-emerald-50',
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = deadlineString.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  targetDate.setHours(0, 0, 0, 0);

  const diffMs = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    return {
      isOverdue: true,
      isToday: false,
      isTomorrow: false,
      daysRemaining: diffDays,
      label: absDays === 1 ? 'Atrasado há 1 dia' : `Atrasado há ${absDays} dias`,
      badgeClass: 'text-rose-700 bg-rose-50 border border-rose-200',
    };
  }

  if (diffDays === 0) {
    return {
      isOverdue: false,
      isToday: true,
      isTomorrow: false,
      daysRemaining: 0,
      label: 'Vence hoje!',
      badgeClass: 'text-amber-800 bg-amber-100 border border-amber-300 font-semibold',
    };
  }

  if (diffDays === 1) {
    return {
      isOverdue: false,
      isToday: false,
      isTomorrow: true,
      daysRemaining: 1,
      label: 'Vence amanhã',
      badgeClass: 'text-amber-700 bg-amber-50 border border-amber-200',
    };
  }

  if (diffDays <= 3) {
    return {
      isOverdue: false,
      isToday: false,
      isTomorrow: false,
      daysRemaining: diffDays,
      label: `Em ${diffDays} dias`,
      badgeClass: 'text-blue-700 bg-blue-50 border border-blue-200',
    };
  }

  return {
    isOverdue: false,
    isToday: false,
    isTomorrow: false,
    daysRemaining: diffDays,
    label: `Em ${diffDays} dias`,
    badgeClass: 'text-slate-600 bg-slate-100 border border-slate-200',
  };
}
