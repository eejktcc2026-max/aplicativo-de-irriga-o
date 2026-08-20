import React from 'react';
import { 
  Home, 
  Sliders, 
  Droplets, 
  SunMedium, 
  Leaf, 
  Sprout, 
  LogOut, 
  X, 
  Eye, 
  Volume2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentScreen, setCurrentScreen, user, logoutUser, criticalSectorsCount, speakText } = useApp();

  const menuItems: {
    id: ScreenType;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    color: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Menu Principal',
      description: 'Painel geral do sítio',
      icon: Home,
      color: 'text-emerald-400'
    },
    {
      id: 'escala',
      label: 'Escala de Irrigação',
      description: 'Baixa, Média e Alta',
      icon: Sliders,
      color: 'text-sky-400'
    },
    {
      id: 'solo_seco',
      label: 'Solo Seco',
      description: 'Ativar irrigação imediata',
      icon: SunMedium,
      badge: criticalSectorsCount > 0 ? `${criticalSectorsCount} Seco` : undefined,
      color: 'text-amber-400'
    },
    {
      id: 'consumo',
      label: 'Consumo de Água',
      description: 'Métricas e economia',
      icon: Droplets,
      color: 'text-blue-400'
    },
    {
      id: 'dicas',
      label: 'Dicas Sustentáveis',
      description: 'Reduza, Reutilize, Recicle',
      icon: Leaf,
      color: 'text-lime-400'
    },
    {
      id: 'plantas',
      label: 'Irrigação de Plantas',
      description: 'Milho, Sorgo, Banana, Feijão',
      icon: Sprout,
      color: 'text-emerald-400'
    }
  ];

  const handleNavigate = (id: ScreenType) => {
    setCurrentScreen(id);
    setMobileOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5">
      {/* Brand & Farm Info */}
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-sky-700/30">
              <Droplets className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight text-white leading-tight">
                Gotas <span className="text-sky-400">Inteligentes</span>
              </h1>
              <p className="text-[11px] text-emerald-400 font-bold truncate max-w-[130px]">
                Carne Gorda/RN
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-5 space-y-1.5">
          <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider px-3 mb-2 block">
            Menu de Navegação
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left group ${
                  isActive
                    ? 'bg-emerald-600/20 text-white border border-emerald-500/40 shadow-md font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-950/60 text-zinc-400 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm block leading-tight text-zinc-100">{item.label}</span>
                    <span className="text-[11px] text-zinc-300 leading-tight block">{item.description}</span>
                  </div>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer: User profile & Logout */}
      <div className="pt-4 border-t border-zinc-800/80 space-y-2">
        {/* User Card */}
        <div className="bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800/80 flex items-center justify-between">
          <div className="truncate">
            <span className="text-xs font-bold text-white block truncate">{user.name}</span>
            <span className="text-[10px] text-zinc-400 block truncate">{user.email}</span>
          </div>
          <button
            onClick={() => speakText(`Agricultor logado: ${user.name}. Propriedade: ${user.farmName}.`)}
            title="Ouvir dados do produtor"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Botão de Sair */}
        <button
          id="btn-sidebar-logout"
          onClick={logoutUser}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-950/80 hover:bg-rose-950/50 text-zinc-400 hover:text-rose-300 border border-zinc-800 hover:border-rose-500/40 rounded-xl text-xs font-bold transition-colors"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Sair da Conta (Logout)</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 bg-zinc-900/95 border-r border-zinc-800 z-20">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 bg-zinc-900 h-full border-r border-zinc-800 shadow-2xl z-10">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
