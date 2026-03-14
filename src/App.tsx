/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Globe, 
  Cpu, 
  Eye, 
  Activity, 
  ChevronRight, 
  Menu, 
  X,
  Server,
  Zap,
  Fingerprint,
  Radio,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Components ---

const MatrixBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
      <div className="flex justify-around w-full h-full">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="matrix-column text-emerald-500 font-mono text-[8px] whitespace-nowrap"
            style={{ 
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {[...Array(80)].map((_, j) => (
              <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Typewriter = ({ text, speed = 40 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

const Radar = () => {
  return (
    <div className="relative w-48 h-48 border border-emerald-500/10 rounded-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 border border-emerald-500/5 rounded-full" />
      <div className="absolute inset-12 border border-emerald-500/5 rounded-full" />
      
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 origin-center bg-gradient-to-tr from-emerald-500/10 to-transparent"
        style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
      />

      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
          className="absolute w-1 h-1 bg-emerald-500 rounded-full"
          style={{ 
            top: `${30 + Math.random() * 40}%`, 
            left: `${30 + Math.random() * 40}%` 
          }}
        />
      ))}
      
      <Radio className="w-5 h-5 text-emerald-500/20 relative z-10" />
    </div>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Shield className="w-5 h-5 text-emerald-500" />
          <div className="flex flex-col">
            <span className="font-mono font-bold text-xs tracking-widest block leading-none">ASADBEK</span>
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">SECURE_NODE_01</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
          <a href="#about" className="hover:text-emerald-500 transition-colors">Haqida</a>
          <a href="#security" className="hover:text-emerald-500 transition-colors">Xavfsizlik</a>
          <a href="#contact" className="hover:text-emerald-500 transition-colors">Aloqa</a>
          <button className="px-4 py-1.5 border border-emerald-500/20 rounded-sm text-emerald-500 hover:bg-emerald-500/5 transition-all">
            ACCESS_KEY
          </button>
        </div>

        <button className="md:hidden text-emerald-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('IDLE');

  const handleLogin = () => {
    setIsScanning(true);
    setScanStatus('SCANNING');
    setTimeout(() => setScanStatus('VERIFYING'), 1500);
    setTimeout(() => setScanStatus('GRANTED'), 3000);
    setTimeout(() => {
      setIsScanning(false);
      setScanStatus('IDLE');
    }, 4500);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden security-grid">
      <div className="scanline" />
      
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center"
          >
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <Fingerprint className="w-16 h-16 text-emerald-500/40" />
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"
                />
              </div>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-emerald-500/70">
                {scanStatus === 'SCANNING' && <Typewriter text="SCANNING_BIOMETRICS..." speed={30} />}
                {scanStatus === 'VERIFYING' && <Typewriter text="VERIFYING_IDENTITY..." speed={30} />}
                {scanStatus === 'GRANTED' && <span className="text-emerald-500 glow-text">ACCESS_GRANTED</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-sm text-emerald-500/60 text-[9px] font-mono uppercase tracking-[0.4em] mb-10">
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
            NODE_ACTIVE :: UZ_DXX_01
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-8">
            Milliy xavfsizlik va <br />
            <span className="text-emerald-500 font-normal italic">strategik tahlil</span> <br />
            tizimiga xush kelibsiz.
          </h1>
          
          <p className="text-sm text-white/40 max-w-md mb-12 font-mono leading-relaxed">
            {`// ASADBEK.EU.CC :: O'zbekiston Respublikasi milliy manfaatlarini himoya qilish va kiber-xavfsizlikni ta'minlash portali.`}
          </p>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={handleLogin}
              className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              Tizimga Kirish <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
              Hujjatlar
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-end">
          <div className="relative p-12 border border-white/5 rounded-full">
            <Radar />
            <div className="absolute top-0 right-0 p-4 bg-black border border-white/5 rounded-lg font-mono text-[8px] text-white/20">
              LAT: 41.2995° N <br />
              LNG: 69.2401° E
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-8 flex items-center gap-6">
        {[
          { label: 'STATUS', val: 'OPTIMAL', color: 'text-emerald-500' },
          { label: 'THREAT', val: 'ZERO', color: 'text-white/40' },
          { label: 'UPTIME', val: '99.9%', color: 'text-white/40' }
        ].map((s, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{s.label}</span>
            <span className={`text-[10px] font-mono ${s.color}`}>{s.val}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Features = () => {
  const cards = [
    {
      title: "Kiber Himoya",
      code: "01",
      icon: <Lock size={20} />,
      desc: "Davlat ahamiyatiga molik ma'lumotlarni shifrlash va kiber-hujumlarni bartaraf etish."
    },
    {
      title: "Strategik Tahlil",
      code: "02",
      icon: <Globe size={20} />,
      desc: "Mintaqaviy xavfsizlik va geosiyosiy o'zgarishlarni real vaqtda tahlil qilish."
    },
    {
      title: "AI Monitoring",
      code: "03",
      icon: <Cpu size={20} />,
      desc: "Sun'iy intellekt yordamida shubhali faolliklarni avtomatik aniqlash."
    }
  ];

  return (
    <section id="security" className="py-32 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          {cards.map((card, i) => (
            <div key={i} className="group">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono text-emerald-500/40">{card.code}</span>
                <div className="h-px flex-1 bg-white/5" />
                <div className="text-white/20 group-hover:text-emerald-500 transition-colors">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-xl font-light mb-4 tracking-tight">{card.title}</h3>
              <p className="text-xs text-white/30 leading-relaxed font-mono">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dashboard = () => {
  return (
    <section className="py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-[0.4em] block mb-4">Monitoring</span>
              <h2 className="text-3xl font-light tracking-tight mb-6">Tizim holati va <br /> xavfsizlik darajasi.</h2>
              <p className="text-xs text-white/30 font-mono leading-relaxed max-w-sm">
                Barcha tarmoq tugunlari real vaqt rejimida nazorat qilinadi. Har qanday og'ish darhol aniqlanadi.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Kiber Himoya', val: '98%' },
                { label: 'Tizim Yuklamasi', val: '12%' },
                { label: 'Tarmoq Tezligi', val: '1.2 Gb/s' },
                { label: 'Faol Tugunlar', val: '1,024' }
              ].map((s, i) => (
                <div key={i} className="border-l border-emerald-500/20 pl-6">
                  <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className="text-lg font-mono text-white/80">{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black border border-white/5 p-8 rounded-sm font-mono text-[9px] text-emerald-500/50 space-y-2 h-64 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
            <div className="animate-pulse">
              {`> INITIALIZING_SECURE_KERNEL...`} <br />
              {`> LOADING_DXX_MODULES...`} <br />
              {`> SCANNING_LOCAL_NETWORK...`} <br />
              {`> NODE_01: ONLINE`} <br />
              {`> NODE_02: ONLINE`} <br />
              {`> ENCRYPTING_DATA_STREAM...`} <br />
              {`> FIREWALL_STATUS: OPTIMAL`} <br />
              {`> THREAT_LEVEL: ZERO`} <br />
              {`> MONITORING_IP: 192.168.1.104`} <br />
              {`> PACKET_ANALYSIS_COMPLETE`} <br />
              {`> SYSTEM_READY.`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <h2 className="text-3xl font-light tracking-tight mb-6">Aloqa markazi.</h2>
        <p className="text-xs text-white/30 font-mono mb-12">
          {`// Barcha xabarlar RSA-4096 algoritmi orqali shifrlanadi.`}
        </p>
        
        <form className="space-y-4 text-left">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="ID" className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-sm focus:border-emerald-500/40 outline-none transition-all font-mono text-[10px]" />
            <input type="email" placeholder="SECURE_MAIL" className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-sm focus:border-emerald-500/40 outline-none transition-all font-mono text-[10px]" />
          </div>
          <textarea rows={4} placeholder="MESSAGE_BODY" className="w-full bg-white/[0.02] border border-white/5 p-4 rounded-sm focus:border-emerald-500/40 outline-none transition-all font-mono text-[10px]" />
          <button className="w-full py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-black transition-all">
            Ma'lumotni Uzatish
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Shield className="w-4 h-4 text-emerald-500/40" />
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">ASADBEK.EU.CC © 2026</span>
        </div>
        
        <div className="flex gap-10 text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
          <a href="#" className="hover:text-emerald-500 transition-colors">Protokollar</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Arxiv</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">DXX_Main</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-[#050505] text-[#E4E3E0] selection:bg-emerald-500 selection:text-black min-h-screen font-sans">
      <MatrixBackground />
      <Nav />
      <Hero />
      <Features />
      <Dashboard />
      <Contact />
      <Footer />
    </div>
  );
}
