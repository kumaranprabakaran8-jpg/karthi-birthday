import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { FireworksCanvas } from '@/components/effects/FireworksCanvas';
import { Sparkles } from '@/components/effects/Particles';
import { useWindowSize } from '@/hooks';

export function LastSurprise() {
  const [active, setActive] = useState(false);
  const { width, height } = useWindowSize();

  return (
    <section id="surprise" className="section-padding relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence>
        {active && (
          <>
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={500}
              colors={['#d4af37', '#ffb6c1', '#f5e6a3', '#ff0000']}
            />
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -height * 0.8,
                  x: (Math.random() - 0.5) * 200,
                }}
                transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2 }}
                className="fixed text-2xl pointer-events-none z-50"
                style={{ left: `${Math.random() * 100}%`, bottom: '10%' }}
              >
                ❤️
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {!active ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center relative z-10"
        >
          <h2 className="font-display text-3xl md:text-4xl text-gradient-gold mb-4">
            One More Surprise...
          </h2>
          <p className="font-body italic opacity-60 mb-8">Are you ready for the final moment?</p>
          <AnimatedButton onClick={() => setActive(true)}>Reveal the Last Surprise</AnimatedButton>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 w-full"
        >
          <Sparkles count={40} />
          <div className="min-h-[50vh] relative">
            <FireworksCanvas active message="I Love You ❤️" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center font-display text-4xl md:text-6xl text-gradient-gold mt-8"
          >
            I Love You ❤️
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center font-body text-xl text-luxury-pink italic mt-4"
          >
            Forever and always, KARTHI.
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}
