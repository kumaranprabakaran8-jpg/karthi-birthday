import { createContext, useContext, useReducer, type ReactNode, useEffect } from 'react';

export type Theme = 'dark' | 'light';
export type ParticleMode = 'hearts' | 'snow' | 'none';

interface AppState {
  theme: Theme;
  particleMode: ParticleMode;
  isUnlocked: boolean;
  hasSeenIntro: boolean;
  recipientName: string;
  musicPlaying: boolean;
  musicVolume: number;
  currentTrackIndex: number;
  showLoading: boolean;
}

type Action =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_PARTICLE_MODE'; payload: ParticleMode }
  | { type: 'UNLOCK'; payload: string }
  | { type: 'COMPLETE_INTRO' }
  | { type: 'SET_MUSIC_PLAYING'; payload: boolean }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_TRACK'; payload: number }
  | { type: 'NEXT_TRACK'; max: number }
  | { type: 'PREV_TRACK'; max: number }
  | { type: 'HIDE_LOADING' };

const STORAGE_KEY = 'karthi-birthday-state';

const getInitialState = (): AppState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed, musicPlaying: false, showLoading: true };
    } catch {
      /* ignore */
    }
  }
  return defaultState;
};

const defaultState: AppState = {
  theme: 'dark',
  particleMode: 'hearts',
  isUnlocked: false,
  hasSeenIntro: false,
  recipientName: 'KARTHI',
  musicPlaying: false,
  musicVolume: 0.5,
  currentTrackIndex: 0,
  showLoading: true,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_PARTICLE_MODE':
      return { ...state, particleMode: action.payload };
    case 'UNLOCK':
      return { ...state, isUnlocked: true, recipientName: action.payload };
    case 'COMPLETE_INTRO':
      return { ...state, hasSeenIntro: true };
    case 'SET_MUSIC_PLAYING':
      return { ...state, musicPlaying: action.payload };
    case 'SET_VOLUME':
      return { ...state, musicVolume: action.payload };
    case 'SET_TRACK':
      return { ...state, currentTrackIndex: action.payload };
    case 'NEXT_TRACK':
      return { ...state, currentTrackIndex: (state.currentTrackIndex + 1) % action.max };
    case 'PREV_TRACK':
      return { ...state, currentTrackIndex: (state.currentTrackIndex - 1 + action.max) % action.max };
    case 'HIDE_LOADING':
      return { ...state, showLoading: false };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState, getInitialState);

  useEffect(() => {
    const { showLoading: _, ...persist } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
    document.documentElement.classList.toggle('light', state.theme === 'light');
  }, [state.theme]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
