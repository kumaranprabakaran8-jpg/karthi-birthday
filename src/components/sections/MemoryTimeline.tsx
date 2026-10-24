import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { TIMELINE } from '@/config/site';

export function MemoryTimeline() {
  return (
    <SectionWrapper
      id="timeline"
      title="Our Story"
      subtitle="A timeline of moments that shaped the beautiful journey we share together."
      className="bg-gradient-to-b from-transparent via-luxury-gold/5 to-transparent"
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-luxury-gold/20 via-luxury-gold to-luxury-gold/20 hidden md:block" aria-hidden="true" />

        {TIMELINE.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className={`relative flex flex-col md:flex-row items-center mb-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
              <GlassCard gold className="group hover:shadow-glow transition-shadow duration-500">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="font-sans text-sm text-luxury-gold uppercase tracking-widest mb-1">{item.date}</p>
                <h3 className="font-display text-2xl text-luxury-gold-light mb-2">{item.title}</h3>
                <p className="font-body opacity-70 leading-relaxed">{item.description}</p>
              </GlassCard>
            </div>

            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-luxury-gold shadow-glow z-10" />

            <div className="hidden md:block w-1/2" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
