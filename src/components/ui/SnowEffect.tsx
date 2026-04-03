'use client';

import '../../app/snow-effect.css';

interface SnowflakeConfig {
  left: string;
  width: number;
  height: number;
  delay: number;
  duration: number;
  sway: number;
  opacity: number;
  blur: number;
}

const SNOWFLAKES: SnowflakeConfig[] = [
  { left: '4%', width: 36, height: 36, delay: 0, duration: 17, sway: 14, opacity: 0.92, blur: 0.3 },
  { left: '10%', width: 28, height: 28, delay: 1.1, duration: 13, sway: 10, opacity: 0.98, blur: 0.2 },
  { left: '18%', width: 46, height: 46, delay: 2.3, duration: 19, sway: 20, opacity: 0.9, blur: 0.45 },
  { left: '26%', width: 30, height: 30, delay: 0.7, duration: 14, sway: 16, opacity: 0.95, blur: 0.25 },
  { left: '34%', width: 52, height: 52, delay: 1.9, duration: 20, sway: 22, opacity: 0.88, blur: 0.5 },
  { left: '42%', width: 32, height: 32, delay: 2.8, duration: 15, sway: 12, opacity: 0.97, blur: 0.3 },
  { left: '50%', width: 40, height: 40, delay: 0.8, duration: 16, sway: 18, opacity: 0.93, blur: 0.35 },
  { left: '60%', width: 28, height: 28, delay: 1.6, duration: 13.5, sway: 14, opacity: 0.99, blur: 0.22 },
  { left: '68%', width: 48, height: 48, delay: 0.4, duration: 18, sway: 24, opacity: 0.9, blur: 0.45 },
  { left: '75%', width: 30, height: 30, delay: 2, duration: 14.2, sway: 13, opacity: 0.96, blur: 0.24 },
  { left: '82%', width: 34, height: 34, delay: 1.2, duration: 15.5, sway: 17, opacity: 0.94, blur: 0.28 },
  { left: '90%', width: 54, height: 54, delay: 2.9, duration: 21, sway: 26, opacity: 0.87, blur: 0.55 },
  { left: '22%', width: 30, height: 30, delay: 0.5, duration: 12.8, sway: 11, opacity: 0.98, blur: 0.23 },
  { left: '48%', width: 50, height: 50, delay: 1.7, duration: 19, sway: 23, opacity: 0.89, blur: 0.5 },
  { left: '78%', width: 32, height: 32, delay: 2.4, duration: 14.8, sway: 15, opacity: 0.95, blur: 0.27 },
];

export default function SnowEffect() {
  return (
    <div className="snow-container">
      {SNOWFLAKES.map((flake, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: flake.left,
            width: `${flake.width}px`,
            height: `${flake.height}px`,
            '--fall-duration': `${flake.duration}s`,
            '--sway-strength': `${flake.sway}px`,
            '--flake-opacity': flake.opacity,
            animationDelay: `${flake.delay}s`,
            filter: `blur(${flake.blur}px)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

