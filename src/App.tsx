import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useCursorGlow } from '@/hooks';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { FloatingParticles } from '@/components/effects/Particles';
import { PasswordScreen } from '@/components/sections/PasswordScreen';
import { CinematicIntro } from '@/components/sections/CinematicIntro';
import { CelebrationPage } from '@/pages/CelebrationPage';
import { SITE_CONFIG } from '@/config/site';

function ProtectedRoute({ children, requireIntro = false }: { children: React.ReactNode; requireIntro?: boolean }) {
  const { state } = useApp();
  if (!state.isUnlocked) return <Navigate to="/" replace />;
  if (requireIntro && !state.hasSeenIntro) return <Navigate to="/intro" replace />;
  return <>{children}</>;
}

export default function App() {
  const { state, dispatch } = useApp();
  useCursorGlow();

  useEffect(() => {
    const timer = setTimeout(() => dispatch({ type: 'HIDE_LOADING' }), 2800);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (SITE_CONFIG.analyticsId && SITE_CONFIG.analyticsId !== 'G-XXXXXXXXXX') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.analyticsId}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer ?? [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', SITE_CONFIG.analyticsId);
    }
  }, []);

  return (
    <>
      <LoadingScreen />
      {!state.showLoading && (
        <>
          <ScrollProgressBar />
          <FloatingParticles />
          <Routes>
            <Route
              path="/"
              element={
                state.isUnlocked ? (
                  state.hasSeenIntro ? (
                    <Navigate to="/celebration" replace />
                  ) : (
                    <Navigate to="/intro" replace />
                  )
                ) : (
                  <PasswordScreen />
                )
              }
            />
            <Route
              path="/intro"
              element={
                <ProtectedRoute>
                  <CinematicIntro />
                </ProtectedRoute>
              }
            />
            <Route
              path="/celebration"
              element={
                <ProtectedRoute requireIntro>
                  <CelebrationPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {state.isUnlocked && state.hasSeenIntro && <ScrollToTop />}
        </>
      )}
    </>
  );
}
