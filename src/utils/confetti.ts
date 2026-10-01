import confetti from 'canvas-confetti';

/**
 * Fires a dual-cannon celebratory confetti explosion from both bottom corners
 * of the screen with emerald and gold sparkles.
 */
export const fireDualCannonConfetti = () => {
  try {
    const goldAndEmeraldPalette = [
      '#F59E0B', // Amber 500
      '#FBBF24', // Amber 400
      '#FCD34D', // Amber 300
      '#10B981', // Emerald 500
      '#34D399', // Emerald 400
      '#059669', // Emerald 600
      '#FFFFFF', // White Sparkle
    ];

    // Left cannon blast
    confetti({
      particleCount: 90,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors: goldAndEmeraldPalette,
      zIndex: 99999,
      scalar: 1.1,
    });

    // Right cannon blast
    confetti({
      particleCount: 90,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors: goldAndEmeraldPalette,
      zIndex: 99999,
      scalar: 1.1,
    });

    // Secondary delayed micro-burst of trailing sparkles after 250ms
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 65,
        spread: 85,
        origin: { x: 0.05, y: 0.7 },
        colors: ['#FCD34D', '#6EE7B7', '#F59E0B', '#34D399'],
        zIndex: 99999,
      });

      confetti({
        particleCount: 50,
        angle: 115,
        spread: 85,
        origin: { x: 0.95, y: 0.7 },
        colors: ['#FCD34D', '#6EE7B7', '#F59E0B', '#34D399'],
        zIndex: 99999,
      });
    }, 250);
  } catch (err) {
    console.warn('Confetti animation failed to trigger:', err);
  }
};
