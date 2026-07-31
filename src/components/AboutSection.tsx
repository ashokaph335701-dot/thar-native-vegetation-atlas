import React from 'react';
import { ShieldCheck, BookOpen, Heart, Leaf, Target, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F5F1E8] text-[#333333] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E8D8B5] text-[#556B2F] text-xs font-nav font-semibold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#6B8E23]" />
            <span>Digital Knowledge Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#4A3B2A]">
            About the Project
          </h2>
          <p className="text-base text-[#333333]/80 leading-relaxed font-sans">
            Documenting and preserving the scientific, ethno-botanical, and ecological heritage of Rajasthan's Thar Desert native flora.
          </p>
        </div>

        {/* 3 Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Importance of Native Vegetation */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E8D8B5] premium-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#556B2F]/10 flex items-center justify-center text-[#556B2F]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif-heading font-bold text-[#4A3B2A]">1. Why Native Vegetation is Important</h3>
            <p className="text-sm text-[#333333]/90 leading-relaxed font-sans">
              Native desert plants like Khejri, Rohida, Ker, and Sewan grass have evolved over millennia to survive extreme droughts with deep taproots. They fix atmospheric nitrogen, prevent sand dune movement, enrich desert soil, and sustain local pastoral livelihoods.
            </p>
          </div>

          {/* Card 2: Necessity of Documenting Flora */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E8D8B5] premium-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#B65A3C]/10 flex items-center justify-center text-[#B65A3C]">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif-heading font-bold text-[#4A3B2A]">2. Why Documenting Thar Flora is Necessary</h3>
            <p className="text-sm text-[#333333]/90 leading-relaxed font-sans">
              Rapid invasion by alien mesquite (*Prosopis juliflora*), expanding canal agriculture, and climate changes threaten traditional species. Documenting this flora safeguards ancient indigenous knowledge (TEK), Bishnoi conservation history, and wild famine food heritage (Panchkuta).
            </p>
          </div>

          {/* Card 3: Project Goal */}
          <div className="p-8 rounded-3xl bg-[#FAF8F3] border border-[#E8D8B5] premium-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#6B8E23]/10 flex items-center justify-center text-[#6B8E23]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif-heading font-bold text-[#4A3B2A]">3. Our Digital Knowledge Goal</h3>
            <p className="text-sm text-[#333333]/90 leading-relaxed font-sans">
              To create an accessible, scientific, zero-hallucination digital atlas and AI knowledge hub for school students, researchers, policymakers, conservationists, and tourists to explore Rajasthan's native vegetation geographically and conversationally.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
