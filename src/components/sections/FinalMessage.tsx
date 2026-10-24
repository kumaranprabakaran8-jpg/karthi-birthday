import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { StarField } from '@/components/effects/Particles';
import { FINAL_MESSAGE } from '@/config/site';
import { useApp } from '@/context/AppContext';

export function FinalMessage() {
  const { state } = useApp();

  return (
    <SectionWrapper id="final" className="relative min-h-[60vh] flex items-center overflow-hidden">
      <StarField />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-luxury-pink/20 text-2xl"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.4 }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="relative z-10 max-w-3xl mx-auto text-center px-4"
      >
        <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-8">
          One Last Thing, {state.recipientName}...
        </h2>
        <p className="font-body text-lg md:text-xl leading-relaxed opacity-80 whitespace-pre-line">
          {FINAL_MESSAGE}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
