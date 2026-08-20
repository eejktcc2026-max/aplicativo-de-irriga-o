import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ScreenType, 
  PlantType, 
  PlantInfo, 
  IrrigationScale, 
  SoilSector, 
  SustainableTip, 
  WaterLog, 
  FarmerUser,
  ActiveIrrigation 
} from '../types';
import { 
  INITIAL_USER, 
  IRRIGATION_SCALES, 
  PLANTS_DATA, 
  INITIAL_SOIL_SECTORS, 
  SUSTAINABLE_TIPS, 
  INITIAL_WATER_LOGS,
  formatNameFromEmail
} from '../data/agriData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation & User
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  user: FarmerUser;
  loginUser: (email: string, pass: string) => boolean;
  registerUser: (userData: Partial<FarmerUser>, pass: string) => boolean;
  logoutUser: () => void;
  updateUser: (updates: Partial<FarmerUser>) => void;
  
  // Agricultural Data
  scales: IrrigationScale[];
  plants: PlantInfo[];
  soilSectors: SoilSector[];
  tips: SustainableTip[];
  waterLogs: WaterLog[];
  
  // Selected Plant state
  selectedPlant: PlantInfo;
  setSelectedPlant: (plant: PlantInfo) => void;
  
  // Actions
  toggleTipImplemented: (id: string) => void;
  irrigateSoilSector: (sectorId: string, minutes: number) => void;
  startCustomIrrigation: (targetName: string, scaleName: string, minutes: number, litersPerMin: number, sectorId?: string, plantId?: PlantType) => void;
  pauseResumeIrrigation: () => void;
  stopIrrigation: () => void;
  activeIrrigation: ActiveIrrigation;
  
  // Accessibility: Text to Speech & Visual Mode
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  toggleAccessibleMode: () => void;
  
  // Toasts & Celebrations
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  triggerCelebration: () => void;
  
  // Quick stats
  totalLitersToday: number;
  totalLitersSavedToday: number;
  criticalSectorsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'agri_user_v2',
  SCREEN: 'agri_screen_v2',
  SECTORS: 'agri_sectors_v2',
  TIPS: 'agri_tips_v2',
  WATER_LOGS: 'agri_water_logs_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User Authentication State
  const [user, setUser] = useState<FarmerUser>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_USER;
  });

  // Current Screen
  const [currentScreen, setCurrentScreenState] = useState<ScreenType>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCREEN);
    return (saved as ScreenType) || 'dashboard';
  });

  // Data States
  const [scales] = useState<IrrigationScale[]>(IRRIGATION_SCALES);
  const [plants] = useState<PlantInfo[]>(PLANTS_DATA);
  const [selectedPlant, setSelectedPlant] = useState<PlantInfo>(PLANTS_DATA[0]);

  const [soilSectors, setSoilSectors] = useState<SoilSector[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SECTORS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_SOIL_SECTORS;
  });

  const [tips, setTips] = useState<SustainableTip[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIPS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return SUSTAINABLE_TIPS;
  });

  const [waterLogs, setWaterLogs] = useState<WaterLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WATER_LOGS);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_WATER_LOGS;
  });

  // Active Irrigation Timer
  const [activeIrrigation, setActiveIrrigation] = useState<ActiveIrrigation>({
    active: false,
    targetName: '',
    scaleName: '',
    totalSeconds: 0,
    remainingSeconds: 0,
    litersPerMinute: 6.0,
    isPaused: false
  });

  // Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCREEN, currentScreen);
  }, [currentScreen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SECTORS, JSON.stringify(soilSectors));
  }, [soilSectors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(tips));
  }, [tips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WATER_LOGS, JSON.stringify(waterLogs));
  }, [waterLogs]);

  // Speech synthesis helper
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      showToast('Seu navegador não suporta leitura de voz.', 'warning');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      // Remove emojis from speech for cleaner pronunciation
      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (activeIrrigation.active && !activeIrrigation.isPaused && activeIrrigation.remainingSeconds > 0) {
      interval = setInterval(() => {
        setActiveIrrigation(prev => {
          if (prev.remainingSeconds <= 1) {
            // Finished irrigation!
            const usedMin = Math.max(1, Math.round(prev.totalSeconds / 60));
            const liters = Math.round(usedMin * prev.litersPerMinute);
            const saved = Math.round(liters * 0.35); // 35% saved through calibrated scale

            // Add log
            const newLog: WaterLog = {
              id: 'log-' + Date.now(),
              date: 'Agora mesmo',
              plantOrSector: prev.targetName,
              scaleUsed: prev.scaleName,
              durationMinutes: usedMin,
              litersUsed: liters,
              litersSaved: saved
            };
            setWaterLogs(w => [newLog, ...w]);

            // If it was a sector, increase moisture!
            if (prev.sectorId) {
              setSoilSectors(s => s.map(sec => {
                if (sec.id === prev.sectorId) {
                  return {
                    ...sec,
                    moisturePercent: Math.min(85, sec.moisturePercent + 45),
                    status: 'ideal',
                    lastIrrigated: 'Agora mesmo'
                  };
                }
                return sec;
              }));
            }

            triggerCelebration();
            showToast(`Irrigação de ${prev.targetName} concluída com sucesso! ${liters}L aplicados.`, 'success');
            speakText(`Irrigação concluída para ${prev.targetName}. Sistema finalizado com economia de água.`);

            return {
              ...prev,
              active: false,
              remainingSeconds: 0
            };
          }
          return {
            ...prev,
            remainingSeconds: prev.remainingSeconds - 1
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeIrrigation.active, activeIrrigation.isPaused, activeIrrigation.remainingSeconds, speakText]);

  const setCurrentScreen = (screen: ScreenType) => {
    setCurrentScreenState(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    stopSpeaking();
  };

  const loginUser = (email: string, _pass: string): boolean => {
    if (!email || !email.includes('@')) {
      showToast('Por favor, informe um endereço de Gmail válido.', 'error');
      return false;
    }
    const derivedName = formatNameFromEmail(email);
    setUser(prev => ({
      ...prev,
      name: derivedName,
      email: email.trim(),
      location: 'Comunidade Carne Gorda / RN',
      isLoggedIn: true
    }));
    showToast(`Bem-vindo de volta ao Gotas Inteligentes, ${derivedName}!`, 'success');
    speakText(`Bem-vindo ao Gotas Inteligentes da Comunidade Carne Gorda, Rio Grande do Norte. Olá, ${derivedName}. Aplicativo pronto para irrigação.`);
    return true;
  };

  const registerUser = (userData: Partial<FarmerUser>, _pass: string): boolean => {
    if (!userData.email || !userData.email.includes('@')) {
      showToast('Informe um Gmail válido para cadastro.', 'error');
      return false;
    }
    const finalName = userData.name?.trim() ? userData.name.trim() : formatNameFromEmail(userData.email);
    const newUser: FarmerUser = {
      ...INITIAL_USER,
      ...userData,
      name: finalName,
      email: userData.email.trim(),
      location: userData.location || 'Comunidade Carne Gorda / RN',
      isLoggedIn: true
    };
    setUser(newUser);
    showToast('Cadastro realizado no Gotas Inteligentes com sucesso!', 'success');
    speakText(`Cadastro realizado no Gotas Inteligentes com sucesso. Bem-vindo à comunidade Carne Gorda, ${newUser.name}.`);
    return true;
  };

  const logoutUser = () => {
    stopSpeaking();
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    showToast('Você saiu do sistema.', 'info');
  };

  const updateUser = (updates: Partial<FarmerUser>) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast('Perfil de agricultor atualizado.', 'info');
  };

  const toggleAccessibleMode = () => {
    const next = !user.accessibleMode;
    setUser(prev => ({ ...prev, accessibleMode: next }));
    showToast(
      next ? 'Modo Visual Acessível (LIBRAS/Ícones Ampliados) Ativado!' : 'Modo Visual Acessível Desativado.',
      'info'
    );
  };

  const toggleTipImplemented = (id: string) => {
    setTips(prev => prev.map(t => {
      if (t.id === id) {
        const next = !t.implemented;
        if (next) {
          triggerCelebration();
          showToast(`Excelente! Prática sustentável marcada como ativa no seu sítio.`, 'success');
          speakText(`Prática sustentável ${t.title} marcada como aplicada no sítio.`);
        }
        return { ...t, implemented: next };
      }
      return t;
    }));
  };

  const startCustomIrrigation = (
    targetName: string, 
    scaleName: string, 
    minutes: number, 
    litersPerMin: number,
    sectorId?: string,
    plantId?: PlantType
  ) => {
    const totalSecs = Math.max(10, minutes * 60);
    setActiveIrrigation({
      active: true,
      targetName,
      scaleName,
      totalSeconds: totalSecs,
      remainingSeconds: totalSecs,
      litersPerMinute: litersPerMin,
      isPaused: false,
      sectorId,
      plantId
    });

    showToast(`Irrigação de ${targetName} iniciada (${minutes} min - ${scaleName})`, 'success');
    speakText(`Irrigação iniciada para ${targetName}. Tempo programado: ${minutes} minutos.`);
  };

  const irrigateSoilSector = (sectorId: string, minutes: number) => {
    const sec = soilSectors.find(s => s.id === sectorId);
    if (!sec) return;
    startCustomIrrigation(sec.name, 'Escala Solo Seco', minutes, 7.5, sec.id);
  };

  const pauseResumeIrrigation = () => {
    setActiveIrrigation(prev => {
      const nextPause = !prev.isPaused;
      showToast(nextPause ? 'Irrigação pausada.' : 'Irrigação retomada.', 'info');
      speakText(nextPause ? 'Irrigação pausada.' : 'Irrigação retomada.');
      return { ...prev, isPaused: nextPause };
    });
  };

  const stopIrrigation = () => {
    if (activeIrrigation.active) {
      const elapsedSec = activeIrrigation.totalSeconds - activeIrrigation.remainingSeconds;
      const usedMin = Math.max(1, Math.round(elapsedSec / 60));
      const liters = Math.round(usedMin * activeIrrigation.litersPerMinute);
      
      if (usedMin > 0) {
        const newLog: WaterLog = {
          id: 'log-' + Date.now(),
          date: 'Agora mesmo (Interrompida)',
          plantOrSector: activeIrrigation.targetName,
          scaleUsed: activeIrrigation.scaleName,
          durationMinutes: usedMin,
          litersUsed: liters,
          litersSaved: Math.round(liters * 0.3)
        };
        setWaterLogs(w => [newLog, ...w]);
      }

      setActiveIrrigation({
        active: false,
        targetName: '',
        scaleName: '',
        totalSeconds: 0,
        remainingSeconds: 0,
        litersPerMinute: 6.0,
        isPaused: false
      });

      showToast('Irrigação interrompida e salva no histórico.', 'info');
      speakText('Irrigação interrompida pelo usuário.');
    }
  };

  // Quick Stats
  const totalLitersToday = waterLogs
    .filter(l => l.date.includes('Hoje') || l.date.includes('Agora'))
    .reduce((acc, l) => acc + l.litersUsed, 0);

  const totalLitersSavedToday = waterLogs
    .filter(l => l.date.includes('Hoje') || l.date.includes('Agora'))
    .reduce((acc, l) => acc + l.litersSaved, 0);

  const criticalSectorsCount = soilSectors.filter(s => s.status === 'seco').length;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        loginUser,
        registerUser,
        logoutUser,
        updateUser,
        scales,
        plants,
        soilSectors,
        tips,
        waterLogs,
        selectedPlant,
        setSelectedPlant,
        toggleTipImplemented,
        irrigateSoilSector,
        startCustomIrrigation,
        pauseResumeIrrigation,
        stopIrrigation,
        activeIrrigation,
        isSpeaking,
        speakText,
        stopSpeaking,
        toggleAccessibleMode,
        toasts,
        showToast,
        removeToast,
        triggerCelebration,
        totalLitersToday,
        totalLitersSavedToday,
        criticalSectorsCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
