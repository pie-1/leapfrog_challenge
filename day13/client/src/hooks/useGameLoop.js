import { useEffect, useRef, useCallback } from 'react';

export const useGameLoop = (callback, fps = 60) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(0);
  const frameInterval = 1000 / fps;
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      if (deltaTime >= frameInterval) {
        callbackRef.current(deltaTime);
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [frameInterval]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [animate]);

  return {
    start: useCallback(() => {
      previousTimeRef.current = 0;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = requestAnimationFrame(animate);
    }, [animate]),
    stop: useCallback(() => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    }, [])
  };
};