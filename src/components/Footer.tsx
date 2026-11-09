import React, { useState } from 'react';
import {
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Check,
  Send,
} from 'lucide-react';
import { flooringService } from '../services/flooringService';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onOpenQuote }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    setNewsletterMsg('');

    try {
      await flooringService.subscribeNewsletter(newsletterEmail);
      setNewsletterStatus('success');
      setNewsletterMsg('Thank you! You have subscribed to our quarterly flooring design digest.');
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterStatus('error');
      setNewsletterMsg(err.message || 'Subscription failed. Please check your email.');
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-14 pb-8 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand & Socials Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-2.5 text-slate-900 group">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shadow-xs">
                <div className="grid grid-cols-2 gap-0.5 p-1.5">
                  <div className="w-2 h-2 bg-slate-950 rounded-[1.5px]" />
                  <div className="w-2 h-2 bg-white rounded-[1.5px]" />
                  <div className="w-2 h-2 bg-white rounded-[1.5px]" />
                  <div className="w-2 h-2 bg-slate-950 rounded-[1.5px]" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-950 font-['Outfit']">
                Flooring<span className="text-amber-500">Company</span><span className="text-slate-400 text-sm font-normal">.com</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Beautiful Floors. Better Living.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Architectural flooring supply and master craftsmanship across residential luxury and commercial spaces.
            </p>

            {/* Social Icons matching mockup: Globe, Facebook, Instagram, LinkedIn, YouTube */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#home"
                aria-label="Website Global"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-600 flex items-center justify-center transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-600 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-600 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-3">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                  Flooring Design Digest
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 text-slate-800 placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {newsletterStatus === 'loading' ? '...' : <Send className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {newsletterMsg && (
                  <p className={`text-[11px] ${newsletterStatus === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {newsletterMsg}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-600 transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-amber-600 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-600 transition-colors">
                  Hardwood Flooring
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-600 transition-colors">
                  Tile Flooring
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-600 transition-colors">
                  Vinyl Flooring
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-600 transition-colors">
                  Carpet Flooring
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-600 transition-colors">
                  Floor Repair & Refinishing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column matching mockup (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href="tel:+15551234567" className="hover:text-amber-600 font-mono">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href="mailto:hello@flooringcompany.com" className="hover:text-amber-600">
                  hello@flooringcompany.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>123 Flooring Way, New York, NY 10001</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full text-center px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Request Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Row matching mockup */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025 FlooringCompany.com. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
