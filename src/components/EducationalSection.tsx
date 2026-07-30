import React from 'react';
import { BookOpen, Heart, ShieldCheck, Sun, Utensils, Feather, AlertTriangle, CheckCircle } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Desert Ecology & Indigenous Wisdom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Educational Hub & Ecological Knowledge
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-2xl">
            Beginner-friendly and deep scientific guides explaining what native vegetation is, how xerophytes survive extreme heat, the Bishnoi tree protection movement, and the anatomy of Panchkuta.
          </p>
        </div>

        {/* Grid of Educational Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Module 1: What is Native Vegetation & Thar Desert */}
          <div className="p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-amber-100">What is Native Vegetation & Why Does it Matter?</h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Native vegetation consists of plant species that have naturally evolved in a specific geographical biome over millennia without human intervention. In the Thar Desert—the world's most densely populated desert (&gt;80 persons/km²)—native flora like Khejri, Rohida, Ker, and Sewan grass are uniquely evolved to handle 0°C to 50°C temperatures with less than 150 mm of rain.
            </p>
            <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-800/40 text-xs text-amber-300">
              <strong className="text-amber-400 block mb-1">Key Xerophytic Adaptations:</strong>
              • Dimorphic 30m taproots reaching subsoil aquifers.<br/>
              • Thick waxy cuticles and leafless photosynthetic green stems.<br/>
              • Thorns breaking desiccating wind boundary layers.
            </div>
          </div>

          {/* Module 2: The Bishnoi Movement & Orans */}
          <div className="p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 flex items-center justify-center text-emerald-400">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-amber-100">Bishnoi Sacred Heritage & Khejarli (1730 AD)</h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Founded in 1485 AD by Guru Jambheshwar, the Bishnoi sect follows 29 sacred tenets, strictly prohibiting the felling of green trees and killing of wild animals. In 1730 AD, Amrita Devi Bishnoi and 362 villagers sacrificed their lives by hugging Khejri trees to protect them from royal woodcutters, resulting in the world's first recorded environmental conservation decree.
            </p>
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-200">
              <strong className="text-emerald-300 block mb-1">Orans (Sacred Groves):</strong>
              Community-protected virgin forests acting as gene banks for native flora where felling green wood carries severe socio-religious bans.
            </div>
          </div>

          {/* Module 3: Anatomy of Panchkuta */}
          <div className="p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-amber-100">The Anatomy of Panchkuta (5 Famine Foods)</h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Recurrent desert famines (*Akal*) shaped Marwari culinary heritage around sun-drying native wild flora into Panchkuta:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-200">
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/30">1. <strong>Ker:</strong> Tangy bitter berries</div>
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/30">2. <strong>Sangri:</strong> Khejri bean pods</div>
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/30">3. <strong>Kumatiya:</strong> Acacia senegal seeds</div>
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/30">4. <strong>Gunda:</strong> Mucilaginous berries</div>
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/30 col-span-1 sm:col-span-2">5. <strong>Kachri:</strong> Sour wild desert melon</div>
            </div>
          </div>

          {/* Module 4: Native vs Exotic Invasive Threat */}
          <div className="p-8 rounded-3xl bg-stone-900/90 border border-red-800/50 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-950 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-amber-100">Native Khejri vs. Invasive Vilayati Kikar</h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              The invasive exotic *Prosopis juliflora* (Vilayati Kikar) introduced mid-20th century poses a severe crisis. Unlike native Khejri which enriches soil nitrogen and lets sunlight pass, juliflora releases toxic allelopaths, monopolizes deep water, and forms dense thickets fatal to Great Indian Bustards and Blackbucks.
            </p>
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/40 text-xs text-red-200">
              <strong className="text-red-300 block mb-1">Ecological Restoration Goal:</strong>
              Systematic manual eradication of Vilayati Kikar coupled with aggressive reseeding of native Sewan grass (*Lasiurus scindicus*).
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
