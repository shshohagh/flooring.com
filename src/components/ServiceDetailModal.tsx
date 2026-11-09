import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { ServiceItem, FlooringCategory } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuoteWithCategory: (category: FlooringCategory) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenQuoteWithCategory,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit']">
              {service.title}
            </h3>
            <p className="text-xs text-slate-500">{service.tagline}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close service modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div className="rounded-2xl overflow-hidden shadow-sm h-52 w-full bg-slate-100">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Overview</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block uppercase">Price Range</span>
              <span className="font-bold text-slate-900">{service.priceRange}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase">Durability</span>
              <span className="font-bold text-slate-900">{service.durabilityRating}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase">Best Suited For</span>
              <span className="font-bold text-slate-900">{service.popularFor}</span>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Installation & Performance Highlights
            </h4>
            <div className="space-y-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenQuoteWithCategory(service.category);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-full shadow-xs transition-colors cursor-pointer"
          >
            Calculate Quote for {service.title}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
