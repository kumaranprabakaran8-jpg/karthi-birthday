import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useCountdown } from '@/hooks';
import { SITE_CONFIG } from '@/config/site';
import { getNextBirthday } from '@/utils';

export function CountdownSection() {
  const nextBirthday = getNextBirthday(SITE_CONFIG.birthdayDate);
  const targetStr = nextBirthday.toISOString().split('T')[0];
  const timeLeft = useCountdown(targetStr);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const progress = 1 - timeLeft.total / (365 * 24 * 60 * 60 * 1000);

  return (
    <SectionWrapper
      id="countdown"
      title="Until Your Next Birthday"
      subtitle="The countdown to another year of celebrating the most amazing person alive."
    >
      <div className="max-w-3xl mx-auto">
        {/* Circular progress */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="4" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progress) }}
              transition={{ duration: 1.5 }}
            />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#f5e6a3" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl text-gradient-gold">{timeLeft.days}</span>
            <span className="font-sans text-xs uppercase tracking-widest opacity-50">Days Left</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {units.map((unit, i) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-gold rounded-2xl p-6 text-center"
            >
              <span className="font-display text-4xl md:text-5xl text-gradient-gold block">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-sm uppercase tracking-widest opacity-50 mt-1 block">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
