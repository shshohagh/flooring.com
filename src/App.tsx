import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { RecentProjectsSection } from './components/RecentProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WorkSpeaksSection } from './components/WorkSpeaksSection';
import { ProcessSection } from './components/ProcessSection';
import { ConfidenceSection } from './components/ConfidenceSection';
import { LatestTipsSection } from './components/LatestTipsSection';
import { CtaBannerSection } from './components/CtaBannerSection';
import { Footer } from './components/Footer';

// Modals
import { QuoteModal } from './components/QuoteModal';
import { VideoModal } from './components/VideoModal';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';
import { ArticleModal } from './components/ArticleModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { FloorVisualizerModal } from './components/FloorVisualizerModal';
import { ContactModal } from './components/ContactModal';
import { LegalModal } from './components/LegalModal';

import { ServiceItem, ProjectItem, BlogItem, FlooringCategory } from './types';
import { WifiOff } from 'lucide-react';

export default function App() {
  // Modal states
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialCategory, setQuoteInitialCategory] = useState<FlooringCategory>('hardwood');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [visualizerOpen, setVisualizerOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Network offline state detection
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOpenQuoteWithCategory = (category: FlooringCategory) => {
    setQuoteInitialCategory(category);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans antialiased selection:bg-amber-200 selection:text-slate-900">
      
      {/* Offline Alert Banner */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs font-semibold py-2 px-4 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <WifiOff className="w-4 h-4" />
          <span>You are currently in offline mode. Saved estimates are available locally.</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenQuote={() => setQuoteModalOpen(true)}
        onOpenVisualizer={() => setVisualizerOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          onOpenQuote={() => setQuoteModalOpen(true)}
          onOpenVideo={() => setVideoModalOpen(true)}
        />

        {/* Our Flooring Services */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenQuoteWithService={(cat) => handleOpenQuoteWithCategory(cat)}
        />

        {/* Why Choose FlooringCompany.com */}
        <WhyChooseSection
          onLearnMore={() => setVisualizerOpen(true)}
          onOpenQuote={() => setQuoteModalOpen(true)}
        />

        {/* Our Recent Projects */}
        <RecentProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onViewAllProjects={() => setVisualizerOpen(true)}
        />

        {/* What Our Clients Say */}
        <TestimonialsSection />

        {/* Our Work Speaks for Itself */}
        <WorkSpeaksSection
          onOpenGallery={() => setVisualizerOpen(true)}
        />

        {/* Our Process */}
        <ProcessSection
          onOpenConsultation={() => setContactModalOpen(true)}
        />

        {/* Upgrade Your Space with Confidence */}
        <ConfidenceSection
          onOpenQuote={() => setQuoteModalOpen(true)}
        />

        {/* Latest Flooring Tips */}
        <LatestTipsSection
          onReadArticle={(article) => setSelectedArticle(article)}
        />

        {/* Ready to Transform Your Space? */}
        <CtaBannerSection
          onContactClick={() => setContactModalOpen(true)}
          onOpenQuote={() => setQuoteModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenQuote={() => setQuoteModalOpen(true)}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialCategory={quoteInitialCategory}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenQuote={() => setQuoteModalOpen(true)}
      />

      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuote={() => setQuoteModalOpen(true)}
      />

      <ArticleModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenQuote={() => setQuoteModalOpen(true)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuoteWithCategory={(cat) => handleOpenQuoteWithCategory(cat)}
      />

      <FloorVisualizerModal
        isOpen={visualizerOpen}
        onClose={() => setVisualizerOpen(false)}
        onOpenQuoteWithCategory={(cat) => handleOpenQuoteWithCategory(cat)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
