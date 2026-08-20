import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  SunMedium, 
  Droplets, 
  Volume2, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers,
  ThermometerSun,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SoilSector } from '../types';

export const SoloSecoScreen: React.FC = () => {
  const { soilSectors, irrigateSoilSector, speakText } = useApp();
  const [selectedSectorId, setSelectedSectorId] = useState<string>(soilSectors[0]?.id || 'sec-1');
  const [selectedMinutes, setSelectedMinutes] = useState<number>(35);

  const selectedSector = soilSectors.find(s => s.id === selectedSectorId) || soilSectors[0];

  const handleSelectSector = (sec: SoilSector) => {
    setSelectedSectorId(sec.id);
    setSelectedMinutes(sec.recommendedMinutes);
  };

  const handleSpeakSector = (sec: SoilSector) => {
    speakText(
      `${sec.name}. Cultivo: ${sec.crop}. Umidade atual do solo: ${sec.moisturePercent} porcento. Estado: ${
        sec.status === 'seco' ? 'Solo seco necessitando irrigação urgente' : 'Nível aceitável'
      }. Tempo recomendado: ${sec.recommendedMinutes} minutos.`
    );
  };

  const handleTriggerIrrigation = () => {
    if (!selectedSector) return;
    irrigateSoilSector(selectedSector.id, selectedMinutes);
  };

  const criticalCount = soilSectors.filter(s => s.status === 'seco').length;

  return (
    <div className="space-y-6">
      {/* Header Banner with Warning */}
      <div className="bg-gradient-to-r from-amber-950/90 via-zinc-900 to-zinc-900 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${
                criticalCount > 0 
                  ? 'bg-amber-500 text-zinc-950 animate-pulse' 
                  : 'bg-emerald-500 text-zinc-950'
              }`}>
                {criticalCount > 0 ? `⚠️ ${criticalCount} ÁREAS COM TERRA SECA!` : '✅ TERRA COM BOA UMIDADE'}
              </span>
              <span className="text-xs text-zinc-300 font-semibold">Monitor de Terra</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Solo Seco: Ativar Irrigação</span>
              <span className="text-amber-400">☀️ 🏜️</span>
            </h1>
            <p className="text-sm text-zinc-200 mt-1 max-w-2xl font-medium">
              Veja qual área está precisando de água e <strong>aperte o grande botão verde</strong> para molhar a terra imediatamente.
            </p>
          </div>

          <button
            id="btn-soloseco-speak"
            onClick={() => speakText(`Monitor de solo seco. Temos ${criticalCount} áreas com terra seca precisando de água. Toque no setor desejado e depois aperte o grande botão verde para ligar a água agora.`)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm shadow-xl shadow-amber-600/40 transition-all self-start md:self-auto active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-zinc-950" />
            <span>🔊 OUVIR DIAGNÓSTICO DO SOLO</span>
          </button>
        </div>
      </div>

      {/* Visual Guide: 3 Steps */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-amber-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
              1
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                PASSO 1: Escolha a Área que Precisa de Água (Toque abaixo)
              </h2>
              <span className="text-xs text-zinc-400">Os cartões vermelhos são os mais urgentes</span>
            </div>
          </div>
        </div>

        {/* Grid of Farm Sectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {soilSectors.map((sector) => {
            const isSelected = selectedSectorId === sector.id;
            const isDry = sector.status === 'seco';
            const isAlert = sector.status === 'alerta';

            return (
              <motion.div
                key={sector.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSector(sector)}
                className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between relative shadow-xl ${
                  isSelected
                    ? isDry
                      ? 'bg-rose-950/80 border-rose-400 ring-4 ring-rose-400/40 text-white'
                      : 'bg-emerald-950/80 border-emerald-400 ring-4 ring-emerald-400/40 text-white'
                    : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div>
                  {/* Top Status & Speaker */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                      isDry
                        ? 'bg-rose-500 text-zinc-950 animate-pulse'
                        : isAlert
                        ? 'bg-amber-500 text-zinc-950'
                        : 'bg-emerald-500 text-zinc-950'
                    }`}>
                      {isDry ? '☀️ SECO (<30%)' : isAlert ? '⚠️ ATENÇÃO' : '🌿 ÚMIDO OK'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakSector(sector);
                      }}
                      className="p-1.5 rounded-xl bg-zinc-950 text-zinc-400 hover:text-white"
                      title="Ouvir sobre este setor"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-zinc-950 mb-1 inline-flex items-center gap-1">
                      <Check className="w-3 h-3" /> SETOR SELECIONADO
                    </span>
                  )}

                  <h3 className="font-black text-white text-lg leading-tight mt-1">{sector.name}</h3>
                  <span className="text-xs text-zinc-300 font-semibold block mt-0.5">🌱 Cultura: {sector.crop}</span>

                  {/* Moisture Gauge */}
                  <div className="mt-4 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                    <div className="flex justify-between text-xs font-black mb-1.5">
                      <span className="text-zinc-400">Umidade da Terra:</span>
                      <span className={isDry ? 'text-rose-400 text-sm' : 'text-emerald-400 text-sm'}>
                        {sector.moisturePercent}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDry ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        }`}
                        style={{ width: `${sector.moisturePercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 block mt-1">
                      {isDry ? '🚨 Necessita água urgente hoje' : '💧 Nível dentro do esperado'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-medium">
                  <span>Última rega:</span>
                  <span className="text-zinc-200 font-bold">{sector.lastIrrigated}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Activation Panel for the Selected Sector */}
      {selectedSector && (
        <div className="bg-gradient-to-b from-zinc-900 to-emerald-950/40 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-zinc-950 uppercase tracking-wider">
                  ÁREA SELECIONADA
                </span>
                <span className="text-sm font-bold text-white">
                  {selectedSector.name} ({selectedSector.crop})
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mt-1">
                Recuperar a Umidade da Terra
              </h3>
            </div>

            <button
              type="button"
              onClick={() => handleSpeakSector(selectedSector)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold text-xs sm:text-sm transition-all self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4" />
              <span>🔊 Ouvir Instruções</span>
            </button>
          </div>

          {/* Visual Comparison: Terra Seca -> Terra Úmida */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-950 p-4 rounded-2xl border-2 border-rose-500/30 flex items-center gap-3">
              <span className="text-4xl p-2 rounded-xl bg-rose-500/20">🏜️</span>
              <div>
                <span className="text-[11px] text-rose-300 font-bold uppercase block">Umidade Atual</span>
                <strong className="text-2xl font-black text-rose-400">{selectedSector.moisturePercent}%</strong>
                <span className="text-xs text-zinc-400 block">Solo seco com déficit de água</span>
              </div>
            </div>

            <div className="bg-zinc-950 p-4 rounded-2xl border-2 border-emerald-500/40 flex items-center gap-3">
              <span className="text-4xl p-2 rounded-xl bg-emerald-500/20">🌿</span>
              <div>
                <span className="text-[11px] text-emerald-300 font-bold uppercase block">Meta Após Irrigar</span>
                <strong className="text-2xl font-black text-emerald-400">65% a 70%</strong>
                <span className="text-xs text-zinc-300 block">Solo fértil e saudável para a planta</span>
              </div>
            </div>
          </div>

          {/* STEP 2: DURATION */}
          <div className="bg-zinc-950 p-5 rounded-3xl border-2 border-emerald-500/40 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-2xl bg-sky-500 text-zinc-950 font-black text-base flex items-center justify-center shadow-md">
                2
              </span>
              <div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  PASSO 2: Escolha Quantos Minutos a Água Vai Ficar Ligada
                </h4>
                <span className="text-xs text-zinc-400">Tempo sugerido: {selectedSector.recommendedMinutes} minutos</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[15, 25, 35, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setSelectedMinutes(mins)}
                  className={`py-3 px-3 rounded-2xl font-black text-center transition-all flex flex-col items-center justify-center border-2 ${
                    selectedMinutes === mins
                      ? 'bg-sky-500 text-zinc-950 border-white shadow-xl shadow-sky-500/40 scale-105 ring-4 ring-sky-400/40'
                      : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  <Clock className="w-4 h-4 mb-1" />
                  <span className="text-lg">{mins} Min</span>
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
              <h4 className="text-base sm:text-lg font-black text-white">
                PASSO 3: Aperte o Botão Verde para Molhar a Terra
              </h4>
            </div>

            <button
              id="btn-activate-soil-irrigation"
              onClick={handleTriggerIrrigation}
              className="w-full py-5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-zinc-950 font-black text-lg sm:text-xl rounded-3xl shadow-2xl shadow-emerald-600/50 flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-2 border-white/40"
            >
              <Droplets className="w-7 h-7 fill-current" />
              <span>👉 REGAR {selectedSector.name.toUpperCase()} AGORA ({selectedMinutes} MINUTOS)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
