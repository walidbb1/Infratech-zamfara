import React from 'react';
import { Building2, ShieldCheck, UserCheck, Bot, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  activeTab: 'home' | 'user-dashboard' | 'admin-dashboard';
  setActiveTab: (tab: 'home' | 'user-dashboard' | 'admin-dashboard') => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  activeTab,
  setActiveTab,
  onOpenAI
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
      {/* Ticker Banner */}
      <div className="bg-emerald-800/90 text-emerald-100 text-xs py-1.5 px-4 font-medium flex justify-between items-center overflow-hidden">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">SDG 9 LIVE</span>
          <span className="truncate">Zamfara Infrastructure & Digital Transformation Drive • 14 LGAs Connected • Budget Transparency Portal Active</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-[11px]">
          <span>⚡ Grid Uptime: 99.4%</span>
          <span>🛡️ Verified Contractors: 58</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg border border-emerald-500">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight text-white flex items-center space-x-2">
                <span>INFRATECH ZAMFARA</span>
                <span className="text-[10px] bg-blue-600 text-blue-100 px-1.5 py-0.5 rounded font-mono">SDG 9</span>
              </div>
              <p className="text-[11px] text-slate-400">Zamfara State Infrastructure & Accountability Portal</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'home' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Public Tracker
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'admin-dashboard' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin Console</span>
              </button>
            )}

            {(currentUser?.role === 'citizen' || currentUser?.role === 'contractor') && (
              <button
                onClick={() => setActiveTab('user-dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'user-dashboard' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4 text-blue-400" />
                <span>My Portal</span>
              </button>
            )}

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAI}
              className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 shadow transition-all transform hover:scale-105"
            >
              <Bot className="w-4 h-4" />
              <span>AI SDG Advisor</span>
            </button>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <div className="text-right">
                  <div className="text-xs font-semibold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">{currentUser.role} • {currentUser.lga}</div>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded hover:bg-slate-700"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all flex items-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Portal Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenAI}
              className="bg-emerald-600 p-2 rounded-md text-white"
              title="AI Assistant"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 pt-3 pb-4 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded text-sm font-medium text-slate-200 hover:bg-slate-700"
          >
            Public Tracker
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => { setActiveTab('admin-dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded text-sm font-medium text-slate-200 hover:bg-slate-700 flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Console</span>
            </button>
          )}
          {currentUser && currentUser.role !== 'admin' && (
            <button
              onClick={() => { setActiveTab('user-dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded text-sm font-medium text-slate-200 hover:bg-slate-700 flex items-center space-x-2"
            >
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>My Portal</span>
            </button>
          )}
          <div className="pt-2 border-t border-slate-700">
            {currentUser ? (
              <div className="flex items-center justify-between px-3 py-2">
                <div>
                  <div className="text-xs font-semibold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-400 uppercase font-mono">{currentUser.role}</div>
                </div>
                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="text-red-400 text-xs font-medium flex items-center space-x-1">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full bg-emerald-600 text-white py-2 rounded text-sm font-medium text-center"
              >
                Portal Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
