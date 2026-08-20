import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  Mail, 
  Lock, 
  User, 
  MapPin, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  Wheat,
  BadgeCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNameFromEmail } from '../data/agriData';

export const AuthScreen: React.FC = () => {
  const { loginUser, registerUser, isSpeaking, speakText, stopSpeaking } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('eejktcc2026@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  // Register fields
  const [farmerName, setFarmerName] = useState(() => formatNameFromEmail('eejktcc2026@gmail.com'));
  const [farmName, setFarmName] = useState('Sítio Carne Gorda');
  const [location, setLocation] = useState('Comunidade Carne Gorda / RN');
  const [areaHectares, setAreaHectares] = useState('2.5 hectares');

  const derivedName = formatNameFromEmail(email);

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    if (mode === 'register' && (!farmerName || farmerName.startsWith('Agricultor') || farmerName === 'Eejktcc 2026')) {
      setFarmerName(formatNameFromEmail(newEmail));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(
      {
        name: farmerName.trim() || derivedName,
        email,
        farmName,
        location: 'Comunidade Carne Gorda / RN',
        areaHectares
      },
      password
    );
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(
        `Bem-vindo ao aplicativo Gotas Inteligentes, exclusivo para a Comunidade Carne Gorda, Rio Grande do Norte. Seu nome inicial será ${derivedName}. Digite seu e-mail e sua senha para entrar ou clique em Criar Cadastro.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-sky-950/20 to-zinc-950 text-zinc-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Accessibility Bar */}
      <div className="w-full max-w-md flex justify-between items-center mb-5 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-md">
            <Droplets className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight text-white block leading-none">
              Gotas <span className="text-sky-400">Inteligentes</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">
              Carne Gorda/RN
            </span>
          </div>
        </div>

        <button
          id="btn-login-speech"
          onClick={handleSpeech}
          aria-label="Ouvir instruções da tela de login"
          className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl border transition-all ${
            isSpeaking 
              ? 'bg-sky-500 text-zinc-950 border-sky-400 animate-pulse' 
              : 'bg-zinc-900 text-sky-400 border-sky-500/40 hover:bg-sky-950/50'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isSpeaking ? 'Parar Som' : '🔊 Ouvir Tela'}</span>
        </button>
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900/95 backdrop-blur-xl border-2 border-sky-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-sky-950/40 relative z-10 space-y-5"
      >
        {/* Community Exclusive Badge */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-sky-950/80 border-2 border-emerald-500/50 p-3.5 rounded-2xl flex items-center gap-3">
          <span className="text-2xl p-1.5 rounded-xl bg-emerald-500/20">📍</span>
          <div>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">
              APLICATIVO EXCLUSIVO
            </span>
            <strong className="text-sm font-black text-white block">
              Comunidade Carne Gorda / RN
            </strong>
          </div>
        </div>

        {/* Banner Ilustrativo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-zinc-950 shadow-xl shadow-sky-600/30 mb-2">
            <Droplets className="w-7 h-7 fill-current" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            {mode === 'login' ? 'Gotas Inteligentes' : 'Cadastro do Agricultor'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xs mx-auto">
            {mode === 'login' 
              ? 'Entre com seu e-mail para ter seu nome configurado e irrigar seu sítio.' 
              : 'Cadastre sua lavoura e economize água na Comunidade Carne Gorda.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
          <button
            type="button"
            id="tab-btn-login"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all ${
              mode === 'login' 
                ? 'bg-sky-500 text-zinc-950 shadow-md scale-[1.02]' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Entrar no App
          </button>
          <button
            type="button"
            id="tab-btn-register"
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all ${
              mode === 'register' 
                ? 'bg-emerald-500 text-zinc-950 shadow-md scale-[1.02]' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Criar Cadastro
          </button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-black text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>E-mail do Agricultor (Gmail)</span>
                <span className="text-[10px] text-sky-400 font-bold">Define seu Nome</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="input-login-email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 transition-all font-medium"
                />
              </div>

              {/* Dynamic Name derivation preview */}
              {email && (
                <div className="mt-2 px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-2 text-xs text-sky-300">
                  <BadgeCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Nome no App: <strong>{derivedName}</strong></span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-black text-zinc-300 uppercase tracking-wider mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="input-login-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl py-3 pl-11 pr-11 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-colors font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-submit-login"
              className="w-full mt-2 py-4 px-4 bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-zinc-950 font-black text-base rounded-2xl shadow-xl shadow-sky-700/40 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] border-2 border-white/30"
            >
              <Droplets className="w-5 h-5 fill-current" />
              <span>👉 ENTRAR COMO {derivedName.toUpperCase()}</span>
            </button>

            {/* Quick Demo Fill Button */}
            <div className="pt-1">
              <button
                type="button"
                id="btn-quick-demo"
                onClick={() => {
                  setEmail('eejktcc2026@gmail.com');
                  setPassword('123456');
                }}
                className="w-full py-2.5 text-xs text-zinc-300 hover:text-sky-300 font-bold flex items-center justify-center gap-2 transition-colors border border-dashed border-zinc-800 rounded-xl hover:border-sky-500/50 bg-zinc-950/60"
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Usar conta de teste (eejktcc2026@gmail.com)</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Email Gmail */}
            <div>
              <label className="block text-xs font-black text-zinc-300 uppercase tracking-wider mb-1">
                E-mail (Gmail)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="input-reg-email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Farmer Name */}
            <div>
              <label className="block text-xs font-black text-zinc-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Nome de Exibição</span>
                <span className="text-[10px] text-emerald-400">Gerado do e-mail</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="input-reg-name"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="Nome do agricultor"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Farm / Sitio Name */}
            <div>
              <label className="block text-xs font-black text-zinc-300 uppercase tracking-wider mb-1">
                Nome do Sítio
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Wheat className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="input-reg-farm"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="Ex: Sítio Carne Gorda"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-black text-zinc-300 uppercase tracking-wider mb-1">
                Comunidade Exclusiva
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="input-reg-location"
                  readOnly
                  value="Comunidade Carne Gorda / RN"
                  className="w-full bg-zinc-950/80 border border-emerald-500/40 rounded-xl py-2.5 pl-10 pr-3 text-sm text-emerald-300 font-bold focus:outline-none cursor-default"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-zinc-300 uppercase tracking-wider mb-1">
                Criar Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  id="input-reg-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 dígitos"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit Register */}
            <button
              type="submit"
              id="btn-submit-register"
              className="w-full mt-3 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-base rounded-2xl shadow-xl shadow-emerald-700/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Concluir Cadastro em Carne Gorda/RN</span>
            </button>
          </form>
        )}

        {/* Security & Inclusivity note */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-center gap-2 text-xs text-zinc-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Exclusivo para Agricultores de Carne Gorda / RN</span>
        </div>
      </motion.div>
    </div>
  );
};
