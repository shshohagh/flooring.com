import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Shield, Award, CheckCircle2 } from 'lucide-react';
import { ASSET_PATHS } from '../data/flooringData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full shadow-2xl border border-white/10 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white font-['Outfit']">
              The FlooringCompany Craftsmanship Experience
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video modal"
            className="w-8 h-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center group">
          <img
            src={ASSET_PATHS.heroLivingRoom}
            alt="Flooring installation showcase"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

          {/* Central Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-1" />}
          </button>

          {/* Video Metadata Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white z-10">
            <div className="space-y-0.5">
              <p className="font-bold text-sm">Tribeca Loft Restoration · European White Oak</p>
              <p className="text-slate-300 text-[11px]">Shot in 4K HDR · HEPA Dustless Installation Method</p>
            </div>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Video Highlights Strip */}
        <div className="p-5 bg-slate-950/90 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Master Guild Certified Installers</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Zero Dust & HEPA Filtration</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>15-Year Written Craft Guarantee</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-slate-400 hidden sm:block">
            Ready to give your home or office this exact level of finish?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Get Free Estimate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
