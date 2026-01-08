import { useState, useEffect, useCallback } from 'react';
import type { PomodoroMode } from '../types';

const TIMES = {
  focus: 25 * 60,      
  shortBreak: 5 * 60, 
  longBreak: 15 * 60, 
};

export function usePomodoro() {
  const [mode, setMode] = useState<PomodoroMode>('focus');
  const [timeLeft, setTimeLeft] = useState(TIMES.focus);
  const [isActive, setIsActive] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(TIMES[mode]);
  }, [mode]);

  const changeMode = useCallback((newMode: PomodoroMode) => {
    setMode(newMode);
    setTimeLeft(TIMES[newMode]);
    setIsActive(false);
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("Tempo finalizado! ⏰"); 
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const progress = 100 - (timeLeft / TIMES[mode]) * 100;

  return {
    mode,
    timeLeft,
    formatTime,
    isActive,
    progress,
    toggleTimer,
    resetTimer,
    changeMode
  };
}