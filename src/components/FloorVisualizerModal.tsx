import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Eye, Shield, Palette } from 'lucide-react';
import { ASSET_PATHS } from '../data/flooringData';
import { FlooringCategory } from '../types';

interface FloorVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteWithCategory: (category: FlooringCategory) => void;
}

interface VisualizerMaterial {
  id: string;
  category: FlooringCategory;
  name: string;
  tone: string;
  image: string;
  rating: string;
  pricePerSqFt: string;
  description: string;
  accentColor: string;
}

const VISUALIZER_MATERIALS: VisualizerMaterial[] = [
  {
    id: 'oak-natural',
    category: 'hardwood',
    name: 'European White Oak Wide Plank',
    tone: 'Warm Natural Blonde',
    image: ASSET_PATHS.heroLivingRoom,
    rating: 'Lifetime Structural',
    pricePerSqFt: '$11.50 / sq ft',
    description: '7.5" wide planks with wire-brushed texture and matte polyurethane finish. Expands small rooms with calm visual flow.',
    accentColor: '#d4a373',
  },
  {
    id: 'walnut-smoked',
    category: 'hardwood',
    name: 'Smoked American Walnut',
    tone: 'Deep Warm Espresso',
    image: ASSET_PATHS.diningPendant,
    rating: 'Heavy Traffic Residential',
    pricePerSqFt: '$14.20 / sq ft',
    description: 'Rich dark grain with chocolate undertones and satin sheen. Ideal for formal dining and executive suites.',
    accentColor: '#58311f',
  },
  {
    id: 'chevron-herringbone',
    category: 'hardwood',
    name: 'Artisan Chevron Parquet',
    tone: 'Honey Amber Oak',
    image: ASSET_PATHS.herringboneOffice,
    rating: 'Executive Grade',
    pricePerSqFt: '$16.80 / sq ft',
    description: 'Precision 45-degree mitered chevron pattern creating geometric motion and luxury architectural depth.',
    accentColor: '#c99a4c',
  },
  {
    id: 'slat-plank',
    category: 'vinyl',
    name: 'Nordic Rigid Core SPC Vinyl',
    tone: 'Pale Sand & Acoustic Cork',
    image: ASSET_PATHS.slatWallArmchair,
    rating: '100% Waterproof / Pet Proof',
    pricePerSqFt: '$6.50 / sq ft',
    description: 'Ultra-durable 20-mil commercial wear layer with attached IXPE acoustic underlayment for maximum quiet.',
    accentColor: '#bfa07d',
  },
];

export const FloorVisualizerModal: React.FC<FloorVisualizerModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteWithCategory,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<VisualizerMaterial>(VISUALIZER_MATERIALS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                Interactive Room & Flooring Visualizer
              </h3>
              <p className="text-xs text-slate-500">Preview real material textures & architectural light interaction</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close visualizer modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer Canvas & Controls */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Visualizer Stage */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 h-64 sm:h-80 md:h-96">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-amber-400 font-semibold text-xs uppercase tracking-wide">
                  Live Room Simulation
                </span>
                <h4 className="text-lg sm:text-xl font-bold font-['Outfit']">
                  {selectedMaterial.name}
                </h4>
                <p className="text-xs text-slate-200">{selectedMaterial.tone}</p>
              </div>

              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {selectedMaterial.pricePerSqFt}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              {selectedMaterial.description}
            </div>
          </div>

          {/* Material Switcher Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                Choose Finish Palette
              </label>
              
              <div className="space-y-2.5">
                {VISUALIZER_MATERIALS.map((mat) => {
                  const isCurrent = mat.id === selectedMaterial.id;
                  return (
                    <div
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        isCurrent
                          ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Color swatch */}
                      <div
                        className="w-10 h-10 rounded-xl shrink-0 border border-black/10 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: mat.accentColor }}
                      >
                        {isCurrent && <Check className="w-5 h-5 text-white drop-shadow" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900 truncate">
                            {mat.name}
                          </h5>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{mat.tone}</p>
                        <p className="text-[11px] font-semibold text-amber-700">{mat.pricePerSqFt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quote with this Material Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteWithCategory(selectedMaterial.category);
                }}
                className="w-full py-3 rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Calculate Cost for {selectedMaterial.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
