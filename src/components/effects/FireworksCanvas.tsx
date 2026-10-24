import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FireworksCanvasProps {
  active: boolean;
  message?: string;
}

export function FireworksCanvas({ active, message }: FireworksCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }

    const particles: Particle[] = [];
    const colors = ['#d4af37', '#f5e6a3', '#ffb6c1', '#ffffff', '#b8860b'];

    const createBurst = (x: number, y: number) => {
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60;
        const speed = Math.random() * 4 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1,
        });
      }
    };

    let frame = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (frame % 30 === 0) {
        createBurst(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.6
        );
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.015;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame++;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <div className="relative w-full h-full min-h-[60vh]">
      {active && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      )}
      {message && active && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-display text-3xl md:text-5xl text-gradient-gold text-center px-4 animate-pulse-glow">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export function GiftBoxAnimation({ isOpen, onOpenComplete }: { isOpen: boolean; onOpenComplete?: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !boxRef.current || !lidRef.current) return;
    const tl = gsap.timeline({ onComplete: onOpenComplete });
    tl.to(lidRef.current, { rotationX: -120, y: -40, duration: 1, ease: 'power2.out' })
      .to(boxRef.current, { scale: 1.05, duration: 0.5 }, '-=0.5');
    return () => { tl.kill(); };
  }, [isOpen, onOpenComplete]);

  return (
    <div className="perspective-[800px] mx-auto w-48 h-48" style={{ perspective: '800px' }}>
      <div ref={boxRef} className="relative w-full h-full">
        <div
          ref={lidRef}
          className="absolute top-0 left-0 w-full h-1/3 bg-gold-gradient rounded-t-lg origin-bottom shadow-glow z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-full bg-luxury-pink/80 rounded" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-4 bg-luxury-pink/80 rounded" />
        </div>
        <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-b from-luxury-gold-dark to-luxury-gold rounded-b-lg shadow-luxury">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-luxury-pink/60" />
        </div>
        {isOpen && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-2xl animate-float"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 40}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {['🌸', '💗', '✨', '🎀'][i % 4]}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
