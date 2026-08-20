import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Leaf, 
  TrendingDown, 
  RotateCw, 
  Recycle, 
  Volume2, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ArrowRight,
  Eye,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SustainableTip } from '../types';

export const DicasScreen: React.FC = () => {
  const { tips, toggleTipImplemented, speakText } = useApp();
  const [activePillar, setActivePillar] = useState<'todos' | 'reduza' | 'reutilize' | 'recicle'>('todos');

  const filteredTips = activePillar === 'todos' 
    ? tips 
    : tips.filter(t => t.pillar === activePillar);

  const handleSpeakTip = (tip: SustainableTip) => {
    speakText(
      `${tip.title}. ${tip.subtitle}. ${tip.description}. Benefício no sítio: ${tip.farmerBenefit}.`
    );
  };

  const getPillarBadge = (pillar: SustainableTip['pillar']) => {
    switch (pillar) {
      case 'reduza':
        return { label: '📉 1. REDUZA', bg: 'bg-emerald-500 text-zinc-950', border: 'border-emerald-500/50' };
      case 'reutilize':
        return { label: '🔄 2. REUTILIZE', bg: 'bg-sky-500 text-zinc-950', border: 'border-sky-500/50' };
      case 'recicle':
        return { label: '♻️ 3. RECICLE', bg: 'bg-lime-400 text-zinc-950', border: 'border-lime-500/50' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-lime-950/90 via-zinc-900 to-zinc-900 border-2 border-lime-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-lime-500 text-zinc-950 shadow-md">
                🌿 OS 3 Rs NO CAMPO
              </span>
              <span className="text-xs text-zinc-300 font-semibold">Agricultura Familiar Sustentável</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Dicas Sustentáveis para o Sítio</span>
              <span className="text-lime-400">🌾 ♻️</span>
            </h1>
            <p className="text-sm text-zinc-200 mt-1 max-w-2xl font-medium">
              <strong>1. Reduza</strong> o consumo de água • <strong>2. Reutilize</strong> potes e recipientes • <strong>3. Recicle</strong> embalagens para coleta.
            </p>
          </div>

          <button
            id="btn-dicas-speak-all"
            onClick={() => speakText('Tela de Dicas Sustentáveis. Conheça as três práticas: Reduza o consumo consciente, Reutilize potes, roupas e objetos no campo, e Recicle separando embalagens para coletas seletivas.')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-lime-500 hover:bg-lime-400 text-zinc-950 font-black text-sm shadow-xl shadow-lime-700/40 transition-all self-start md:self-auto active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-zinc-950" />
            <span>🔊 OUVIR GUIA DOS 3 R's</span>
          </button>
        </div>
      </div>

      {/* The 3 Rs Highlights Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 bg-zinc-950 p-2.5 rounded-3xl border-2 border-zinc-800">
        <button
          type="button"
          onClick={() => setActivePillar('todos')}
          className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all ${
            activePillar === 'todos'
              ? 'bg-zinc-800 text-white shadow-xl border-2 border-zinc-600'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          🌿 Todas ({tips.length})
        </button>

        <button
          type="button"
          onClick={() => setActivePillar('reduza')}
          className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activePillar === 'reduza'
              ? 'bg-emerald-500 text-zinc-950 shadow-xl scale-105'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <TrendingDown className="w-4 h-4 text-emerald-400" />
          <span>1. Reduza</span>
        </button>

        <button
          type="button"
          onClick={() => setActivePillar('reutilize')}
          className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activePillar === 'reutilize'
              ? 'bg-sky-500 text-zinc-950 shadow-xl scale-105'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <RotateCw className="w-4 h-4 text-sky-400" />
          <span>2. Reutilize</span>
        </button>

        <button
          type="button"
          onClick={() => setActivePillar('recicle')}
          className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activePillar === 'recicle'
              ? 'bg-lime-400 text-zinc-950 shadow-xl scale-105'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Recycle className="w-4 h-4 text-lime-400" />
          <span>3. Recicle</span>
        </button>
      </div>

      {/* Grid of Tip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTips.map((tip) => {
          const badge = getPillarBadge(tip.pillar);

          return (
            <motion.div
              key={tip.id}
              whileHover={{ y: -4 }}
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between shadow-2xl ${
                tip.implemented
                  ? 'bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-zinc-900 border-emerald-400 ring-2 ring-emerald-500/20'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Header Badge & Speaker */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${badge.bg}`}>
                    {badge.label}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSpeakTip(tip)}
                    title="Ouvir esta dica em voz alta"
                    className="p-2 rounded-xl bg-zinc-950 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800 flex items-center gap-1 text-xs font-bold"
                  >
                    <Volume2 className="w-4 h-4 text-lime-400" />
                    <span>Ouvir</span>
                  </button>
                </div>

                <h3 className="text-xl font-black text-white leading-tight">
                  {tip.title}
                </h3>
                <span className="text-xs font-bold text-lime-400 block mt-1">
                  "{tip.subtitle}"
                </span>

                <p className="text-xs sm:text-sm text-zinc-200 mt-3 leading-relaxed font-medium">
                  {tip.description}
                </p>

                {/* Step by Step Action */}
                <div className="mt-4 space-y-2 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-xs font-black text-zinc-300 uppercase tracking-wider block">
                    👉 Como fazer no seu sítio:
                  </span>
                  {tip.steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{st}</span>
                    </div>
                  ))}
                </div>

                {/* Farmer Benefit & LIBRAS Visual cue */}
                <div className="mt-3 p-3.5 bg-emerald-950/40 border-2 border-emerald-500/30 rounded-2xl text-xs space-y-1.5">
                  <div className="text-emerald-300 font-bold">
                    <strong className="text-white">💰 Ganho para você e sua família:</strong> {tip.farmerBenefit}
                  </div>
                  <div className="text-indigo-300 text-xs flex items-center gap-2 pt-2 border-t border-emerald-500/20 font-semibold">
                    <Eye className="w-4 h-4 shrink-0 text-indigo-400" />
                    <span>LIBRAS: {tip.librasConcept}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Toggle Implemented */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleTipImplemented(tip.id)}
                  className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl text-sm font-black transition-all ${
                    tip.implemented
                      ? 'bg-emerald-500 text-zinc-950 shadow-xl shadow-emerald-500/30 ring-2 ring-white/50'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                  }`}
                >
                  {tip.implemented ? (
                    <>
                      <Check className="w-5 h-5 text-zinc-950 stroke-[3]" />
                      <span>✅ JÁ PRATICO ESTA DICA NO MEU SÍTIO</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-zinc-400" />
                      <span>Marcar como Praticada no Sítio</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
