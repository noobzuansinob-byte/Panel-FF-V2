export interface TargetResult {
  query: string;
  queryType: 'phone' | 'email';
  name: string;
  gender: string;
  age: number;
  avatarUrl: string;
  nikHash?: string;
  phone?: string;
  email?: string;
  
  // Geolocation
  location: {
    address: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    altitude: string;
    accuracy: string;
    timezone: string;
  };

  // Device Info
  device: {
    model: string;
    vendor: string;
    os: string;
    osVersion: string;
    batteryLevel: number;
    batteryStatus: string;
    imei: string;
    macAddress: string;
    screenResolution: string;
    lastActive: string;
  };

  // Network Telemetry
  network: {
    ip: string;
    ipv6: string;
    carrier: string;
    networkType: string;
    signalDbm: number;
    towerId: string;
    mccMnc: string;
    isp: string;
    openPorts: number[];
    vpnDetected: boolean;
    packetLoss: string;
  };

  // Breach & Security Analysis
  security: {
    threatScore: number;
    leakedDatabases: Array<{
      source: string;
      year: number;
      dataType: string;
      riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    }>;
    vulnerabilities: string[];
    sslStatus: string;
    encryptionGrade: string;
  };

  // Social Intelligence
  social: Array<{
    platform: string;
    handle: string;
    status: 'ACTIVE' | 'PRIVATE' | 'LINKED';
    followers?: string;
  }>;

  timestamp: string;
  trackingId: string;
}

export interface ScanStep {
  id: number;
  phase: string;
  detail: string;
  percent: number;
  status: 'pending' | 'running' | 'completed' | 'warning';
}

export type ThemeColor = 'emerald' | 'cyan' | 'amber' | 'crimson';
