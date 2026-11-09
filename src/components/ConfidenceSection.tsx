import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles, ChevronDown, Clock, ShieldAlert, Wrench, CheckCircle2, HelpCircle } from 'lucide-react';
import { ASSET_PATHS } from '../data/flooringData';

interface ConfidenceSectionProps {
  onOpenQuote: () => void;
}

interface FaqItem {
  id: string;
  category: 'Timeline' | 'Durability' | 'Preparation' | 'Warranty';
  question: string;
  answer: string;
  keyPoints?: string[];
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-timeline',
    category: 'Timeline',
    question: 'How long does a typical flooring installation project take?',
    answer: 'Most residential installations (800 to 1,500 sq ft) take between 2 to 4 business days from tear-out to final baseboard installation. Luxury Vinyl Plank (LVP) is often completed in 2 to 3 days, while complex herringbone hardwood or mortar-set porcelain tile typically requires 4 to 6 days.',
    keyPoints: [
      'Day 1: Old floor removal, subfloor moisture diagnostics & laser leveling',
      'Days 2–3: Precision plank laying, transition profiles & molding cuts',
      'Final Day: HEPA vacuuming, touch-up polish, and client walk-through',
    ],
  },
  {
    id: 'faq-durability',
    category: 'Durability',
    question: 'How durable are these floors against large pets, heavy traffic, and accidental spills?',
    answer: 'Each material is engineered for specific durability requirements. Our Rigid-Core SPC Luxury Vinyl Plank is 100% waterproof and features a 20-mil commercial wear layer that resists pet claw gouging. Our engineered European White Oak utilizes multi-ply cross-grain birch cores with UV-cured aluminum oxide finishes that prevent micro-abrasions.',
    keyPoints: [
      'Porcelain Tile: Impervious to water absorption (<0.5%) and scratch-proof',
      'Luxury Vinyl Plank: 100% waterproof, dent-resistant, and whisper-quiet',
      'Engineered Hardwood: Lifetime structural resistance with refinishable wear layer',
    ],
  },
  {
    id: 'faq-walk-on',
    category: 'Timeline',
    question: 'When can we move furniture back and walk on our new floors?',
    answer: 'Floating luxury vinyl and click-lock engineered hardwood can be walked on immediately in socks, and furniture can be set in place the same evening (with felt pads installed). Glue-down hardwood and mortar-set porcelain tiles require a 24-hour curing window before heavy furniture or rugs are replaced.',
    keyPoints: [
      'Floating vinyl & click hardwood: Immediate light foot traffic allowed',
      'Nail-down solid timber: Immediate foot traffic; rug placement after 48h',
      'Glued tile & wet finishes: 24 to 36 hours cure time',
    ],
  },
  {
    id: 'faq-acclimation',
    category: 'Durability',
    question: 'Why do hardwood planks need 48–72 hours of on-site acclimation?',
    answer: 'Natural wood expands and contracts based on ambient relative humidity and temperature. Delivering your hardwood planks 2 to 3 days prior to installation allows the timber cells to equalize with your home’s specific climate (35%–55% humidity at 65°–75°F), preventing seasonal cupping or gap formation after fastening.',
  },
  {
    id: 'faq-warranty',
    category: 'Warranty',
    question: 'What is specifically covered under your 15-Year Craftsmanship Guarantee?',
    answer: 'Our written guarantee covers all installation craftsmanship: plank bonding, fastener hold, seam alignment, transition molding stability, and subfloor fastening. If any plank shifts, squeaks, or develops unexpected gap issues due to installation, our master team will repair or replace it at zero cost.',
  },
];

export const ConfidenceSection: React.FC<ConfidenceSectionProps> = ({ onOpenQuote }) => {
  // Default open the first two FAQs (timelines and durability)
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-timeline', 'faq-durability']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        
        {/* Top Split: Visual & Confidence Proposition matching wireframe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Dining Room & Modern Pendant Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 group">
              <img
                src={ASSET_PATHS.diningPendant}
                alt="Contemporary Dining Room with Natural Timber Hardwood Flooring and Pendant Lighting"
                className="w-full h-[320px] sm:h-[400px] lg:h-[440px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 shadow-xs border border-white">
                Solid American Walnut Series
              </div>
            </div>
          </div>

          {/* Right Column: Heading & Proposition matching mockup */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="space-y-3">
              <span className="text-amber-600 font-semibold text-xs tracking-wider uppercase">
                Long-Term Value & Peace of Mind
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-tight font-['Outfit']">
                Upgrade Your Space with Confidence
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Whether it's a cozy home or a busy office, we provide flooring solutions that enhance style, comfort and value.
            </p>

            {/* Feature Points */}
            <div className="pt-2 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <span>Zero-VOC finishes certified for children and household pets.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <span>Certified installer guarantee with transparent fixed contract costs.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <span>High acoustic absorption underlayment for whisper-quiet footsteps.</span>
              </div>
            </div>

            {/* CTA Button matching mockup */}
            <div className="pt-3">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Integrated 'Accordion' Style FAQ Section */}
        <div className="pt-6 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* FAQ Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/60 text-amber-800 text-xs font-semibold rounded-full">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-['Outfit']">
                Installation Timelines & Material Durability
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                Everything you need to know about preparation, scheduling, wear ratings, and our 15-year warranty.
              </p>
            </div>

            {/* Accordion Container */}
            <div className="space-y-3">
              {FAQS_DATA.map((faq) => {
                const isOpen = openFaqIds.includes(faq.id);

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'bg-white border-amber-300 shadow-sm'
                        : 'bg-white/80 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    {/* Accordion Trigger Header */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full shrink-0 ${
                          faq.category === 'Timeline'
                            ? 'bg-blue-50 text-blue-700'
                            : faq.category === 'Durability'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {faq.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {faq.question}
                        </h4>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-amber-400 text-slate-950 rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Content Body */}
                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="px-4 pb-5 sm:px-5 sm:pb-6 pt-0 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150"
                      >
                        <p className="pt-3">{faq.answer}</p>
                        
                        {faq.keyPoints && faq.keyPoints.length > 0 && (
                          <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-100 space-y-2 mt-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                              Key Standards:
                            </span>
                            {faq.keyPoints.map((point, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom FAQ Help Note */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 text-center sm:text-left">
                Have a specific room geometry or subfloor question? Speak directly with our master technicians.
              </span>
              <button
                onClick={onOpenQuote}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold shrink-0 cursor-pointer transition-colors"
              >
                Ask an Expert
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
