import React, { useState } from 'react';
import { Compass, Leaf, Map, MessageSquare, BookOpen, Image, Settings, Sparkles, Search, SlidersHorizontal, Info, FileText, ShieldAlert, Smartphone, Mail, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mainNavItems = [
    { id: 'hero', label: 'Home', icon: Compass },
    { id: 'about', label: 'About', icon: Info },
    { id: 'map', label: 'Interactive Map', icon: Map },
    { id: 'explorer', label: 'Species Explorer', icon: Leaf },
    { id: 'habitats', label: 'Habitats', icon: BookOpen },
    { id: 'districts', label: 'District Vegetation', icon: Map },
    { id: 'educational', label: 'Knowledge Centre', icon: BookOpen },
    { id: 'library', label: 'Research Library', icon: FileText },
    { id: 'chatbot', label: 'AI Botanist', icon: MessageSquare, badge: 'RAG' },
  ];

  const secondaryNavItems = [
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'conservation', label: 'Conservation', icon: ShieldAlert },
    { id: 'tools', label: 'Compare & Calendar', icon: SlidersHorizontal },
    { id: 'citizenscience', label: 'Citizen Science (Future)', icon: Smartphone },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'admin', label: 'Admin Portal', icon: Settings },
  ];

  const allNavItems = [...mainNavItems, ...secondaryNavItems];

  return (
    <header className="sticky top-0 z-50 bg-amber-950/95 backdrop-blur-md border-b border-amber-800/40 text-amber-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('hero')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-amber-900/40 group-hover:scale-105 transition-transform duration-300 border border-amber-400/30">
              <Leaf className="w-6 h-6 text-amber-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-100 to-emerald-200 bg-clip-text text-transparent">
                  Thar Native Vegetation Atlas
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 font-medium">Digital Ecology & TEK Knowledge Hub</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-amber-800/60 text-amber-100 border border-amber-600/40'
                      : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-900/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-amber-400/70'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1 py-0.2 text-[9px] font-bold bg-amber-500 text-amber-950 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* More Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg font-medium text-amber-200/80 hover:text-amber-100 hover:bg-amber-900/40"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-stone-900 border border-amber-800/60 shadow-2xl p-2 z-50 space-y-1">
                  {secondaryNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left ${
                          activeTab === item.id ? 'bg-amber-800/80 text-amber-100' : 'text-amber-200/80 hover:bg-amber-900/40'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-amber-400" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-900/50 hover:bg-amber-800/60 border border-amber-700/50 text-amber-200 text-xs font-medium"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Search</span>
              <kbd className="px-1 py-0.5 text-[9px] bg-amber-950 border border-amber-700/40 text-amber-400 rounded">⌘K</kbd>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-spin" />
              <span>AI Botanist</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-amber-900/80 text-amber-200 border border-amber-700/50"
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
          <div className="xl:hidden py-4 border-t border-amber-800/40 space-y-1 max-h-[75vh] overflow-y-auto">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium ${
                    activeTab === item.id ? 'bg-amber-800/80 text-amber-100' : 'text-amber-200/80 hover:bg-amber-900/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-amber-950 rounded-full">
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
