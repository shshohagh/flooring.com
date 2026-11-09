import React, { useState, useMemo } from 'react';
import { X, Calculator, Check, ArrowRight, Shield, AlertCircle, Sparkles, Phone, Mail, User, MapPin } from 'lucide-react';
import { FlooringCategory, QuoteRequest, PriceEstimate } from '../types';
import { MATERIAL_RATES, calculateEstimate, validateQuoteForm, flooringService } from '../services/flooringService';
import { getNetworkStatus } from '../services/httpClient';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: FlooringCategory;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'hardwood',
}) => {
  const [flooringType, setFlooringType] = useState<FlooringCategory>(initialCategory);
  const [squareFeet, setSquareFeet] = useState<number>(650);
  const [roomType, setRoomType] = useState<string>('Living Room');
  const [needsSubfloorPrep, setNeedsSubfloorPrep] = useState<boolean>(false);
  const [needsOldFloorRemoval, setNeedsOldFloorRemoval] = useState<boolean>(true);
  const [timeline, setTimeline] = useState<'asap' | '1-2_weeks' | '1_month' | 'planning'>('1-2_weeks');

  // Contact info
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('10001');
  const [notes, setNotes] = useState<string>('');

  // UI state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedQuote, setSubmittedQuote] = useState<{ quoteId: string; estimate: PriceEstimate } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time calculated estimate
  const currentEstimate = useMemo(() => {
    return calculateEstimate(flooringType, Number(squareFeet) || 0, needsSubfloorPrep, needsOldFloorRemoval);
  }, [flooringType, squareFeet, needsSubfloorPrep, needsOldFloorRemoval]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format input as user types
    const raw = e.target.value;
    setPhone(raw);
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSqFtChange = (val: number) => {
    const clamped = Math.max(0, val);
    setSquareFeet(clamped);
    if (formErrors.squareFeet) {
      setFormErrors(prev => ({ ...prev, squareFeet: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData: QuoteRequest = {
      flooringType,
      squareFeet: Number(squareFeet),
      roomType,
      needsSubfloorPrep,
      needsOldFloorRemoval,
      timeline,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      zipCode: zipCode.trim(),
      notes: notes.trim(),
    };

    // Client-side strict validation
    const errors = validateQuoteForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!getNetworkStatus()) {
      setErrorMessage('Device is offline. Please verify internet connection before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await flooringService.submitQuote(formData);
      setSubmittedQuote(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your quote request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedQuote(null);
    setErrorMessage(null);
    setFormErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                Instant Flooring Quote & Estimator
              </h3>
              <p className="text-xs text-slate-500">Transparent pricing · Zero obligation</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {submittedQuote ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Your Free Estimate is Ready!
                </h4>
                <p className="text-xs text-slate-500">
                  Quote Reference Number: <span className="font-mono font-bold text-slate-800">{submittedQuote.quoteId}</span>
                </p>
              </div>

              {/* Estimate Breakdown Card */}
              <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80 text-left space-y-3 max-w-md mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
                  <span className="text-xs text-slate-600 font-medium">Estimated Total ({squareFeet} sq ft)</span>
                  <span className="text-xl font-bold text-slate-950 font-['Outfit']">
                    ${submittedQuote.estimate.totalLow.toLocaleString()} - ${submittedQuote.estimate.totalHigh.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Material Range</span>
                    <span className="font-semibold">${submittedQuote.estimate.materialCostLow.toLocaleString()} - ${submittedQuote.estimate.materialCostHigh.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Labor & Installation</span>
                    <span className="font-semibold">${submittedQuote.estimate.laborCostLow.toLocaleString()} - ${submittedQuote.estimate.laborCostHigh.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-amber-900/80">
                  ✓ Includes certified master installation, subfloor inspection, and 15-year warranty.
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto">
                We have emailed a complete PDF itemized breakdown to <span className="font-semibold text-slate-900">{email}</span>. A flooring specialist will contact you at <span className="font-semibold text-slate-900">{phone}</span> to coordinate your free physical sample delivery.
              </p>

              <div className="pt-2">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error message banner */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Material Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  1. Select Flooring Material
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(Object.keys(MATERIAL_RATES) as FlooringCategory[]).slice(0, 4).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFlooringType(type)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        flooringType === type
                          ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900 capitalize">{type}</p>
                      <p className="text-[11px] text-slate-500">{MATERIAL_RATES[type].name.split(' ')[0]}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Numerical Area Input & Sliders with Strict Validation */}
              <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <label htmlFor="sqft-input" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    2. Estimated Area (Square Feet)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="sqft-input"
                      type="number"
                      min={10}
                      max={50000}
                      value={squareFeet || ''}
                      onChange={(e) => handleSqFtChange(Number(e.target.value))}
                      className="w-24 px-2 py-1 text-right text-sm font-bold bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-amber-400"
                    />
                    <span className="text-xs font-semibold text-slate-500">sq ft</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="50"
                  max="3500"
                  step="25"
                  value={squareFeet || 50}
                  onChange={(e) => handleSqFtChange(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                {formErrors.squareFeet && (
                  <p className="text-[11px] text-rose-600 font-medium">{formErrors.squareFeet}</p>
                )}

                <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-600">
                  <span className="text-slate-400 text-[11px]">Popular room sizes:</span>
                  <button
                    type="button"
                    onClick={() => handleSqFtChange(220)}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] hover:border-amber-400"
                  >
                    Bedroom (220 sq ft)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSqFtChange(450)}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] hover:border-amber-400"
                  >
                    Living Room (450 sq ft)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSqFtChange(1200)}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] hover:border-amber-400"
                  >
                    Whole Floor (1,200 sq ft)
                  </button>
                </div>
              </div>

              {/* Options & Addons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={needsOldFloorRemoval}
                    onChange={(e) => setNeedsOldFloorRemoval(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 block">Remove Existing Flooring</span>
                    <span className="text-slate-400 text-[11px]">Includes eco-friendly disposal</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300">
                  <input
                    type="checkbox"
                    checked={needsSubfloorPrep}
                    onChange={(e) => setNeedsSubfloorPrep(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 block">Subfloor Leveling & Prep</span>
                    <span className="text-slate-400 text-[11px]">Laser level compensation</span>
                  </div>
                </label>
              </div>

              {/* Live Price Estimation Box */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 p-4 rounded-2xl border border-amber-200/90 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                    Live Estimated Range
                  </span>
                  <p className="text-xl sm:text-2xl font-bold text-slate-950 font-['Outfit']">
                    ${currentEstimate.totalLow.toLocaleString()} - ${currentEstimate.totalHigh.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Average: ~${currentEstimate.avgPerSqFt}/sq ft installed
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] px-2.5 py-1 bg-amber-400/30 text-amber-900 rounded-full font-semibold">
                    15-Yr Warranty Included
                  </span>
                </div>
              </div>

              {/* Step 3: Strict Validated Customer Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  3. Contact & Delivery Information
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                          formErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                          formErrors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="Phone Number (e.g. 555-123-4567) *"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="5-digit ZIP Code *"
                        maxLength={5}
                        value={zipCode}
                        onChange={(e) => {
                          setZipCode(e.target.value);
                          if (formErrors.zipCode) setFormErrors(prev => ({ ...prev, zipCode: '' }));
                        }}
                        className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                          formErrors.zipCode ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {formErrors.zipCode && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Calculating & Reserving Estimate...</span>
                  ) : (
                    <>
                      <span>Lock In Free Quote & Samples</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  No credit card required. Pricing valid for 30 calendar days.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
