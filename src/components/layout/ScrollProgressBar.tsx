import { useScrollProgress } from '@/hooks';

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[9998] bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    >
      <div
        className="h-full bg-gold-gradient transition-all duration-150 ease-out shadow-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
