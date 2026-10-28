import React from 'react';
import { Lightbulb, Zap, ShieldCheck, HeartHandshake, X } from 'lucide-react';

interface AntiProcrastinationTipsProps {
  onClose: () => void;
}

export const AntiProcrastinationTips: React.FC<AntiProcrastinationTipsProps> = ({
  onClose,
}) => {
  const tips = [
    {
      icon: Zap,
      title: 'A Regra dos 2 Minutos',
      description:
        'Não pense na tarefa inteira. Prometa a si mesmo fazer apenas os primeiros 2 minutos (ex.: abrir o PDF e ler 1 página). O mais difícil é romper a inércia.',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: ShieldCheck,
      title: 'Técnica do Queijo Suíço',
      description:
        'Um trabalho denso assusta. "Faça furos" nele executando micro-partes aleatórias de 5 minutos, como formatar a capa ou criar as pastas.',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: HeartHandshake,
      title: 'Autocompaixão sem Culpa',
      description:
        'Sentir culpa por ter procrastinado ontem só aumenta a ansiedade e faz adiar hoje de novo. Reconheça, perdoe-se e concentre-se no bloco atual.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white rounded-3xl border border-amber-200 p-5 sm:p-6 mb-6 shadow-xs relative">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Pílulas Anti-Procrastinação para Estudantes
            </h3>
            <p className="text-xs text-slate-500">
              Estratégias comportamentais comprovadas para sair da intenção e ir para a ação
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
          aria-label="Ocultar dicas"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {tips.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div
              key={idx}
              className="bg-white/90 p-3.5 sm:p-4 rounded-2xl border border-amber-100 shadow-2xs hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${tip.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  {tip.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
