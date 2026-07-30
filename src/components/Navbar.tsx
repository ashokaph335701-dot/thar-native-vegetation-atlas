import React, { useState, useRef, useEffect } from 'react';
import { Compass, Leaf, Map, MessageSquare, BookOpen, Image, Settings, Sparkles, Search, SlidersHorizontal, Info, FileText, ShieldAlert, Smartphone, Mail, ChevronDown, Camera, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  description?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const coreNavItems: NavItem[] = [
    { id: 'hero', label: 'Home', icon: Compass },
    { id: 'map', label: 'Interactive Map', icon: Map },
    { id: 'explorer', label: 'Species Explorer', icon: Leaf },
    { id: 'scanner', label: 'Pl@ntNet AI', icon: Camera, badge: 'NEW' },
    { id: 'chatbot', label: 'AI Botanist', icon: MessageSquare, badge: 'RAG' },
  ];

  const dropdownNavItems: NavItem[] = [
    { id: 'about', label: 'About the Project', icon: Info, description: 'Mission, CAZRI & BSI scientific collaboration' },
    { id: 'habitats', label: 'Habitats & Ecosystems', icon: BookOpen, description: 'Sand dunes, Magras, Playas, Sewan grasslands, Orans' },
    { id: 'districts', label: 'District Vegetation', icon: Map, description: 'Jaisalmer, Barmer, Jodhpur, Bikaner, Nagaur, Churu' },
    { id: 'educational', label: 'Knowledge Centre', icon: BookOpen, description: 'Bishnoi Khejarli 1730 AD, Panchkuta anatomy, ecology' },
    { id: 'library', label: 'Research Library', icon: FileText, description: 'Download PDF monographs, papers & vector chunks' },
    { id: 'gallery', label: 'Photo Gallery', icon: Image, description: 'Categorized high-res photography archive' },
    { id: 'conservation', label: 'Conservation', icon: ShieldAlert, description: 'Threats, invasive Prosopis juliflora, GIB cabling' },
    { id: 'tools', label: 'Compare & Calendar', icon: SlidersHorizontal, description: 'Side-by-side plant matrix & flowering calendar' },
    { id: 'citizenscience', label: 'Citizen Science (Future)', icon: Smartphone, description: 'Plant photo observations, satellite tracking, API' },
    { id: 'contact', label: 'Contact & Feedback', icon: Mail, description: 'Academic inquiries & TEK data submissions' },
    { id: 'admin', label: 'Admin Portal', icon: Settings, description: 'Re-index vector DB & update dataset records' },
  ];

  const allNavItems: NavItem[] = [...coreNavItems, ...dropdownNavItems];

  return (
    <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-amber-800/40 text-amber-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('hero')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-amber-900/40 group-hover:scale-105 transition-transform duration-300 border border-amber-400/30">
              <Leaf className="w-6 h-6 text-amber-100 animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-100 to-emerald-200 bg-clip-text text-transparent block">
                Thar Native Vegetation Atlas
              </span>
              <span className="text-[10px] text-amber-300/80 font-medium tracking-wide block">
                Digital Ecology & Pl@ntNet AI Hub
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
            {coreNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-800/80 text-amber-100 border border-amber-600/50 shadow-inner'
                      : 'text-amber-200/90 hover:text-amber-100 hover:bg-amber-900/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-amber-400/70'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-extrabold bg-amber-500 text-amber-950 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Dropdown for All Sections */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap border ${
                  isDropdownOpen
                    ? 'bg-amber-800 text-amber-100 border-amber-600'
                    : 'bg-amber-950/60 text-amber-200/90 hover:bg-amber-900/40 border-amber-800/40'
                }`}
              >
                <span>All Sections</span>
                <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-[480px] rounded-3xl bg-stone-900/98 border border-amber-700/60 shadow-2xl p-4 z-50 grid grid-cols-1 sm:grid-cols-2 gap-2 backdrop-blur-xl animate-fadeIn">
                  {dropdownNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`p-3 rounded-2xl text-left transition-all flex items-start gap-3 group ${
                          isActive
                            ? 'bg-amber-800/80 text-amber-100 border border-amber-600/50'
                            : 'hover:bg-amber-950/80 text-amber-200/90 border border-transparent'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-700/40 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-xs text-amber-100 block group-hover:text-amber-300">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="text-[10px] text-amber-400/70 block mt-0.5 line-clamp-1">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900/60 border border-amber-700/50 text-amber-200 text-xs font-semibold transition-all shadow-sm"
              title="Global Intelligent Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-stone-900 border border-amber-700/40 text-amber-400 rounded">⌘K</kbd>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 border border-emerald-400/30 transition-all hover:scale-105"
            >
              <Camera className="w-4 h-4 text-emerald-200" />
              <span>Pl@ntNet AI</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl bg-amber-950/80 text-amber-200 border border-amber-700/50"
            >
              <Search className="w-5 h-5 text-amber-400" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-amber-950/80 text-amber-200 border border-amber-700/50 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-amber-300" />
              ) : (
                <svg className="w-6 h-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-amber-800/40 space-y-1.5 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold ${
                    isActive
                      ? 'bg-amber-800/90 text-amber-100 border border-amber-600/50'
                      : 'text-amber-200/90 hover:bg-amber-950/60'
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
