
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full pt-10 pb-10 border-t-2 border-gray-100 mt-10">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Color Bars */}
        <div className="flex gap-4">
          <div className="w-12 h-2 bg-amber-400 rounded-full"></div>
          <div className="w-16 h-2 bg-emerald-900 rounded-full"></div>
          <div className="w-12 h-2 bg-amber-400 rounded-full"></div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm font-medium text-slate-500">
            © 2025 Max Camin. Proudly built at Baylor University.
          </p>
          <p className="text-xs font-black text-slate-400 tracking-[0.25em] uppercase">
            Sic 'em Bears
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
