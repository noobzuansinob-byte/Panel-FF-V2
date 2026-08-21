import React, { useEffect, useRef } from 'react';

interface HexStreamProps {
  opacity?: number;
  themeColor?: 'emerald' | 'cyan' | 'amber' | 'crimson';
}

export const HexStream: React.FC<HexStreamProps> = ({
  opacity = 0.15,
  themeColor = 'emerald'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getThemeHex = () => {
    switch (themeColor) {
      case 'cyan': return '#06b6d4';
      case 'amber': return '#f59e0b';
      case 'crimson': return '#f43f5e';
      case 'emerald':
      default: return '#10b981';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const characters = '0123456789ABCDEF!@#$%&*<>{}[]=+/\\';
    const fontSize = 13;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = getThemeHex();
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [themeColor]);

  return (
    <canvas
      id="hex-stream-bg-canvas"
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none w-full h-full z-0"
    />
  );
};
