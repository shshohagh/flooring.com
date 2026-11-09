import React from 'react';
import { Home, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface CtaBannerSectionProps {
  onContactClick: () => void;
  onOpenQuote: () => void;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({ onContactClick, onOpenQuote }) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navy Rounded Card matching mockup */}
        <div className="bg-[#0b1b30] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          
          {/* Subtle amber ambient light */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Left Lockup with Home outline icon */}
            <div className="flex items-center gap-5 text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Home className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white font-['Outfit']">
                  Ready to Transform Your Space?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Get in touch with our flooring experts today!
                </p>
              </div>
            </div>

            {/* Right Action Button matching mockup: "Contact Us →" */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
