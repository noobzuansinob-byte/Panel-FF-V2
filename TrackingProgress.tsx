import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Shield, Radio, CheckCircle, Cpu, Crosshair } from 'lucide-react';
import { CyberRadar } from './CyberRadar';
import { ThemeColor } from '../types';
import { playRadarPing, playLockAlert, playSuccessChime } from '../utils/audio';

interface TrackingProgressProps {
  query: string;
  depth: number;
  themeColor: ThemeColor;
  onComplete: () => void;
}

export const TrackingProgress: React.FC<TrackingProgressProps> = ({
  query,
  depth,
  themeColor,
  onComplete
}) => {
  const [percent, setPercent] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const durationMs = depth === 1 ? 3200 : depth === 2 ? 6000 : 9000;

  const steps = [
    { title: 'INSIASI KONEKSI GLOBAL RELAY & PROXY HOPPING', sub: 'Routing 12-hop encrypted tunnel...' },
    { title: 'QUERY REGISTRI HLR/VLR & BTS CELL TRIANGULATION', sub: 'Resolving Carrier MCC/MNC & Tower ID...' },
    { title: 'SATELLITE LOCK & GPS GEOLOCATION PINPOINTING', sub: 'Acquiring NAVSTAR & GLONASS SV signals...' },
    { title: 'PERANGKAT HARDWARE & NETWORK INTERCEPTION', sub: 'Querying IMEI, MAC, OS footprint & open ports...' },
    { title: 'OSINT RECONNAISSANCE & DOSSIER SYNTHESIS', sub: 'Compiling photo ID, address & leak archives...' }
  ];

  const logPool = [
    `[INFO] Target parameter registered: ${query}`,
    `[SEC] Bypassing localized firewall & activating zero-trace proxy chains`,
    `[NET] Handshake established with Global SS7 / Diameter Signaling Gateway`,
    `[BTS] Querying Cell Tower Sector 3 [eNodeB ID: 510-10-8442]`,
    `[BTS] Signal attenuation calculated: -74 dBm (Distance: 142m)`,
    `[SAT] Uplink established with Satellite NAVSTAR-64 (PRN 18)`,
    `[GPS] Raw Coordinates extracted: LAT -6.229712 | LNG 106.807419`,
    `[GEO] Reverse-geocoding street map data & postal district`,
    `[DEV] Handshake response: Mobile OS Kernel 5.15-android`,
    `[DEV] Extracting hardware identifiers: IMEI 358941098*** | Battery: Active`,
    `[NET] Active IP Gateway captured: 103.144.19.82 [ISP: Telkomsel]`,
    `[OSINT] Querying Identity Graph & Public Breach Archives`,
    `[OSINT] Facial biometric profile matched in public database`,
    `[CRYPTO] Decrypting payload stream with AES-256 session key`,
    `[SUCCESS] Target acquisition finalized. Generating intelligence dossier...`
  ];

  useEffect(() => {
    let startTime = Date.now();
    let lastPing = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setPercent(progress);

      // Play audio radar ping every 1.5s
      if (Date.now() - lastPing > 1400 && progress < 90) {
        lastPing = Date.now();
        playRadarPing();
      }

      // Step calculation
      const stepIdx = Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length));
      setCurrentStepIndex(stepIdx);

      // Add logs incrementally
      const expectedLogCount = Math.floor((progress / 100) * logPool.length);
      if (expectedLogCount > logIndex && logIndex < logPool.length) {
        const newLog = logPool[logIndex];
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${newLog}`]);
        logIndex++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        playLockAlert();
        setTimeout(() => {
          playSuccessChime();
          onComplete();
        }, 600);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [durationMs]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div id="tracking-progress-overlay" className="w-full bg-slate-900/95 border border-emerald-500/40 rounded-xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-400">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold font-mono text-white tracking-wider">
                SEDANG MELACAK TARGET: <span className="text-emerald-400">{query}</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              TRIANGULASI SINYAL REAL-TIME & SINKRONISASI SATELIT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono">
            <span className="text-xs text-slate-400 block">PROGRES PELACAKAN:</span>
            <span className="text-2xl font-black text-emerald-400">{percent}%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar + Step Indicator & Terminal Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Col */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-xl border border-slate-800">
          <span className="text-xs font-mono text-emerald-400 mb-3 flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 animate-spin" />
            SATELLITE BEACON SWEEP
          </span>
          <CyberRadar active={true} targetLocked={percent > 80} themeColor={themeColor} />
          <div className="w-full mt-4 text-center font-mono text-xs text-slate-400 bg-slate-900/80 py-2 px-3 rounded border border-slate-800">
            {percent < 40 ? 'Mencari sinyal pembawa...' : percent < 80 ? 'Mengunci koordinat BTS...' : 'Target Terkunci (100% Signal Match)'}
          </div>
        </div>

        {/* Steps & Logs Col */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Step Progress Card */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-pulse" />
                FASE {currentStepIndex + 1} DARI {steps.length}:
              </span>
              <span className="text-slate-400">{steps[currentStepIndex].title}</span>
            </div>

            {/* Custom High-Tech Progress Bar */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-2">
              {steps[currentStepIndex].sub}
            </div>
          </div>

          {/* Real-time Terminal Log Console */}
          <div className="bg-black/90 border border-slate-800 rounded-xl p-4 font-mono text-xs h-56 overflow-y-auto shadow-inner flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                TERMINAL OUTPUT STREAM (LIVE)
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="space-y-1 overflow-y-auto pr-1">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed text-[11px] ${
                    log.includes('[SUCCESS]')
                      ? 'text-emerald-300 font-bold'
                      : log.includes('[GPS]') || log.includes('[GEO]')
                      ? 'text-cyan-300'
                      : log.includes('[SEC]')
                      ? 'text-amber-300'
                      : 'text-slate-300'
                  }`}
                >
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              <span className="text-slate-500 block">SAT-LINK:</span>
              <span className="text-emerald-400 font-bold">12 / 14 ACTIVE</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              <span className="text-slate-500 block">LATENCY:</span>
              <span className="text-cyan-400 font-bold">18 ms</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
              <span className="text-slate-500 block">STATUS:</span>
              <span className="text-emerald-400 font-bold">ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
