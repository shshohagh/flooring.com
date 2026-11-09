import React, { useState } from 'react';
import { X, Phone, Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactMessage } from '../types';
import { validateContactForm, flooringService } from '../services/flooringService';
import { getNetworkStatus } from '../services/httpClient';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Hardwood Flooring');
  const [message, setMessage] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const data: ContactMessage = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      serviceInterest,
      message: message.trim(),
    };

    const errors = validateContactForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!getNetworkStatus()) {
      setErrorMessage('Device is offline. Please verify internet connection.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await flooringService.submitContact(data);
      setReferenceNumber(res.referenceNumber);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setReferenceNumber(null);
    setErrorMessage(null);
    setFormErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              Contact Flooring Experts
            </h3>
            <p className="text-xs text-slate-500">We respond within 2 business hours</p>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Close contact modal"
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {referenceNumber ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-xs text-slate-500">
                  Ticket Reference: <span className="font-mono font-bold text-slate-800">{referenceNumber}</span>
                </p>
              </div>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. An installation specialist has received your inquiry and will reach out to you directly.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="Sarah Jenkins"
                    className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                      formErrors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="sarah@example.com"
                      className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                        formErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      placeholder="(555) 000-0000"
                      className={`w-full pl-9 pr-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                        formErrors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Service of Interest
                </label>
                <select
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 text-slate-800"
                >
                  <option value="Hardwood Flooring">Hardwood Flooring (Solid & Engineered)</option>
                  <option value="Tile Flooring">Tile & Stone Porcelain</option>
                  <option value="Vinyl Flooring">Luxury Vinyl Plank (LVP)</option>
                  <option value="Carpet Flooring">Plush Carpet Flooring</option>
                  <option value="Commercial Flooring">Commercial & Corporate Flooring</option>
                  <option value="Floor Repair">Floor Repair & Refinishing</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Project Details / Question *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (formErrors.message) setFormErrors(prev => ({ ...prev, message: '' }));
                  }}
                  placeholder="Tell us about your space (approximate square footage, preferred finish, timeline)..."
                  className={`w-full p-3 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                    formErrors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.message}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Inquiry to Specialists'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
