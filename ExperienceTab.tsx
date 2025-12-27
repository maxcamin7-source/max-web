import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { ExperienceItem } from '../types';
import { BAYLOR_LOGO } from '../ImagesData';

const professionalExp: ExperienceItem[] = [
  {
    title: 'President and Founder',
    organization: 'HAWK INVESTMENT CLUB',
    location: 'WACO, TX',
    period: 'January 2025 – Present',
    description: [
      'Founded a 25-member investing club structured as a general partnership, focused on long-term education, collaboration, and a lifelong professional network.',
      'Collaboratively manage a $15,000 portfolio of equities, outperforming the S&P 500 by 20.2% in the first half of 2025.',
      'Facilitate weekly meetings to teach investment strategies, financial concepts, and equity research, empowering members to make informed portfolio decisions.',
      'Developed the club\'s investment strategy, operational framework, and onboarding process to improve engagement and build strong member relationships.'
    ]
  },
  {
    title: 'Treasurer',
    organization: 'SIGMA ALPHA EPSILON FRATERNITY – BAYLOR UNIVERSITY',
    location: 'WACO, TX',
    period: 'May 2025 – December 2025',
    description: [
      'Manage a $70,000 semester budget, allocating funds for events, philanthropy, and operational expenses for a 49-member chapter, ensuring fiscal responsibility and accountability.',
      'Implemented OmegaFi software to streamline billing, automate payment processes, manage fundraising, and enhance overall financial organization, transparency, and efficiency.',
      'Collaborate with the executive board and fund chapter initiatives, maintain accurate financial records, and ensure compliance with national standards.'
    ]
  },
  {
    title: 'Financial Planning Intern',
    organization: 'BLAKELOCK FINANCIAL GROUP, LPL FINANCIAL',
    location: 'HOUSTON, TX',
    period: 'June 2025 – August 2025',
    description: [
      'Assisted advisors with client service and account management for a client base of approximately 560 clients, ensuring accurate and organized records in ClientWorks CRM.',
      'Collaborated with advisors to build model portfolios and develop customized financial plans aligned with client goals and risk profiles.',
      'Created a segmented educational presentation to improve client understanding of core financial concepts, scheduled to be presented at an upcoming client event to enhance client experience.',
      'Gained exposure to relationship management, operations, and the consultative process of developing financial strategies through shadowing and cross-department collaboration.'
    ]
  }
];

const ExperienceTab: React.FC = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Education Section */}
      <section className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
        {/* Baylor Logo Top Right - Flexible sizing */}
        <div className="absolute top-10 right-12 w-24 h-auto max-h-24 opacity-80 flex items-center justify-center">
          {!BAYLOR_LOGO.startsWith('PASTE') ? (
            <img src={BAYLOR_LOGO} alt="Baylor Logo" className="w-full h-auto object-contain" />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
               <span className="text-[8px] font-bold text-slate-400 text-center uppercase tracking-widest">Baylor Logo Slot</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-5">
            < GraduationCap className="text-emerald-700" size={32} />
            <h2 className="text-3xl font-bold text-slate-800">Education</h2>
          </div>
        </div>

        <div className="ml-0 sm:ml-10 border-l-4 border-slate-50 pl-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Baylor University - Waco, TX</h3>
              <p className="text-lg font-medium text-slate-500">Bachelor of Business Administration</p>
            </div>
            <span className="inline-block px-6 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full">
              May 2027
            </span>
          </div>

          <div className="space-y-3 text-base text-slate-600 mb-8">
            <p><span className="font-bold text-slate-800">Major:</span> Finance and Marketing</p>
            <p><span className="font-bold text-slate-800">Cumulative GPA:</span> 3.36</p>
          </div>

          <div className="inline-block bg-amber-400 text-slate-900 text-xs font-black px-6 py-2 rounded-sm uppercase tracking-[0.2em]">
            SPRING 2026: STUDY ABROAD - MADRID, SPAIN
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-5 mb-10">
          <Briefcase className="text-emerald-700" size={32} />
          <h2 className="text-3xl font-bold text-slate-800">Professional Experience</h2>
        </div>

        <div className="space-y-16">
          {professionalExp.map((exp, idx) => (
            <div key={idx} className="relative pl-10 border-l-4 border-slate-200">
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-2 w-[18px] h-[18px] rounded-full border-4 border-slate-800 bg-white shadow-sm"></div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-6">
                  <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{exp.title}</h3>
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{exp.period}</span>
              </div>

              <div className="flex items-center gap-3 mb-6 text-sm font-bold tracking-widest">
                <span className="text-slate-800 uppercase">{exp.organization}</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-400 uppercase">{exp.location}</span>
              </div>

              <ul className="space-y-4">
                {exp.description.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-4 text-base leading-relaxed text-slate-600">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperienceTab;