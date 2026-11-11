import React, { useState, useEffect, useRef } from 'react';
import type { Language } from './Navbar';

interface LoadingScreenProps {
  language: Language;
  onComplete: () => void;
}

/**
 * MEHNA Splash Screen — Phase-based state machine
 *
 * Phase sequence (normal path):
 *   'logo-in'   (0 → 700ms)   — logo PNG fades in from transparent
 *   'logo-hold' (700 → 1600ms) — logo fully visible, user reads it
 *   'logo-out'  (1600 → 2200ms)— logo fades out to transparent
 *   'video'     (2200ms+)      — intro video plays, no poster image
 *   'done'                     — onComplete() called, component unmounts
 *
 * Why this approach instead of the old poster/fallback method:
 * The <video poster> attribute renders a still image the moment the video
 * element is mounted, BEFORE the user sees anything else — causing that
 * jarring large logo flash. By controlling the logo as a separate <img>
 * with explicit opacity transitions, we own the exact timing of every phase.
 * The video element is only made visible once the logo has fully faded out,
 * so there's zero chance of both being visible simultaneously.
 *
 * prefers-reduced-motion: skip all animations, show logo briefly, done.
 * Safety timeout: 7s max total to protect against video stall / headless env.
 */

type SplashPhase = 'logo-in' | 'logo-hold' | 'logo-out' | 'video' | 'done';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ language, onComplete }) => {
  const [phase, setPhase] = useState<SplashPhase>('logo-in');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return true; // default to mobile layout for Capacitor
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Track all timers so we can clear them all if the component unmounts early
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  // Window resize tracking — determines which intro video to play
  useEffect(() => {
    const handleResize = () => setIsMobileScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Main splash orchestration ──
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Safety net: no matter what happens, we exit after 7 seconds
    const safetyTimer = addTimer(() => handleDone(), 7000);

    if (reducedMotion) {
      // Respect accessibility: skip animations, show static logo briefly then exit
      setPhase('logo-hold');
      addTimer(() => handleDone(), 1500);
      return () => timersRef.current.forEach(clearTimeout);
    }

    // Phase timing (all durations are intentional — tested for feel):
    //   logo-in  ends at  700ms  (600ms CSS fade + 100ms buffer)
    //   logo-hold ends at 1600ms (900ms of full visibility)
    //   logo-out  ends at 2200ms (600ms CSS fade)
    //   video plays from 2200ms onward
    addTimer(() => setPhase('logo-hold'), 700);
    addTimer(() => setPhase('logo-out'), 1600);
    addTimer(() => {
      setPhase('video');
      // Video play is triggered reactively in the next useEffect
    }, 2200);

    return () => {
      timersRef.current.forEach(clearTimeout);
      clearTimeout(safetyTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Video playback trigger ──
  // Runs whenever phase changes to 'video'. We trigger play() here rather
  // than relying on the autoPlay attribute alone because some browsers
  // (especially WebView on Android) are stricter about autoPlay without
  // an explicit .play() call after a user gesture or programmatic signal.
  useEffect(() => {
    if (phase !== 'video') return;
    if (!videoRef.current) return;

    videoRef.current.play().catch(() => {
      // If the browser blocks autoplay (strict policy), skip straight to done
      handleDone();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Called when video ends naturally
  const handleVideoEnd = () => {
    handleDone();
  };

  // Called if the video fails to load at all
  const handleVideoError = () => {
    handleDone();
  };

  // Shared exit path: fade the whole screen out over 400ms then call onComplete
  const handleDone = () => {
    // Guard against being called multiple times (safety timer + video end race)
    if (phase === 'done') return;
    timersRef.current.forEach(clearTimeout);
    setIsFadingOut(true);
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 400);
  };

  // Component is fully gone — render nothing (prevents ghost layer)
  if (phase === 'done') return null;

  // ── Logo opacity by phase ──
  // We drive opacity via inline style so there's no Tailwind purge risk and
  // the transition timing matches our phase durations exactly.
  const logoOpacity =
    phase === 'logo-in'   ? 1 :   // fading IN  (CSS transition handles 0→1)
    phase === 'logo-hold' ? 1 :   // fully visible
    phase === 'logo-out'  ? 0 :   // fading OUT (CSS transition handles 1→0)
    0;                            // 'video' phase: logo completely gone

  // Video is visible only during 'video' phase; opacity: 0 during logo phases
  // ensures no flash of the video frame before the logo fully exits.
  const videoOpacity = phase === 'video' ? 1 : 0;

  return (
    <div
      role="status"
      onClick={handleDone}  // tap anywhere to skip
      aria-live="polite"
      aria-label={language === 'ar' ? 'جاري تحميل منصة مهنة' : 'Loading MEHNA platform'}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 9999,
        // Brand cream background — matches the intro video's own background color
        // so there's zero color jump when the video begins
        backgroundColor: '#EBE3D3',
        // Screen-level fade out at the very end
        opacity: isFadingOut ? 0 : 1,
        transition: isFadingOut ? 'opacity 400ms ease-out' : 'none',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
      className="select-none overflow-hidden"
    >
      {/* Safe-area wrapper: handles iOS notch, Android status bar, and home
          indicator insets so content is always in the visual safe zone */}
      <div
        className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
        }}
      >

        {/* ── Logo PNG Phase ──
            This is the full portrait MEHNA brand image (arch + مهنة + MEHNA wordmark).
            It's layered ABOVE the video using z-index so we can fade it out cleanly
            without the video being visible through it prematurely.
            object-contain preserves the aspect ratio exactly — no cropping. */}
        {phase !== 'video' && (
          <img
            src={`${import.meta.env.BASE_URL}logo-stop-screen.png`}
            alt={language === 'ar' ? 'شعار منصة مهنة' : 'MEHNA Logo'}
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',  // contain keeps logo crisp, no stretching
              // Tight max dimensions prevent the logo from touching screen edges
              maxWidth: '78vw',
              maxHeight: '75dvh',
              // Center inside the absolute inset:0 box
              margin: 'auto',
              opacity: logoOpacity,
              // Duration matches phase timing: 600ms for in/out, 0ms for hold
              transition: phase === 'logo-hold'
                ? 'none'   // already at target opacity — no transition needed
                : 'opacity 600ms ease-in-out',
              zIndex: 2,
              pointerEvents: 'none',
              userSelect: 'none',
              // Crisp rendering for the high-res PNG on retina screens
              imageRendering: 'crisp-edges',
            }}
          />
        )}

        {/* ── Intro Video Phase ──
            Mounted from the start but hidden (opacity:0) so the browser can
            pre-buffer the video while the logo is showing. This eliminates
            any black-frame or stutter when the video becomes visible.
            NO poster attribute — removing poster is what stops the old emblem
            flash. The backgroundColor on the outer container acts as the visual
            background during video loading, matching the video's own bg color. */}
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}${isMobileScreen ? 'mobile_intro.webm' : 'desktop_intro.webm'}`}
          // No poster= attribute — poster was the source of the emblem flash bug
          muted
          playsInline
          preload="auto"  // start buffering immediately so video is ready by the time logo fades
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoOpacity,
            // Fade video in gently once logo is fully gone — prevents hard cut
            transition: phase === 'video' ? 'opacity 300ms ease-in' : 'none',
            zIndex: 1,
            pointerEvents: 'none',
            backgroundColor: 'transparent',
          }}
        />

      </div>
    </div>
  );
};

export default LoadingScreen;
