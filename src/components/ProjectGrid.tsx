import React, { useState } from 'react';
import { Search, Filter, MapPin, Building2, ChevronRight, CheckCircle2, Clock, AlertTriangle, LayoutGrid, Map as MapIcon } from 'lucide-react';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ProjectMap } from './ProjectMap';

interface ProjectGridProps {
  projects: Project[];
}

const ZAMFARA_LGAS = [
  'All LGAs',
  'Gusau',
  'Talata Mafara',
  'Bakura',
  'Anka',
  'Zurmi',
  'Kaura Namoda',
  'Maru',
  'Bungudu',
  'Maradun',
  'Shinkafi',
  'Bukkuyum',
  'Gummi',
  'Tsafe',
  'Birnin Magaji'
];

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLga, setSelectedLga] = useState('All LGAs');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const categories = ['All', 'Transport & Aviation', 'Digital & ICT', 'Water Resources', 'Energy & Power', 'Healthcare & Social', 'Agriculture & Roads'];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.lga.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLga = selectedLga === 'All LGAs' || project.lga === selectedLga;
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesLga && matchesCategory;
  });

  return (
    <section className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">SDG 9 Infrastructure Portal</div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Zamfara State Project Tracker Grid & Map</h2>
            <p className="text-slate-400 text-sm mt-1">Real-time public tracking of capital projects, digital fiber rollout, and community interventions across 14 LGAs.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center space-x-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                  viewMode === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300 hidden sm:block">
              Showing <span className="font-bold text-emerald-400">{filteredProjects.length}</span> of {projects.length} Monitored Projects
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search projects, contractors, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* LGA Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedLga}
              onChange={(e) => setSelectedLga(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {ZAMFARA_LGAS.map((lga) => (
                <option key={lga} value={lga}>{lga}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode: Map vs Grid */}
        {viewMode === 'map' ? (
          <div className="space-y-4">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Interactive Leaflet Map — Zamfara State Infrastructure GIS</span>
              <span className="text-emerald-400 font-medium">Click any pin to inspect project details</span>
            </div>
            <ProjectMap
              projects={filteredProjects}
              onSelectProject={(project) => setSelectedProject(project)}
            />
          </div>
        ) : (
          /* Project Cards Grid */
          filteredProjects.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">No projects found matching your criteria</h3>
              <p className="text-sm text-slate-400">Try adjusting your search query or LGA filter settings.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedLga('All LGAs'); setSelectedCategory('All'); }}
                className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer flex flex-col group"
                >
                  {/* Card Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="bg-slate-900/90 backdrop-blur border border-slate-700 text-emerald-400 text-xs px-2.5 py-1 rounded-lg font-mono">
                        {project.id}
                      </span>
                      <span className="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs">
                      <span className="bg-blue-600/90 text-blue-100 px-2 py-0.5 rounded font-medium flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{project.lga} LGA</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded font-mono font-medium ${
                        project.status === 'Completed' ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700' :
                        project.status === 'In Progress' ? 'bg-blue-900/80 text-blue-300 border border-blue-700' :
                        'bg-amber-900/80 text-amber-300 border border-amber-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1.5 line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Execution Progress</span>
                        <span className="text-emerald-400 font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-emerald-600'}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer details */}
                    <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                      <div>
                        <span className="text-[10px] text-slate-500 block">BUDGET ALLOCATION</span>
                        <span className="font-bold text-white">{project.budget}</span>
                      </div>
                      <button className="bg-slate-800 hover:bg-slate-700 text-emerald-400 px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1 transition-colors">
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>

      {/* Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

