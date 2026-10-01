import { useState, useEffect } from 'react';

export interface CountdownTime {
  hours: string;
  minutes: string;
  seconds: string;
  totalMilliseconds: number;
}

const STORAGE_KEY = 'temo_timer_expiry';
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

export function useCountdownTimer(): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => {
    return {
      hours: '03',
      minutes: '59',
      seconds: '59',
      totalMilliseconds: FOUR_HOURS_MS,
    };
  });

  useEffect(() => {
    let now = Date.now();
    let storedExpiry = localStorage.getItem(STORAGE_KEY);
    let expiry = storedExpiry ? parseInt(storedExpiry, 10) : null;

    if (!expiry || isNaN(expiry) || now > expiry) {
      expiry = now + FOUR_HOURS_MS;
      localStorage.setItem(STORAGE_KEY, expiry.toString());
    }

    const calculateTime = () => {
      const current = Date.now();
      let diff = (expiry as number) - current;

      if (diff <= 0) {
        // Reset cycle as defined in specification
        expiry = current + FOUR_HOURS_MS;
        localStorage.setItem(STORAGE_KEY, expiry.toString());
        diff = FOUR_HOURS_MS;
      }

      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
        totalMilliseconds: diff,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
