import { TargetResult } from '../types';

// Deterministic pseudo-random helper based on string hash
function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const INDONESIAN_CITIES = [
  {
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    postalCode: '12190',
    lat: -6.2297,
    lng: 106.8074,
    streets: ['Jl. Jenderal Sudirman Kav. 52-53', 'Jl. Senopati Raya No. 41', 'Jl. Kemang Raya No. 12', 'Jl. Gatot Subroto Kav. 18']
  },
  {
    city: 'Surabaya',
    province: 'Jawa Timur',
    country: 'Indonesia',
    postalCode: '60271',
    lat: -7.2575,
    lng: 112.7521,
    streets: ['Jl. Pemuda No. 33-37', 'Jl. Basuki Rahmat No. 8-12', 'Jl. Mayjen Sungkono No. 89', 'Jl. Raya Darmo No. 45']
  },
  {
    city: 'Bandung',
    province: 'Jawa Barat',
    country: 'Indonesia',
    postalCode: '40115',
    lat: -6.9175,
    lng: 107.6191,
    streets: ['Jl. Ir. H. Djuanda No. 108', 'Jl. Asia Afrika No. 65', 'Jl. R.E. Martadinata No. 34', 'Jl. Setiabudhi No. 201']
  },
  {
    city: 'Medan',
    province: 'Sumatera Utara',
    country: 'Indonesia',
    postalCode: '20111',
    lat: 3.5952,
    lng: 98.6722,
    streets: ['Jl. Balai Kota No. 1', 'Jl. Putri Hijau No. 10', 'Jl. Gajah Mada No. 52', 'Jl. Zainul Arifin No. 7']
  },
  {
    city: 'Semarang',
    province: 'Jawa Tengah',
    country: 'Indonesia',
    postalCode: '50134',
    lat: -6.9667,
    lng: 110.4167,
    streets: ['Jl. Pandanaran No. 58', 'Jl. Pemuda No. 142', 'Jl. Gajahmada No. 99', 'Jl. Pahlawan No. 16']
  },
  {
    city: 'Denpasar',
    province: 'Bali',
    country: 'Indonesia',
    postalCode: '80232',
    lat: -8.6705,
    lng: 115.2126,
    streets: ['Jl. Teuku Umar No. 110', 'Jl. Gatot Subroto Barat No. 300', 'Jl. Hayam Wuruk No. 88', 'Jl. Sunset Road No. 85']
  },
  {
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    country: 'Indonesia',
    postalCode: '90111',
    lat: -5.1477,
    lng: 119.4327,
    streets: ['Jl. Penghibur No. 23', 'Jl. Jend. Urip Sumoharjo No. 84', 'Jl. Somba Opu No. 12', 'Jl. Boulevard No. 5']
  },
  {
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    country: 'Indonesia',
    postalCode: '55271',
    lat: -7.7956,
    lng: 110.3695,
    streets: ['Jl. Malioboro No. 56', 'Jl. Kaliurang KM 5.5', 'Jl. Gejayan No. 22', 'Jl. Mangkubumi No. 38']
  }
];

const GLOBAL_CITIES = [
  {
    city: 'Singapore',
    province: 'Central Region',
    country: 'Singapore',
    postalCode: '048616',
    lat: 1.2868,
    lng: 103.8545,
    streets: ['1 Raffles Place, Tower 2', '8 Marina Boulevard #11-01', '30 Victoria St, Bugis']
  },
  {
    city: 'Kuala Lumpur',
    province: 'Federal Territory',
    country: 'Malaysia',
    postalCode: '50088',
    lat: 3.1390,
    lng: 101.6869,
    streets: ['Jalan Ampang, KLCC Suite 4', 'Jalan Bukit Bintang No. 118', 'Jalan Sultan Ismail No. 22']
  },
  {
    city: 'New York',
    province: 'New York',
    country: 'United States',
    postalCode: '10001',
    lat: 40.7128,
    lng: -74.0060,
    streets: ['350 5th Ave, Manhattan', '120 Broadway, Financial District', '452 Lexington Ave']
  },
  {
    city: 'Tokyo',
    province: 'Kanto',
    country: 'Japan',
    postalCode: '100-0005',
    lat: 35.6762,
    lng: 139.6503,
    streets: ['1-1 Marunouchi, Chiyoda-ku', '2-24-12 Shibuya, Shibuya-ku', '6-10-1 Roppongi, Minato-ku']
  }
];

