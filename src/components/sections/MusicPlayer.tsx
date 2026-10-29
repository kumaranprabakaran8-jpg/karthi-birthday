import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiAdjustments, HiMusicNote, HiPause, HiPlay, HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useApp } from '@/context/AppContext';

const MUSIC_SRC = `${import.meta.env.BASE_URL}music/birthday.mp3`;
const FADE_IN_DURATION = 1400;

export function MusicPlayer() {
  const { state, dispatch } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const musicVolumeRef = useRef(state.musicVolume);
  const startPlaybackRef = useRef<() => void>(() => undefined);
  const playbackRequestRef = useRef(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playbackError, setPlaybackError] = useState('');

  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const requestId = ++playbackRequestRef.current;
    setPlaybackError('');
    audio.muted = isMuted;
    let resumeAudioContext = Promise.resolve();

    if (typeof window.AudioContext !== 'undefined') {
      if (!audioContextRef.current) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audio);
        const gainNode = audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        audioContextRef.current = audioContext;
        gainNodeRef.current = gainNode;
      }

      const audioContext = audioContextRef.current;
      if (audioContext.state === 'suspended') resumeAudioContext = audioContext.resume();
      const gainNode = gainNodeRef.current;
      if (gainNode) gainNode.gain.value = 0;
      audio.volume = 1;
    } else {
      audio.volume = 0;
    }

    Promise.all([audio.play(), resumeAudioContext]).then(() => {
      if (requestId !== playbackRequestRef.current || audio.paused) return;

      dispatch({ type: 'SET_MUSIC_PLAYING', payload: true });
      const fadeStartedAt = performance.now();
      const fadeIn = (now: number) => {
        if (audio.paused || !audio.isConnected) return;
        const progress = Math.min((now - fadeStartedAt) / FADE_IN_DURATION, 1);
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.value = musicVolumeRef.current * progress;
        } else {
          audio.volume = musicVolumeRef.current * progress;
        }
        if (progress < 1) requestAnimationFrame(fadeIn);
      };

      requestAnimationFrame(fadeIn);
    }).catch((error: unknown) => {
      if (requestId !== playbackRequestRef.current) return;
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: false });
      setPlaybackError(
        error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'Tap play to start your music.'
          : 'Music could not be loaded. Check public/music/birthday.mp3.'
      );
    });
  }, [dispatch, isMuted]);

  useEffect(() => {
    startPlaybackRef.current = startPlayback;
  }, [startPlayback]);

  useEffect(() => {
    const startAfterInteraction = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('[data-music-toggle]')) return;

      document.removeEventListener('pointerdown', startAfterInteraction);
      document.removeEventListener('keydown', startAfterKeydown);
      startPlaybackRef.current();
    };

    const startAfterKeydown = (event: KeyboardEvent) => {
      if (['Tab', 'Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;
      startAfterInteraction(event);
    };

    document.addEventListener('pointerdown', startAfterInteraction);
    document.addEventListener('keydown', startAfterKeydown);
    return () => {
      document.removeEventListener('pointerdown', startAfterInteraction);
      document.removeEventListener('keydown', startAfterKeydown);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    musicVolumeRef.current = state.musicVolume;
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = state.musicVolume;
    } else {
      audio.volume = state.musicVolume;
    }
    audio.muted = isMuted;
  }, [isMuted, state.musicVolume]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (state.musicPlaying || (audio && !audio.paused)) {
      playbackRequestRef.current += 1;
      audio?.pause();
      dispatch({ type: 'SET_MUSIC_PLAYING', payload: false });
      return;
    }

    startPlayback();
  };

  const handleAudioError = () => {
    dispatch({ type: 'SET_MUSIC_PLAYING', payload: false });
    setPlaybackError('Music could not be loaded. Check public/music/birthday.mp3.');
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        className="hidden"
        loop
        preload="none"
        playsInline
        onError={handleAudioError}
      />

      {state.isUnlocked && (
        <div
          className="fixed bottom-5 right-4 z-[10010] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="glass-gold w-[min(18rem,calc(100vw-2rem))] rounded-2xl p-4 shadow-luxury"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm text-luxury-gold-light">
                      A Little Birthday Melody
                    </p>
                    <p className="font-sans text-xs opacity-60">Original instrumental</p>
                  </div>
                  <button
                    type="button"
                    data-music-toggle
                    onClick={togglePlayback}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-luxury-black transition-transform hover:scale-105"
                    aria-label={state.musicPlaying ? 'Pause background music' : 'Play background music'}
                  >
                    {state.musicPlaying ? <HiPause size={17} /> : <HiPlay size={17} />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMuted((muted) => !muted)}
                    className="rounded-full p-1 text-luxury-gold transition-colors hover:text-luxury-gold-light"
                    aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
                    aria-pressed={isMuted}
                  >
                    {isMuted || state.musicVolume === 0 ? <HiVolumeOff size={19} /> : <HiVolumeUp size={19} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={state.musicVolume}
                    onChange={(event) =>
                      dispatch({ type: 'SET_VOLUME', payload: Number.parseFloat(event.target.value) })
                    }
                    className="w-full accent-luxury-gold"
                    aria-label="Background music volume"
                  />
                </div>

                {playbackError && (
                  <p role="status" className="mt-3 text-xs leading-relaxed text-luxury-gold-light/80">
                    {playbackError}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-music-toggle
              onClick={togglePlayback}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/40 bg-gold-gradient text-luxury-black shadow-luxury transition-transform hover:scale-105 active:scale-95"
              aria-label={state.musicPlaying ? 'Pause background music' : 'Play background music'}
              aria-pressed={state.musicPlaying}
              title={playbackError || undefined}
            >
              <motion.span
                animate={state.musicPlaying ? { rotate: [0, -9, 9, 0], y: [0, -2, 0] } : { rotate: 0, y: 0 }}
                transition={state.musicPlaying ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
              >
                <HiMusicNote size={23} />
              </motion.span>
              <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-black text-luxury-gold-light">
                {state.musicPlaying ? <HiPause size={10} /> : <HiPlay size={10} />}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-black/80 text-luxury-gold shadow-glass backdrop-blur-xl transition-colors hover:bg-luxury-gold/10"
              aria-label={isExpanded ? 'Hide music controls' : 'Show music controls'}
              aria-expanded={isExpanded}
            >
              <HiAdjustments size={19} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
