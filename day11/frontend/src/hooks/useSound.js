import { useRef, useEffect, useMemo } from 'react';
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
  const sounds = useMemo(() => {
    const loadedSounds = {};
    Object.entries(soundFiles).forEach(([name, path]) => {
      loadedSounds[name] = new Howl({
        src: [path],
        volume: 0.5,
        preload: true,
        autoplay: false,
      });
    });
    return loadedSounds;
  }, []);

  // Resume AudioContext on first user interaction
  useEffect(() => {
    const resumeAudio = () => {
      try {
        // Howler's global AudioContext
        if (window.Howler && window.Howler.ctx && window.Howler.ctx.state === 'suspended') {
          window.Howler.ctx.resume();
        }
      } catch (e) {}
    };

    // Resume on any user interaction
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, resumeAudio, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resumeAudio);
      });
    };
  }, []);

  const play = (name) => {
    try {
      if (sounds[name]) {
        sounds[name].play();
      }
    } catch (e) {
      // Silent fail
    }
  };

  return { play };
};