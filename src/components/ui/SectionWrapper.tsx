import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({ id, children, className, title, subtitle }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('section-padding relative', className)}>
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title && <h2 className="section-title text-gradient-gold">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </motion.div>
      )}
      {children}
    </section>
  );
}
