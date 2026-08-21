import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ShieldCheck, 
  Smartphone, 
  KeyRound, 
  Terminal, 
  CheckCircle, 
  AlertCircle,
  Radio,
  Server,
  Zap
} from 'lucide-react';
import { playKeySound, playLockAlert, playSuccessChime } from '../utils/audio';
import { ThemeColor } from '../types';

interface CyberToolsSuiteProps {
  themeColor: ThemeColor;
}

export const CyberToolsSuite: React.FC<CyberToolsSuiteProps> = ({ themeColor }) => {
  const [activeTool, setActiveTool] = useState<'iplookup' | 'imeicheck' | 'portscan' | 'hashcrack'>('iplookup');
  
  // IP Lookup State
  const [ipQuery, setIpQuery] = useState<string>('103.144.19.82');
  const [ipLoading, setIpLoading] = useState<boolean>(false);
  const [ipResult, setIpResult] = useState<{
    ip: string;
    city: string;
    region: string;
    country: string;
    isp: string;
    asn: string;
    lat: number;
    lng: number;
    threatScore: string;
  } | null>({
    ip: '103.144.19.82',
    city: 'Jakarta Selatan',
    region: 'DKI Jakarta',
    country: 'Indonesia (ID)',
    isp: 'PT Telekomunikasi Selular (Telkomsel)',
    asn: 'AS23693 TELKOMSEL-ID',
    lat: -6.2297,
    lng: 106.8074,
    threatScore: 'Low / Clean'
  });

  // IMEI State
  const [imeiQuery, setImeiQuery] = useState<string>('358941098451293');
  const [imeiLoading, setImeiLoading] = useState<boolean>(false);
  const [imeiResult, setImeiResult] = useState<{
    imei: string;
    brand: string;
    model: string;
    tac: string;
    status: string;
    countryOfOrigin: string;
  } | null>({
    imei: '358941098451293',
    brand: 'Samsung Electronics',
    model: 'Galaxy S24 Ultra 5G (SM-S928B)',
    tac: '358941 (GSMA Registered)',
    status: 'Whitelist / Aktif IMEI Kemenperin',
    countryOfOrigin: 'Vietnam / South Korea'
  });

  // Port Scan State
  const [hostQuery, setHostQuery] = useState<string>('192.168.1.1');
  const [scanLoading, setScanLoading] = useState<boolean>(false);
  const [portsResult, setPortsResult] = useState<Array<{ port: number; service: string; status: 'OPEN' | 'CLOSED' | 'FILTERED' }>>([
    { port: 21, service: 'FTP', status: 'CLOSED' },
    { port: 22, service: 'SSH', status: 'OPEN' },
    { port: 80, service: 'HTTP', status: 'OPEN' },
    { port: 443, service: 'HTTPS', status: 'OPEN' },
    { port: 3306, service: 'MySQL', status: 'FILTERED' },
    { port: 8080, service: 'HTTP-Proxy', status: 'OPEN' }
  ]);

  // Hash Crack State
  const [hashQuery, setHashQuery] = useState<string>('5f4dcc3b5aa765d61d8327deb882cf99');
  const [hashLoading, setHashLoading] = useState<boolean>(false);
  const [hashResult, setHashResult] = useState<{
    hash: string;
    type: string;
    plaintext: string;
    entropy: string;
  } | null>({
    hash: '5f4dcc3b5aa765d61d8327deb882cf99',
    type: 'MD5 (128-bit)',
    plaintext: 'password',
    entropy: 'High Match in Rainbow Table'
  });

  const handleIpScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipQuery.trim()) return;
    playKeySound();
    setIpLoading(true);
    setTimeout(() => {
      setIpResult({
        ip: ipQuery.trim(),
        city: 'Surabaya',
        region: 'Jawa Timur',
        country: 'Indonesia (ID)',
        isp: 'PT Indosat Ooredoo Hutchison',
        asn: 'AS4761 INDOSAT-ID',
        lat: -7.2575,
        lng: 112.7521,
        threatScore: '0 / Clean IP'
      });
      setIpLoading(false);
      playSuccessChime();
    }, 1200);
  };

  const handleImeiScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imeiQuery.trim()) return;
    playKeySound();
    setImeiLoading(true);
    setTimeout(() => {
      setImeiResult({
        imei: imeiQuery.trim(),
        brand: 'Apple Inc.',
        model: 'iPhone 15 Pro Max (A3106)',
        tac: `${imeiQuery.slice(0, 6)} (GSMA Registered)`,
        status: 'Aktif Terdaftar IMEI Nasional',
        countryOfOrigin: 'Assembled in China / USA'
      });
      setImeiLoading(false);
      playSuccessChime();
    }, 1200);
  };

  const handlePortScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostQuery.trim()) return;
    playKeySound();
    setScanLoading(true);
    setTimeout(() => {
      setPortsResult([
        { port: 21, service: 'FTP', status: 'CLOSED' },
        { port: 22, service: 'SSH', status: 'OPEN' },
        { port: 53, service: 'DNS', status: 'OPEN' },
        { port: 80, service: 'HTTP', status: 'OPEN' },
        { port: 443, service: 'HTTPS', status: 'OPEN' },
        { port: 8080, service: 'Web Admin', status: 'OPEN' }
      ]);
      setScanLoading(false);
      playSuccessChime();
    }, 1500);
  };

  const handleHashCrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hashQuery.trim()) return;
    playKeySound();
    setHashLoading(true);
    setTimeout(() => {
      setHashResult({
        hash: hashQuery.trim(),
        type: hashQuery.length === 32 ? 'MD5' : 'SHA-256',
        plaintext: 'admin2024!',
        entropy: 'Match Found in Leak Dictionary #4'
      });
      setHashLoading(false);
      playSuccessChime();
    }, 1400);
  };

  return (
    <div id="cyber-tools-suite-card" className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            MODUL UTILITAS CYBER & INVESTIGASI OSINT
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Alat bantu inspeksi teknis untuk investigasi IP, hardware TAC/IMEI, port scanner, dan dekripsi hash.
          </p>
        </div>

        {/* Sub-tools switch */}
        <div className="flex flex-wrap bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1 font-mono text-xs">
          {[
            { id: 'iplookup', label: 'IP Geo Lookup', icon: Globe },
            { id: 'imeicheck', label: 'IMEI Hardware TAC', icon: Smartphone },
            { id: 'portscan', label: 'Port Vulnerability', icon: Server },
            { id: 'hashcrack', label: 'Hash Decryptor', icon: KeyRound }
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = activeTool === t.id;
            return (
              <button
                key={t.id}
                id={`tool-btn-${t.id}`}
                type="button"
                onClick={() => {
                  playKeySound();
                  setActiveTool(t.id as typeof activeTool);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-black font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. IP Lookup Tool */}
      {activeTool === 'iplookup' && (
        <div className="space-y-5 font-mono text-xs">
          <form onSubmit={handleIpScan} className="flex flex-wrap gap-2">
            <input
              type="text"
              value={ipQuery}
              onChange={(e) => setIpQuery(e.target.value)}
              placeholder="Masukkan IP address target (e.g. 103.144.19.82)"
              className="flex-1 min-w-[240px] bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={ipLoading}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <Search className={`w-4 h-4 ${ipLoading ? 'animate-spin' : ''}`} />
              <span>{ipLoading ? 'MENGANALISIS...' : 'INSPEKSI IP'}</span>
            </button>
          </form>

          {ipResult && (
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-900 py-1">
                  <span className="text-slate-400">IP Target:</span>
                  <span className="text-emerald-400 font-bold">{ipResult.ip}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 py-1">
                  <span className="text-slate-400">ISP Provider:</span>
                  <span className="text-white">{ipResult.isp}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 py-1">
                  <span className="text-slate-400">ASN:</span>
                  <span className="text-cyan-400">{ipResult.asn}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-900 py-1">
                  <span className="text-slate-400">Wilayah / Kota:</span>
                  <span className="text-white font-bold">{ipResult.city}, {ipResult.region}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 py-1">
                  <span className="text-slate-400">Negara:</span>
                  <span className="text-white">{ipResult.country}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 py-1">
                  <span className="text-slate-400">Status Reputasi:</span>
                  <span className="text-emerald-400 font-bold">{ipResult.threatScore}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. IMEI Check Tool */}
      {activeTool === 'imeicheck' && (
        <div className="space-y-5 font-mono text-xs">
          <form onSubmit={handleImeiScan} className="flex flex-wrap gap-2">
            <input
              type="text"
              value={imeiQuery}
              onChange={(e) => setImeiQuery(e.target.value)}
              placeholder="Masukkan 15 digit nomor IMEI (e.g. 358941098451293)"
              className="flex-1 min-w-[240px] bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={imeiLoading}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <Search className={`w-4 h-4 ${imeiLoading ? 'animate-spin' : ''}`} />
              <span>{imeiLoading ? 'VERIFIKASI TAC...' : 'PERIKSA IMEI'}</span>
            </button>
          </form>

          {imeiResult && (
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Nomor IMEI:</span>
                <span className="text-emerald-400 font-bold">{imeiResult.imei}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Manufaktur / Merek:</span>
                <span className="text-white font-bold">{imeiResult.brand}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Model Spesifik:</span>
                <span className="text-cyan-400 font-bold">{imeiResult.model}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Kode TAC:</span>
                <span className="text-white">{imeiResult.tac}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Status Legalitas / Registry:</span>
                <span className="text-emerald-400 font-bold">{imeiResult.status}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Port Scanner Tool */}
      {activeTool === 'portscan' && (
        <div className="space-y-5 font-mono text-xs">
          <form onSubmit={handlePortScan} className="flex flex-wrap gap-2">
            <input
              type="text"
              value={hostQuery}
              onChange={(e) => setHostQuery(e.target.value)}
              placeholder="Host atau IP Target (e.g. 192.168.1.1)"
              className="flex-1 min-w-[240px] bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={scanLoading}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <Terminal className={`w-4 h-4 ${scanLoading ? 'animate-spin' : ''}`} />
              <span>{scanLoading ? 'SCANNING PORTS...' : 'SCAN PORT TERBUKA'}</span>
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {portsResult.map((p) => (
              <div key={p.port} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">PORT {p.port}</span>
                  <span className="text-slate-400 text-[11px]">{p.service}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  p.status === 'OPEN'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : p.status === 'FILTERED'
                    ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Hash Decryptor Tool */}
      {activeTool === 'hashcrack' && (
        <div className="space-y-5 font-mono text-xs">
          <form onSubmit={handleHashCrack} className="flex flex-wrap gap-2">
            <input
              type="text"
              value={hashQuery}
              onChange={(e) => setHashQuery(e.target.value)}
              placeholder="Masukkan hash MD5 atau SHA-256"
              className="flex-1 min-w-[240px] bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={hashLoading}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <KeyRound className={`w-4 h-4 ${hashLoading ? 'animate-spin' : ''}`} />
              <span>{hashLoading ? 'DECRYPTING...' : 'DEKRIPSI HASH'}</span>
            </button>
          </form>

          {hashResult && (
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-3">
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Tipe Algoritma:</span>
                <span className="text-cyan-400 font-bold">{hashResult.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Hasil Dekripsi Plaintext:</span>
                <span className="text-emerald-400 font-bold text-sm bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  {hashResult.plaintext}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Keterangan:</span>
                <span className="text-white">{hashResult.entropy}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
