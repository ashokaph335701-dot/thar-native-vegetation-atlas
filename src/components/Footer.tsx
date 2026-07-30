import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';

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

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-100 text-sm">Navigation & Features</h4>
            <ul className="space-y-1.5 text-amber-300/80">
              <li><button onClick={() => setActiveTab('hero')} className="hover:text-amber-100">Home</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-amber-100">About the Project</button></li>
              <li><button onClick={() => setActiveTab('map')} className="hover:text-amber-100">Interactive Vegetation Map</button></li>
              <li><button onClick={() => setActiveTab('explorer')} className="hover:text-amber-100">Species Explorer</button></li>
              <li><button onClick={() => setActiveTab('habitats')} className="hover:text-amber-100">Habitats</button></li>
              <li><button onClick={() => setActiveTab('districts')} className="hover:text-amber-100">District-wise Vegetation</button></li>
              <li><button onClick={() => setActiveTab('educational')} className="hover:text-amber-100">Knowledge Centre</button></li>
            </ul>
          </div>

          {/* Col 3: Research & AI */}
          <div className="space-y-2">
            <h4 className="font-bold text-amber-100 text-sm">Research & Community</h4>
            <ul className="space-y-1.5 text-amber-300/80">
              <li><button onClick={() => setActiveTab('library')} className="hover:text-amber-100">Research Library</button></li>
              <li><button onClick={() => setActiveTab('chatbot')} className="hover:text-amber-100">AI Botanist (RAG)</button></li>
              <li><button onClick={() => setActiveTab('gallery')} className="hover:text-amber-100">Photo Gallery</button></li>
              <li><button onClick={() => setActiveTab('conservation')} className="hover:text-amber-100">Conservation</button></li>
              <li><button onClick={() => setActiveTab('citizenscience')} className="hover:text-amber-100">Citizen Science (Future)</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-100">Contact & Feedback</button></li>
            </ul>
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
