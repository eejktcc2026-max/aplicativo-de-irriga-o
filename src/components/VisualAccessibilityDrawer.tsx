import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, Sparkles, Volume2, Info, Check, Shield } from 'lucide-react';
import { LIBRAS_VISUAL_CARDS } from '../data/agriData';
import { useApp } from '../context/AppContext';

interface VisualAccessibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisualAccessibilityDrawer: React.FC<VisualAccessibilityDrawerProps> = ({ isOpen, onClose }) => {
  const { user, toggleAccessibleMode, speakText } = useApp();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-zinc-900 border-l border-zinc-800 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl z-10 text-zinc-100"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Acessibilidade Visual & LIBRAS</h2>
                  <p className="text-xs text-zinc-400">Recursos visuais pensados para produtores surdos</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toggle Accessible Visual Mode */}
            <div className="mt-6 bg-indigo-950/40 border border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  Modo de Alta Legibilidade Visual
                </span>
                <p className="text-xs text-zinc-300 mt-0.5">
                  Aumenta ícones, cores de contraste e destaca sinais visuais nas telas.
                </p>
              </div>

              <button
                onClick={toggleAccessibleMode}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  user.accessibleMode
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {user.accessibleMode ? 'Ativado' : 'Ativar'}
              </button>
            </div>

            {/* Visual Dictionary of Farming Concepts */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Guia Visual de Sinais & Termos do Campo</span>
                </h3>
              </div>

              <div className="space-y-3">
                {LIBRAS_VISUAL_CARDS.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-zinc-950/70 border border-zinc-800 rounded-2xl flex items-start gap-3 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="text-3xl shrink-0 p-2 bg-zinc-900 rounded-xl border border-zinc-800">
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{card.term}</span>
                        <button
                          onClick={() => speakText(`${card.term}. Significado: ${card.meaning}. Sinal visual: ${card.signalDesc}`)}
                          title="Ouvir explicação"
                          className="p-1 rounded-lg text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-indigo-300 mt-0.5 font-medium">{card.meaning}</p>
                      <p className="text-[11px] text-zinc-400 mt-1 bg-zinc-900/60 p-1.5 rounded-lg border border-zinc-800/80">
                        <strong className="text-zinc-300">Gesto/Sinal:</strong> {card.signalDesc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility Tips */}
            <div className="mt-6 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <Shield className="w-4 h-4" />
                <span>Práticas Inclusivas no AgroFácil</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-4 mt-2">
                <li>Alertas com cores destacadas e piscantes para Solo Seco e Fim da Irrigação.</li>
                <li>Botão de Alto-falante em cada dica para audição por voz sintetizada.</li>
                <li>Ilustrações didáticas de cada planta e escala de irrigação.</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800 mt-6">
            <button
              onClick={onClose}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Fechar Guia Visual
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
