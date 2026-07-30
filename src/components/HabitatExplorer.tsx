import React, { useState } from 'react';
import { habitatDatabase } from '../data/habitatDatabase';
import { HabitatData } from '../types';
import { Mountain, Trees, ShieldAlert, CheckCircle2, ArrowRight, Layers } from 'lucide-react';

export const HabitatExplorer: React.FC = () => {
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatData>(habitatDatabase[0]);

  return (
    <section className="py-12 bg-amber-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
            <Mountain className="w-3.5 h-3.5 text-amber-400" />
            <span>Thar Desert Ecosystem & Micro-Habitats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Ecosystem & Habitat Explorer
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-2xl">
            Explore the diverse micro-habitats of the Thar Desert, from shifting sand dunes and gravelly Magras to saline Playas and sacred Bishnoi Orans.
          </p>
        </div>

        {/* Habitat Cards Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {habitatDatabase.map((hab) => {
            const isSelected = selectedHabitat.id === hab.id;
            return (
              <button
                key={hab.id}
                onClick={() => setSelectedHabitat(hab)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-amber-950 border-amber-300 shadow-xl scale-105'
                    : 'bg-stone-900/80 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
                  {hab.areaCoveragePercent}% Area Coverage
                </span>
                <h3 className="font-bold text-xs sm:text-sm mt-1 leading-tight">{hab.name}</h3>
                <p className={`text-[10px] mt-1 font-semibold ${isSelected ? 'text-amber-950' : 'text-amber-400'}`}>
                  {hab.localTerm}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Habitat Detailed Monograph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual & Overview (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-amber-800/50 shadow-2xl space-y-6">
            
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-amber-700/40">
              <img
                src={selectedHabitat.imageUrl}
                alt={selectedHabitat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-bold">
                  {selectedHabitat.localTerm}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-50 mt-1">{selectedHabitat.name}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-amber-300">Ecosystem Overview</h4>
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed bg-amber-950/40 p-4 rounded-xl border border-amber-800/40">
                {selectedHabitat.overview}
              </p>
            </div>

            {/* Climate & Edaphic Conditions */}
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/40 text-xs space-y-1.5">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Climate & Microclimate:</span>
              <p className="text-amber-200">{selectedHabitat.climate}</p>
            </div>

            {/* Ecological Importance */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 text-xs space-y-1.5">
              <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">Ecological Importance & Services:</span>
              <p className="text-emerald-100">{selectedHabitat.ecologicalImportance}</p>
            </div>

          </div>

          {/* Flora & Fauna Monograph Drawer (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Native Flora List */}
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <Trees className="w-5 h-5 text-emerald-400" /> Characteristic Native Flora
              </h4>
              <ul className="space-y-2 text-xs text-amber-200">
                {selectedHabitat.nativeFlora.map((flora, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/30 flex items-center gap-2 font-medium">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{flora}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Typical Wildlife */}
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
                🐾 Associated Fauna & Wildlife
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedHabitat.typicalFauna.map((animal, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-stone-800 text-amber-200 border border-stone-700 font-semibold">
                    {animal}
                  </span>
                ))}
              </div>
            </div>

            {/* Threats & Conservation */}
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-4 text-xs">
              <div className="space-y-2">
                <h5 className="font-bold text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Existential Threats:
                </h5>
                <ul className="space-y-1 text-red-200 list-disc list-inside">
                  {selectedHabitat.threats.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-amber-800/30 space-y-2">
                <h5 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Recommended Conservation Practices:
                </h5>
                <ul className="space-y-1 text-emerald-200 list-disc list-inside">
                  {selectedHabitat.conservationPractices.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
