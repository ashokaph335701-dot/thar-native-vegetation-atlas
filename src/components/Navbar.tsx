import React, { useState } from 'react';
import { Leaf, Map, MessageSquare, BookOpen, Search, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'map', label: 'Rajasthan Map', icon: Map },
    { id: 'explorer', label: 'Native Plants', icon: Leaf },
    { id: 'chatbot', label: 'AI Chatbot', icon: MessageSquare, badge: 'AI' },
    { id: 'about', label: 'About Thar Flora', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-800/40 text-amber-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('map')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-amber-900/40 group-hover:scale-105 transition-transform duration-300 border border-amber-400/30">
              <Leaf className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-100 to-emerald-200 bg-clip-text text-transparent">
                Thar Vegetation Atlas
              </span>
              <p className="text-xs text-amber-300/80 font-medium">Rajasthan Desert Native Plants</p>
            </div>
          </div>

          {/* Clean 4 Main Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                      : 'text-amber-200/90 hover:text-amber-100 hover:bg-amber-900/40 border border-amber-800/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-emerald-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Search & AI Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/60 border border-amber-700/50 text-amber-200 text-xs font-bold transition-all"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search Plants...</span>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-amber-950 text-amber-200 border border-amber-700/50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-800/40 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm ${
                    isActive
                      ? 'bg-amber-500 text-amber-950'
                      : 'text-amber-200/90 hover:bg-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-extrabold bg-emerald-500 text-white rounded-full">
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