const FIRST_NAMES_MALE = ['Raditya', 'Bima', 'Fikri', 'Dimas', 'Reza', 'Aditya', 'Rizky', 'Arya', 'Kevin', 'Farhan', 'Bayu', 'Bramantyo'];
const FIRST_NAMES_FEMALE = ['Zahra', 'Nadia', 'Siti', 'Aulia', 'Putri', 'Tiara', 'Clarissa', 'Amanda', 'Nabila', 'Vania', 'Rania', 'Jessica'];
const LAST_NAMES = ['Pratama', 'Kusuma', 'Saputra', 'Wijaya', 'Santoso', 'Gunawan', 'Siregar', 'Hidayat', 'Wibowo', 'Nugroho', 'Setiawan', 'Firmansyah'];

const PHONE_CARRIERS = [
  { name: 'Telkomsel Flash 5G', isp: 'PT Telekomunikasi Selular', mccMnc: '510-10' },
  { name: 'Indosat Ooredoo Hutchison', isp: 'PT Indosat Tbk', mccMnc: '510-01' },
  { name: 'XL Axiata Axiata Turbo', isp: 'PT XL Axiata Tbk', mccMnc: '510-11' },
  { name: 'Smartfren Ultra 5G', isp: 'PT Smartfren Telecom', mccMnc: '510-09' },
  { name: 'Telkom IndiHome Fiber', isp: 'PT Telkom Indonesia', mccMnc: '510-00' }
];

const DEVICE_MODELS = [
  { vendor: 'Samsung', model: 'Galaxy S24 Ultra (SM-S928B)', os: 'Android 14', res: '3120 x 1440' },
  { vendor: 'Apple', model: 'iPhone 15 Pro Max (A3106)', os: 'iOS 17.5.1', res: '2796 x 1290' },
  { vendor: 'Xiaomi', model: 'Xiaomi 14 Ultra (24030PN60G)', os: 'HyperOS / Android 14', res: '3200 x 1440' },
  { vendor: 'Apple', model: 'iPhone 14 (A2882)', os: 'iOS 17.4', res: '2532 x 1170' },
  { vendor: 'Google', model: 'Pixel 8 Pro (GC3VE)', os: 'Android 15 Developer', res: '2992 x 1344' },
  { vendor: 'Samsung', model: 'Galaxy A55 5G (SM-A556B)', os: 'Android 14 / OneUI 6.1', res: '2340 x 1080' },
  { vendor: 'Asus', model: 'ROG Phone 8 Pro (AI2401)', os: 'Android 14 ROG UI', res: '2400 x 1080' },
  { vendor: 'Vivo', model: 'X100 Pro (V2309A)', os: 'FuntouchOS 14', res: '2800 x 1260' }
];

const AVATAR_FACES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80'
];

