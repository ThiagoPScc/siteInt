export type GuideCategory = 'rapido' | 'manual';

export interface GuideStep {
  title: string;
  text: string;
  tip?: string;
  interactiveType?: string;
}

export interface Guide {
  id: string;
  title: string;
  subtitle: string;
  category: GuideCategory;
  description: string;
  iconName: string; // Used to match Lucide Icons
  difficulty: 'Fácil' | 'Médio' | 'Avançado';
  timeToRead: string;
  steps: GuideStep[];
}
