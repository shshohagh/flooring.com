import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            {isPrivacy ? (
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            ) : (
              <FileText className="w-4 h-4 text-amber-500" />
            )}
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Flooring Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close legal modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                <strong>FlooringCompany.com</strong> values your privacy. We strictly collect client contact information solely for providing flooring estimates, sample delivery, and scheduling on-site measurements.
              </p>
              <p>
                We do not sell, rent, or distribute personal information to third-party data brokers or marketing affiliates.
              </p>
              <p>
                All measurements, room square footage calculations, and property specifications are encrypted and protected under our internal privacy governance framework.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Estimates & Quotations:</strong> All online estimates generated through our interactive quote tool provide approximate budgetary guidance based on standard room geometries and prevailing material rates.
              </p>
              <p>
                <strong>15-Year Craft Warranty:</strong> Master installation work is backed by our 15-year structural craftsmanship guarantee covering plank adhesion, nail placement, moisture seam protection, and transition stability.
              </p>
              <p>
                <strong>Subfloor Standards:</strong> Leveling and remediation specifications are confirmed during the laser measurement stage prior to commencement of work.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
