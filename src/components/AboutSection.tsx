import React from 'react';
import { ShieldCheck, BookOpen, Compass, TreePine, Award, Users, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scientific Knowledge Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            About the Thar Native Vegetation Atlas Project
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-3xl leading-relaxed">
            Dedicated to documenting, preserving, and sharing the scientific, ethno-botanical, and cultural heritage of native flora in India's Great Indian Desert.
          </p>
        </div>

        {/* Mission Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-700/50 shadow-2xl space-y-4">
          <h3 className="text-2xl font-extrabold text-amber-100">Our Mission & Purpose</h3>
          <p className="text-sm text-amber-200/90 leading-relaxed">
            This is not a nursery or plantation website. It is a scientific knowledge hub designed to enable anyone—from school students, local pastoral communities, and tourists to researchers, policymakers, and conservationists—to explore, understand, and protect the native vegetation ecosystems of the Thar Desert.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-900/40 border border-amber-700/40 space-y-1">
              <span className="font-bold text-amber-300 text-sm block">🔬 Scientific Integrity</span>
              <p className="text-amber-200/80">Every plant record and RAG AI response is strictly grounded in verified botanical monographs.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-700/40 space-y-1">
              <span className="font-bold text-emerald-300 text-sm block">🌿 Indigenous Wisdom (TEK)</span>
              <p className="text-emerald-200/80">Preserving centuries of Bishnoi, Raika, and Maldhari traditional ecological practices.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-900/40 border border-amber-700/40 space-y-1">
              <span className="font-bold text-amber-300 text-sm block">🤖 Zero Hallucination AI</span>
              <p className="text-amber-200/80">Retrieval-Augmented Generation ensuring answers cite source documents explicitly.</p>
            </div>
          </div>
        </div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-3">
            <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" /> Geographic Exploration
            </h4>
            <p className="text-amber-200/90 leading-relaxed">
              Enabling users to geographically visualize plant distributions across Jaisalmer, Barmer, Jodhpur, Bikaner, Nagaur, Churu, Pali, and Jalor using interactive GIS mapping and rainfall overlays.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-3">
            <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-emerald-400" /> Species Monograph Preservation
            </h4>
            <p className="text-amber-200/90 leading-relaxed">
              Comprehensive profiles for every native tree, shrub, grass, climber, and herb—detailing taxonomy, rainfall tolerance, pollinators, medicinal uses, and Panchkuta culinary heritage.
            </p>
          </div>
        </div>

        {/* Institutional Acknowledgment */}
        <div className="p-6 rounded-2xl bg-stone-900 border border-amber-800/40 text-xs text-amber-300 flex items-center gap-4">
          <Award className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-amber-100 block text-sm">Grounded in Botanical Survey & CAZRI Publications</span>
            <p className="mt-0.5 text-amber-300/80">Special thanks to researchers and taxonomists at Central Arid Zone Research Institute (CAZRI) and Arid Forest Research Institute (AFRI) for their foundational floristic surveys.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
