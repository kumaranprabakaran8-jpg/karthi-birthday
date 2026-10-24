import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  HiMoon,
  HiSun,
  HiHeart,
  HiShare,
  HiMenu,
  HiX,
} from 'react-icons/hi';
import { useState } from 'react';
import { shareWebsite } from '@/utils';
import { SITE_CONFIG } from '@/config/site';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#love-letter', label: 'Letter' },
  { href: '#gift', label: 'Gift' },
  { href: '#cake', label: 'Cake' },
  { href: '#countdown', label: 'Countdown' },
];

export function Navbar() {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const [shareMsg, setShareMsg] = useState('');

  const handleShare = async () => {
    const result = await shareWebsite(
      `Happy Birthday, ${state.recipientName}!`,
      'A luxury birthday surprise crafted with love ✨'
    );
    if (result === 'copied') {
      setShareMsg('Link copied!');
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  const cycleParticles = () => {
    const modes = ['hearts', 'snow', 'none'] as const;
    const idx = modes.indexOf(state.particleMode);
    dispatch({ type: 'SET_PARTICLE_MODE', payload: modes[(idx + 1) % modes.length] });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-1 left-0 right-0 z-[9990] mx-4 mt-3"
    >
      <div className="max-w-7xl mx-auto glass-gold rounded-2xl px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="font-display text-xl text-gradient-gold font-bold">
          {state.recipientName} ✨
        </a>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-luxury-white/70 hover:text-luxury-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cycleParticles}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle background particles"
            title="Toggle hearts/snow"
          >
            <HiHeart className="text-luxury-pink" size={18} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
            aria-label="Share website"
          >
            <HiShare className="text-luxury-gold" size={18} />
            {shareMsg && (
              <span className="absolute -bottom-8 right-0 text-xs whitespace-nowrap text-luxury-gold">
                {shareMsg}
              </span>
            )}
          </button>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle dark/light mode"
          >
            {state.theme === 'dark' ? (
              <HiSun className="text-luxury-gold-light" size={18} />
            ) : (
              <HiMoon className="text-luxury-gold-dark" size={18} />
            )}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 glass-gold rounded-2xl p-4 flex flex-col gap-3"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-sm py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

export function Footer() {
  const { state } = useApp();
  return (
    <footer className="relative border-t border-white/10 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-2xl text-gradient-gold mb-4">
          Made with love for {state.recipientName}
        </p>
        <p className="font-body italic opacity-60 mb-6">
          Every pixel, every word, every animation — crafted to celebrate the most special person in my world.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm opacity-50 font-sans">
          <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:text-luxury-gold transition-colors">
            Contact
          </a>
          <span>© {new Date().getFullYear()} — A Birthday Surprise</span>
        </div>
      </div>
    </footer>
  );
}
