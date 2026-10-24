import React, { useState, useEffect, useRef } from 'react';
import type { Language } from './Navbar';

interface LoadingScreenProps {
  language: Language;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ language, onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [useFallbackPoster, setUseFallbackPoster] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transition out over 400ms after the presentation is complete
  const handleTransitionOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 400);
  };

  // Called when video playback has successfully ended
  const handleVideoEnd = () => {
    handleTransitionOut();
  };

  // Called when the video fails to load or browser cannot play it
  const handleFallback = () => {
    setUseFallbackPoster(true);
    // Display the final glowing poster frame briefly, then fade out smoothly
    setTimeout(() => {
      handleTransitionOut();
    }, 1200);
  };

  useEffect(() => {
    // If prefers-reduced-motion is enabled, show the poster immediately with no animation, then close
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setUseFallbackPoster(true);
      const timer = setTimeout(() => {
        handleTransitionOut();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Ensure the video plays once without looping
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if browser autoplay policies reject playback
        handleFallback();
      });
    }
  }, []);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={language === 'ar' ? 'جاري تحميل منصة مهنة' : 'Loading MEHNA platform'}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 9999,
        backgroundColor: '#EBE3D3',
      }}
      className={`flex flex-col items-center justify-center transition-opacity duration-400 ease-out select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 
        Safe area content wrapper:
        Padding handles top status bar and bottom navigation bar insets,
        keeping the emblem vertically centered in the middle third of the viewport.
      */}
      <div
        className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
        }}
      >
        {useFallbackPoster ? (
          <img
            src={`${import.meta.env.BASE_URL}emblem-demo-512.png`}
            alt={language === 'ar' ? 'شعار منصة مهنة' : 'MEHNA Emblem'}
            className="w-full h-full object-contain select-none pointer-events-none p-6"
            style={{
              maxHeight: '60dvh',
              maxWidth: '85vw',
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}${isMobileScreen ? 'mobile_intro.webm' : 'desktop_intro.webm'}`}
            poster={`${import.meta.env.BASE_URL}emblem-demo-512.png`}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleFallback}
            className="w-full h-full object-cover select-none pointer-events-none bg-transparent"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </div>
    </div>
  );
};
