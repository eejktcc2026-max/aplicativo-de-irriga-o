import React from 'react';
import { 
  Sprout, 
  Menu, 
  Volume2, 
  VolumeX, 
  Eye, 
  LogOut, 
  Droplets,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenAccessibility: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar, 
  onOpenAccessibility 
}) => {
  const { 
    user, 
    logoutUser, 
    isSpeaking, 
    speakText, 
    stopSpeaking, 
    currentScreen,
    activeIrrigation
  } = useApp();

  const getScreenVoiceDescription = () => {
    switch (currentScreen) {
      case 'dashboard':
        return `Você está no Menu Principal do Gotas Inteligentes, aplicativo exclusivo da Comunidade Carne Gorda, Rio Grande do Norte. Olá, ${user.name}. Escolha entre Escala de Irrigação, Solo Seco, Irrigação de Plantas, Dicas Sustentáveis e Consumo de Água.`;
      case 'escala':
        return `Tela de Escala de Irrigação do Gotas Inteligentes. Escolha entre Pouca Água para hortas, Água Média para feijão e Muita Água para milho e bananeiras.`;
      case 'solo_seco':
        return `Tela de Solo Seco. Monitore a umidade da terra na comunidade Carne Gorda e aperte o botão verde para molhar a terra.`;
      case 'consumo':
        return `Tela de Consumo de Água. Acompanhe os litros de água utilizados e o total economizado na sua cisterna.`;
      case 'dicas':
        return `Tela de Dicas Sustentáveis. Conheça as três práticas: Reduza o consumo consciente, Reutilize recipientes no campo, e Recicle separando embalagens.`;
      case 'plantas':
        return `Tela de Irrigação de Plantas. Selecione entre Milho, Sorgo, Banana e Feijão para calibrar os minutos de água ideais.`;
      default:
        return `Aplicativo Gotas Inteligentes exclusivo para a comunidade Carne Gorda, Rio Grande do Norte.`;
    }
  };

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(getScreenVoiceDescription());
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger & Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          id="btn-sidebar-toggle"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Abrir menu lateral"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-zinc-950 font-black shadow-md shadow-sky-600/30">
            <Droplets className="w-4 h-4 fill-current" />
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-sm tracking-tight text-white block leading-none">
              Gotas <span className="text-sky-400">Inteligentes</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">
              Carne Gorda/RN
            </span>
          </div>
        </div>
      </div>

      {/* Center: Irrigating Badge (if active) */}
      {activeIrrigation.active && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-sky-500/20 border border-sky-400/50 rounded-full text-xs text-sky-300 animate-pulse">
          <Droplets className="w-3.5 h-3.5 text-sky-400" />
          <span>Irrigando: <strong>{activeIrrigation.targetName}</strong></span>
        </div>
      )}

      {/* Right: Accessibility Controls & Logout */}
      <div className="flex items-center gap-2">
        {/* Alto-falante / Leitor de Voz */}
        <button
          type="button"
          id="btn-header-speaker"
          onClick={handleSpeechToggle}
          title={isSpeaking ? 'Parar leitura de voz' : 'Ouvir instruções da tela atual (Alto-falante)'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            isSpeaking
              ? 'bg-emerald-500 text-zinc-950 border-emerald-400 animate-bounce'
              : 'bg-zinc-800 text-emerald-400 border-zinc-700 hover:bg-emerald-950/40 hover:border-emerald-500/40'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{isSpeaking ? 'Parar Som' : 'Alto-falante'}</span>
        </button>

        {/* Guia Visual / Sinais LIBRAS para Surdos */}
        <button
          type="button"
          id="btn-header-accessibility"
          onClick={onOpenAccessibility}
          title="Abrir Guia Visual & LIBRAS para pessoas surdas"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-indigo-950/40 text-indigo-300 border border-zinc-700 hover:border-indigo-500/40 transition-all"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Guia Visual / LIBRAS</span>
        </button>

        {/* Botão Sair */}
        <button
          type="button"
          id="btn-header-logout"
          onClick={logoutUser}
          title="Sair do aplicativo"
          className="p-2 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
