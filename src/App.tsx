import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Sliders, 
  Droplets, 
  SunMedium, 
  Leaf, 
  Sprout, 
  LogOut 
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/Toast';
import { ActiveIrrigationBanner } from './components/ActiveIrrigationBanner';
import { VisualAccessibilityDrawer } from './components/VisualAccessibilityDrawer';

import { AuthScreen } from './screens/AuthScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { EscalaScreen } from './screens/EscalaScreen';
import { SoloSecoScreen } from './screens/SoloSecoScreen';
import { ConsumoScreen } from './screens/ConsumoScreen';
import { DicasScreen } from './screens/DicasScreen';
import { PlantasScreen } from './screens/PlantasScreen';
import { ScreenType } from './types';

const MainLayout: React.FC = () => {
  const { user, currentScreen, setCurrentScreen } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [accessibilityDrawerOpen, setAccessibilityDrawerOpen] = useState(false);

  // If not logged in, show the login / register screen
  if (!user.isLoggedIn) {
    return <AuthScreen />;
  }

  // Screen renderer
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'escala':
        return <EscalaScreen />;
      case 'solo_seco':
        return <SoloSecoScreen />;
      case 'consumo':
        return <ConsumoScreen />;
      case 'dicas':
        return <DicasScreen />;
      case 'plantas':
        return <PlantasScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const mobileNavItems: { id: ScreenType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'escala', label: 'Escalas', icon: Sliders },
    { id: 'solo_seco', label: 'Solo Seco', icon: SunMedium },
    { id: 'plantas', label: 'Plantas', icon: Sprout },
    { id: 'dicas', label: 'Dicas 3R', icon: Leaf },
    { id: 'consumo', label: 'Consumo', icon: Droplets },
  ];

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-white ${
      user.accessibleMode ? 'text-base' : ''
    }`}>
      {/* Sidebar Navigation for Desktop and Mobile Drawer */}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Sticky Header with Voice Speaker and Accessibility controls */}
        <Header
          onToggleSidebar={() => setMobileSidebarOpen(true)}
          onOpenAccessibility={() => setAccessibilityDrawerOpen(true)}
        />

        {/* Screen View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {/* Active Irrigation Banner (shows live countdown when water is running) */}
          <ActiveIrrigationBanner />

          {/* Animated Screen Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 px-2 py-1.5 flex items-center justify-around">
        {mobileNavItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
                isActive ? 'text-emerald-400 font-bold scale-105' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accessibility / LIBRAS Drawer */}
      <VisualAccessibilityDrawer 
        isOpen={accessibilityDrawerOpen} 
        onClose={() => setAccessibilityDrawerOpen(false)} 
      />

      {/* Accessible Toast Feedback System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
