import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiPause } from 'react-icons/hi';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const VOICE_URL = '/audio/your-voice.ogg';

export function VoiceMessage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    audio.addEventListener('timeupdate', update);
    return () => audio.removeEventListener('timeupdate', update);
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const bars = useMemo(
    () => Array.from({ length: 40 }, (_, i) => 20 + Math.sin(i * 0.5) * 15 + ((i * 7) % 20)),
    []
  );

  return (
    <SectionWrapper
      id="voice"
      title="A Voice From My Heart"
      subtitle="Close your eyes and listen — these words were recorded just for you."
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto glass-gold rounded-2xl p-8"
      >
        <audio ref={audioRef} src={VOICE_URL} onEnded={() => setPlaying(false)} />

        <div className="flex items-end justify-center gap-1 h-24 mb-6">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-gold-gradient"
              animate={{
                height: playing ? [h * 0.5, h, h * 0.7] : h * 0.3,
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: playing ? Infinity : 0,
                repeatType: 'reverse',
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={toggle}
            className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-luxury-black shadow-glow hover:scale-105 transition-transform"
            aria-label={playing ? 'Pause voice message' : 'Play voice message'}
          >
            {playing ? <HiPause size={28} /> : <HiPlay size={28} className="ml-1" />}
          </button>
        </div>

        <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-gradient transition-all duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <p className="text-center font-body italic opacity-60 mt-4 text-sm">
          Add your voice message as an MP3 file in the audio folder to play it here.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
