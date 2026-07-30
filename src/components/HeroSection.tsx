import React from 'react';
import { Compass, Sparkles, ShieldCheck, TreePine, MapPin, Feather, ArrowRight, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onExploreAtlas: () => void;
  onAskAI: () => void;
  onExploreSpecies: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreAtlas, onAskAI, onExploreSpecies }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 text-amber-50">
      
      {/* Background Hero Wallpaper with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85"
          alt="Thar Desert Sand Dunes and Khejri Landscape"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/10 via-transparent to-black/80" />
      </div>

      {/* Floating Particles / Micro Animations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-12 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs sm:text-sm font-semibold mb-8 shadow-xl backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Scientific Knowledge Platform & RAG AI Botanist</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto">
          Discover the Native Vegetation of Rajasthan's{' '}
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent underline decoration-amber-500/40 underline-offset-8">
            Thar Desert
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-2xl text-amber-200/90 max-w-3xl mx-auto font-normal leading-relaxed">
          An interactive digital atlas documenting the ecology, biodiversity, traditional knowledge, and native plant species of India's Great Indian Desert.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onExploreAtlas}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 font-bold text-base shadow-2xl shadow-amber-950/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-amber-300/40"
          >
            <Compass className="w-5 h-5 text-amber-950" />
            <span>Explore the Atlas</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onAskAI}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-900/80 to-teal-900/80 hover:bg-emerald-800/90 border border-emerald-500/40 text-emerald-100 font-bold text-base shadow-xl backdrop-blur-md hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
            <span>Ask the AI Botanist</span>
          </button>
        </div>

        {/* Key Highlight Cards Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto text-left">
          
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/40 backdrop-blur-md hover:border-amber-600/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-900/60 flex items-center justify-center mb-3 text-amber-400">
              <TreePine className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-amber-100">775+</p>
            <p className="text-xs text-amber-300/80 font-medium">Identified Native Species & Xerophytes</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/40 backdrop-blur-md hover:border-amber-600/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 flex items-center justify-center mb-3 text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-amber-100">385,000 km²</p>
            <p className="text-xs text-amber-300/80 font-medium">Subtropical Arid Biome Territory</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/40 backdrop-blur-md hover:border-amber-600/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-900/60 flex items-center justify-center mb-3 text-amber-400">
              <Feather className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-amber-100">Panchkuta</p>
            <p className="text-xs text-amber-300/80 font-medium">5 Traditional Famine Foods of Marwar</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/40 backdrop-blur-md hover:border-amber-600/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-900/60 flex items-center justify-center mb-3 text-teal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-amber-100">100% RAG</p>
            <p className="text-xs text-amber-300/80 font-medium">Source Grounded Research AI</p>
          </div>

        </div>

        {/* Explore Quick Species Chips */}
        <div className="mt-12 pt-8 border-t border-amber-800/40 flex flex-wrap items-center justify-center gap-2 text-xs text-amber-300">
          <span className="font-semibold text-amber-400">Featured Keystone Monograph Flora:</span>
          {['Khejri (Prosopis cineraria)', 'Rohida (Tecomella undulata)', 'Sewan Grass (Lasiurus scindicus)', 'Ker (Capparis decidua)', 'Kumatiyo (Acacia senegal)', 'Guggal (Commiphora wightii)', 'Jaal (Salvadora oleoides)'].map((name, idx) => (
            <button
              key={idx}
              onClick={onExploreSpecies}
              className="px-3 py-1.5 rounded-full bg-amber-900/40 border border-amber-700/40 hover:bg-amber-800/60 hover:text-amber-100 transition-all"
            >
              🌿 {name}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
