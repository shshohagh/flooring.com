import React from 'react';
import { SERVICES_DATA } from '../data/flooringData';
import { ServiceItem } from '../types';
import { ArrowUpRight, Check } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteWithService: (serviceCategory: any) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenQuoteWithService,
}) => {
  return (
    <section id="services" className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-['Outfit']">
            Our Flooring Services
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Beautiful. Durable. Designed for You.
          </p>
        </div>

        {/* 4 Service Cards Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => {
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-4 bg-slate-100 relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Floating Material badge */}
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs">
                      {service.priceRange}
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-1.5 text-center px-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-snug font-normal">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-left text-xs text-slate-600">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-5 pt-3 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-amber-600">
                  <span>View Details</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
