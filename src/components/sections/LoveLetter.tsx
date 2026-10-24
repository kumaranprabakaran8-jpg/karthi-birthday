import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pdf } from '@react-pdf/renderer';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { LOVE_LETTER } from '@/config/site';
import { useTypewriter } from '@/hooks';
import { LoveLetterPDF } from '@/components/pdf/LoveLetterPDF';
import { trackEvent } from '@/utils';

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const { displayed, done } = useTypewriter(LOVE_LETTER, 30, showText);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowText(true), 800);
    trackEvent('love_letter_open');
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<LoveLetterPDF content={LOVE_LETTER} recipient="KARTHI" />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'love-letter-for-karthi.pdf';
    a.click();
    URL.revokeObjectURL(url);
    trackEvent('download', { type: 'love-letter-pdf' });
  };

  return (
    <SectionWrapper
      id="love-letter"
      title="A Letter From My Heart"
      subtitle="Words penned with love, sealed with a kiss, waiting just for you."
    >
      <div className="max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="cursor-pointer"
              onClick={handleOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
              aria-label="Open love letter envelope"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative mx-auto w-64 h-40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-pink/30 to-luxury-gold/20 rounded-lg shadow-luxury border border-luxury-gold/30" />
                <div
                  className="absolute top-0 left-0 right-0 h-20 bg-luxury-pink/40 origin-top"
                  style={{ clipPath: 'polygon(0 0, 50% 70%, 100% 0)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl text-luxury-gold">Click to Open ♥</span>
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-luxury-pink/50"
                    style={{ left: `${10 + i * 20}%`, top: '-20px' }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    ♥
                  </motion.span>
                ))}
              </motion.div>
              <p className="mt-6 font-body italic opacity-60">Tap the envelope to reveal your letter</p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="glass-gold rounded-2xl p-8 md:p-12 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-3xl" />
                <p className="font-body text-lg md:text-xl leading-relaxed whitespace-pre-line opacity-90 min-h-[300px]">
                  {displayed}
                  {!done && (
                    <span className="inline-block w-0.5 h-5 bg-luxury-gold ml-0.5 animate-pulse" />
                  )}
                </p>
                {done && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 flex flex-wrap gap-4 justify-center"
                  >
                    <AnimatedButton onClick={handleDownloadPDF}>Download as PDF</AnimatedButton>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
