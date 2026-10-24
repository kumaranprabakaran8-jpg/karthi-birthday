import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { FireworksCanvas } from '@/components/effects/FireworksCanvas';
import { FIREWORKS_MESSAGE } from '@/config/site';
import { useApp } from '@/context/AppContext';

export function FireworksSection() {
  const [active, setActive] = useState(false);
  const { state } = useApp();

  return (
    <SectionWrapper
      id="fireworks"
      title="Fireworks For You"
      subtitle="Because someone as spectacular as you deserves a sky full of golden light."
      className="min-h-[70vh] flex flex-col"
    >
      <div className="flex-1 relative rounded-2xl overflow-hidden glass-gold min-h-[50vh]">
        <FireworksCanvas
          active={active}
          message={active ? `${FIREWORKS_MESSAGE.replace('KARTHI', state.recipientName)}` : undefined}
        />
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedButton onClick={() => setActive(true)}>Launch Fireworks 🎆</AnimatedButton>
          </div>
        )}
      </div>
      {active && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6 font-body italic opacity-60"
        >
          Watch the sky celebrate you, {state.recipientName}. You deserve every sparkle.
        </motion.p>
      )}
    </SectionWrapper>
  );
}
