import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  TrendingDown, 
  Volume2, 
  History, 
  Calendar, 
  Waves, 
  Sparkles, 
  CheckCircle2,
  BarChart2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ConsumoScreen: React.FC = () => {
  const { 
    waterLogs, 
    totalLitersToday, 
    totalLitersSavedToday, 
    speakText 
  } = useApp();

  const totalAllTimeUsed = waterLogs.reduce((acc, l) => acc + l.litersUsed, 0);
  const totalAllTimeSaved = waterLogs.reduce((acc, l) => acc + l.litersSaved, 0);

  const handleSpeakConsumo = () => {
    speakText(
      `Relatório de Consumo de Água. Hoje você utilizou ${totalLitersToday} litros de água e economizou aproximadamente ${totalLitersSavedToday} litros através das escalas de irrigação inteligentes. Sua cisterna está com 82 porcento de capacidade.`
    );
  };

  // Sector breakdown for visual chart
  const sectorsSummary = [
    { name: '🍌 Bananal', liters: 450, color: 'bg-yellow-400', percent: 45 },
    { name: '🌽 Milho & Feijão', liters: 220, color: 'bg-emerald-400', percent: 22 },
    { name: '🥬 Horta de Verduras', liters: 190, color: 'bg-sky-400', percent: 19 },
    { name: '🌾 Sorgo Forrageiro', liters: 140, color: 'bg-orange-400', percent: 14 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/90 via-zinc-900 to-zinc-900 border-2 border-blue-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500 text-zinc-950 shadow-md">
                📊 RELATÓRIO DE ÁGUA
              </span>
              <span className="text-xs text-zinc-300 font-semibold">Economia e Nível da Cisterna</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Consumo & Economia de Água</span>
              <span className="text-blue-400">💧 🪣</span>
            </h1>
            <p className="text-sm text-zinc-200 mt-1 max-w-2xl font-medium">
              Veja quantos litros de água seu sítio gastou hoje e quanto você economizou no bolso e na terra.
            </p>
          </div>

          <button
            id="btn-consumo-speak"
            onClick={handleSpeakConsumo}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-zinc-950 font-black text-sm shadow-xl shadow-blue-700/40 transition-all self-start md:self-auto active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-zinc-950" />
            <span>🔊 OUVIR RELATÓRIO DE ÁGUA</span>
          </button>
        </div>
      </div>

      {/* Main Visual Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Água Gasta */}
        <div className="bg-zinc-900 p-6 rounded-3xl border-2 border-sky-500/40 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-zinc-400 uppercase">Gasto de Hoje</span>
            <span className="text-3xl p-2 rounded-2xl bg-sky-500/20 border border-sky-500/30">
              💧
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-white block">
            {totalLitersToday} <span className="text-sm font-normal text-zinc-400">Litros</span>
          </span>
          <span className="text-xs text-sky-400 font-bold mt-2 block">Irrigação controlada por minuto</span>
        </div>

        {/* Economia de Hoje */}
        <div className="bg-zinc-900 p-6 rounded-3xl border-2 border-emerald-500/50 shadow-xl bg-gradient-to-b from-emerald-950/40 to-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-emerald-400 uppercase">Economia de Hoje</span>
            <span className="text-3xl p-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
              💰
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-emerald-400 block">
            +{totalLitersSavedToday} <span className="text-sm font-normal text-zinc-300">Litros</span>
          </span>
          <span className="text-xs text-emerald-300 font-bold mt-2 block">-35% em relação à mangueira aberta</span>
        </div>

        {/* Cisterna Visual Meter */}
        <div className="bg-zinc-900 p-6 rounded-3xl border-2 border-cyan-500/40 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-cyan-300 uppercase">Caixa d'Água / Cisterna</span>
            <span className="text-3xl p-2 rounded-2xl bg-cyan-500/20 border border-cyan-500/30">
              🪣
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-cyan-300 block">
            82% <span className="text-sm font-normal text-zinc-400">Cheia</span>
          </span>
          <div className="w-full bg-zinc-950 h-2.5 rounded-full mt-2 overflow-hidden border border-zinc-800">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: '82%' }} />
          </div>
          <span className="text-[11px] text-zinc-300 mt-2 block font-medium">~8.200 Litros guardados</span>
        </div>

        {/* Total Acumulado */}
        <div className="bg-zinc-900 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-indigo-300 uppercase">Total Economizado</span>
            <span className="text-3xl p-2 rounded-2xl bg-indigo-500/20 border border-indigo-500/30">
              🛡️
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-indigo-300 block">
            +{totalAllTimeSaved} <span className="text-sm font-normal text-zinc-400">L</span>
          </span>
          <span className="text-xs text-indigo-400 font-bold mt-2 block">Protegendo a nascente do sítio</span>
        </div>
      </div>

      {/* Visual Chart: Consumption by Crop */}
      <div className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-400" />
            <span>Onde a Água Foi Usada no Sítio:</span>
          </h2>
          <span className="text-xs text-zinc-400">Gráfico visual</span>
        </div>

        {/* Bar Visual representation with crop emojis */}
        <div className="space-y-4">
          {sectorsSummary.map((item, idx) => (
            <div key={idx} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex justify-between text-sm font-black">
                <span className="text-white">{item.name}</span>
                <span className="text-sky-400">{item.liters} Litros ({item.percent}%)</span>
              </div>
              <div className="w-full bg-zinc-900 h-4 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-700`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Irrigation Logs */}
      <div className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            <span>Histórico das Últimas Irrigações Feitas:</span>
          </h2>
          <span className="text-xs text-zinc-400 font-bold">{waterLogs.length} registros</span>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {waterLogs.map((log) => (
            <div key={log.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-base text-white block">{log.plantOrSector}</strong>
                  <span className="text-xs text-zinc-400 flex items-center gap-2 font-medium">
                    <span className="text-sky-300">{log.scaleUsed}</span>
                    <span>•</span>
                    <span>⏱️ {log.durationMinutes} minutos</span>
                    <span>•</span>
                    <span>📅 {log.date}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-sm font-black text-white block">{log.litersUsed} Litros</span>
                  <span className="text-xs text-emerald-400 font-bold block">+{log.litersSaved}L economizados</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
