import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 glass-panel p-4 rounded-xl border border-purple-500/30 flex items-center gap-3 shadow-xl shadow-purple-950/20 max-w-sm"
          id="system-toast"
        >
          <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-xs text-slate-100 font-medium font-sans">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
