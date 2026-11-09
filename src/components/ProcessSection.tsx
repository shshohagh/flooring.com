import React, { useState } from 'react';
import { PROCESS_DATA } from '../data/flooringData';
import { MessageSquare, Ruler, Wrench, CheckCircle, ChevronDown, Check } from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-square':
        return <MessageSquare className="w-5 h-5" />;
      case 'ruler':
        return <Ruler className="w-5 h-5" />;
      case 'wrench':
        return <Wrench className="w-5 h-5" />;
      case 'check-circle':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-['Outfit']">
            Our Process
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            A Simple Process for Stunning Results.
          </p>
        </div>

        {/* 4 Steps Horizontal Pipeline matching wireframe */}
        <div className="relative">
          
          {/* Connecting dashed line behind the step circles on desktop */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-200 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {PROCESS_DATA.map((step) => {
              const isSelected = activeStep === step.number;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`text-center space-y-3 cursor-pointer p-4 rounded-2xl transition-all ${
                    isSelected ? 'bg-amber-50/60 ring-1 ring-amber-200' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Step Icon Badge */}
                  <div className="flex justify-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 shadow-xs ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 scale-105'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-amber-400'
                      }`}
                    >
                      {getStepIcon(step.iconName)}
                    </div>
                  </div>

                  {/* Title & Description matching mockup */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Step details expander */}
                  <div className="pt-2 text-left space-y-1.5 text-xs text-slate-600 bg-white/70 p-3 rounded-xl border border-slate-100">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Interactive CTA to start consultation */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-full shadow-xs transition-colors cursor-pointer"
          >
            Start Step 1: Free Design Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