export function generateTargetIntelligence(query: string): TargetResult {
  const clean = query.trim().toLowerCase();
  const seed = stringToSeed(clean);
  const isEmail = clean.includes('@');
  const isPhone = !isEmail;

  // Derive gender and name
  const isFemale = seededRandom(seed + 1) > 0.5;
  const firstName = isFemale 
    ? FIRST_NAMES_FEMALE[Math.floor(seededRandom(seed + 2) * FIRST_NAMES_FEMALE.length)]
    : FIRST_NAMES_MALE[Math.floor(seededRandom(seed + 2) * FIRST_NAMES_MALE.length)];
  const lastName = LAST_NAMES[Math.floor(seededRandom(seed + 3) * LAST_NAMES.length)];
  const fullName = `${firstName} ${lastName}`;

  // Age & DOB
  const age = Math.floor(19 + seededRandom(seed + 4) * 38);

  // Avatar
  const avatarIndex = Math.floor(seededRandom(seed + 5) * AVATAR_FACES.length);
  const avatarUrl = AVATAR_FACES[avatarIndex];

  // Location resolution
  // Check if international or indonesian
  const isGlobal = isPhone && (clean.startsWith('+1') || clean.startsWith('+81') || clean.startsWith('+65'));
  const cityPool = isGlobal ? GLOBAL_CITIES : INDONESIAN_CITIES;
  const cityObj = cityPool[Math.floor(seededRandom(seed + 6) * cityPool.length)];
  const street = cityObj.streets[Math.floor(seededRandom(seed + 7) * cityObj.streets.length)];
  
  // Add slight jitter to coordinates for realistic GPS lock
  const jitterLat = (seededRandom(seed + 8) - 0.5) * 0.008;
  const jitterLng = (seededRandom(seed + 9) - 0.5) * 0.008;
  const lat = Number((cityObj.lat + jitterLat).toFixed(6));
  const lng = Number((cityObj.lng + jitterLng).toFixed(6));

  // Device specs
  const deviceObj = DEVICE_MODELS[Math.floor(seededRandom(seed + 10) * DEVICE_MODELS.length)];
  const batteryPct = Math.floor(28 + seededRandom(seed + 11) * 68);
  const carrierObj = PHONE_CARRIERS[Math.floor(seededRandom(seed + 12) * PHONE_CARRIERS.length)];

  // Generate Hex / MAC / IP
  const hexPart = (s: number, len = 2) => Math.floor(seededRandom(s) * 256).toString(16).padStart(len, '0').toUpperCase();
  const mac = `${hexPart(seed + 13)}:${hexPart(seed + 14)}:${hexPart(seed + 15)}:${hexPart(seed + 16)}:${hexPart(seed + 17)}:${hexPart(seed + 18)}`;
  
  const ipFirst = Math.floor(103 + seededRandom(seed + 19) * 80);
  const ipSec = Math.floor(10 + seededRandom(seed + 20) * 240);
  const ipThird = Math.floor(1 + seededRandom(seed + 21) * 254);
  const ipLast = Math.floor(1 + seededRandom(seed + 22) * 254);
  const ip = `${ipFirst}.${ipSec}.${ipThird}.${ipLast}`;

  const imei = `358941${Math.floor(100000000 + seededRandom(seed + 23) * 899999999)}`;

  // Leaks
  const leakDatabases = [
    { source: 'E-Commerce Marketplace 2023', year: 2023, dataType: 'Phone, Hash PWD, Alamat', riskLevel: 'HIGH' as const },
    { source: 'Telecommunication Gateway Dump', year: 2022, dataType: 'NIK, MSISDN, IMEI, IMSI', riskLevel: 'CRITICAL' as const },
    { source: 'Fintech & Wallet Registry', year: 2024, dataType: 'Email, Full Name, Device ID', riskLevel: 'MEDIUM' as const },
    { source: 'Social Platform Graph DB', year: 2021, dataType: 'Profile, Location, Contacts', riskLevel: 'LOW' as const }
  ];
  const numLeaks = Math.floor(1 + seededRandom(seed + 24) * 3);
  const selectedLeaks = leakDatabases.slice(0, numLeaks);

  // Social handles based on name
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(seededRandom(seed + 25) * 99)}`;
  const socials = [
    { platform: 'Instagram', handle: `@${username}`, status: 'ACTIVE' as const, followers: `${Math.floor(400 + seededRandom(seed + 26) * 4500)}` },
    { platform: 'WhatsApp / Telegram', handle: isPhone ? query : `+62 812-${Math.floor(1000 + seededRandom(seed + 27) * 8999)}-${Math.floor(1000 + seededRandom(seed + 28) * 8999)}`, status: 'LINKED' as const },
    { platform: 'Google Workspace', handle: isEmail ? query : `${username}@gmail.com`, status: 'ACTIVE' as const },
    { platform: 'X (Twitter)', handle: `@${username}_id`, status: 'ACTIVE' as const }
  ];

  // Open ports
  const possiblePorts = [80, 443, 8080, 5555, 22, 53, 8443, 3000];
  const openPorts = possiblePorts.filter((_, idx) => seededRandom(seed + 30 + idx) > 0.45);
  if (openPorts.length === 0) openPorts.push(80, 443);

  const trackingId = `KRAH-TRK-${Math.floor(100000 + seededRandom(seed + 35) * 900000)}`;

  return {
    query: query,
    queryType: isEmail ? 'email' : 'phone',
    name: fullName,
    gender: isFemale ? 'Perempuan' : 'Laki-laki',
    age: age,
    avatarUrl: avatarUrl,
    nikHash: `317409${Math.floor(1000000000 + seededRandom(seed + 36) * 8999999999)}`,
    phone: isPhone ? query : `+62 813-${Math.floor(1000 + seededRandom(seed + 37) * 8999)}-${Math.floor(1000 + seededRandom(seed + 38) * 8999)}`,
    email: isEmail ? query : `${username}@gmail.com`,

    location: {
      address: `${street}, RT 04 / RW 07, Kec. ${cityObj.city.split(' ')[0]}`,
      city: cityObj.city,
      province: cityObj.province,
      country: cityObj.country,
      postalCode: cityObj.postalCode,
      latitude: lat,
      longitude: lng,
      altitude: `${Math.floor(15 + seededRandom(seed + 39) * 140)} m MSL`,
      accuracy: `± ${Math.floor(3 + seededRandom(seed + 40) * 12)} Meter (Satellite Lock: 11 SV)`,
      timezone: 'WIB (UTC+7)'
    },

    device: {
      model: deviceObj.model,
      vendor: deviceObj.vendor,
      os: deviceObj.os,
      osVersion: deviceObj.os.split(' ')[1] || '14.0',
      batteryLevel: batteryPct,
      batteryStatus: batteryPct < 30 ? 'Discharging (Low)' : 'Active / Battery',
      imei: imei,
      macAddress: mac,
      screenResolution: deviceObj.res,
      lastActive: 'Sedang Aktif (Ping < 24ms)'
    },

    network: {
      ip: ip,
      ipv6: `2001:448a:${hexPart(seed + 41)}:${hexPart(seed + 42)}::${hexPart(seed + 43)}`,
      carrier: carrierObj.name,
      networkType: '5G NR NSA / eNodeB',
      signalDbm: -1 * Math.floor(65 + seededRandom(seed + 44) * 32),
      towerId: `BTS-ID-${cityObj.postalCode}-${Math.floor(100 + seededRandom(seed + 45) * 899)}`,
      mccMnc: carrierObj.mccMnc,
      isp: carrierObj.isp,
      openPorts: openPorts,
      vpnDetected: seededRandom(seed + 46) > 0.7,
      packetLoss: '0.02% (Optimal)'
    },

    security: {
      threatScore: Math.floor(65 + seededRandom(seed + 47) * 30),
      leakedDatabases: selectedLeaks,
      vulnerabilities: [
        'Open Remote ADB / Debugger Port [CVE-2023-4012]',
        'Unpatched Bluetooth BLE Beacon Broadcast',
        'Weak TLS Session Renegotiation Flag'
      ],
      sslStatus: 'Valid TLS 1.3 / Certificate Root Trust',
      encryptionGrade: 'AES-256-GCM / SHA-512'
    },

    social: socials,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    trackingId: trackingId
  };
}
