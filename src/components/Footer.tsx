import React from 'react';
import { Leaf, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-amber-950 border-t border-amber-800/40 text-amber-200 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-amber-800/40">
          
          {/* Col 1: Logo & About */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-amber-950">
                <Leaf className="w-5 h-5 font-bold" />
              </div>
              <span className="font-bold text-lg text-amber-100">Thar Native Vegetation Atlas</span>
            </div>
            <p className="text-amber-300/80 leading-relaxed max-w-md">
              A scientific knowledge platform dedicated to documenting the floristic composition, ethno-botanical heritage, and ecological conservation of Rajasthan's Thar Desert. Grounded in research by CAZRI & Botanical Survey of India.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-100 text-sm">Atlas Sections</h4>
            <ul className="space-y-1.5 text-amber-300/80">
              <li><button onClick={() => setActiveTab('map')} className="hover:text-amber-100">Interactive GIS Map</button></li>
              <li><button onClick={() => setActiveTab('explorer')} className="hover:text-amber-100">Vegetation Explorer</button></li>
              <li><button onClick={() => setActiveTab('habitats')} className="hover:text-amber-100">Ecosystem & Habitats</button></li>
              <li><button onClick={() => setActiveTab('educational')} className="hover:text-amber-100">Desert Ecology & Bishnoi History</button></li>
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-amber-100">Plant Comparison & Flowering Calendar</button></li>
            </ul>
          </div>

          {/* Col 3: Research Source Citations */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-100 text-sm">Knowledge Source</h4>
            <p className="text-amber-300/80 leading-relaxed">
              Based on the Monograph: <em>"Comprehensive Monograph on the Flora of the Thar Desert: Ecology, Ethnobotany, and Cultural Heritage"</em>.
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Grounded RAG Bot Included
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-amber-400/80">
          <p>© 2026 Thar Native Vegetation Atlas. Dedicated to the Flora & Ecosystems of Marwar, Rajasthan.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Conservationists, Students & Researchers
          </p>
        </div>

      </div>
    </footer>
  );
};
