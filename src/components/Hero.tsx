import React from 'react';
import { ShieldCheck, TrendingUp, Cpu, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { SystemKPIs } from '../types';

interface HeroProps {
  kpis: SystemKPIs;
  onExploreProjects: () => void;
  onOpenReportModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ kpis, onExploreProjects, onOpenReportModal }) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-900/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zamfara State Government • SDG 9 Initiative</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building Sustainable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Infrastructure</span> for Zamfara State
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Empowering 14 Local Government Areas through transparent project tracking, digital fiber expansion, renewable energy, and citizen-led infrastructural accountability.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onExploreProjects}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Explore Project Tracker</span>
              </button>

              <button
                onClick={onOpenReportModal}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold px-6 py-3 rounded-xl shadow transition-all flex items-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Report Infrastructure Issue</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div>
                <div className="text-2xl font-bold text-emerald-400">14 / 14</div>
                <div className="text-xs text-slate-400">LGAs Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400">₦32.5B</div>
                <div className="text-xs text-slate-400">Active Capital outlay</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-300">{kpis.sdg9ImpactScore}%</div>
                <div className="text-xs text-slate-400">SDG 9 Index Score</div>
              </div>
            </div>
          </div>

          {/* Right Card / Visual Grid Column */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">State Operational Matrix</h3>
                    <p className="text-xs text-slate-400">Real-time telemetry & auditing</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  Live Feed
                </span>
              </div>

              {/* Progress items */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Gusau Airport Cargo Terminal</span>
                    <span className="text-emerald-400 font-bold">75%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Fiber Optic Backbone (ZIIT)</span>
                    <span className="text-teal-400 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-teal-400 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Bakura 5MW Solar Mini-Grid</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Talata Mafara Water Scheme</span>
                    <span className="text-amber-400 font-bold">48%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Public audit compliance verified by Ministry of Works</span>
                </div>
                <span className="font-mono text-emerald-400">2026 Q3</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
