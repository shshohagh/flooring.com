import React from 'react';
import { Check, ArrowRight, ShieldCheck, Clock, DollarSign, Sparkles } from 'lucide-react';
import { ASSET_PATHS } from '../data/flooringData';

interface WhyChooseSectionProps {
  onLearnMore: () => void;
  onOpenQuote: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onLearnMore, onOpenQuote }) => {
  const benefits = [
    {
      title: 'Premium Quality Materials',
      desc: 'Sustainably sourced North American & European timber, certified zero-VOC finishes.',
    },
    {
      title: 'Professional Installation',
      desc: 'Master craftspeople with minimum 8 years specialized precision flooring experience.',
    },
    {
      title: 'Competitive Pricing',
      desc: 'Direct mill relationships that cut out retail markups and save up to 25%.',
    },
    {
      title: 'On-Time Project Delivery',
      desc: 'Guaranteed completion timelines backed by our $100/day on-time installation pledge.',
    },
  ];

  return (
    <section id="why-us" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navy Container matching mockup wireframe */}
        <div className="bg-[#0b1b30] text-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-xl overflow-hidden relative">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
                  Unrivaled Standard of Excellence
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-['Outfit']">
                  Why Choose FlooringCompany<span className="text-amber-400">.com</span>?
                </h2>
              </div>

              {/* Checklist matching mockup */}
              <div className="space-y-4">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-start gap-3.5 group">
                    <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button matching mockup: "Learn More →" */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onLearnMore}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full shadow-sm transition-all cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all cursor-pointer"
                >
                  Request On-Site Estimate
                </button>
              </div>

            </div>

            {/* Right Column: Slat Wall & Armchair Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                <img
                  src={ASSET_PATHS.slatWallArmchair}
                  alt="Minimalist Wood Slat Wall with Boucle Armchair"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[440px] object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Floating Satisfaction badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">4,800+ Spaces Transformed</p>
                    <p className="text-[11px] text-amber-400">99.4% On-Time Completion Rate</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                    ★ 4.9
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
