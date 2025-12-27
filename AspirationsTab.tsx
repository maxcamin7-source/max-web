import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Briefcase, GraduationCap, Mountain, Trophy, ChevronLeft, ChevronRight, Camera, HeartHandshake } from 'lucide-react';
import { GALLERY_IMAGES } from '../ImagesData';

const galleryImages = GALLERY_IMAGES.map((url, index) => ({
  id: index + 1,
  url: url.startsWith('PASTE') ? `https://picsum.photos/seed/aspiration${index + 1}/600/800` : url
}));

const Milestones = [
  {
    title: 'Career in Wealth Management',
    description: 'To combine my passion for markets with my desire to help families achieve financial freedom.',
    icon: <Briefcase size={32} />,
    color: 'emerald',
    status: 'IN PROGRESS'
  },
  {
    title: 'Open a School',
    description: 'A long-term philanthropic dream to provide education access to underserved communities.',
    icon: <GraduationCap size={32} />,
    color: 'orange',
    status: 'IN PROGRESS'
  },
  {
    title: 'Climb Mount Everest',
    description: 'Pushing physical and mental limits to the absolute extreme.',
    icon: <Mountain size={32} />,
    color: 'indigo',
    status: 'IN PROGRESS'
  },
  {
    title: 'Run a Marathon',
    description: 'Training discipline and endurance.',
    icon: <Trophy size={32} />,
    color: 'rose',
    status: 'IN PROGRESS'
  }
];

const AspirationsTab: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive handling for visible images
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = galleryImages.length - visibleCount;
      // Reset to 0 once we've reached the point where the last image is visible in the final slot
      return prev >= maxIndex ? 0 : prev + 1;
    });
  }, [galleryImages.length, visibleCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = galleryImages.length - visibleCount;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  }, [galleryImages.length, visibleCount]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000); // Advanced every 4 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* 1. Career Aspiration Hero Section */}
      <section className="bg-[#0f172a] rounded-[3rem] p-12 md:p-16 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full -mr-48 -mt-48"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-900/50 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Briefcase size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">Career Aspiration: Wealth Management</h2>
            </div>
            <p className="text-slate-300 text-2xl leading-relaxed">
              I see myself as someone eager to help others navigate a topic I am deeply passionate about. Wealth management isn't just about numbers; it's about stewardship and guidance.
            </p>
            <div className="space-y-4">
              <h4 className="text-sm font-black text-emerald-400 uppercase tracking-[0.25em]">Why this path?</h4>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                I've helped many friends and family members enhance their investment skills, providing guidance on basic ETFs to get them started.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 p-10 rounded-[2.5rem] relative">
              <blockquote className="text-3xl md:text-4xl font-serif text-white/90 italic text-center leading-relaxed">
                "The goal is not just to grow wealth, but to empower people to use that wealth to achieve their life's purpose."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ideal Workplace Culture Section */}
      <section className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-700 border border-slate-100 flex-shrink-0">
            <HeartHandshake size={32} />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Ideal Workplace Culture</h2>
            <p className="text-xl leading-relaxed text-slate-600">
              I want to be part of a company where the people are genuine, approachable, and easy to connect with both inside and outside of work. A place where teammates push each other to grow, hold high standards, and are motivated to continuously improve. I value a culture that celebrates ambition, accountability, and shared success rather than individual ego. Ultimately, I’m looking for a place that feels like a long-term home, where I can grow, contribute, and build a lasting career.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Life Ambitions Gallery */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div className="flex items-center gap-5">
            <Camera className="text-emerald-700" size={40} />
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Life Ambitions Gallery</h2>
              <p className="text-base text-slate-500">Visualizing the journey and milestones ahead.</p>
            </div>
          </div>
          <div className="flex gap-4">
            {/* Nav Arrows with prominent Green Circle styling */}
            <button 
              onClick={prevSlide} 
              aria-label="Previous slide"
              className="w-14 h-14 rounded-full bg-[#1a4a3a] flex items-center justify-center text-white hover:bg-[#153a2d] transition-all shadow-lg active:scale-95 border-4 border-white"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={nextSlide} 
              aria-label="Next slide"
              className="w-14 h-14 rounded-full bg-[#1a4a3a] flex items-center justify-center text-white hover:bg-[#153a2d] transition-all shadow-lg active:scale-95 border-4 border-white"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
        
        {/* Gallery Slider Container */}
        <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 overflow-hidden relative min-h-[450px] flex flex-col justify-center">
          <div 
            ref={containerRef}
            className="flex transition-transform duration-700 ease-in-out" 
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` 
            }}
          >
            {galleryImages.map((img) => (
              <div 
                key={img.id} 
                className={`flex-shrink-0 p-4 transition-all duration-500 ${visibleCount === 1 ? 'w-full' : 'w-1/3'}`}
              >
                <div className="bg-white p-3 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center justify-center overflow-hidden h-full">
                  <img 
                    src={img.url} 
                    alt={`Aspiration ${img.id}`} 
                    className="w-full h-auto max-h-[500px] object-contain rounded-2xl hover:scale-105 transition-transform duration-1000" 
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress Indicators */}
          <div className="mt-8 flex justify-center gap-4">
            {galleryImages.slice(0, galleryImages.length - (visibleCount - 1)).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-10 bg-emerald-800' : 'bg-slate-300'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Milestones Tracker */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-10">Milestones Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Milestones.map((m, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between h-full group hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${colorMap[m.color] || 'bg-slate-50'}`}>{m.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{m.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AspirationsTab;