import React from 'react';
import { ShieldCheck, BookOpen, Heart, Leaf, Target, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Knowledge Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-100">
            About the Project
          </h2>
          <p className="text-sm text-amber-300/80 leading-relaxed">
            Documenting and preserving the scientific, ethno-botanical, and ecological heritage of Rajasthan's Thar Desert native flora.
          </p>
        </div>

        {/* 3 Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Importance of Native Vegetation */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-amber-100">1. Why Native Vegetation is Important</h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Native desert plants like Khejri, Rohida, Ker, and Sewan grass have evolved over millennia to survive extreme droughts with deep taproots. They fix atmospheric nitrogen, prevent sand dune movement, enrich desert soil, and sustain local pastoral livelihoods.
            </p>
          </div>

          {/* Card 2: Necessity of Documenting Flora */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-amber-100">2. Why Documenting Thar Flora is Necessary</h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Rapid invasion by alien mesquite (*Prosopis juliflora*), expanding canal agriculture, and climate changes threaten traditional species. Documenting this flora safeguards ancient indigenous knowledge (TEK), Bishnoi conservation history, and wild famine food heritage (Panchkuta).
            </p>
          </div>

          {/* Card 3: Project Goal */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-amber-100">3. Our Digital Knowledge Goal</h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              To create an accessible, scientific, zero-hallucination digital atlas and AI knowledge hub for school students, researchers, policymakers, conservationists, and tourists to explore Rajasthan's native vegetation geographically and conversationally.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
