import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { useWindowSize } from '@/hooks';

export function CakeCeremony() {
  const [blown, setBlown] = useState(false);
  const [cheering, setCheering] = useState(false);
  const { width, height } = useWindowSize();

  const handleBlow = () => {
    setBlown(true);
    setTimeout(() => setCheering(true), 800);
  };

  return (
    <SectionWrapper
      id="cake"
      title="Make a Wish"
      subtitle="Close your eyes, think of your deepest dream, and blow out the candles."
      className="bg-gradient-to-b from-luxury-pink/5 to-transparent"
    >
      {cheering && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={300} colors={['#d4af37', '#ffb6c1']} />
      )}

      <div className="max-w-md mx-auto text-center">
        {/* Cake */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto w-64"
        >
          {/* Candles */}
          <div className="flex justify-center gap-4 mb-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative">
                <div className="w-1 h-8 bg-luxury-gold-light mx-auto rounded" />
                <AnimatePresence>
                  {!blown && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-3 h-4 bg-orange-400 rounded-full rounded-b-none"
                        style={{ boxShadow: '0 0 10px #ff6b35, 0 0 20px #ff6b35' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {blown && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -30 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-400/50 rounded-full blur-sm"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Cake layers */}
          <div className="h-8 bg-luxury-pink/60 rounded-t-xl mx-4" />
          <div className="h-12 bg-gradient-to-r from-luxury-gold/80 to-luxury-gold-light/80 rounded-lg mx-2 shadow-luxury" />
          <div className="h-16 bg-gradient-to-r from-luxury-gold-dark to-luxury-gold rounded-b-xl shadow-glow" />

          {/* Decorations */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-2">
            {['🍓', '🌸', '✨'].map((d, i) => (
              <span key={i} className="text-lg">{d}</span>
            ))}
          </div>
        </motion.div>

        {!blown ? (
          <AnimatedButton onClick={handleBlow} className="mt-10">
            Blow the Candles 🕯️
          </AnimatedButton>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10"
          >
            <p className="font-display text-3xl text-gradient-gold mb-2">
              {cheering ? '🎉 Happy Birthday! 🎉' : '...'}
            </p>
            {cheering && (
              <p className="font-body italic text-luxury-pink">
                The crowd cheers! Your wish has been sent to the stars. May every dream come true, KARTHI.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
