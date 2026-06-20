import { useRef, useEffect, useMemo, useState } from 'react';
import { Howl } from 'howler';

const soundFiles = {
  pop: '/sounds/pop.mp3',
  brush: '/sounds/brush.mp3',
  complete: '/sounds/complete.mp3',
  click: '/sounds/click.mp3',
  sparkle: '/sounds/sparkle.mp3',
  erase: '/sounds/erase.mp3'
};

export const useSound = () => {
  const [isAudioReady, setIsAudioReady] = useState(false);
  const sounds = useMemo(() => {
    const loadedSounds = {};
    Object.entries(soundFiles).forEach(([name, path]) => {
      loadedSounds[name] = new Howl({
        src: [path],
        volume: 0.4,
        preload: true,
        autoplay: false,
      });
    });
    return loadedSounds;
  }, []);

  // Resume AudioContext on the first user interaction
  useEffect(() => {
    const resumeAudio = () => {
      try {
        if (window.Howler?.ctx && window.Howler.ctx.state === 'suspended') {
          window.Howler.ctx.resume().then(() => {
            setIsAudioReady(true);
          }).catch(() => {});
        } else {
          setIsAudioReady(true);
        }
      } catch (e) {
        // Ignore errors
      }
    };

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, resumeAudio, { once: false, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resumeAudio);
      });
    };
  }, []);

  const play = (name) => {
    if (!isAudioReady) return;
    try {
      if (sounds[name]) {
        sounds[name].play();
      }
    } catch (e) {
      // Silently fail
    }
  };

  return { play, isAudioReady };
};