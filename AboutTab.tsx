import React from 'react';
import { Bike, TrendingUp, Globe, Heart, Award, Code, Users, Plane } from 'lucide-react';
import { PassionItem, LanguageItem } from '../types';
import { SPAIN_FLAG } from '../ImagesData';

const Passions: PassionItem[] = [
  { 
    icon: 'bike', 
    name: 'Outdoors & Active', 
    description: 'Pickleball, Mountain Biking, Running, Gym, Intramural Sports' 
  },
  { 
    icon: 'stocks', 
    name: 'Investing', 
    description: 'Constant learner, hunting for new hot stocks and analyzing market trends' 
  },
  { 
    icon: 'travel', 
    name: 'Travel', 
    description: 'Broadening cultural horizons and meeting new people' 
  }
];

const Languages: LanguageItem[] = [
  { name: 'English', level: 'Native', percentage: 100 },
  { name: 'Spanish', level: 'Conversational', percentage: 40 }
];

const AboutTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fadeIn">
      {/* Left Column: Story and Global Perspective */}
      <div className="lg:col-span-8 space-y-10">
        <section className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="text-4xl font-bold text-slate-800 mb-10">My Story</h2>
          
          <div className="space-y-8 text-lg leading-relaxed text-slate-600 mb-12">
            <p>
              I’ve always been curious about how things work, especially when it comes to business, technology, and money. What started as a personal interest in investing turned into hours of learning, experimenting, and helping friends and family build confidence with their finances. Along the way, I realized I enjoy breaking down complex ideas and turning them into something practical and usable. That curiosity pushed me to keep learning and seek out opportunities that let me grow faster.
            </p>
            <p>
              As I explored finance more deeply, I became drawn to the idea that success isn’t just about numbers, but about people and the impact you can have on their lives. I’ve consistently looked for ways to build, create, and lead, whether through projects, ventures, or hands-on experience. I’m motivated by environments where growth is expected and accountability matters. Each step reinforced my desire to work in a field where guidance, trust, and long-term thinking are essential.
            </p>
            <p>
              Today, I’m focused on building a career that combines discipline, curiosity, and a genuine desire to help others succeed. I value cultures that feel human, ambitious, and built for the long term. My goal is to keep improving, take on meaningful challenges, and contribute to something bigger than myself.
            </p>
          </div>

          <div className="relative px-12 py-10 bg-slate-50 rounded-3xl border-l-8 border-emerald-700 italic text-slate-600 text-2xl">
            <span className="absolute top-4 left-4 text-8xl text-slate-200 font-serif leading-none">“</span>
            <p className="relative z-10 leading-relaxed font-medium">
              "How much longer are you going to avoid what you're capable of doing, in order to continue with what you're comfortable in doing?"
            </p>
          </div>
        </section>

        <section className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative group">
          {/* Spain Flag Positioned Top Right - Flexible sizing */}
          <div className="absolute top-8 right-12 max-w-[80px] shadow-sm border border-slate-100 rounded overflow-hidden p-1 bg-white">
             {!SPAIN_FLAG.startsWith('PASTE') ? (
               <img src={SPAIN_FLAG} alt="Spain Flag" className="w-full h-auto object-contain" />
             ) : (
               <div className="w-16 h-10 bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">Flag Slot</div>
             )}
          </div>
          
          <div className="absolute -right-20 -bottom-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
             <Globe size={300} />
          </div>
          <div className="flex items-center gap-5 mb-10">
            <Plane className="text-emerald-700" size={36} />
            <h2 className="text-4xl font-bold text-slate-800">Global Perspective</h2>
          </div>
          <div className="bg-emerald-50/40 p-10 rounded-3xl border border-emerald-100 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-emerald-900">Spring 2026: Madrid, Spain</h3>
              <div className="px-4 py-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full uppercase tracking-widest">Upcoming</div>
            </div>
            <p className="text-lg leading-relaxed text-slate-700">
              I’m incredibly excited to study abroad this spring in Madrid and fully immerse myself in a new culture. Living in a global city will push me outside my comfort zone and give me a fresh perspective both personally and professionally. I’m looking forward to meeting new people, exploring Spain, and experiencing daily life in a completely different environment. I see this opportunity as a chance to grow, gain independence, and return with a broader worldview that will shape my future career and goals.
            </p>
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-4 space-y-10">
        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <Award className="text-amber-500" size={28} />
            <h2 className="text-2xl font-bold text-slate-800">Certifications</h2>
          </div>
          <div className="space-y-4 text-lg font-medium text-slate-700">
            <p className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Securities Industries Essentials (SIE)
            </p>
            <p className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Bloomberg Market Concepts (BMC)
            </p>
            <p className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Microsoft Office Specialist - Excel Associate
            </p>
          </div>

          <div className="flex items-center gap-4 mt-10 mb-8">
            <Code className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold text-slate-800">Technical Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Quicken', 'ClientWorks', 'myICLUB', 'OmegaFi', 'Microsoft 365', 'AI'].map(skill => (
              <span key={skill} className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-100 text-sm font-bold">{skill}</span>
            ))}
          </div>
        </section>

        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <Users className="text-emerald-700" size={28} />
            <h2 className="text-2xl font-bold text-slate-800">Volunteer</h2>
          </div>
          <div className="space-y-4 text-lg font-medium text-slate-700">
            <p className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Children's Miracle Network
            </p>
            <p className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              JUMP
            </p>
            <p className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Move2BU
            </p>
          </div>
        </section>

        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-10">
            <Heart className="text-rose-500" size={32} />
            <h2 className="text-2xl font-bold text-slate-800">Passions</h2>
          </div>
          <div className="space-y-10">
            {Passions.map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-700 border border-slate-100">
                  {item.icon === 'bike' && <Bike size={28} />}
                  {item.icon === 'stocks' && <TrendingUp size={28} />}
                  {item.icon === 'travel' && <Globe size={28} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                  <p className="text-base text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-10">Languages</h2>
          <div className="space-y-8">
            {Languages.map((lang, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between text-base font-bold uppercase tracking-widest">
                  <span className="text-slate-800">{lang.name}</span>
                  <span className="text-slate-400">{lang.level}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-800 h-full transition-all duration-1000" 
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutTab;