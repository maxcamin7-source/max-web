import React, { useState } from 'react';
import { Target, Users, Activity, Cpu, Zap, Rocket, Compass } from 'lucide-react';
import { HAWK_LOGO, HAWK_SPEAKER_IMAGE, GROW_GIVE_LOGO, GROW_GIVE_SPEAKER_IMAGE } from '../ImagesData';

interface ChartPoint {
  month: string;
  hawk: number;
  sp: number;
}

const chartData: ChartPoint[] = [
  { month: 'Jan', hawk: 0, sp: 0 },
  { month: 'Feb', hawk: 0.23, sp: 1.6 },
  { month: 'Mar', hawk: -2.33, sp: -5.83 },
  { month: 'Apr', hawk: -6.48, sp: -14.14 },
  { month: 'May', hawk: 5.2, sp: -2.6 },
  { month: 'Jun', hawk: 11.09, sp: -0.42 },
  { month: 'Jul', hawk: 20.48, sp: 5.3 },
  { month: 'Aug', hawk: 19.89, sp: 6.91 },
  { month: 'Sep', hawk: 34.58, sp: 11.54 },
  { month: 'Oct', hawk: 40.99, sp: 14.6 },
  { month: 'Nov', hawk: 28.05, sp: 11.86 },
  { month: 'Dec', hawk: 35.25, sp: 15.48 },
];

const sectors = [
  { name: 'Big Tech & Internet', val: '39.75%', color: '#064e3b', dash: 100, offset: 0 },
  { name: 'Semiconductors & Hardware', val: '28.97%', color: '#d97706', dash: 73, offset: -100 },
  { name: 'Software & Cybersecurity', val: '20.79%', color: '#1e3a8a', dash: 52, offset: -173 },
  { name: 'Energy & Utilities', val: '6.43%', color: '#0d9488', dash: 16, offset: -225 },
  { name: 'Defense & Industrials', val: '4.03%', color: '#334155', dash: 10, offset: -241 },
];

const MarketWatchItems = [
  { 
    icon: <Cpu size={24} />, 
    title: "Technology & AI", 
    tag: "Transformative", 
    desc: "The primary engine of global innovation. We prioritize infrastructure and applications that drive cross-sector productivity.",
    bgGraphic: (
      <svg className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] text-emerald-900 group-hover:opacity-[0.12] transition-opacity" viewBox="0 0 100 100">
        <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <path d="M50,20 L50,80 M20,50 L80,50" stroke="currentColor" strokeWidth="0.5" />
        <rect x="40" y="40" width="20" height="20" fill="currentColor" opacity="0.5" />
      </svg>
    )
  },
  { 
    icon: <Zap size={24} />, 
    title: "Energy", 
    tag: "Bullish", 
    desc: "Focused on the generation and storage systems that will power the next century's sustainable infrastructure.",
    bgGraphic: (
      <svg className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] text-amber-600 group-hover:opacity-[0.12] transition-opacity" viewBox="0 0 100 100">
        <path d="M30,10 L70,10 L60,45 L80,45 L40,90 L50,55 L20,55 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="45" stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="8 4" />
      </svg>
    )
  },
  { 
    icon: <Rocket size={24} />, 
    title: "Space", 
    tag: "Frontier", 
    desc: "Exploring the frontier of logistics and satellite communications that connect the global economy.",
    bgGraphic: (
      <svg className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] text-indigo-900 group-hover:opacity-[0.12] transition-opacity" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        <circle cx="20" cy="30" r="1.5" fill="currentColor" />
        <circle cx="80" cy="40" r="1" fill="currentColor" />
        <circle cx="40" cy="80" r="1.5" fill="currentColor" />
        <path d="M10,50 Q50,10 90,50 Q50,90 10,50" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="4 2" />
        <path d="M30,50 A20,10 0 1,0 70,50 A20,10 0 1,0 30,50" stroke="currentColor" fill="none" strokeWidth="1" className="rotate-45 origin-center" />
      </svg>
    )
  }
];

