import React from 'react';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { ASSET_PATHS } from '../data/flooringData';

interface WorkSpeaksSectionProps {
  onOpenGallery: () => void;
}

export const WorkSpeaksSection: React.FC<WorkSpeaksSectionProps> = ({ onOpenGallery }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#0b1b30] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column matching mockup */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-['Outfit']">
              Our Work Speaks <br className="hidden sm:inline" />
              for Itself
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-md">
              Explore our stunning flooring projects and see the difference we make.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenGallery}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full shadow-sm transition-all cursor-pointer"
              >
                View Gallery
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-amber-400 font-['Outfit']">98.8%</p>
                <p className="text-[11px] text-slate-400 font-medium">Client Delight</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">15+ Yrs</p>
                <p className="text-[11px] text-slate-400 font-medium">Warranty</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">Zero</p>
                <p className="text-[11px] text-slate-400 font-medium">Dust Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Showcase Gallery Preview */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={onOpenGallery}
                className="group relative rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-slate-900 cursor-pointer h-44 sm:h-56"
              >
                <img
                  src={ASSET_PATHS.heroLivingRoom}
                  alt="Living room oak installation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/90 text-slate-950">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div
                onClick={onOpenGallery}
                className="group relative rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-slate-900 cursor-pointer h-44 sm:h-56"
              >
                <img
                  src={ASSET_PATHS.herringboneOffice}
                  alt="Herringbone office timber"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/90 text-slate-950">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
