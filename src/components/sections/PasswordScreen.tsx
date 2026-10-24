import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles } from '@/components/effects/Particles';
import { useApp } from '@/context/AppContext';
import { useWindowSize } from '@/hooks';
import { SITE_CONFIG } from '@/config/site';
import { trackEvent } from '@/utils';

export function PasswordScreen() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const handleUnlock = () => {
    if (code.trim().toUpperCase() === SITE_CONFIG.secretCode && name.trim()) {
      setSuccess(true);
      setError(false);
      dispatch({ type: 'UNLOCK', payload: name.trim() });
      trackEvent('unlock_success');
      setTimeout(() => navigate('/intro'), 2000);
    } else {
      setError(true);
      trackEvent('unlock_failed');
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-luxury-gradient px-4">
      <Sparkles count={30} />
      {success && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} colors={['#d4af37', '#ffb6c1', '#f5e6a3']} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard gold className={`text-center ${error ? 'animate-[shake_0.5s_ease-in-out]' : ''} ${success ? 'shadow-glow animate-pulse-glow' : ''}`}>
          <motion.h1
            className="font-display text-4xl md:text-5xl text-gradient-gold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome, Beautiful Soul
          </motion.h1>
          <p className="font-body italic text-luxury-pink/80 mb-8">
            A private celebration awaits you. Enter your details to unlock the magic.
          </p>

          <div className="space-y-4 text-left">
            <div>
              <label htmlFor="name" className="block font-sans text-sm text-luxury-gold/80 mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 rounded-xl glass border border-luxury-gold/20 bg-transparent font-body text-lg focus:outline-none focus:border-luxury-gold/50 focus:shadow-glow transition-all"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="code" className="block font-sans text-sm text-luxury-gold/80 mb-1">
                Secret Code
              </label>
              <input
                id="code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Enter the secret code..."
                className="w-full px-4 py-3 rounded-xl glass border border-luxury-gold/20 bg-transparent font-body text-lg focus:outline-none focus:border-luxury-gold/50 focus:shadow-glow transition-all tracking-widest"
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm font-sans text-center"
                role="alert"
              >
                Incorrect code. Try again, my love.
              </motion.p>
            )}
            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-luxury-gold text-sm font-sans text-center"
              >
                ✨ Unlocked! Welcome to your surprise...
              </motion.p>
            )}
            <AnimatedButton onClick={handleUnlock} className="w-full mt-4" disabled={success}>
              Unlock the Magic
            </AnimatedButton>
          </div>
          <p className="mt-6 text-xs opacity-40 font-sans">Hint: Your name + the year of celebration</p>
        </GlassCard>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
