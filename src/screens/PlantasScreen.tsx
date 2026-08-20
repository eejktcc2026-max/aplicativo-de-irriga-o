import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, 
  Droplets, 
  Clock, 
  Volume2, 
  Play, 
  Check, 
  Sparkles, 
  Info, 
  Eye,
  Sliders,
  Calendar,
  AlertCircle,
  ArrowDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PlantInfo } from '../types';

export const PlantasScreen: React.FC = () => {
  const { 
    plants, 
    selectedPlant, 
    setSelectedPlant, 
    startCustomIrrigation, 
    speakText 
  } = useApp();

  const [selectedMinutes, setSelectedMinutes] = useState<number>(selectedPlant.defaultMinutes);

  const handleSelectPlant = (plant: PlantInfo) => {
    setSelectedPlant(plant);
    setSelectedMinutes(plant.defaultMinutes);
  };

  const handleSpeakPlant = (plant: PlantInfo) => {
    speakText(
      `Cultura: ${plant.name}. Escala recomendada: ${plant.recommendedScale}. Necessidade de água: ${plant.waterNeed}. Frequência: ${plant.idealFrequency}. Tempo padrão: ${plant.defaultMinutes} minutos. Melhor horário: ${plant.bestTime}. ${plant.description}`
    );
  };

  const estimatedLiters = Math.round(selectedMinutes * selectedPlant.litersPerMinute);
  const estimatedBuckets = Math.round(estimatedLiters / 15); // ~15L bucket

  const handleStartPlantIrrigation = () => {
    startCustomIrrigation(
      selectedPlant.name,
      `Escala ${selectedPlant.recommendedScale}`,
      selectedMinutes,
      selectedPlant.litersPerMinute,
      undefined,
      selectedPlant.id
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-zinc-900 to-zinc-900 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-zinc-950 shadow-md">
                🌽 GUIA DE PLANTAS & MINUTOS
              </span>
              <span className="text-xs text-zinc-300 font-semibold">Passo a Passo Visual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Irrigação por Tipo de Planta</span>
              <span className="text-emerald-400">🌽 🌾 🍌 🫘</span>
            </h1>
            <p className="text-sm text-zinc-200 mt-1 max-w-2xl font-medium">
              Siga os <strong>3 Passos abaixo</strong>: escolha a planta, selecione quantos minutos quer de água e aperte o botão verde.
            </p>
          </div>

          <button
            id="btn-plantas-speak-intro"
            onClick={() => speakText('Tela de Irrigação de Plantas. Siga os três passos: Passo 1: Toque na planta desejada, como Milho, Sorgo, Banana ou Feijão. Passo 2: Escolha quantos minutos quer regar. Passo 3: Toque no botão verde grande para ligar a água.')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm shadow-xl shadow-emerald-700/40 transition-all self-start md:self-auto active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-zinc-950" />
            <span>🔊 OUVIR INSTRUÇÕES</span>
          </button>
        </div>
      </div>

      {/* STEP 1: Plant Selector Grid: Milho, Sorgo, Banana, Feijão */}
      <div className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-emerald-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
              1
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>PASSO 1: Toque na Planta que deseja irrigar</span>
              </h2>
              <span className="text-xs text-zinc-400">Escolha entre as 4 culturas do seu sítio</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {plants.map((plant) => {
            const isSelected = selectedPlant.id === plant.id;
            return (
              <motion.div
                key={plant.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectPlant(plant)}
                className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between shadow-xl relative ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-400 ring-4 ring-emerald-400/40 text-white'
                    : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-5xl p-2 rounded-2xl bg-zinc-900 border border-zinc-800 block shadow-inner">
                      {plant.imageTheme}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakPlant(plant);
                      }}
                      title="Ouvir sobre esta planta"
                      className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-emerald-400 border border-zinc-800"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isSelected && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-zinc-950 mb-2 inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> SELECIONADA
                    </span>
                  )}

                  <h3 className="font-black text-lg sm:text-xl text-white mt-1">{plant.name}</h3>
                  <span className="text-xs text-zinc-400 italic block">{plant.scientificName}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Escala:</span>
                    <span className="font-bold text-sky-400">{plant.recommendedScale}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Tempo sugerido:</span>
                    <span className="font-black text-emerald-400">{plant.defaultMinutes} min</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* STEP 2 & 3: Detailed View, Minute Selector and Giant Action Button */}
      {selectedPlant && (
        <div className="bg-gradient-to-b from-zinc-900 to-emerald-950/40 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Active Selection Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <span className="text-6xl p-3 bg-zinc-950 rounded-3xl border-2 border-emerald-500/40 shadow-inner">
                {selectedPlant.imageTheme}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-zinc-950 uppercase tracking-wider">
                    PLANTA ESCOLHIDA
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${selectedPlant.badgeBg}`}>
                    💧 Escala {selectedPlant.recommendedScale}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {selectedPlant.name}
                </h2>
                <span className="text-xs text-zinc-300 font-semibold">{selectedPlant.waterNeed} de água por dia</span>
              </div>
            </div>

            <button
              type="button"
              id="btn-speak-selected-plant"
              onClick={() => handleSpeakPlant(selectedPlant)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold text-xs sm:text-sm transition-all self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Ouvir Dicas do(a) {selectedPlant.name}</span>
            </button>
          </div>

          {/* STEP 2: MINUTE SELECTOR WITH VISUAL WATER BUCKETS */}
          <div className="bg-zinc-950/90 p-5 sm:p-6 rounded-3xl border-2 border-emerald-500/40 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-2xl bg-sky-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
                  2
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    PASSO 2: Escolha Quantos Minutos de Água
                  </h3>
                  <span className="text-xs text-zinc-400">Toque no número de minutos desejado</span>
                </div>
              </div>
            </div>

            {/* Big Minute Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[15, 20, 30, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setSelectedMinutes(mins)}
                  className={`py-4 px-3 rounded-2xl font-black text-center transition-all flex flex-col items-center justify-center border-2 ${
                    selectedMinutes === mins
                      ? 'bg-sky-500 text-zinc-950 border-white shadow-xl shadow-sky-500/40 scale-105 ring-4 ring-sky-400/40'
                      : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  <Clock className={`w-5 h-5 mb-1 ${selectedMinutes === mins ? 'text-zinc-950' : 'text-sky-400'}`} />
                  <span className="text-xl sm:text-2xl leading-none">{mins}</span>
                  <span className="text-[11px] uppercase tracking-tight mt-0.5">Minutos</span>
                </button>
              ))}
            </div>

            {/* Slider for fine adjustment */}
            <div className="space-y-1 pt-3 border-t border-zinc-800/80">
              <div className="flex justify-between text-xs font-bold text-zinc-300">
                <span>10 min (Rápido)</span>
                <span className="text-sky-300 font-black text-sm">⏱️ {selectedMinutes} Minutos Escolhidos</span>
                <span>120 min (Longo)</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(Number(e.target.value))}
                className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Visual Bucket & Water Indicator */}
            <div className="bg-sky-950/40 border border-sky-500/40 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-sky-500/20 border border-sky-500/30">
                  🪣
                </span>
                <div>
                  <span className="text-[11px] text-sky-300 font-bold uppercase block">Volume Estimado de Água</span>
                  <span className="text-xl font-black text-white">
                    ~{estimatedLiters} Litros <span className="text-xs font-normal text-zinc-300">de água</span>
                  </span>
                </div>
              </div>

              <div className="text-xs text-sky-200 bg-sky-900/50 px-3 py-2 rounded-xl border border-sky-500/30 self-start sm:self-auto font-semibold">
                Equivalente a cerca de <strong>{estimatedBuckets} baldes</strong> cheios de água
              </div>
            </div>
          </div>

          {/* Plant Agronomic Specs (High Contrast & Visual) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Frequência da Rega</span>
              <strong className="text-base text-white block mt-0.5">{selectedPlant.idealFrequency}</strong>
              <span className="text-[11px] text-emerald-400 font-semibold">Para não apodrecer a raiz</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Melhor Horário</span>
              <strong className="text-base text-white block mt-0.5">{selectedPlant.bestTime}</strong>
              <span className="text-[11px] text-amber-400 font-semibold">Evita o sol forte do meio-dia</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Gesto em LIBRAS</span>
              <strong className="text-xs text-indigo-300 block mt-0.5">{selectedPlant.librasDica}</strong>
            </div>
          </div>

          {/* STEP 3: GIANT ACTION BUTTON */}
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-2xl bg-emerald-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
                3
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                PASSO 3: Aperte o Botão Verde para Começar a Irrigação
              </h3>
            </div>

            <button
              id="btn-start-plant-irrigation"
              onClick={handleStartPlantIrrigation}
              className="w-full py-5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-zinc-950 font-black text-lg sm:text-xl rounded-3xl shadow-2xl shadow-emerald-600/50 flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-2 border-white/40"
            >
              <Play className="w-7 h-7 fill-current" />
              <span>👉 LIGAR ÁGUA DO(A) {selectedPlant.name.toUpperCase()} ({selectedMinutes} MINUTOS)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
