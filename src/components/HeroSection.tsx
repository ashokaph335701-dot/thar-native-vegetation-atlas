import React from 'react';
import { ArrowRight, Leaf, Sparkles, Map, BookOpen, Utensils } from 'lucide-react';

interface HeroSectionProps {
  onExploreVegetation: () => void;
  onAskAI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreVegetation,
  onAskAI
}) => {
  return (
    <section className="relative min-h-[85vh] bg-stone-950 text-amber-50 flex items-center justify-center overflow-hidden py-16">
      
      {/* Background Desert Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80"
          alt="Thar Desert Landscape"
          className="w-full h-full object-cover opacity-25 scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-amber-950/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/50 text-amber-300 text-xs font-bold shadow-lg">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Rajasthan Digital Ecology & Knowledge Hub</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-amber-100 leading-tight">
            Thar Native Vegetation
          </h1>
          <p className="text-base sm:text-xl text-amber-200/90 leading-relaxed font-medium max-w-3xl mx-auto">
            Discover the native trees, shrubs, plants, and traditional vegetables of the Thar Desert in Rajasthan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onExploreVegetation}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-sm sm:text-base shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
          >
            <span>Explore Vegetation</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onAskAI}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-600/60 text-emerald-200 font-extrabold text-sm sm:text-base shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
          >
            <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
            <span>Ask Thar Botanist AI</span>
          </button>
        </div>

        {/* 3 Quick Navigation Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto text-left text-xs">
          <div 
            onClick={onExploreVegetation}
            className="p-4 rounded-2xl bg-stone-900/90 border border-amber-800/40 hover:border-amber-500 cursor-pointer transition-all space-y-1 group"
          >
            <span className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" /> Native Vegetation
            </span>
            <p className="text-amber-200/80">Trees, shrubs, plants, and traditional desert vegetables.</p>
          </div>

          <div 
            onClick={onExploreVegetation}
            className="p-4 rounded-2xl bg-stone-900/90 border border-amber-800/40 hover:border-amber-500 cursor-pointer transition-all space-y-1 group"
          >
            <span className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <Map className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" /> Rajasthan Map
            </span>
            <p className="text-amber-200/80">Interactive district-wise native species mapping.</p>
          </div>

          <div 
            onClick={onAskAI}
            className="p-4 rounded-2xl bg-stone-900/90 border border-amber-800/40 hover:border-amber-500 cursor-pointer transition-all space-y-1 group"
          >
            <span className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" /> Thar Botanist AI
            </span>
            <p className="text-amber-200/80">RAG AI chatbot grounded in scientific research paper.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
