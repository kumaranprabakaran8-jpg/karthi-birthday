import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export function LoadingScreen() {
  const { state } = useApp();

  return (
    <AnimatePresence>
      {state.showLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-luxury-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-luxury-gold/20 border-t-luxury-gold" />
          </motion.div>
          <motion.h1
            className="mt-8 font-display text-3xl text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            For KARTHI ✨
          </motion.h1>
          <motion.p
            className="mt-2 font-body text-luxury-pink/70 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Preparing something magical...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
