import React, { useState } from 'react';
import { TESTIMONIALS_DATA, ASSET_PATHS } from '../data/flooringData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Container matching mockup */}
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-100 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Testimonial & Rating */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-['Outfit']">
                  What Our Clients Say
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Trusted by homeowners and businesses worldwide.
                </p>
              </div>

              {/* Quote Block with golden quote icon */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shadow-xs">
                  <Quote className="w-5 h-5 fill-slate-950" />
                </div>

                <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 leading-relaxed font-['Outfit']">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-semibold text-slate-700 ml-2">Verified Installation</span>
                </div>
              </div>

              {/* Author & Installed Material */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {currentTestimonial.author}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {currentTestimonial.role} · <span className="text-amber-700 font-medium">{currentTestimonial.flooringInstalled}</span>
                    </p>
                  </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dots indicator matching mockup */}
              <div className="flex items-center gap-2 pt-1">
                {TESTIMONIALS_DATA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

            </div>

            {/* Right Column: High-Res Sunlit Staircase Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-100">
                <img
                  src={ASSET_PATHS.staircaseSunlight}
                  alt="Modern Sunlit Hardwood Staircase Installation"
                  className="w-full h-[320px] sm:h-[390px] lg:h-[440px] object-cover object-center"
                  loading="lazy"
                />
                
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 shadow-xs border border-white">
                  Client Project · Westchester, NY
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
