import React from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, 
  Droplets, 
  SunMedium, 
  Leaf, 
  Sprout, 
  LogOut, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  CloudSun,
  ArrowRight,
  TrendingDown,
  Play,
  Eye,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

export const DashboardScreen: React.FC = () => {
  const { 
    user, 
    setCurrentScreen, 
    logoutUser, 
    speakText, 
    totalLitersToday, 
    totalLitersSavedToday,
    soilSectors,
    criticalSectorsCount 
  } = useApp();

  const handleSpeakDashboard = () => {
    speakText(
      `Olá ${user.name}! Você está no Gotas Inteligentes, aplicativo exclusivo da Comunidade Carne Gorda, Rio Grande do Norte. Hoje já foram economizados ${totalLitersSavedToday} litros de água com a irrigação calibrada no ${user.farmName}. Temos ${criticalSectorsCount} setor com solo seco precisando de água.`
    );
  };

  const menuCards: {
    id: ScreenType;
    number: string;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    border: string;
    bg: string;
    tag: string;
    tagColor: string;
    buttonLabel: string;
    audioText: string;
  }[] = [
    {
      id: 'escala',
      number: '1',
      title: 'Escalas de Irrigação',
      subtitle: 'Escolha Pouca Água (hortas), Água Média (feijão) ou Muita Água (milho e banana).',
      icon: '💧',
      color: 'text-sky-400',
      border: 'border-sky-500/40 hover:border-sky-400',
      bg: 'bg-gradient-to-br from-sky-950/50 via-zinc-900 to-zinc-900',
      tag: '💧 3 Níveis de Água',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      buttonLabel: '👉 Ver Escalas de Água',
      audioText: 'Escala de Irrigação. Escolha entre Baixa para hortas pequenas, Média para feijão e legumes, e Alta para milho e bananeiras.'
    },
    {
      id: 'solo_seco',
      number: '2',
      title: 'Solo Seco (Ligar Água)',
      subtitle: 'Veja qual canteiro ou roça está com a terra seca e ligue a irrigação na hora.',
      icon: '☀️',
      color: 'text-amber-400',
      border: criticalSectorsCount > 0 ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-amber-500/40 hover:border-amber-400',
      bg: 'bg-gradient-to-br from-amber-950/50 via-zinc-900 to-zinc-900',
      tag: criticalSectorsCount > 0 ? `⚠️ ${criticalSectorsCount} Terra Seca!` : '✅ Solo Úmido',
      tagColor: criticalSectorsCount > 0 ? 'bg-amber-500 text-zinc-950 font-black animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      buttonLabel: '👉 Ver Terra & Ligar Água',
      audioText: `Monitor de Solo Seco. Atualmente temos ${criticalSectorsCount} áreas com terra seca precisando de água.`
    },
    {
      id: 'plantas',
      number: '3',
      title: 'Irrigar Plantas',
      subtitle: 'Toque em Milho 🌽, Sorgo 🌾, Banana 🍌 ou Feijão 🫘 para regar pelos minutos certos.',
      icon: '🌽',
      color: 'text-emerald-400',
      border: 'border-emerald-500/40 hover:border-emerald-400',
      bg: 'bg-gradient-to-br from-emerald-950/50 via-zinc-900 to-zinc-900',
      tag: '🌽 🌾 🍌 🫘 4 Plantas',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      buttonLabel: '👉 Escolher Planta & Regar',
      audioText: 'Irrigação por Planta. Escolha Milho, Sorgo, Banana ou Feijão para ver os minutos de água recomendados.'
    },
    {
      id: 'dicas',
      number: '4',
      title: 'Dicas dos 3 Rs',
      subtitle: 'Aprenda a Reduzir o gasto, Reutilizar potes e roupas velhas, e Reciclar embalagens.',
      icon: '🌿',
      color: 'text-lime-400',
      border: 'border-lime-500/40 hover:border-lime-400',
      bg: 'bg-gradient-to-br from-lime-950/50 via-zinc-900 to-zinc-900',
      tag: '🌿 Reduza • Reutilize • Recicle',
      tagColor: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
      buttonLabel: '👉 Ver Dicas do Sítio',
      audioText: 'Dicas Sustentáveis dos Três Erres: Reduza o desperdício, Reutilize materiais no campo e Recicle embalagens.'
    },
    {
      id: 'consumo',
      number: '5',
      title: 'Consumo & Cisterna',
      subtitle: 'Veja quantos litros foram gastos hoje e quanto você economizou no sítio.',
      icon: '📊',
      color: 'text-blue-400',
      border: 'border-blue-500/40 hover:border-blue-400',
      bg: 'bg-gradient-to-br from-blue-950/50 via-zinc-900 to-zinc-900',
      tag: '💧 Economia de +35%',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      buttonLabel: '👉 Ver Relatório de Água',
      audioText: `Relatório de Consumo. Hoje você utilizou ${totalLitersToday} litros e economizou ${totalLitersSavedToday} litros.`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Greeting & Farm Context */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-zinc-900 to-sky-950/80 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-zinc-950 shadow-md">
                🌱 CARNE GORDA / RN
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                💧 Gotas Inteligentes
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                {user.farmName} ({user.areaHectares})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Olá, {user.name}!</span>
              <span>👨‍🌾</span>
            </h1>
            <p className="text-sm text-zinc-200 mt-1 max-w-xl">
              Sistema exclusivo para a <strong>Comunidade Carne Gorda/RN</strong>. Toque nos <strong>cartões coloridos grandes abaixo</strong> para cuidar da sua plantação e ligar a água sem desperdício.
            </p>
          </div>

          {/* Large Voice Speaker Button */}
          <div className="flex items-center gap-3">
            <button
              id="btn-dash-listen"
              onClick={handleSpeakDashboard}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm shadow-xl shadow-emerald-600/40 transition-all active:scale-95"
            >
              <Volume2 className="w-5 h-5 text-zinc-950" />
              <span>🔊 OUVIR TELA EM VOZ ALTA</span>
            </button>
          </div>
        </div>

        {/* Visual Farm Status Dashboard in Colors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-800/80">
          {/* Clima */}
          <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800 flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/30">
              ☀️
            </span>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Clima Hoje</span>
              <strong className="text-base text-white block leading-tight">28°C Ensolarado</strong>
              <span className="text-[11px] text-emerald-400 font-semibold">Rega recomendada</span>
            </div>
          </div>

          {/* Status Solo */}
          <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
            criticalSectorsCount > 0 
              ? 'bg-amber-950/60 border-amber-500/60' 
              : 'bg-zinc-950/80 border-zinc-800'
          }`}>
            <span className="text-3xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/30">
              {criticalSectorsCount > 0 ? '🏜️' : '🌿'}
            </span>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Estado da Terra</span>
              <strong className={`text-base font-black block leading-tight ${criticalSectorsCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {criticalSectorsCount > 0 ? `${criticalSectorsCount} Área Seca!` : 'Terra Úmida'}
              </strong>
              <span className="text-[11px] text-zinc-300">
                {criticalSectorsCount > 0 ? 'Toque no cartão 2' : 'Sem urgência'}
              </span>
            </div>
          </div>

          {/* Água Usada */}
          <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800 flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-sky-500/20 border border-sky-500/30">
              💧
            </span>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Água Usada Hoje</span>
              <strong className="text-base text-white block leading-tight">{totalLitersToday} Litros</strong>
              <span className="text-[11px] text-sky-400 font-semibold">Na medida certa</span>
            </div>
          </div>

          {/* Economia */}
          <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-emerald-500/30 flex items-center gap-3 bg-gradient-to-r from-emerald-950/30 to-zinc-950">
            <span className="text-3xl p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              💰
            </span>
            <div>
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">Água Economizada</span>
              <strong className="text-base text-emerald-400 font-black block leading-tight">+{totalLitersSavedToday} Litros</strong>
              <span className="text-[11px] text-emerald-300 font-semibold">-35% de economia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Guide: 3 Easy Steps for Non-Tech Users */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                Como Usar o Gotas Inteligentes em 3 Passos Simples:
              </h2>
              <span className="text-xs text-zinc-400">Não precisa de experiência com tecnologia</span>
            </div>
          </div>

          <button
            onClick={() => speakText('Instruções rápidas: Passo 1: Olhe o alerta de Solo Seco. Passo 2: Escolha sua planta, como milho, sorgo, banana ou feijão. Passo 3: Toque no grande botão verde para ligar a água.')}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 text-xs font-bold flex items-center gap-1.5"
            title="Ouvir os 3 passos"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Ouvir Passos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <strong className="text-xs font-bold text-white block">1. Olhe a Terra</strong>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Veja se o <strong>Solo Seco</strong> tem alerta amarelo com falta de água.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-zinc-950 font-black text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <strong className="text-xs font-bold text-white block">2. Escolha a Planta</strong>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Selecione <strong>Milho, Sorgo, Banana ou Feijão</strong> e veja os minutos.
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500 text-zinc-950 font-black text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <strong className="text-xs font-bold text-white block">3. Aperte o Botão Verde</strong>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                A água liga e desliga sozinha quando terminar o tempo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 5 Visual Cards with Numbers & Large Buttons */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="text-xl">👇</span>
            <span>Escolha o que deseja fazer hoje no sítio:</span>
          </h2>
          <span className="text-xs text-zinc-400">Toque em qualquer botão</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              className={`rounded-3xl p-6 border-2 transition-all ${card.bg} ${card.border} flex flex-col justify-between shadow-xl relative`}
            >
              <div>
                {/* Header with Number, Emoji and Sound button */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-zinc-950 text-white font-black text-sm flex items-center justify-center border border-zinc-700">
                      {card.number}
                    </span>
                    <span className="text-4xl p-2.5 rounded-2xl bg-zinc-950/90 border border-zinc-800 block shadow-md">
                      {card.icon}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakText(card.audioText)}
                      title="Ouvir explicação deste botão em voz alta"
                      className="p-2 rounded-xl bg-zinc-950 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Badge Tag */}
                <div className="mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${card.tagColor}`}>
                    {card.tag}
                  </span>
                </div>

                {/* Title and Subtitle in high contrast */}
                <h3 className="text-xl font-black text-white mt-1">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200 mt-2 leading-relaxed font-medium">
                  {card.subtitle}
                </p>
              </div>

              {/* Big Touch Action Button */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <button
                  type="button"
                  id={`btn-menu-${card.id}`}
                  onClick={() => setCurrentScreen(card.id)}
                  className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl border border-zinc-700 hover:border-emerald-500 flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 group"
                >
                  <span>{card.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Sair Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl p-6 border-2 border-rose-500/40 bg-gradient-to-br from-rose-950/40 via-zinc-900 to-zinc-900 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-zinc-950 text-white font-black text-sm flex items-center justify-center border border-zinc-700">
                    6
                  </span>
                  <span className="text-4xl p-2.5 rounded-2xl bg-zinc-950/90 border border-zinc-800 block shadow-md">
                    🚪
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => speakText('Opção de Sair. Toque no botão vermelho para encerrar a sessão do agricultor com segurança.')}
                  title="Ouvir explicação"
                  className="p-2 rounded-xl bg-zinc-950 text-zinc-300 hover:text-rose-400 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  🚪 Encerrar Sessão
                </span>
              </div>

              <h3 className="text-xl font-black text-white mt-1">
                Opção de Sair
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 mt-2 leading-relaxed font-medium">
                Encerre o aplicativo com segurança para trocar de usuário ou fechar o sistema.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80">
              <button
                type="button"
                id="btn-menu-logout"
                onClick={logoutUser}
                className="w-full py-3.5 px-4 bg-rose-950/80 hover:bg-rose-600 text-rose-200 hover:text-white font-black text-sm rounded-2xl border border-rose-500/40 flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 group"
              >
                <span>🚪 SAIR DO APLICATIVO</span>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
