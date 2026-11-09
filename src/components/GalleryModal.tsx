import React, { useState } from 'react';
import { X, MapPin, Maximize2, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA, ASSET_PATHS } from '../data/flooringData';
import { ProjectItem } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: ProjectItem) => void;
  onOpenQuote: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenQuote,
}) => {
  const [filter, setFilter] = useState<'all' | 'hardwood' | 'commercial'>('all');

  if (!isOpen) return null;

  const galleryItems = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Complete Flooring Portfolio Gallery
            </h3>
            <p className="text-xs text-slate-500">Explore real client installations across residential & commercial spaces</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close gallery modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-950 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Spaces ({PROJECTS_DATA.length})
          </button>
          <button
            onClick={() => setFilter('hardwood')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              filter === 'hardwood'
                ? 'bg-slate-950 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Luxury Residential
          </button>
          <button
            onClick={() => setFilter('commercial')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              filter === 'commercial'
                ? 'bg-slate-950 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Executive & Corporate
          </button>
        </div>

        {/* Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onClose();
                onSelectProject(item);
              }}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />
                <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{item.location}</span>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500">{item.material}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60">
                  <span className="font-semibold text-slate-700">{item.squareFeet.toLocaleString()} sq ft</span>
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    Inspect Specs <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Every project backed by written warranty</span>
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            Request Project Estimate
          </button>
        </div>

      </div>
    </div>
  );
};
