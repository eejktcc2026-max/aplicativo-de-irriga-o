import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, 
  Droplets, 
  Volume2, 
  Play, 
  Check, 
  Sprout, 
  Clock, 
  Gauge, 
  Sparkles,
  Info,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IrrigationScale } from '../types';

export const EscalaScreen: React.FC = () => {
  const { scales, startCustomIrrigation, speakText } = useApp();
  const [selectedScaleId, setSelectedScaleId] = useState<'baixa' | 'media' | 'alta'>('media');
  const [customMinutes, setCustomMinutes] = useState(30);

  const currentScale = scales.find(s => s.id === selectedScaleId) || scales[1];

  const handleSelectScale = (scale: IrrigationScale) => {
    setSelectedScaleId(scale.id);
    setCustomMinutes(scale.defaultMinutes);
  };

  const handleSpeakScale = (scale: IrrigationScale) => {
    speakText(
      `${scale.title}. Indicado ${scale.targetAudience}. Vazão: ${scale.flowRate}. Tempo padrão: ${scale.defaultMinutes} minutos. ${scale.description}`
    );
  };

  const handleStartIrrigation = () => {
    const litersPerMin = selectedScaleId === 'baixa' ? 4 : selectedScaleId === 'media' ? 7 : 10;
    startCustomIrrigation(
      `Setor (${currentScale.title})`,
      currentScale.title,
      customMinutes,
      litersPerMin
    );
  };

  const getDropIcons = (id: string) => {
    if (id === 'baixa') return '💧';
    if (id === 'media') return '💧💧';
    return '💧💧💧';
  };

  const getWaterIntensityLabel = (id: string) => {
    if (id === 'baixa') return 'Pouca Água (Suave / Gotejo fino)';
    if (id === 'media') return 'Água Média (Moderada / Aspersão)';
    return 'Muita Água (Forte / Aspersão pesada)';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-950/90 via-zinc-900 to-zinc-900 border-2 border-sky-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-500 text-zinc-950 shadow-md">
                💧 CALIBRAÇÃO DE ÁGUA
              </span>
              <span className="text-xs text-zinc-300 font-semibold">3 Níveis Fáceis de Escolher</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Escalas de Irrigação</span>
              <span className="text-sky-400">💧💧💧</span>
            </h1>
            <p className="text-sm text-zinc-200 mt-1 max-w-2xl font-medium">
              Escolha a quantidade certa de água para o tamanho da sua terra: <strong>Baixa</strong> (hortas), <strong>Média</strong> (legumes) ou <strong>Alta</strong> (roça grande).
            </p>
          </div>

          <button
            id="btn-escala-speak-intro"
            onClick={() => speakText('Tela de Escalas de Irrigação. Temos três opções fáceis: Escala Baixa com uma gota para hortas pequenas, Escala Média com duas gotas para feijão e legumes, e Escala Alta com três gotas para milho e banana.')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-zinc-950 font-black text-sm shadow-xl shadow-sky-700/40 transition-all self-start md:self-auto active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-zinc-950" />
            <span>🔊 OUVIR GUIA DAS ESCALAS</span>
          </button>
        </div>
      </div>

      {/* Visual Step 1: 3 Big Scale Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-sky-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
              1
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                PASSO 1: Escolha o Nível de Água (Toque em um dos 3)
              </h2>
              <span className="text-xs text-zinc-400">Quanto mais gotas, mais água sai pelos canos</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {scales.map((scale) => {
            const isSelected = selectedScaleId === scale.id;
            return (
              <motion.div
                key={scale.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectScale(scale)}
                className={`cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col justify-between relative shadow-xl ${
                  isSelected 
                    ? 'bg-sky-950/90 border-sky-400 ring-4 ring-sky-400/40 text-white' 
                    : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div>
                  {/* Top Badge & Sound */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-2 rounded-2xl bg-zinc-950 border border-zinc-800 block shadow-inner">
                        {getDropIcons(scale.id)}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                        isSelected ? 'bg-sky-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {scale.id === 'baixa' ? '1 Gota (Leve)' : scale.id === 'media' ? '2 Gotas (Normal)' : '3 Gotas (Forte)'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakScale(scale);
                      }}
                      title="Ouvir detalhes da escala"
                      className="p-2 rounded-xl bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scale Name */}
                  <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>{scale.title}</span>
                    {isSelected && <Check className="w-6 h-6 text-sky-400 shrink-0" />}
                  </h3>
                  
                  <span className="text-xs font-bold text-sky-300 block mt-1">
                    👉 {scale.targetAudience}
                  </span>

                  <p className="text-xs text-zinc-200 mt-3 leading-relaxed font-medium">
                    {scale.description}
                  </p>

                  {/* Visual Cue Alert */}
                  <div className="mt-4 p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
                    <span className="font-bold text-amber-400 block mb-1">👀 Como reconhecer no campo:</span>
                    <span className="text-zinc-300 font-medium">{scale.visualCue}</span>
                  </div>

                  {/* Recommended Crops list */}
                  <div className="mt-4">
                    <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider block mb-2">
                      🌱 Culturas que gostam deste nível:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {scale.recommendedCrops.map((crop, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-xl bg-zinc-950 text-xs font-bold text-white border border-zinc-700">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Flow Rate */}
                <div className="mt-6 pt-4 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Vazão de Água</span>
                    <strong className="text-white text-sm">{scale.flowRate}</strong>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Tempo Padrão</span>
                    <strong className="text-sky-400 text-sm">{scale.defaultMinutes} Minutos</strong>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Execution Simulator Panel for the Selected Scale */}
      <div className="bg-gradient-to-b from-zinc-900 to-sky-950/40 border-2 border-sky-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-5xl p-2.5 rounded-2xl bg-zinc-950 border border-sky-500/30">
              {getDropIcons(currentScale.id)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-500 text-zinc-950">
                  ESCALA ATIVA
                </span>
                <span className="text-xs text-sky-300 font-bold">
                  {getWaterIntensityLabel(currentScale.id)}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {currentScale.title} ({currentScale.targetAudience})
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSpeakScale(currentScale)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-sky-950/60 text-sky-400 border border-sky-500/40 font-bold text-xs sm:text-sm transition-all self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>🔊 Ouvir Detalhes</span>
          </button>
        </div>

        {/* STEP 2: Time in Minutes */}
        <div className="bg-zinc-950 p-5 rounded-3xl border-2 border-sky-500/40 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-sky-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
              2
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                PASSO 2: Ajuste a Duração da Rega
              </h3>
              <span className="text-xs text-zinc-400">Toque no tempo que você quer</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[15, 30, 45, 60].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setCustomMinutes(m)}
                className={`py-3.5 px-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 border-2 ${
                  customMinutes === m
                    ? 'bg-sky-500 text-zinc-950 border-white shadow-xl shadow-sky-500/40 scale-105'
                    : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="text-lg">{m} Minutos</span>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3: GIANT ACTION BUTTON */}
        <div className="pt-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-2xl bg-emerald-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
              3
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              PASSO 3: Aperte o Botão Abaixo para Ligar a Água
            </h3>
          </div>

          <button
            id="btn-launch-scale"
            onClick={handleStartIrrigation}
            className="w-full py-5 px-6 bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-500 hover:from-sky-400 hover:to-emerald-400 text-zinc-950 font-black text-lg sm:text-xl rounded-3xl shadow-2xl shadow-sky-600/50 flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-2 border-white/40"
          >
            <Play className="w-7 h-7 fill-current" />
            <span>👉 LIGAR ÁGUA AGORA ({currentScale.title.toUpperCase()} • {customMinutes} MINUTOS)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
