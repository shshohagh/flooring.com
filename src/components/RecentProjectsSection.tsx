import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/flooringData';
import { ProjectItem } from '../types';
import { ArrowRight, MapPin, Maximize2, Layers } from 'lucide-react';

interface RecentProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onViewAllProjects: () => void;
}

export const RecentProjectsSection: React.FC<RecentProjectsSectionProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'hardwood' | 'commercial'>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-['Outfit']">
            Our Recent Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Discover our latest flooring transformations.
          </p>

          {/* Interactive Filter Pills */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              All Works
            </button>
            <button
              onClick={() => setActiveFilter('hardwood')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeFilter === 'hardwood'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              Residential Hardwood
            </button>
            <button
              onClick={() => setActiveFilter('commercial')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeFilter === 'commercial'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              Executive & Commercial
            </button>
          </div>
        </div>

        {/* 4 Projects Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  loading="lazy"
                />
                
                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-slate-950 text-xs font-semibold rounded-full shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Expand Project
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {project.material}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{project.squareFeet.toLocaleString()} sq. ft.</span>
                  <span>{project.completionTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button matching mockup */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300 rounded-full shadow-xs transition-all cursor-pointer"
          >
            View All Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
