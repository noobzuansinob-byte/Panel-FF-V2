import React, { useState } from 'react';
import { Search, Phone, Mail, Crosshair, Zap, ShieldAlert, Globe, Server, CheckCircle2 } from 'lucide-react';
import { playKeySound } from '../utils/audio';
import { ThemeColor } from '../types';

interface TrackerConsoleProps {
  onStartTracking: (query: string, mode: 'phone' | 'email', depth: number) => void;
  isScanning: boolean;
  themeColor: ThemeColor;
}

export const TrackerConsole: React.FC<TrackerConsoleProps> = ({
  onStartTracking,
  isScanning,
  themeColor
}) => {
  const [inputMode, setInputMode] = useState<'phone' | 'email'>('phone');
  const [query, setQuery] = useState<string>('');
  const [scanDepth, setScanDepth] = useState<number>(2); // 1 = Quick, 2 = Deep, 3 = Full Matrix
  const [selectedModules, setSelectedModules] = useState<{
    gps: boolean;
    bts: boolean;
    device: boolean;
    breach: boolean;
    social: boolean;
    packet: boolean;
  }>({
    gps: true,
    bts: true,
    device: true,
    breach: true,
    social: true,
    packet: true
  });

  const getAccentColors = () => {
    switch (themeColor) {
      case 'cyan':
        return {
          btn: 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]',
          border: 'border-cyan-500/50',
          text: 'text-cyan-400',
          activeTab: 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
        };
      case 'amber':
        return {
          btn: 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]',
          border: 'border-amber-500/50',
          text: 'text-amber-400',
          activeTab: 'bg-amber-500/20 text-amber-300 border-amber-500'
        };
      case 'crimson':
        return {
          btn: 'bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]',
          border: 'border-rose-500/50',
          text: 'text-rose-400',
          activeTab: 'bg-rose-500/20 text-rose-300 border-rose-500'
        };
      case 'emerald':
      default:
        return {
          btn: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]',
          border: 'border-emerald-500/50',
          text: 'text-emerald-400',
          activeTab: 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
        };
    }
  };

  const colors = getAccentColors();

  const presetsPhone = [
    '+62 812-8765-4321',
    '+62 857-1234-5678',
    '+62 878-9900-1122',
    '+1 212-555-0199'
  ];

  const presetsEmail = [
    'target.recon@gmail.com',
    'zahra.official@gmail.com',
    'bramantyo.idn@gmail.com',
    'security.audit@gmail.com'
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || isScanning) return;
    playKeySound();
    onStartTracking(query.trim(), inputMode, scanDepth);
  };

  const handlePresetClick = (preset: string) => {
    playKeySound();
    setQuery(preset);
  };

  const toggleModule = (key: keyof typeof selectedModules) => {
    playKeySound();
    setSelectedModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="tracker-console-card" className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Decorative corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500"></div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Crosshair className={`w-5 h-5 ${colors.text} animate-pulse`} />
            <h2 className="text-lg sm:text-xl font-bold font-mono text-white tracking-wide">
              TARGET ACQUISITION CONSOLE
            </h2>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            SYS-READY
          </span>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Masukkan nomor telepon (MSISDN) atau alamat Gmail target untuk mengeksekusi pelacakan satelit, BTS cell lock, nama pemilik, lokasi presisi, dan analisis data intelijen.
        </p>
      </div>

      {/* Target Type Selector */}
      <div className="flex border-b border-slate-800 mb-6">
        <button
          id="tab-phone"
          type="button"
          onClick={() => {
            playKeySound();
            setInputMode('phone');
            setQuery('+62 812-8765-4321');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 font-mono text-xs sm:text-sm font-semibold border-b-2 transition-all ${
            inputMode === 'phone'
              ? `${colors.activeTab} border-emerald-400 text-white`
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>NOMOR TELEPON (MSISDN)</span>
        </button>

        <button
          id="tab-email"
          type="button"
          onClick={() => {
            playKeySound();
            setInputMode('email');
            setQuery('target.recon@gmail.com');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 font-mono text-xs sm:text-sm font-semibold border-b-2 transition-all ${
            inputMode === 'email'
              ? `${colors.activeTab} border-emerald-400 text-white`
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>GMAIL / EMAIL TARGET</span>
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label htmlFor="target-input-field" className="block text-xs font-mono text-slate-300 uppercase mb-2">
            {inputMode === 'phone' ? 'Kredensial Nomor Telepon:' : 'Kredensial Gmail / Akun Target:'}
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              {inputMode === 'phone' ? <Phone className="w-5 h-5 text-emerald-400" /> : <Mail className="w-5 h-5 text-emerald-400" />}
            </div>
            <input
              id="target-input-field"
              type={inputMode === 'phone' ? 'tel' : 'email'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={() => playKeySound()}
              placeholder={inputMode === 'phone' ? '+62 8xx-xxxx-xxxx atau 08xxxxxxxx' : 'contoh: nama.target@gmail.com'}
              disabled={isScanning}
              className="w-full bg-slate-950/90 border border-slate-700 rounded-lg pl-12 pr-4 py-3.5 text-slate-100 font-mono text-sm sm:text-base placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 text-xs font-mono text-slate-500 hover:text-slate-300"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-slate-400">TARGET CEPAT:</span>
          {(inputMode === 'phone' ? presetsPhone : presetsEmail).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Scan Depth Selector */}
        <div className="pt-2">
          <div className="text-xs font-mono text-slate-300 mb-2 flex items-center justify-between">
            <span>METODE & INTENSITAS SCANNING:</span>
            <span className="text-emerald-400 font-bold">
              {scanDepth === 1 ? 'FAST SATELLITE PING (3s)' : scanDepth === 2 ? 'DEEP TRIANGULATION (6s)' : 'MILITARY OSINT RECON (9s)'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {[
              { level: 1, label: 'Fast Sat Lock', desc: 'GPS & Alamat Cepat' },
              { level: 2, label: 'Deep Triangulation', desc: 'BTS + Device + Leak DB' },
              { level: 3, label: 'Full Recon Matrix', desc: 'Multi-Node Packet & OSINT' }
            ].map((item) => (
              <button
                key={item.level}
                type="button"
                onClick={() => {
                  playKeySound();
                  setScanDepth(item.level);
                }}
                className={`p-3 rounded-lg border text-left transition-all font-mono ${
                  scanDepth === item.level
                    ? 'border-emerald-500 bg-emerald-950/40 text-white ring-1 ring-emerald-500'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span>{item.label}</span>
                  {scanDepth === item.level && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Modules Toggle Grid */}
        <div className="pt-2 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400 block mb-2.5">
            AKTIVASI MODUL INTELIJEN:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'gps', label: 'GPS Satellite Pin', icon: Globe },
              { id: 'bts', label: 'BTS Tower Lock', icon: Server },
              { id: 'device', label: 'Device & Hardware', icon: Zap },
              { id: 'breach', label: 'Leak DB Scanner', icon: ShieldAlert },
              { id: 'social', label: 'Social Graph OSINT', icon: Search },
              { id: 'packet', label: 'Network Intercept', icon: Crosshair }
            ].map((mod) => {
              const Icon = mod.icon;
              const isChecked = selectedModules[mod.id as keyof typeof selectedModules];
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => toggleModule(mod.id as keyof typeof selectedModules)}
                  className={`flex items-center gap-2 p-2 rounded border text-xs font-mono transition-colors ${
                    isChecked
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-950/40 text-slate-500'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className="truncate">{mod.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Execution Button */}
        <div className="pt-3">
          <button
            id="start-tracking-btn"
            type="submit"
            disabled={!query.trim() || isScanning}
            className={`w-full py-4 rounded-lg font-mono font-black text-sm sm:text-base uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${colors.btn}`}
          >
            <Crosshair className={`w-5 h-5 ${isScanning ? 'animate-spin' : 'animate-pulse'}`} />
            <span>
              {isScanning ? 'SEDANG MELACAK & MENGANALISIS...' : 'EKSEKUSI PELACAKAN TARGET SEKARANG'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
