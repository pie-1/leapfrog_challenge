import { useRef, useCallback, useEffect, useState } from 'react';

export const useSound = () => {
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  const soundsRef = useRef({
    flap: null,
    score: null,
    die: null
  });

  // Load sounds from public folder
  useEffect(() => {
    const loadSounds = async () => {
      try {
        const soundFiles = {
          flap: '/sounds/flap.mp3',
          score: '/sounds/score.mp3',
          die: '/sounds/die.mp3'
        };

        const loadSound = (url) => {
          return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.addEventListener('canplaythrough', () => resolve(audio));
            audio.addEventListener('error', reject);
            audio.load();
          });
        };

        const [flapAudio, scoreAudio, dieAudio] = await Promise.all([
          loadSound(soundFiles.flap),
          loadSound(soundFiles.score),
          loadSound(soundFiles.die)
        ]);

        soundsRef.current = {
          flap: flapAudio,
          score: scoreAudio,
          die: dieAudio
        };
        setSoundsLoaded(true);
        console.log('✅ Sounds loaded successfully');
      } catch (error) {
        console.warn('⚠️ Failed to load sound files, using fallback:', error);
        // Fallback: create audio context sounds
        createFallbackSounds();
        setSoundsLoaded(true);
      }
    };

    const createFallbackSounds = () => {
      // Create fallback using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const createBeep = (frequency, duration, type = 'sine') => {
        return {
          play: () => {
            try {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              osc.type = type;
              osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
              gain.gain.setValueAtTime(0.15, audioContext.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
              osc.connect(gain);
              gain.connect(audioContext.destination);
              osc.start();
              osc.stop(audioContext.currentTime + duration);
            } catch (e) {
              console.warn('Fallback sound failed:', e);
            }
          }
        };
      };

      soundsRef.current = {
        flap: { play: () => createBeep(720, 0.12).play() },
        score: { play: () => createBeep(880, 0.15).play() },
        die: { play: () => createBeep(200, 0.3).play() }
      };
    };

    loadSounds();
  }, []);

  const playSound = useCallback((type) => {
    if (!soundsLoaded) {
      console.warn('Sounds not loaded yet');
      return;
    }

    const sound = soundsRef.current[type];
    if (!sound) {
      console.warn(`Sound type "${type}" not found`);
      return;
    }

    try {
      // For Audio element (MP3 files)
      if (sound instanceof Audio) {
        // Reset and play
        sound.currentTime = 0;
        sound.play().catch(error => {
          console.warn(`Failed to play ${type}:`, error);
        });
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