import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, gold, onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'rounded-2xl p-6 transition-shadow duration-500',
        gold ? 'glass-gold' : 'glass',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </motion.div>
  );
}
