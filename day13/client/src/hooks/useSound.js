import { useRef, useCallback, useEffect, useState } from 'react';

export const useSound = () => {
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  const soundsRef = useRef({
    flap: null,
    score: null,
    die: null
  });
  const audioContextRef = useRef(null);

  // Load sounds from public folder
  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Create audio elements with proper paths
        const flapAudio = new Audio('/sounds/flap.mp3');
        const scoreAudio = new Audio('/sounds/score.mp3');
        const dieAudio = new Audio('/sounds/die.mp3');

        // Set preload
        flapAudio.preload = 'auto';
        scoreAudio.preload = 'auto';
        dieAudio.preload = 'auto';

        // Load sounds with promises
        const loadPromises = [
          new Promise((resolve) => {
            flapAudio.addEventListener('canplaythrough', resolve, { once: true });
            flapAudio.load();
          }),
          new Promise((resolve) => {
            scoreAudio.addEventListener('canplaythrough', resolve, { once: true });
            scoreAudio.load();
          }),
          new Promise((resolve) => {
            dieAudio.addEventListener('canplaythrough', resolve, { once: true });
            dieAudio.load();
          })
        ];

        // Timeout for loading (3 seconds)
        const timeoutPromise = new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });

        await Promise.race([Promise.all(loadPromises), timeoutPromise]);

        soundsRef.current = {
          flap: flapAudio,
          score: scoreAudio,
          die: dieAudio
        };
        
        setSoundsLoaded(true);
        console.log('✅ Sounds loaded successfully');
      } catch (error) {
        console.warn('⚠️ Failed to load sounds:', error);
        // Fallback: create audio context sounds
        createFallbackSounds();
        setSoundsLoaded(true);
      }
    };

    const createFallbackSounds = () => {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        const createBeep = (frequency, duration, type = 'sine', volume = 0.15) => {
          return {
            play: () => {
              try {
                const ctx = audioContextRef.current;
                if (ctx.state === 'suspended') {
                  ctx.resume();
                }
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(frequency, ctx.currentTime);
                gain.gain.setValueAtTime(volume, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + duration);
              } catch (e) {
                console.warn('Fallback sound failed:', e);
              }
            }
          };
        };

        soundsRef.current = {
          flap: { play: () => createBeep(720, 0.12, 'sine', 0.18).play() },
          score: { play: () => createBeep(880, 0.15, 'square', 0.10).play() },
          die: { play: () => createBeep(200, 0.3, 'sawtooth', 0.15).play() }
        };
        console.log('🔊 Using fallback sounds');
      } catch (error) {
        console.warn('⚠️ Failed to create fallback sounds');
        // Silent fallback
        soundsRef.current = {
          flap: { play: () => {} },
          score: { play: () => {} },
          die: { play: () => {} }
        };
      }
    };

    loadSounds();

    return () => {
      // Cleanup
      Object.values(soundsRef.current).forEach(sound => {
        if (sound instanceof Audio) {
          sound.pause();
          sound.src = '';
        }
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = useCallback((type) => {
    if (!soundsLoaded) {
      return;
    }

    const sound = soundsRef.current[type];
    if (!sound) {
      return;
    }

    try {
      // For Audio element (MP3 files)
      if (sound instanceof Audio) {
        // Reset and play
        sound.currentTime = 0;
        const playPromise = sound.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Autoplay was prevented - user needs to interact first
            if (error.name === 'NotAllowedError') {
              console.debug('Sound play prevented, waiting for user interaction');
            }
          });
        }
      } 
      // For fallback sounds
      else if (typeof sound.play === 'function') {
        sound.play();
      }
    } catch (error) {
      console.warn(`Error playing ${type}:`, error);
    }
  }, [soundsLoaded]);

  return { playSound, soundsLoaded };
};