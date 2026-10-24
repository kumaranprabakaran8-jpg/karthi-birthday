import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils';

type AnimatedButtonProps = {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
} & Pick<
  HTMLMotionProps<'button'>,
  'onClick' | 'disabled' | 'type' | 'aria-label' | 'aria-expanded' | 'aria-controls'
>;

export function AnimatedButton({
  variant = 'primary',
  children,
  className,
  disabled,
  onClick,
  type = 'button',
  ...rest
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={cn(
        variant === 'primary' ? 'btn-luxury' : 'btn-luxury-outline',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
