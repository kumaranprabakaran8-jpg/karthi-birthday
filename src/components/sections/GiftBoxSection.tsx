import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import './GiftBoxSection.css';

const PHOTO_PATH = `${import.meta.env.BASE_URL}assets/karthi-surprise.jpeg`;
const CELEBRATION_PARTICLES = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  symbol: ['♥', '✦', '🌹', '✨'][index % 4],
  left: `${(index * 47 + 13) % 100}%`,
  top: `${(index * 31 + 9) % 78}%`,
  delay: `${(index % 8) * 0.16}s`,
}));

export function GiftBoxSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isLightboxOpen]);

  return (
    <SectionWrapper
      id="gift"
      title="A Special Gift For KARTHI ❤️"
      subtitle="A little love, wrapped just for you."
      className="relative overflow-hidden"
    >
      <div className={`gift-surprise${isOpen ? ' is-open' : ''}`}>
        <div className="gift-stage">
          <div className="gift-stage-aura" aria-hidden="true" />
          {isOpen && <div className="gift-light-burst" aria-hidden="true" />}
          {isOpen && (
            <div className="gift-particles" aria-hidden="true">
              {CELEBRATION_PARTICLES.map((particle) => (
                <span
                  key={particle.id}
                  className="gift-particle"
                  style={{
                    left: particle.left,
                    top: particle.top,
                    animationDelay: particle.delay,
                  }}
                >
                  {particle.symbol}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            className="gift-box-trigger"
            onClick={() => setIsOpen(true)}
            disabled={isOpen}
            aria-label="Open the special gift for Karthi"
            aria-expanded={isOpen}
          >
            <span className="gift-box" aria-hidden="true">
              <span className="gift-box-inside" />
              <span className="gift-box-body">
                <span className="gift-ribbon gift-ribbon-front" />
                <span className="gift-ribbon gift-ribbon-side" />
              </span>
              <span className="gift-box-lid">
                <span className="gift-ribbon gift-ribbon-lid" />
                <span className="gift-bow">
                  <span className="gift-bow-loop gift-bow-loop-left" />
                  <span className="gift-bow-loop gift-bow-loop-right" />
                  <span className="gift-bow-knot" />
                </span>
              </span>
            </span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="gift-photo-reveal"
                initial={{ opacity: 0, x: '-50%', y: prefersReducedMotion ? 0 : 120, scale: prefersReducedMotion ? 1 : 0.45 }}
                animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.95,
                  delay: prefersReducedMotion ? 0 : 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  className="gift-photo-button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="View the birthday photo larger"
                >
                  <img
                    src={PHOTO_PATH}
                    alt="A special birthday photo for Karthi"
                    className="gift-photo"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isOpen ? (
          <p className="gift-open-hint">Tap to Open 🎁</p>
        ) : (
          <motion.div
            className="gift-birthday-message"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.65, delay: prefersReducedMotion ? 0 : 0.85 }}
          >
            <h3>Happy Birthday, KARTHI ❤️</h3>
            <p>You are my favourite person, today and always. 💖</p>
            <span>Made with Love 💌</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="gift-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Birthday photo enlarged"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              type="button"
              className="gift-lightbox-close"
              autoFocus
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close enlarged photo"
            >
              ×
            </button>
            <motion.img
              src={PHOTO_PATH}
              alt="A special birthday photo for Karthi"
              className="gift-lightbox-image"
              initial={{ scale: prefersReducedMotion ? 1 : 0.92 }}
              animate={{ scale: 1 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
