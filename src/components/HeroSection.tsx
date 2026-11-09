import React from 'react';
import { ArrowRight, Play, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { ASSET_PATHS } from '../data/flooringData';

interface HeroSectionProps {
  onOpenQuote: () => void;
  onOpenVideo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote, onOpenVideo }) => {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Proposition & Actions */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6 text-left">
            
            {/* Kicker badge matching mockup: "● Premium Flooring Solutions" */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/70 rounded-full text-xs font-semibold text-amber-800 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Premium Flooring Solutions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 tracking-tight leading-[1.15] font-['Outfit']">
              Transform Your Space with{' '}
              <span className="text-amber-500 inline-block">Premium Flooring</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              From timeless hardwood to modern luxury vinyl, we deliver high-quality flooring for homes and businesses.
            </p>

            {/* CTAs matching mockup: "Get a Free Quote →" & "▶ Watch Video" */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-800 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full transition-all cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400/20 group-hover:bg-amber-400/40 flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 text-slate-900 fill-slate-900 ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-slate-700">Free In-Home Measurement</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-slate-700">15-Year Craft Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium text-slate-700">Licensed & Insured Crews</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Mockup Visual */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-100/80 bg-slate-50 group">
              <img
                src={ASSET_PATHS.heroLivingRoom}
                alt="Transform Your Space with Premium European Oak Hardwood Flooring"
                className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                loading="eager"
              />
              
              {/* Subtle architectural overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/60 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">European White Oak Collection</p>
                  <p className="text-[11px] text-slate-500">Installed with dustless precision</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
