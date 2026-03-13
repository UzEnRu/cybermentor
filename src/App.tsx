/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Terminal as TerminalIcon, 
  Activity, 
  Globe, 
  Cpu, 
  Wifi, 
  AlertTriangle,
  Zap,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Database,
  Server,
  Network,
  Key,
  FileCode,
  Bug,
  Radio,
  Share2,
  ChevronRight,
  Maximize2,
  X,
  Settings,
  Bell,
  User,
  Power,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';

// --- Utils ---
const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// --- Components ---

const VulnerabilityScanner = () => {
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const scan = () => {
    if (!target) return;
    setIsScanning(true);
    setResults([]);
    
    const potentialVulns = [
      { id: 1, name: 'SQL Injection', severity: 'CRITICAL', desc: 'Ma\'lumotlar bazasiga ruxsatsiz kirish xavfi.' },
      { id: 2, name: 'Cross-Site Scripting (XSS)', severity: 'HIGH', desc: 'Foydalanuvchi brauzerida zararli skriptlar ijrosi.' },
      { id: 3, name: 'Broken Authentication', severity: 'MEDIUM', desc: 'Sessiyalarni boshqarishdagi zaifliklar.' },
      { id: 4, name: 'Outdated Software', severity: 'LOW', desc: 'Eski versiyadagi kutubxonalar aniqlandi.' },
      { id: 5, name: 'Open Ports', severity: 'INFO', desc: 'Port 8080 va 22 ochiq holatda.' }
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < potentialVulns.length) {
        setResults(prev => [...prev, potentialVulns[count]]);
        count++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 1500);
  };

  return (
    <div className="cyber-card p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Bug className="w-5 h-5 text-[#00ff9d]" />
        <h3 className="text-lg font-bold uppercase tracking-wider">Vulnerability Scanner</h3>
      </div>
      
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="IP yoki Domen (masalan: 192.168.1.1)"
          className="flex-1 bg-black/50 border border-[#00ff9d]/20 p-2 rounded text-xs text-[#00ff9d] focus:outline-none focus:border-[#00ff9d]"
        />
        <button 
          onClick={scan}
          disabled={isScanning}
          className="bg-[#00ff9d] text-black px-4 py-2 rounded text-xs font-bold uppercase hover:bg-white transition-all disabled:opacity-50"
        >
          {isScanning ? <RefreshCw className="animate-spin" size={14} /> : 'Scan'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
        <AnimatePresence>
          {results.map((res) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 bg-black/30 border border-white/5 rounded flex items-start gap-3"
            >
              <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                res.severity === 'CRITICAL' ? 'bg-red-600 shadow-[0_0_10px_red]' :
                res.severity === 'HIGH' ? 'bg-red-400' :
                res.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-white/80 uppercase">{res.name}</span>
                  <span className="text-[8px] px-1 bg-white/10 rounded text-white/40">{res.severity}</span>
                </div>
                <p className="text-[9px] text-white/40 leading-tight">{res.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!isScanning && results.length === 0 && (
          <div className="h-full flex items-center justify-center text-white/10 text-[10px] uppercase tracking-widest">
            Skanerlashni boshlash uchun nishonni kiriting
          </div>
        )}
      </div>
    </div>
  );
};

const CipherTool = () => {
  const [input, setInput] = useState('');
  const [method, setMethod] = useState<'BASE64' | 'ROT13' | 'HEX'>('BASE64');
  
  const output = useMemo(() => {
    if (!input) return '';
    try {
      if (method === 'BASE64') return btoa(input);
      if (method === 'ROT13') return input.replace(/[a-zA-Z]/g, (c: any) => String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
      if (method === 'HEX') return Array.from(input).map((c: string) => c.charCodeAt(0).toString(16)).join(' ');
      return '';
    } catch (e) {
      return 'Xatolik: Noto\'g\'ri format';
    }
  }, [input, method]);

  return (
    <div className="cyber-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Key className="w-5 h-5 text-[#00ff9d]" />
        <h3 className="text-lg font-bold uppercase tracking-wider">Shifrlash Markazi</h3>
      </div>
      
      <div className="flex gap-2 mb-4">
        {(['BASE64', 'ROT13', 'HEX'] as const).map(m => (
          <button 
            key={m}
            onClick={() => setMethod(m)}
            className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all ${method === m ? 'bg-[#00ff9d] text-black border-[#00ff9d]' : 'border-white/10 text-white/40 hover:border-white/30'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Shifrlash uchun matn..."
        className="w-full h-20 bg-black/50 border border-[#00ff9d]/20 p-2 rounded text-xs text-[#00ff9d] focus:outline-none focus:border-[#00ff9d] mb-4 resize-none"
      />

      <div className="relative">
        <div className="absolute top-2 left-2 text-[8px] text-white/20 uppercase tracking-widest">Natija</div>
        <div className="w-full min-h-[80px] bg-black/80 border border-dashed border-[#00ff9d]/30 p-6 rounded text-xs text-[#00ff9d] break-all font-mono">
          {output || 'Kutilmoqda...'}
        </div>
      </div>
    </div>
  );
};

const NetworkMonitor = () => {
  const [packets, setPackets] = useState<any[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket = {
        id: Math.random(),
        src: `192.168.1.${Math.floor(Math.random() * 255)}`,
        dst: `10.0.0.${Math.floor(Math.random() * 255)}`,
        proto: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'SSH'][Math.floor(Math.random() * 5)],
        size: Math.floor(Math.random() * 1500),
        status: Math.random() > 0.9 ? 'BLOCKED' : 'ALLOWED'
      };
      setPackets(prev => [newPacket, ...prev.slice(0, 7)]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-[#00ff9d]" />
          <h3 className="text-lg font-bold uppercase tracking-wider">Tarmoq Monitoringi</h3>
        </div>
        <div className="animate-pulse flex items-center gap-1 text-[10px] text-blue-400">
          <Radio size={12} /> LIVE
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-5 text-[9px] text-white/30 uppercase font-bold px-2 mb-2">
          <span>Source</span>
          <span>Dest</span>
          <span>Proto</span>
          <span>Size</span>
          <span className="text-right">Status</span>
        </div>
        {packets.map(p => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-5 text-[10px] p-2 bg-white/[0.02] border border-white/5 rounded items-center"
          >
            <span className="text-white/60 truncate">{p.src}</span>
            <span className="text-white/60 truncate">{p.dst}</span>
            <span className="text-blue-400 font-bold">{p.proto}</span>
            <span className="text-white/40">{p.size} B</span>
            <span className={`text-right font-bold ${p.status === 'ALLOWED' ? 'text-[#00ff9d]' : 'text-red-500'}`}>
              {p.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SystemConsole = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Cyber Sentinel OS v4.0.0 yuklandi.', 'Tizim tayyor. Buyruqni kiriting...']);
  
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    
    const cmd = input.toLowerCase().trim();
    let response = '';
    
    if (cmd === 'help') response = 'Mavjud buyruqlar: scan, status, clear, whoami, ping';
    else if (cmd === 'scan') response = 'Tarmoq skanerlanmoqda... 12 ta faol qurilma aniqlandi.';
    else if (cmd === 'status') response = 'Tizim holati: OPTIMAL. Barcha firewall qoidalari faol.';
    else if (cmd === 'clear') { setHistory([]); setInput(''); return; }
    else if (cmd === 'whoami') response = 'Root Administrator (Asadbek)';
    else if (cmd === 'ping') response = 'PING 8.8.8.8: 14ms';
    else response = `Xatolik: '${cmd}' buyrug'i topilmadi. 'help' deb yozing.`;

    setHistory(prev => [...prev, `> ${input}`, response]);
    setInput('');
  };

  return (
    <div className="cyber-card bg-black border-[#00ff9d]/30 flex flex-col h-[300px]">
      <div className="bg-[#12141a] p-2 flex items-center justify-between border-b border-[#00ff9d]/20">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-[#00ff9d]" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Root Terminal</span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] space-y-1 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-white/40' : line.startsWith('Xatolik') ? 'text-red-500' : 'text-[#00ff9d]'}>
            {line}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center gap-2">
          <span className="text-[#00ff9d]">root@sentinel:~#</span>
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#00ff9d]"
          />
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="scanline" />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 bg-[#0d0f14] border-r border-[#00ff9d]/10 flex flex-col items-center py-8 gap-8 z-50">
        <div className="w-10 h-10 bg-[#00ff9d] rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_#00ff9d]">
          <Shield size={24} />
        </div>
        
        <div className="flex-1 flex flex-col gap-6">
          {[
            { id: 'DASHBOARD', icon: <Activity size={20} /> },
            { id: 'NETWORK', icon: <Network size={20} /> },
            { id: 'SECURITY', icon: <Lock size={20} /> },
            { id: 'DATABASE', icon: <Database size={20} /> },
            { id: 'SETTINGS', icon: <Settings size={20} /> }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#00ff9d]/10 text-[#00ff9d]' : 'text-white/20 hover:text-white/50'}`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        <button className="p-3 text-red-500/50 hover:text-red-500 transition-colors">
          <Power size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-16 p-6 md:p-10 flex flex-col gap-8">
        {/* Top Bar */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              SENTINEL <span className="text-[#00ff9d] glitch-text">OS</span>
            </h1>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-1">
              Advanced Cyber-Security Suite
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end">
              <div className="text-xl font-bold tracking-widest">{time.toLocaleTimeString()}</div>
              <div className="text-[10px] text-white/30 uppercase">{time.toLocaleDateString('uz-UZ')}</div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Bell size={20} className="text-white/40" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <User size={16} className="text-white/40" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Main Stats Row */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Xavfsizlik Darajasi', val: '98%', icon: <ShieldCheck className="text-[#00ff9d]" />, color: 'text-[#00ff9d]' },
              { label: 'Faol Tahdidlar', val: '03', icon: <ShieldAlert className="text-red-500" />, color: 'text-red-500' },
              { label: 'Bloklangan IPlar', val: '1.2k', icon: <Globe className="text-blue-400" />, color: 'text-blue-400' },
              { label: 'Tizim Barqarorligi', val: '99.9%', icon: <Zap className="text-yellow-500" />, color: 'text-yellow-500' }
            ].map((stat, i) => (
              <div key={i} className="cyber-card p-6 flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="lg:col-span-4 space-y-6">
            <VulnerabilityScanner />
            <CipherTool />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <NetworkMonitor />
            <SystemConsole />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="cyber-card p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileCode size={16} className="text-[#00ff9d]" /> So'nggi Hodisalar
              </h3>
              <div className="space-y-4">
                {[
                  { time: '14:20', msg: 'Firewall qoidasi yangilandi', type: 'INFO' },
                  { time: '14:15', msg: 'SSH login urinishi (Failed)', type: 'WARN' },
                  { time: '13:50', msg: 'Yangi qurilma aniqlandi', type: 'INFO' },
                  { time: '13:10', msg: 'DDoS hujumi qaytarildi', type: 'ALERT' },
                  { time: '12:45', msg: 'Tizim zaxira nusxasi yaratildi', type: 'SUCCESS' }
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-[10px]">
                    <span className="text-white/20 shrink-0">{log.time}</span>
                    <span className={`font-bold shrink-0 ${
                      log.type === 'WARN' ? 'text-yellow-500' : 
                      log.type === 'ALERT' ? 'text-red-500' : 
                      log.type === 'SUCCESS' ? 'text-[#00ff9d]' : 'text-blue-400'
                    }`}>[{log.type}]</span>
                    <span className="text-white/50 truncate">{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cyber-card p-6 bg-gradient-to-br from-[#00ff9d]/5 to-transparent">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Xavfsizlik Holati</h3>
              <div className="flex justify-center py-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="text-white/5"
                      strokeDasharray="100, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      className="text-[#00ff9d]"
                      strokeDasharray="85, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">85%</span>
                    <span className="text-[8px] text-white/30 uppercase">Optimal</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 text-center leading-relaxed">
                Tizim xavfsizligi yuqori darajada. 12 ta kichik tavsiya mavjud.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Global Status Bar */}
      <div className="fixed bottom-0 left-16 right-0 h-8 bg-[#0d0f14] border-t border-[#00ff9d]/10 px-6 flex items-center justify-between text-[9px] uppercase tracking-widest z-50">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" /> DB: CONNECTED</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" /> API: ONLINE</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> VPN: ACTIVE</span>
        </div>
        <div className="flex gap-6">
          <span className="text-white/30">Latency: 24ms</span>
          <span className="text-white/30">Uptime: 142d 12h</span>
          <span className="text-[#00ff9d]">Secure Session: AES-256</span>
        </div>
      </div>
    </div>
  );
}
