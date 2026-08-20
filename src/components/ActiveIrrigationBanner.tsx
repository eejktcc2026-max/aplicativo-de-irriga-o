import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Play, Pause, Square, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ActiveIrrigationBanner: React.FC = () => {
  const { 
    activeIrrigation, 
    pauseResumeIrrigation, 
    stopIrrigation, 
    speakText 
  } = useApp();

  if (!activeIrrigation.active) return null;

  const minutes = Math.floor(activeIrrigation.remainingSeconds / 60);
  const seconds = activeIrrigation.remainingSeconds % 60;
  const progressPercent = 
    ((activeIrrigation.totalSeconds - activeIrrigation.remainingSeconds) / activeIrrigation.totalSeconds) * 100;

  const elapsedSeconds = activeIrrigation.totalSeconds - activeIrrigation.remainingSeconds;
  const currentLiters = Math.round((elapsedSeconds / 60) * activeIrrigation.litersPerMinute);

  const handleSpeakStatus = () => {
    speakText(
      `Irrigação em andamento para ${activeIrrigation.targetName}. Faltam ${minutes} minutos e ${seconds} segundos. Já foram aplicados aproximadamente ${currentLiters} litros de água.`
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="sticky top-16 z-30 mb-6 bg-gradient-to-r from-sky-900/95 via-blue-900/95 to-indigo-900/95 border-2 border-sky-400/60 rounded-2xl p-4 shadow-xl shadow-sky-950/60 text-white backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 animate-pulse shrink-0">
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-400 text-zinc-950 uppercase tracking-wider">
                  Irrigando Agora
                </span>
                <span className="text-xs text-sky-200">{activeIrrigation.scaleName}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {activeIrrigation.targetName}
              </h3>
            </div>
          </div>

          {/* Center: Live Timer & Liters */}
          <div className="flex items-center gap-4 bg-zinc-950/40 px-4 py-2 rounded-xl border border-sky-500/30">
            <div className="text-center">
              <span className="text-[10px] text-sky-300 uppercase font-semibold block">Tempo Restante</span>
              <span className="font-mono text-2xl font-black text-white tracking-wider">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
            <div className="h-8 w-px bg-sky-500/30" />
            <div className="text-center">
              <span className="text-[10px] text-sky-300 uppercase font-semibold block">Água Aplicada</span>
              <span className="text-xl font-black text-sky-300">
                ~{currentLiters} <span className="text-xs font-normal text-sky-200">Litros</span>
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="btn-irrigation-speak"
              onClick={handleSpeakStatus}
              title="Ouvir status da irrigação"
              className="p-2.5 rounded-xl bg-sky-950 border border-sky-500/40 hover:bg-sky-900 text-sky-300 transition-colors"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <button
              id="btn-irrigation-pause"
              onClick={pauseResumeIrrigation}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all"
            >
              {activeIrrigation.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span>{activeIrrigation.isPaused ? 'Retomar' : 'Pausar'}</span>
            </button>

            <button
              id="btn-irrigation-stop"
              onClick={stopIrrigation}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition-all"
            >
              <Square className="w-4 h-4" />
              <span>Finalizar</span>
            </button>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="w-full bg-sky-950/80 rounded-full h-2 mt-3 overflow-hidden border border-sky-500/30">
          <div 
            className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
