import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { useWindowSize } from '@/hooks';

export function FloatingParticles() {
  const { state } = useApp();
  const { height } = useWindowSize();

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  if (state.particleMode === 'none') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              state.particleMode === 'hearts'
                ? 'rgba(255, 182, 193, 0.6)'
                : 'rgba(255, 255, 255, 0.4)',
          }}
          animate={{
            y: [0, -height * 0.3, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {state.particleMode === 'hearts' &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={`heart-${i}`}
            className="absolute text-luxury-pink/30 text-lg"
            style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            ♥
          </motion.span>
        ))}
    </div>
  );
}

export function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random() * 3 + 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: star.twinkle, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export function Sparkles({ count = 20 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-luxury-gold text-xs"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.delay }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
