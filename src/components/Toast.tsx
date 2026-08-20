import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bg = 'bg-zinc-900 border-zinc-700 text-zinc-100';
          let Icon = Info;
          let iconColor = 'text-sky-400';

          if (toast.type === 'success') {
            bg = 'bg-emerald-950/95 border-emerald-500/60 text-emerald-100 shadow-emerald-950/50';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-400';
          } else if (toast.type === 'warning') {
            bg = 'bg-amber-950/95 border-amber-500/60 text-amber-100 shadow-amber-950/50';
            Icon = AlertCircle;
            iconColor = 'text-amber-400';
          } else if (toast.type === 'error') {
            bg = 'bg-rose-950/95 border-rose-500/60 text-rose-100 shadow-rose-950/50';
            Icon = XCircle;
            iconColor = 'text-rose-400';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-xl backdrop-blur-md flex items-start gap-3 justify-between ${bg}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
                <span className="text-xs sm:text-sm font-semibold leading-snug">
                  {toast.message}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
