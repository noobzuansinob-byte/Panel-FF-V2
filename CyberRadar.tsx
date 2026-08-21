import React, { useEffect, useRef } from 'react';

interface CyberRadarProps {
  active: boolean;
  targetLocked?: boolean;
  lat?: number;
  lng?: number;
  className?: string;
  themeColor?: 'emerald' | 'cyan' | 'amber' | 'crimson';
}

export const CyberRadar: React.FC<CyberRadarProps> = ({
  active,
  targetLocked = false,
  lat = -6.2297,
  lng = 106.8074,
  className = '',
  themeColor = 'emerald'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef(0);
  const blipsRef = useRef<Array<{ x: number; y: number; alpha: number; label: string }>>([]);

  const getColorTheme = () => {
    switch (themeColor) {
      case 'cyan':
        return { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)', bg: '#082f49' };
      case 'amber':
        return { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', bg: '#451a03' };
      case 'crimson':
        return { primary: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)', bg: '#4c0519' };
      case 'emerald':
      default:
        return { primary: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', bg: '#022c22' };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 15;

    // Initialize blips if empty
    if (blipsRef.current.length === 0) {
      blipsRef.current = [
        { x: centerX + radius * 0.45, y: centerY - radius * 0.3, alpha: 0.9, label: 'CELL-BTS #1' },
        { x: centerX - radius * 0.6, y: centerY - radius * 0.4, alpha: 0.7, label: 'SAT-LNK 09' },
        { x: centerX + radius * 0.2, y: centerY + radius * 0.55, alpha: 0.8, label: 'ISP-NODE 04' },
      ];
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const theme = getColorTheme();

      // Background radial gradient
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
      bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.85)');
      bgGrad.addColorStop(1, 'rgba(2, 6, 23, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer rings
      [0.25, 0.5, 0.75, 1].forEach((factor) => {
        ctx.strokeStyle = theme.primary;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * factor, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs
      ctx.strokeStyle = theme.primary;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();

      // Diagonal cross marks
      ctx.globalAlpha = 0.15;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX - radius * 0.7, centerY - radius * 0.7);
      ctx.lineTo(centerX + radius * 0.7, centerY + radius * 0.7);
      ctx.moveTo(centerX - radius * 0.7, centerY + radius * 0.7);
      ctx.lineTo(centerX + radius * 0.7, centerY - radius * 0.7);
      ctx.stroke();
      ctx.setLineDash([]);

      // Radar Sweep Line & Cone
      if (active) {
        angleRef.current = (angleRef.current + 0.035) % (Math.PI * 2);
        const currentAngle = angleRef.current;

        // Sweep cone gradient
        const sweepGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        sweepGrad.addColorStop(0, theme.glow);
        sweepGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle - 0.45, currentAngle);
        ctx.closePath();
        ctx.fillStyle = sweepGrad;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.restore();

        // Sweep line
        ctx.strokeStyle = theme.primary;
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(currentAngle) * radius, centerY + Math.sin(currentAngle) * radius);
        ctx.stroke();
      }

      // Render blips
      blipsRef.current.forEach((blip) => {
        ctx.fillStyle = theme.primary;
        ctx.globalAlpha = blip.alpha;
        ctx.beginPath();
        ctx.arc(blip.x, blip.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '9px monospace';
        ctx.fillStyle = theme.primary;
        ctx.fillText(blip.label, blip.x + 6, blip.y + 3);
      });

      // Target Locked Center Indicator
      if (targetLocked) {
        const pulse = (Math.sin(Date.now() / 200) + 1) / 2;
        const targetRadius = 14 + pulse * 6;

        // Target box / reticle
        ctx.strokeStyle = theme.primary;
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(centerX - targetRadius, centerY - targetRadius, targetRadius * 2, targetRadius * 2);

        // Center pinpoint dot
        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('TARGET LOCKED', centerX - 42, centerY - targetRadius - 4);
      }

      // Compass text
      ctx.font = '10px monospace';
      ctx.fillStyle = theme.primary;
      ctx.globalAlpha = 0.75;
      ctx.fillText('N 000°', centerX - 18, centerY - radius + 12);
      ctx.fillText('E 090°', centerX + radius - 40, centerY + 4);
      ctx.fillText('S 180°', centerX - 18, centerY + radius - 5);
      ctx.fillText('W 270°', centerX - radius + 5, centerY + 4);

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [active, targetLocked, themeColor]);

  return (
    <div id="cyber-radar-wrapper" className={`relative flex flex-col items-center justify-center ${className}`}>
      <canvas
        id="cyber-radar-canvas"
        ref={canvasRef}
        width={320}
        height={320}
        className="w-full max-w-[320px] aspect-square rounded-full border border-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.15)] bg-slate-950"
      />
      <div id="radar-readout-coords" className="mt-3 flex items-center gap-4 text-xs font-mono text-emerald-400/90 bg-slate-900/80 px-3 py-1.5 rounded border border-emerald-500/30">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          LAT: {lat.toFixed(4)}°
        </span>
        <span className="text-slate-500">|</span>
        <span>LNG: {lng.toFixed(4)}°</span>
        <span className="text-slate-500">|</span>
        <span className="text-emerald-300 font-bold">AZIMUTH: 042°</span>
      </div>
    </div>
  );
};
