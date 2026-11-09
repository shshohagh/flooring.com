import React from 'react';
import { BLOG_POSTS } from '../data/flooringData';
import { BlogItem } from '../types';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

interface LatestTipsSectionProps {
  onReadArticle: (post: BlogItem) => void;
}

export const LatestTipsSection: React.FC<LatestTipsSectionProps> = ({ onReadArticle }) => {
  return (
    <section id="blog" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-['Outfit']">
            Latest Flooring Tips
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Expert advice to help you choose and care for your floors.
          </p>
        </div>

        {/* 3 Blog Cards Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onReadArticle(post)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-slate-800">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link matching mockup */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-amber-600 group-hover:text-amber-700">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
