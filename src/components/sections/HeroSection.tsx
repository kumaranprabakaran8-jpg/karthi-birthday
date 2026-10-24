import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Sparkles } from '@/components/effects/Particles';
import { useApp } from '@/context/AppContext';
import { useWindowSize } from '@/hooks';

const BALLOONS = ['🎈', '🎀', '🌸', '💗', '✨', '🎉'];

export function HeroSection() {
  const { state } = useApp();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <SectionWrapper id="hero" className="min-h-screen flex items-center justify-center pt-24">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
          colors={['#d4af37', '#ffb6c1', '#f5e6a3', '#ffffff']}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <Sparkles count={25} />

      {BALLOONS.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl md:text-5xl pointer-events-none"
          style={{ left: `${8 + i * 15}%`, top: `${15 + (i % 2) * 50}%` }}
          animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          aria-hidden="true"
        >
          {emoji}
        </motion.span>
      ))}

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-body text-lg md:text-xl text-luxury-pink italic mb-4"
        >
          Today belongs to someone extraordinary...
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-gold mb-4"
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-display text-3xl md:text-5xl text-luxury-pink mb-8"
        >
          {state.recipientName} ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-body text-xl md:text-2xl opacity-70 mb-10 max-w-2xl mx-auto"
        >
          The world is brighter because you exist. Scroll down to unwrap your surprise, one magical moment at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <a href="#gallery">
            <AnimatedButton>Begin Your Journey</AnimatedButton>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
