import React, { useState } from 'react';
import { Compass, Leaf, Map, MessageSquare, BookOpen, Image, Settings, Sparkles, Search, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Compass },
    { id: 'map', label: 'GIS Atlas Map', icon: Map },
    { id: 'explorer', label: 'Vegetation Explorer', icon: Leaf },
    { id: 'habitats', label: 'Ecosystems', icon: BookOpen },
    { id: 'chatbot', label: 'AI Botanist', icon: MessageSquare, badge: 'RAG' },
    { id: 'educational', label: 'Desert Ecology', icon: BookOpen },
    { id: 'gallery', label: 'Photo Gallery', icon: Image },
    { id: 'tools', label: 'Compare & Calendar', icon: SlidersHorizontal },
    { id: 'admin', label: 'Admin Portal', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-amber-950/90 backdrop-blur-md border-b border-amber-800/40 text-amber-50 transition-all duration-300 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('hero')}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-amber-900/40 group-hover:scale-105 transition-transform duration-300 border border-amber-400/30">
              <Leaf className="w-7 h-7 text-amber-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-100 to-emerald-200 bg-clip-text text-transparent">
                  Thar Native Vegetation Atlas
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Rajasthan
                </span>
              </div>
              <p className="text-xs text-amber-300/80 font-medium">Digital Research & TEK Conservation Portal</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-amber-800/60 text-amber-100 shadow-inner border border-amber-600/40'
                      : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-900/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-amber-400/70'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-500 text-amber-950 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-900/50 hover:bg-amber-800/60 border border-amber-700/50 text-amber-200 text-xs font-medium transition-all shadow-sm"
              title="Global Intelligent Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search Atlas...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-amber-950/80 border border-amber-700/40 text-amber-400 rounded">⌘K</kbd>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-950/40 hover:scale-105 border border-emerald-400/30"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
              <span>AI Botanist</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-amber-900/60 text-amber-200 border border-amber-700/40"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-amber-900/80 text-amber-200 border border-amber-700/50 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-amber-800/40 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === item.id ? 'bg-amber-800/80 text-amber-100' : 'text-amber-200/80 hover:bg-amber-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-amber-950 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
