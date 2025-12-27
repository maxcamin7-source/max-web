
import React from 'react';
import { Calendar, Coffee, ArrowRight, Sparkles } from 'lucide-react';

const ConnectSection: React.FC = () => {
  // REPLACE THE LINK BELOW WITH YOUR ACTUAL CALENDLY URL
  const CALENDLY_URL = "https://calendly.com/maxcamin7/new-meeting";

  return (
    <section className="bg-slate-50 rounded-[3rem] p-12 md:p-16 border border-slate-100 mt-2 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-700/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl"></div>

      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="max-w-xl w-full text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} />
            Let's Collaborate
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Schedule a Meeting</h2>
        </div>

        {/* Scheduling Tool Card - Centered */}
        <div className="max-w-xl w-full">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 p-8 md:p-10 border border-slate-100 transform hover:-translate-y-1 transition-transform duration-500">
            <div className="flex items-center justify-between mb-10">
              <div className="w-16 h-16 bg-[#1a4a3a] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Calendar size={32} />
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Availability</div>
                <div className="text-emerald-700 font-bold">Open for Fall 2025</div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Virtual Chat card made fully clickable */}
              <a 
                href={CALENDLY_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-700/30 transition-colors text-left block"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-700 shadow-sm">
                  <Coffee size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Virtual Chat</h4>
                  <p className="text-sm text-slate-500">15-30 Minute Intro Call</p>
                </div>
                <ArrowRight size={20} className="ml-auto text-slate-300 group-hover:text-emerald-700 transition-colors" />
              </a>

              <div className="pt-4">
                <p className="text-sm font-medium text-slate-500 mb-6 text-center">
                  Prefer direct email? Reach out at <span className="font-bold text-slate-800">maxcamin32@gmail.com</span>
                </p>
                
                <a 
                  href={CALENDLY_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-[#1a4a3a] text-white text-center py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-[#153a2d] transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  Book a Chat
                </a>
              </div>
            </div>

            {/* Sub-card decorative bit */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-700"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
