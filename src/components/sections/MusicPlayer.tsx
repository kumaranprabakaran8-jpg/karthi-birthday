import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiPause, HiVolumeUp, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useApp } from '@/context/AppContext';
import { MUSIC_PLAYLIST } from '@/config/site';

export function MusicPlayer() {
  const { state, dispatch } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = MUSIC_PLAYLIST[state.currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = state.musicVolume;
    if (state.musicPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [state.musicPlaying, state.musicVolume, state.currentTrackIndex]);

  const togglePlay = () => dispatch({ type: 'SET_MUSIC_PLAYING', payload: !state.musicPlaying });

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed bottom-6 left-6 z-[9980] max-w-xs w-full"
    >
      <div className="glass-gold rounded-2xl p-4 shadow-luxury">
        <audio ref={audioRef} src={track.url} loop={false} onEnded={() => dispatch({ type: 'NEXT_TRACK', max: MUSIC_PLAYLIST.length })} />

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-luxury-black font-bold text-sm">
            ♪
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-sm font-medium truncate">{track.title}</p>
            <p className="font-sans text-xs opacity-50 truncate">{track.artist}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-3">
          <button
            onClick={() => dispatch({ type: 'PREV_TRACK', max: MUSIC_PLAYLIST.length })}
            className="p-1 hover:text-luxury-gold transition-colors"
            aria-label="Previous track"
          >
            <HiChevronLeft size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-luxury-black"
            aria-label={state.musicPlaying ? 'Pause' : 'Play'}
          >
            {state.musicPlaying ? <HiPause size={18} /> : <HiPlay size={18} />}
          </button>
          <button
            onClick={() => dispatch({ type: 'NEXT_TRACK', max: MUSIC_PLAYLIST.length })}
            className="p-1 hover:text-luxury-gold transition-colors"
            aria-label="Next track"
          >
            <HiChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <HiVolumeUp size={16} className="opacity-50 shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={state.musicVolume}
            onChange={(e) => dispatch({ type: 'SET_VOLUME', payload: parseFloat(e.target.value) })}
            className="w-full accent-luxury-gold"
            aria-label="Volume"
          />
        </div>

        <div className="mt-2 flex gap-1">
          {MUSIC_PLAYLIST.map((t, i) => (
            <button
              key={t.id}
              onClick={() => dispatch({ type: 'SET_TRACK', payload: i })}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i === state.currentTrackIndex ? 'bg-luxury-gold' : 'bg-white/10'
              }`}
              aria-label={`Track ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
