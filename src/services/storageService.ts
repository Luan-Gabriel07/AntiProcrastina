import { Objective, ObjectiveFormData } from '../types/objective';

const STORAGE_KEY = 'antiprocrastina_objetivos_v1';

// Dados iniciais acolhedores para inspirar o estudante na primeira visita
const INITIAL_DEMO_OBJECTIVES: Objective[] = [
  {
    id: 'demo-1',
    title: 'Revisar resumos para a prova de Biologia',
    description: 'Focar nos capítulos 4 e 5 (Citologia e Divisão Celular). Fazer 15 exercícios de fixação sem consultar as respostas antes.',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Escrever introdução do trabalho de História',
    description: 'Definir o tema central sobre a Revolução Industrial e redigir os três primeiros parágrafos do esboço.',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'nao_iniciado',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Cronograma semanal de estudos da faculdade',
    description: 'Distribuir 2 horas diárias entre as matérias prioritárias e reservar os domingos para descanso consciente.',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'concluido',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const storageService = {
  /**
   * Obtém todos os objetivos salvos no localStorage.
   * Se for o primeiro acesso, inicializa com exemplos acolhedores.
   */
  getObjectives(): Objective[] {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (!rawData) {
        // Inicializa com exemplos realistas para não deixar o usuário perdido
        this.saveObjectives(INITIAL_DEMO_OBJECTIVES);
        return INITIAL_DEMO_OBJECTIVES;
      }
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista completa de objetivos no localStorage.
   */
  saveObjectives(objectives: Objective[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  /**
   * Cadastra um novo objetivo com ID único e carimbos de data/hora.
   */
  createObjective(data: ObjectiveFormData): Objective {
    const objectives = this.getObjectives();
    const newObjective: Objective = {
      id: `obj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title: data.title.trim(),
      description: data.description.trim(),
      deadline: data.deadline,
      status: data.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedList = [newObjective, ...objectives];
    this.saveObjectives(updatedList);
    return newObjective;
  },

  /**
   * Atualiza os campos de um objetivo existente.
   */
  updateObjective(id: string, updates: Partial<ObjectiveFormData>): Objective | null {
    const objectives = this.getObjectives();
    const index = objectives.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const updatedObjective: Objective = {
      ...objectives[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    objectives[index] = updatedObjective;
    this.saveObjectives(objectives);
    return updatedObjective;
  },

  /**
   * Remove um objetivo pelo ID.
   */
  deleteObjective(id: string): boolean {
    const objectives = this.getObjectives();
    const filtered = objectives.filter((item) => item.id !== id);

    if (filtered.length !== objectives.length) {
      this.saveObjectives(filtered);
      return true;
    }
    return false;
  },

  /**
   * Limpa todos os dados (útil para testes ou reinicialização).
   */
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
