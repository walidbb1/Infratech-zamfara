import React from 'react';
import { X, Calendar, Building, DollarSign, CheckCircle, Clock, Award, MapPin } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Image & Close */}
        <div className="relative h-56 w-full">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 text-white p-2 rounded-full transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center space-x-2 mb-1">
              <span className="bg-emerald-600 text-white text-xs px-2.5 py-0.5 rounded font-medium">{project.category}</span>
              <span className="bg-blue-600/80 backdrop-blur text-blue-100 text-xs px-2.5 py-0.5 rounded font-mono flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{project.lga} LGA</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
            <div>
              <div className="text-xs text-slate-400">Total Budget</div>
              <div className="text-base font-bold text-emerald-400">{project.budget}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Progress</div>
              <div className="text-base font-bold text-blue-400">{project.progress}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Status</div>
              <div className="text-base font-bold text-amber-400">{project.status}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Target Completion</div>
              <div className="text-base font-bold text-slate-200">{project.targetCompletion}</div>
            </div>
          </div>

          {/* Description & Contractor */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Project Overview</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <div className="flex items-start space-x-3">
                <Building className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Lead Contractor</div>
                  <div className="text-sm font-medium text-white">{project.contractor}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-teal-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">SDG 9 Impact Metric</div>
                  <div className="text-sm font-medium text-emerald-300">{project.sdgImpact}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestones timeline */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Project Milestones</h3>
            <div className="space-y-3">
              {project.milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                  {milestone.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <div className={`text-sm font-medium ${milestone.completed ? 'text-white' : 'text-slate-400'}`}>
                        {milestone.title}
                      </div>
                      <div className="text-xs text-slate-500">Scheduled: {milestone.date}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                      milestone.completed ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {milestone.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
