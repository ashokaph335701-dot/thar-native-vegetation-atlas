import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#4A3B2A] border-t border-[#E8D8B5]/30 text-[#FAF8F3] text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#E8D8B5]/20 font-sans">
          
          {/* Col 1: Logo & About */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#556B2F] flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif-heading font-bold text-2xl text-[#FAF8F3]">Thar Native Vegetation</span>
            </div>
            <p className="text-sm text-[#FAF8F3]/80 leading-relaxed max-w-md">
              A digital museum platform dedicated to documenting the floristic composition, ethno-botanical heritage, and ecological conservation of Rajasthan's Thar Desert. Grounded in research by CAZRI & Botanical Survey of India.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2 font-nav">
            <h4 className="font-serif-heading font-bold text-[#FAF8F3] text-base">Navigation</h4>
            <ul className="space-y-2 text-[#E8D8B5]/90 text-xs">
              <li><button onClick={() => setActiveTab('hero')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">About the Project</button></li>
              <li><button onClick={() => setActiveTab('explorer')} className="hover:text-white transition-colors">Native Species Catalog</button></li>
              <li><button onClick={() => setActiveTab('map')} className="hover:text-white transition-colors">Interactive Rajasthan Map</button></li>
              <li><button onClick={() => setActiveTab('gallery')} className="hover:text-white transition-colors">Photo Gallery</button></li>
              <li><button onClick={() => setActiveTab('community')} className="hover:text-white transition-colors">Community Contributions</button></li>
            </ul>
          </div>

          {/* Col 3: Research & AI */}
          <div className="space-y-2 font-nav">
            <h4 className="font-serif-heading font-bold text-[#FAF8F3] text-base">Research & AI</h4>
            <ul className="space-y-2 text-[#E8D8B5]/90 text-xs">
              <li><button onClick={() => setActiveTab('explorer')} className="hover:text-white transition-colors">10 Native Trees</button></li>
              <li><button onClick={() => setActiveTab('explorer')} className="hover:text-white transition-colors">10 Native Shrubs & Plants</button></li>
              <li><button onClick={() => setActiveTab('explorer')} className="hover:text-white transition-colors">10 Traditional Vegetables</button></li>
              <li><button onClick={() => setActiveTab('hero')} className="hover:text-white transition-colors">Thar Botanist AI Assistant</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8D8B5]/70 font-nav">
          <p>© 2026 Thar Native Vegetation. Dedicated to the Flora & Ecosystems of Marwar, Rajasthan.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#B65A3C] fill-[#B65A3C]" /> for Conservationists, Students & Researchers
          </p>
        </div>

      </div>
    </footer>
  );
};
