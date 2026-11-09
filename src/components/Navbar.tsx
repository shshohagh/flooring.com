import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenVisualizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenVisualizer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#projects' },
    { label: 'About', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <>
      {/* Thin Animated Scroll Progress Bar at the very top of the page */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className="fixed top-0 left-0 right-0 h-[3px] bg-slate-200/40 z-50 pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (strict single-line contract) */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0"
            aria-label="FlooringCompany.com Home"
          >
            {/* Geometric diamond logo matching mockup */}
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <div className="grid grid-cols-2 gap-0.5 p-1.5">
                <div className="w-2 h-2 bg-slate-950 rounded-[1.5px]" />
                <div className="w-2 h-2 bg-white rounded-[1.5px]" />
                <div className="w-2 h-2 bg-white rounded-[1.5px]" />
                <div className="w-2 h-2 bg-slate-950 rounded-[1.5px]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 font-['Outfit']">
                Flooring<span className="text-amber-500">Company</span><span className="text-slate-400 text-sm font-normal">.com</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (single-line, subtle hover) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-amber-400"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenVisualizer}
              className="text-amber-700 hover:text-amber-800 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 hover:bg-amber-100 transition-colors"
              title="Interactive Room Visualizer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Room Visualizer
            </button>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full shadow-xs hover:shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-full"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-800 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVisualizer();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-xl"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Interactive Floor Visualizer
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
};
