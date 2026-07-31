import React, { useState } from 'react';
import { Leaf, Map, BookOpen, Image as ImageIcon, Search, Menu, X, Home, UserCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'explorer', label: 'Native Vegetation', icon: Leaf },
    { id: 'map', label: 'Interactive Map', icon: Map },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'community', label: 'Community Contributions', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8D8B5] text-[#333333] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => setActiveTab('hero')}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#556B2F] flex items-center justify-center shadow-md group-hover:bg-[#B65A3C] transition-colors duration-300">
              <Leaf className="w-6 h-6 text-[#FAF8F3]" />
            </div>
            <div>
              <span className="text-2xl font-serif-heading font-bold tracking-tight text-[#4A3B2A] block leading-none">
                Thar Native Vegetation
              </span>
              <span className="text-[11px] font-nav font-medium tracking-wider text-[#6B8E23] uppercase mt-1 block">
                Digital Knowledge Platform
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-nav font-medium text-xs tracking-wide transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                      : 'text-[#4A3B2A] hover:text-[#B65A3C] hover:bg-[#E8D8B5]/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6B8E23]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5F1E8] hover:bg-[#E8D8B5] border border-[#E8D8B5] text-[#4A3B2A] text-xs font-nav font-medium transition-colors"
            >
              <Search className="w-4 h-4 text-[#556B2F]" />
              <span>Search Plants...</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#F5F1E8] text-[#4A3B2A] border border-[#E8D8B5]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8D8B5] space-y-1.5 bg-[#FAF8F3]">
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-nav font-medium text-sm ${
                    isActive
                      ? 'bg-[#556B2F] text-white font-semibold'
                      : 'text-[#4A3B2A] hover:bg-[#F5F1E8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#6B8E23]'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
