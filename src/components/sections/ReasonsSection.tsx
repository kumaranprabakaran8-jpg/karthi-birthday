import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { REASONS } from '@/config/site';

function TiltCard({ reason, index }: { reason: typeof REASONS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]));

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="glass-gold rounded-2xl p-6 hover:shadow-glow transition-shadow duration-500"
    >
      <span className="text-4xl mb-4 block">{reason.icon}</span>
      <h3 className="font-display text-xl text-luxury-gold mb-2">{reason.title}</h3>
      <p className="font-body opacity-70 leading-relaxed">{reason.description}</p>
    </motion.div>
  );
}

export function ReasonsSection() {
  return (
    <SectionWrapper
      id="reasons"
      title="Reasons You're Special"
      subtitle="Six reasons among infinite — why you are the most precious person in my universe."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
        {REASONS.map((reason, index) => (
          <TiltCard key={reason.title} reason={reason} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
