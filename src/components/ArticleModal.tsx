import React from 'react';
import { X, Clock, Calendar, Bookmark, Share2, Check, ArrowRight } from 'lucide-react';
import { BlogItem } from '../types';

interface ArticleModalProps {
  post: BlogItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ post, onClose, onOpenQuote }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              {post.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close article modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] leading-snug">
            {post.title}
          </h2>

          <div className="rounded-2xl overflow-hidden shadow-sm h-52 w-full bg-slate-100">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Pro Tips Box */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-amber-600" />
              Flooring Specialist Recommendation
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Order physical timber and tile sample boards to inspect them in both morning daylight and artificial evening lighting before committing to a full floor run.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Published by FlooringCompany Technical Team</span>
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            Get Expert Estimate
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
