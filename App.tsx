import React, { useState } from 'react';
import { Header } from './components/Header';
import { TrackerConsole } from './components/TrackerConsole';
import { TrackingProgress } from './components/TrackingProgress';
import { TargetDossier } from './components/TargetDossier';
import { CyberToolsSuite } from './components/CyberToolsSuite';
import { HexStream } from './components/HexStream';
import { generateTargetIntelligence } from './utils/generator';
import { TargetResult, ThemeColor } from './types';
import { playKeySound } from './utils/audio';
import { 
  Crosshair, 
  Terminal, 
  Shield, 
  Activity, 
  Layers, 
  Cpu, 
  Globe, 
  FileCode,
  Download,
  Check
} from 'lucide-react';

export default function App() {
  const [themeColor, setThemeColor] = useState<ThemeColor>('emerald');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [scanDepth, setScanDepth] = useState<number>(2);
  const [targetResult, setTargetResult] = useState<TargetResult | null>(null);
  const [activeView, setActiveView] = useState<'tracker' | 'suite'>('tracker');
  const [htmlExported, setHtmlExported] = useState<boolean>(false);

  const handleStartTracking = (query: string, mode: 'phone' | 'email', depth: number) => {
    setCurrentQuery(query);
    setScanDepth(depth);
    setIsScanning(true);
    setTargetResult(null);
  };

  const handleScanComplete = () => {
    const generated = generateTargetIntelligence(currentQuery);
    setTargetResult(generated);
    setIsScanning(false);
  };

  const handleReset = () => {
    setIsScanning(false);
    setTargetResult(null);
    setCurrentQuery('');
  };

  // Generate self-contained standalone single HTML file for instant offline use
  const handleExportSingleHtml = () => {
    playKeySound();
    const singleHtmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Krah-Tools - Cyber Tracking & Intelligence Terminal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Courier New', Courier, monospace; }
    body { background-color: #020617; color: #10b981; min-height: 100vh; padding: 20px; display: flex; flex-direction: column; align-items: center; }
    .container { width: 100%; max-width: 900px; background: #090d16; border: 1px solid #10b981; border-radius: 12px; padding: 24px; box-shadow: 0 0 25px rgba(16,185,129,0.2); }
    h1 { font-size: 24px; color: #fff; margin-bottom: 6px; letter-spacing: 2px; }
    h1 span { color: #10b981; }
    p.sub { font-size: 12px; color: #94a3b8; margin-bottom: 20px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; font-size: 12px; margin-bottom: 8px; color: #cbd5e1; }
    input { width: 100%; background: #020617; border: 1px solid #334155; padding: 12px 16px; color: #fff; border-radius: 6px; font-size: 14px; outline: none; }
    input:focus { border-color: #10b981; }
    button.btn-primary { width: 100%; background: #10b981; color: #000; font-weight: bold; border: none; padding: 14px; border-radius: 6px; cursor: pointer; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; transition: 0.2s; }
    button.btn-primary:hover { background: #34d399; }
    .progress-box { display: none; margin-top: 20px; padding: 16px; background: #020617; border: 1px solid #10b981; border-radius: 8px; }
    .bar { width: 100%; height: 10px; background: #1e293b; border-radius: 5px; overflow: hidden; margin: 10px 0; }
    .fill { width: 0%; height: 100%; background: #10b981; transition: width 0.1s linear; }
    .logs { height: 140px; overflow-y: auto; font-size: 11px; color: #6ee7b7; background: #000; padding: 10px; border-radius: 4px; line-height: 1.5; }
    .result-card { display: none; margin-top: 20px; background: #020617; border: 1px solid #10b981; border-radius: 8px; padding: 20px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px; font-size: 12px; }
    .item { padding: 10px; background: #090d16; border: 1px solid #1e293b; border-radius: 6px; }
    .item span { color: #64748b; display: block; font-size: 10px; margin-bottom: 2px; }
    .item strong { color: #fff; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>KRAH<span>-TOOLS</span></h1>
    <p class="sub">GLOBAL TARGET TRACKER & OSINT RECON MATRIX</p>

    <div id="input-section">
      <div class="form-group">
        <label>MASUKKAN NOMOR TELEPON ATAU EMAIL TARGET:</label>
        <input type="text" id="target-input" placeholder="contoh: +62 812-8765-4321 atau target@gmail.com" value="+62 812-8765-4321">
      </div>
      <button class="btn-primary" onclick="startScan()">EKSEKUSI PELACAKAN SEKARANG</button>
    </div>

    <div id="progress-box" class="progress-box">
      <div style="display:flex; justify-content:space-between; font-size:12px; color:#fff;">
        <span id="step-label">INSIASI KONEKSI GLOBAL RELAY...</span>
        <span id="percent-label">0%</span>
      </div>
      <div class="bar"><div id="fill-bar" class="fill"></div></div>
      <div id="log-console" class="logs"></div>
    </div>

    <div id="result-box" class="result-card">
      <h3 style="color:#fff; border-bottom:1px solid #1e293b; padding-bottom:8px;">HASIL INTELIJEN TARGET</h3>
      <div class="grid">
        <div class="item"><span>NAMA LENGKAP:</span><strong id="res-name">Raditya Pratama</strong></div>
        <div class="item"><span>STATUS KONEKSI:</span><strong style="color:#10b981;">AKTIF (PING 18ms)</strong></div>
        <div class="item"><span>ALAMAT JALAN:</span><strong id="res-addr">Jl. Jenderal Sudirman Kav. 52</strong></div>
        <div class="item"><span>KOTA / WILAYAH:</span><strong id="res-city">Jakarta Selatan, DKI Jakarta</strong></div>
        <div class="item"><span>KOORDINAT GPS:</span><strong id="res-coords" style="color:#38bdf8;">LAT -6.2297 | LNG 106.8074</strong></div>
        <div class="item"><span>PROVIDER / ISP:</span><strong id="res-carrier">Telkomsel Flash 5G</strong></div>
        <div class="item"><span>PERANGKAT / MODEL:</span><strong id="res-device">Samsung Galaxy S24 Ultra</strong></div>
        <div class="item"><span>IP ADDRESS:</span><strong id="res-ip" style="color:#10b981;">103.144.19.82</strong></div>
      </div>
      <button class="btn-primary" style="margin-top:16px; background:#334155; color:#fff;" onclick="resetScan()">LACAK TARGET BARU</button>
    </div>
  </div>

  <script>
    function startScan() {
      const q = document.getElementById('target-input').value.trim();
      if(!q) return;
      document.getElementById('input-section').style.display = 'none';
      document.getElementById('progress-box').style.display = 'block';
      document.getElementById('result-box').style.display = 'none';
      
      let p = 0;
      const logs = [
        '[INFO] Target terdaftar: ' + q,
        '[NET] Menginisiasi 12-hop proxy relay...',
        '[BTS] Mengunci Base Transceiver Station...',
        '[GPS] Uplink NAVSTAR Satellite Lat/Lng lock...',
        '[DEV] Mengekstraksi OS Kernel & Hardware IMEI...',
        '[OSINT] Mengagregasi data arsip publik...',
        '[SUCCESS] Pelacakan selesai!'
      ];
      
      const logBox = document.getElementById('log-console');
      logBox.innerHTML = '';
      
      const timer = setInterval(() => {
        p += 2;
        document.getElementById('fill-bar').style.width = p + '%';
        document.getElementById('percent-label').innerText = p + '%';
        
        const logIdx = Math.floor((p/100) * logs.length);
        if(logs[logIdx] && !logBox.innerHTML.includes(logs[logIdx])) {
          logBox.innerHTML += '<div>' + logs[logIdx] + '</div>';
          logBox.scrollTop = logBox.scrollHeight;
        }
        
        if(p >= 100) {
          clearInterval(timer);
          setTimeout(showResult, 500);
        }
      }, 60);
    }

    function showResult() {
      document.getElementById('progress-box').style.display = 'none';
      document.getElementById('result-box').style.display = 'block';
    }

    function resetScan() {
      document.getElementById('input-section').style.display = 'block';
      document.getElementById('progress-box').style.display = 'none';
      document.getElementById('result-box').style.display = 'none';
    }
  </script>
</body>
</html>`;

    const blob = new Blob([singleHtmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Krah-Tools-Standalone.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setHtmlExported(true);
    setTimeout(() => setHtmlExported(false), 3000);
  };

  return (
    <div id="krah-tools-root" className="min-h-screen bg-[#020617] text-slate-100 flex flex-col relative selection:bg-emerald-500 selection:text-black">
      {/* Background Cyber Matrix Stream Canvas */}
      <HexStream opacity={0.12} themeColor={themeColor} />

      {/* Main Top Header */}
      <Header
        themeColor={themeColor}
        onThemeChange={setThemeColor}
        onReset={handleReset}
        isScanning={isScanning}
      />

      {/* Main Content Viewport */}
      <main id="main-terminal-body" className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
        {/* Navigation Switcher between Target Tracker & Cyber Tools */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 border border-slate-800/80 p-2 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              id="nav-tracker"
              type="button"
              onClick={() => {
                playKeySound();
                setActiveView('tracker');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeView === 'tracker'
                  ? 'bg-emerald-600 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Crosshair className="w-4 h-4" />
              <span>PELACAK TARGET (NOMOR / GMAIL)</span>
            </button>

            <button
              id="nav-suite"
              type="button"
              onClick={() => {
                playKeySound();
                setActiveView('suite');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                activeView === 'suite'
                  ? 'bg-emerald-600 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>MODUL INVESTIGASI CYBER</span>
            </button>
          </div>

          {/* Standalone HTML Exporter Button */}
          <button
            id="export-single-html-btn"
            type="button"
            onClick={handleExportSingleHtml}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs transition-colors"
            title="Unduh 1 file HTML murni (HTML+CSS+JS tergabung) untuk dijalankan offline"
          >
            {htmlExported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileCode className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{htmlExported ? 'FILE TERSIMPAN!' : 'UNDUH 1 FILE HTML'}</span>
          </button>
        </div>

        {/* Dynamic View rendering */}
        {activeView === 'tracker' && (
          <div className="space-y-6">
            {isScanning ? (
              <TrackingProgress
                query={currentQuery}
                depth={scanDepth}
                themeColor={themeColor}
                onComplete={handleScanComplete}
              />
            ) : targetResult ? (
              <TargetDossier
                result={targetResult}
                themeColor={themeColor}
                onNewScan={handleReset}
              />
            ) : (
              <div className="space-y-6">
                <TrackerConsole
                  onStartTracking={handleStartTracking}
                  isScanning={isScanning}
                  themeColor={themeColor}
                />

                {/* Technical Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                      <Globe className="w-4 h-4" />
                      <span>SATELLITE TRIANGULATION</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Mengintegrasikan konstelasi satelit NAVSTAR, GLONASS, dan BTS Cell Tower untuk mengunci alamat target dengan resolusi jalan.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                      <Cpu className="w-4 h-4" />
                      <span>DEVICE HARDWARE PROBE</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Mendeteksi model handset ponsel pintar, vendor pembuat, TAC IMEI terdaftar, sistem operasi, dan level baterai saat ini.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                      <Shield className="w-4 h-4" />
                      <span>OSINT LEAK CORRELATION</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Mencocokkan nomor atau email dengan arsip database kebocoran publik untuk memverifikasi profil nama lengkap dan foto target.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'suite' && (
          <CyberToolsSuite themeColor={themeColor} />
        )}
      </main>

      {/* Terminal Footer */}
      <footer id="krah-tools-footer" className="relative z-10 border-t border-slate-800 bg-slate-950/80 py-4 px-4 sm:px-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-300 font-bold">KRAH-TOOLS RECON MATRIX</span>
            <span className="text-slate-600">|</span>
            <span>BUILD 2026.08.21</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              SECURE TLS CONNECTION
            </span>
            <span className="text-slate-400">ZERO LOG RETENTION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