const VenturesTab: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chart Dimensions
  const width = 400;
  const height = 240;
  const paddingX = 40;
  const paddingY = 40;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const getX = (index: number) => paddingX + (index * (chartWidth / (chartData.length - 1)));
  const getY = (value: number) => {
    const min = -15;
    const max = 45;
    const range = max - min;
    const normalized = (value - min) / range;
    return height - paddingY - (normalized * chartHeight);
  };

  const createSmoothPath = (type: 'hawk' | 'sp') => {
    const points = chartData.map((d, i) => ({
      x: getX(i),
      y: getY(type === 'hawk' ? d.hawk : d.sp)
    }));
    
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;
    const tension = 0.2;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || points[i + 1];

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const hawkPath = createSmoothPath('hawk');
  const spPath = createSmoothPath('sp');

  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* 1. Hawk Investment Club Section */}
      <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#1a4a3a] px-14 py-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden p-2">
               {!HAWK_LOGO.startsWith('PASTE') ? (
                 <img src={HAWK_LOGO} alt="Hawk Logo" className="w-full h-auto max-h-full object-contain" />
               ) : (
                 <img src="https://api.iconify.design/ri:shining-2-fill.svg?color=%231a4a3a" alt="Hawk" className="w-12 h-12" />
               )}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight">Hawk Investment Club</h2>
              <p className="text-sm font-bold text-amber-400 uppercase tracking-[0.25em]">Founder & President</p>
            </div>
          </div>
        </div>

        <div className="p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-8 h-full">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Compass size={18} className="text-[#1a4a3a]" />
                <h4 className="text-[10px] font-black text-[#1a4a3a] uppercase tracking-[0.2em]">Hawk Strategy</h4>
              </div>
              <blockquote className="text-[1.35rem] leading-snug font-medium text-slate-800 italic mb-8">
                "We invest with logic and purpose, putting capital into companies we believe can shape the future and create lasting impact. Every trade is backed by collaboration, conviction, and a commitment to long-term value."
              </blockquote>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Hawk focuses on companies with the purpose and vision to make the world a better place through technological advancement.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50/50 p-8 rounded-[1.5rem] shadow-sm border border-slate-100/50 text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">$18,000</div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AUM Managed</div>
              </div>
              <div className="bg-[#f0fdf4] p-8 rounded-[1.5rem] shadow-sm border border-emerald-50 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">+20.2%</div>
                <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Alpha Generated</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-50 h-full flex flex-col min-h-[420px]">
              <h4 className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-12">Cumulative Portfolio Return</h4>
              <div className="relative flex-1">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                  {[45, 30, 15, 0, -15].map((val) => (
                    <g key={val}>
                      <line x1={paddingX} y1={getY(val)} x2={width - paddingX} y2={getY(val)} stroke="#f1f5f9" strokeWidth="1" strokeDasharray={val === 0 ? "0" : "4 4"} />
                      <text x={paddingX - 10} y={getY(val) + 4} textAnchor="end" className="fill-slate-400 text-[10px] font-bold">{val}%</text>
                    </g>
                  ))}
                  <path d={spPath} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-80" />
                  <path d={hawkPath} fill="none" stroke="#1a4a3a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  {chartData.map((d, i) => (
                    <text key={i} x={getX(i)} y={height - 10} textAnchor="middle" className="fill-slate-400 text-[9px] font-black uppercase tracking-tighter">{d.month}</text>
                  ))}
                </svg>
              </div>
              <div className="mt-8 flex justify-center gap-10 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-1.5 bg-[#1a4a3a] rounded-full"></div>
                  <span>Hawk Portfolio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-1.5 border-t-2 border-dashed border-slate-300"></div>
                  <span>S&P 500 Index</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[2.5rem] overflow-hidden group shadow-md flex items-center justify-center bg-slate-50 min-h-[280px]">
              <img 
                src={!HAWK_SPEAKER_IMAGE.startsWith('PASTE') ? HAWK_SPEAKER_IMAGE : "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"} 
                alt="Speaker Series" 
                className="w-full h-auto max-h-[400px] object-contain group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <h4 className="text-2xl font-bold text-white mb-2">Speaker Series</h4>
                <p className="text-xs text-white/70 leading-relaxed max-w-[95%]">Industry insights and networking session with a Business Development and Solutions Management professional at Google.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <section className="bg-[#0f172a] py-6 px-10 rounded-[2.5rem] shadow-lg flex flex-col md:flex-row items-center justify-between h-full">
              <div className="space-y-6 flex-1 w-full md:w-auto">
                <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">Conviction Sectors</h5>
                <div className="space-y-3">
                  {sectors.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-8 max-w-[360px]">
                      <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></div>
                        <span className="text-xs text-white font-bold opacity-90">{s.name}</span>
                      </div>
                      <span className="text-xs text-white font-black opacity-80">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative flex-shrink-0 mt-6 md:mt-0">
                <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
                  {sectors.map((s, idx) => (
                    <circle 
                      key={idx} 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke={s.color} 
                      strokeWidth="11" 
                      strokeDasharray={`${s.dash} 251.3`} 
                      strokeDashoffset={s.offset} 
                      className="transition-all duration-1000"
                    />
                  ))}
                  <circle cx="50" cy="50" r="29" fill="#0f172a" />
                </svg>
              </div>
            </section>
          </div>

        </div>
      </section>

      {/* 2. Grow & Give Section */}
      <section className="bg-[#f0fdf9] rounded-[2.5rem] shadow-sm border border-emerald-100 p-12 relative overflow-hidden">
        
        <div className="flex items-center gap-8 mb-10 relative z-10">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-sm border border-emerald-50 p-2">
            {!GROW_GIVE_LOGO.startsWith('PASTE') ? (
              <img src={GROW_GIVE_LOGO} alt="Grow & Give Logo" className="w-full h-auto max-h-full object-contain" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 bg-white">
                 <img src="https://api.iconify.design/ri:leaf-fill.svg?color=%23065f46" alt="Logo" className="w-10 h-10 mb-1" />
                 <span className="text-[8px] font-black text-emerald-800/40 uppercase tracking-widest leading-tight">G&G Logo</span>
              </div>
            )}
          </div>
          
          <div className="pt-2">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Grow & Give</h2>
            <span className="inline-block mt-2 px-5 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full uppercase tracking-widest">Founder</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-start relative z-10">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-600">
                My interest in investing started at a young age, when my dad introduced me to the basics and showed me how powerful financial knowledge can be over time. Having that early guidance shaped how I think about money and made me realize how many people never get the same opportunity.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                That’s why I created Grow & Give, a free quarterly webinar series that teaches the fundamentals of investing, from opening an account to building long-term wealth through smart strategies. The goal is to make financial education accessible to everyone while also highlighting Operation HOPE and encouraging participants to learn, grow, and give back by supporting financial literacy in underserved communities.
              </p>
            </div>

            <div className="relative rounded-[2rem] overflow-hidden shadow-md border-4 border-white group bg-white flex items-center justify-center">
              <img 
                src={!GROW_GIVE_SPEAKER_IMAGE.startsWith('PASTE') ? GROW_GIVE_SPEAKER_IMAGE : "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"} 
                alt="Grow & Give Event" 
                className="w-full h-auto max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10">
                <p className="text-[11px] font-bold text-white tracking-widest uppercase leading-tight">Next generation of investor at Live Oak Classical In Waco</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-12 h-full">
            <div className="bg-[#1a4a3a] p-8 rounded-[2.5rem] text-center relative overflow-hidden shadow-2xl flex flex-col justify-center min-h-[200px] mt-2">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
              <blockquote className="text-xl font-serif text-white italic mb-4 relative z-10 leading-tight">
                "Grow wealth, give back."
              </blockquote>
              <div className="h-px w-12 bg-white/20 mx-auto mb-4"></div>
              <p className="text-[9px] font-black text-amber-400 uppercase tracking-[0.2em] relative z-10">
                Supporting Operation Hope
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm flex flex-col gap-4 items-center text-center aspect-square max-w-[280px] mx-auto w-full">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <Users size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-base font-bold text-slate-800 mb-1">Community Mission</h4>
                <p className="text-xs text-slate-500 leading-relaxed px-2">
                  Recently presented at <span className="font-bold text-slate-700">Live Oak Classical in Waco</span>, sharing investment experiences and building financial literacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Max's Market Watch Section */}
      <section className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-emerald-100">
        <div className="flex items-center gap-5 mb-4">
           <Activity className="text-emerald-700" size={32} />
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Max's Market Watch</h2>
        </div>
        <p className="text-base text-slate-500 mb-10">Key industries I am currently bullish on as the center of global advancement.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MarketWatchItems.map((item, i) => (
            <div key={i} className="group relative bg-slate-50/50 p-10 rounded-[2rem] border border-slate-100 space-y-8 overflow-hidden hover:shadow-xl hover:border-emerald-100 transition-all duration-500">
              {item.bgGraphic}
              <div className="relative z-10 w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-800 transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-sm uppercase tracking-widest mb-4">{item.tag}</span>
                <p className="text-base text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default VenturesTab;