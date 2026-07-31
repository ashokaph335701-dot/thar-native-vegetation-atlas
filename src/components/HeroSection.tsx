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
    <section className="relative min-h-[85vh] bg-[#F5F1E8] text-[#333333] flex items-center justify-center overflow-hidden py-20">
      
      {/* Full-Width Immersive Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80"
          alt="Thar Desert Landscape"
          className="w-full h-full object-cover opacity-20 scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/60 via-[#F5F1E8]/90 to-[#F5F1E8]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Heritage Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E8D8B5] text-[#556B2F] text-xs font-nav font-semibold shadow-sm">
          <Leaf className="w-4 h-4 text-[#6B8E23]" />
          <span>Rajasthan Digital Ecology & TEK Museum</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-heading font-bold tracking-tight text-[#4A3B2A] leading-tight">
            Thar Native Vegetation
          </h1>
          <p className="text-lg sm:text-2xl font-sans text-[#333333]/90 leading-relaxed font-normal max-w-3xl mx-auto">
            Discover the native trees, shrubs, plants, and traditional vegetables of the Thar Desert in Rajasthan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreVegetation}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#B65A3C] hover:bg-[#a04b30] text-white font-nav font-semibold text-sm sm:text-base shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5"
          >
            <span>Explore Vegetation</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onAskAI}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#556B2F] hover:bg-[#465826] text-white font-nav font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
            <span>Ask Thar Botanist AI</span>
          </button>
        </div>

        {/* 3 Quick Navigation Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-12 max-w-4xl mx-auto text-left">
          
          <div 
            onClick={onExploreVegetation}
            className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E8D8B5] hover:border-[#556B2F] cursor-pointer transition-all duration-300 premium-shadow group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#556B2F]/10 flex items-center justify-center text-[#556B2F]">
              <Leaf className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-serif-heading font-bold text-lg text-[#4A3B2A]">Native Species Catalog</h3>
            <p className="text-xs text-[#333333]/80 leading-relaxed font-sans">10 Trees, 10 Shrubs & Plants, and 10 Traditional Vegetables with real photos.</p>
          </div>

          <div 
            onClick={onExploreVegetation}
            className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E8D8B5] hover:border-[#556B2F] cursor-pointer transition-all duration-300 premium-shadow group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#B65A3C]/10 flex items-center justify-center text-[#B65A3C]">
              <Map className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-serif-heading font-bold text-lg text-[#4A3B2A]">Rajasthan District Map</h3>
            <p className="text-xs text-[#333333]/80 leading-relaxed font-sans">Interactive seamless district boundary map matching official political contours.</p>
          </div>

          <div 
            onClick={onAskAI}
            className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E8D8B5] hover:border-[#556B2F] cursor-pointer transition-all duration-300 premium-shadow group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6B8E23]/10 flex items-center justify-center text-[#6B8E23]">
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-serif-heading font-bold text-lg text-[#4A3B2A]">Thar Botanist AI</h3>
            <p className="text-xs text-[#333333]/80 leading-relaxed font-sans">Grounded research assistant delivering direct, clean scientific answers.</p>
          </div>

        </div>

      </div>
    </section>
  );
};
