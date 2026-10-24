import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StarField } from '@/components/effects/Particles';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { useApp } from '@/context/AppContext';
import { INTRO_LINES } from '@/config/site';
import { useTypewriter } from '@/hooks';

export function CinematicIntro() {
  const [lineIndex, setLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const { displayed, done } = useTypewriter(INTRO_LINES[lineIndex], 60, true);

  useEffect(() => {
    if (!done) return;
    if (lineIndex < INTRO_LINES.length - 1) {
      const timer = setTimeout(() => setLineIndex((i) => i + 1), 1200);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setShowButton(true), 1000);
    return () => clearTimeout(timer);
  }, [done, lineIndex]);

  const handleContinue = () => {
    dispatch({ type: 'COMPLETE_INTRO' });
    navigate('/celebration');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-luxury-black overflow-hidden px-4">
      <StarField />
      <audio autoPlay loop className="hidden" aria-hidden="true">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <p className="font-display text-2xl md:text-4xl lg:text-5xl text-luxury-white/90 leading-relaxed min-h-[120px]">
          {displayed}
          {!showButton && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-8 bg-luxury-gold ml-1 align-middle"
            />
          )}
        </p>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <AnimatedButton onClick={handleContinue}>Continue the Journey</AnimatedButton>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
