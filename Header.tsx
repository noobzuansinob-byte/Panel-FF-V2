import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Shield, Radio, Activity, RefreshCw, Cpu } from 'lucide-react';
import { ThemeColor } from '../types';
import { toggleAudioMute, getAudioMuted, playKeySound } from '../utils/audio';

interface HeaderProps {
  themeColor: ThemeColor;
  onThemeChange: (color: ThemeColor) => void;
  onReset: () => void;
  isScanning: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  themeColor,
  onThemeChange,
  onReset,
  isScanning
}) => {
  const [time, setTime] = useState<string>('');
  const [muted, setMuted] = useState<boolean>(getAudioMuted());
  const [activeNodes, setActiveNodes] = useState<number>(142);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2));
    };
    update();
    const interval = setInterval(update, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nodeInterval = setInterval(() => {
      setActiveNodes(prev => Math.min(180, Math.max(120, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 2000);
    return () => clearInterval(nodeInterval);
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = toggleAudioMute();
    setMuted(nextMuted);
    if (!nextMuted) playKeySound();
  };

  const getThemeBadgeClasses = () => {
    switch (themeColor) {
      case 'cyan': return 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40';
      case 'amber': return 'border-amber-500/40 text-amber-400 bg-amber-950/40';
      case 'crimson': return 'border-rose-500/40 text-rose-400 bg-rose-950/40';
      case 'emerald':
      default: return 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40';
    }
  };

  return (
    <header id="krah-tools-header" className="relative z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded border ${getThemeBadgeClasses()} flex items-center justify-center`}>
            <Terminal className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 id="brand-title" className="text-xl sm:text-2xl font-black tracking-wider text-white font-mono">
                KRAH<span className="text-emerald-400">-TOOLS</span>
              </h1>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                CYBER TERMINAL v4.9
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>GLOBAL TARGET TRACKER & OSINT RECON MATRIX</span>
            </p>
          </div>
        </div>

        {/* Live Telemetry Bar */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-300 border-x border-slate-800 px-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-400">NODES:</span>
            <span className="font-bold text-white">{activeNodes} RELAYS</span>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">STATUS:</span>
            <span className="text-emerald-400 font-bold">OPERATIONAL</span>
          </div>

          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">ENCRYPTION:</span>
            <span className="text-cyan-400 font-bold">AES-256</span>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">UTC CLOCK:</span>
            <span className="text-white font-mono">{time}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            id="audio-toggle-btn"
            type="button"
            onClick={handleAudioToggle}
            className={`p-2 rounded border text-xs font-mono transition-colors flex items-center gap-1.5 ${
              muted 
                ? 'border-slate-700 bg-slate-900 text-slate-500 hover:text-slate-300' 
                : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40'
            }`}
            title={muted ? 'Aktifkan Audio SFX' : 'Matikan Audio SFX'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{muted ? 'SFX OFF' : 'SFX ON'}</span>
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5">
            {(['emerald', 'cyan', 'amber', 'crimson'] as ThemeColor[]).map((c) => {
              const active = themeColor === c;
              const bgClass = 
                c === 'emerald' ? 'bg-emerald-500' :
                c === 'cyan' ? 'bg-cyan-500' :
                c === 'amber' ? 'bg-amber-500' : 'bg-rose-500';
              return (
                <button
                  key={c}
                  id={`theme-btn-${c}`}
                  type="button"
                  onClick={() => {
                    playKeySound();
                    onThemeChange(c);
                  }}
                  className={`w-5 h-5 rounded-sm m-0.5 transition-all ${bgClass} ${
                    active ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-80'
                  }`}
                  title={`Tema ${c}`}
                />
              );
            })}
          </div>

          {/* New Scan / Reset */}
          <button
            id="reset-scan-btn"
            type="button"
            onClick={() => {
              playKeySound();
              onReset();
            }}
            disabled={isScanning}
            className="px-3 py-1.5 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>
      </div>
    </header>
  );
};
