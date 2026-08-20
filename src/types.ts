export type ScreenType = 
  | 'dashboard' 
  | 'escala' 
  | 'solo_seco' 
  | 'consumo' 
  | 'dicas' 
  | 'plantas' 
  | 'perfil';

export type PlantType = 'milho' | 'sorgo' | 'banana' | 'feijao';

export interface PlantInfo {
  id: PlantType;
  name: string;
  scientificName: string;
  recommendedScale: 'Baixa' | 'Média' | 'Alta';
  waterNeed: string; // ex: "5 a 7 mm/dia"
  idealFrequency: string; // ex: "A cada 2 dias"
  defaultMinutes: number;
  minMinutes: number;
  maxMinutes: number;
  litersPerMinute: number;
  bestTime: string;
  description: string;
  librasDica: string;
  imageTheme: string;
  accentColor: string;
  badgeBg: string;
}

export interface IrrigationScale {
  id: 'baixa' | 'media' | 'alta';
  title: string;
  targetAudience: string;
  recommendedCrops: string[];
  defaultMinutes: number;
  flowRate: string; // ex: "1.5 a 2.0 L/m²"
  pressure: string;
  frequency: string;
  description: string;
  visualCue: string;
  color: string;
  bgGradient: string;
}

export interface SoilSector {
  id: string;
  name: string;
  crop: string;
  moisturePercent: number; // 0 to 100
  status: 'seco' | 'alerta' | 'ideal' | 'encharcado';
  lastIrrigated: string;
  recommendedMinutes: number;
}

export interface SustainableTip {
  id: string;
  pillar: 'reduza' | 'reutilize' | 'recicle';
  title: string;
  subtitle: string;
  description: string;
  steps: string[];
  farmerBenefit: string;
  librasConcept: string;
  implemented: boolean;
}

export interface WaterLog {
  id: string;
  date: string;
  plantOrSector: string;
  scaleUsed: string;
  durationMinutes: number;
  litersUsed: number;
  litersSaved: number;
}

export interface FarmerUser {
  id: string;
  name: string;
  email: string;
  farmName: string;
  location: string;
  mainCrops: string[];
  areaHectares: string;
  isLoggedIn: boolean;
  accessibleMode: boolean; // Modo visual ampliado / LIBRAS visual
  speechEnabled: boolean;  // Fala automática ativa
}

export interface ActiveIrrigation {
  active: boolean;
  targetName: string;
  scaleName: string;
  totalSeconds: number;
  remainingSeconds: number;
  litersPerMinute: number;
  isPaused: boolean;
  sectorId?: string;
  plantId?: PlantType;
}
