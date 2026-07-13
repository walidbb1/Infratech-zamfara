import React from 'react';
import { Building2, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-base tracking-tight">INFRATECH ZAMFARA</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            The official SDG 9 sustainable infrastructure and public accountability portal for Zamfara State Government, Nigeria. Driving industrialization, innovation, and resilient community development across 14 LGAs.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="font-semibold text-white uppercase font-mono tracking-wider mb-3">Key Ministries</div>
          <div className="hover:text-white cursor-pointer">Ministry of Works & Infrastructure</div>
          <div className="hover:text-white cursor-pointer">Ministry of Water Resources & Energy</div>
          <div className="hover:text-white cursor-pointer">Zamfara State ICT Directorate (ZIIT)</div>
          <div className="hover:text-white cursor-pointer">Bureau for Public Procurement (BPP)</div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="font-semibold text-white uppercase font-mono tracking-wider mb-3">Public Access & Safety</div>
          <div className="hover:text-white cursor-pointer">Emergency Infrastructure Hotline: 0800-ZAMFARA</div>
          <div className="hover:text-white cursor-pointer">SMS OTP Rural Portal Enabled</div>
          <div className="hover:text-white cursor-pointer">Open Data & Transparency Policy</div>
          <div className="hover:text-white cursor-pointer">Privacy & Citizen Security</div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center">
        <div>© 2026 Zamfara State Government. All Rights Reserved. Aligned with UN SDG 9.</div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-1">
          <span>Crafted with precision for North-West Nigeria development</span>
        </div>
      </div>
    </footer>
  );
};
