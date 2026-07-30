import React, { useState } from 'react';
import { plantDatabase } from '../data/plantDatabase';
import { PlantSpecies } from '../types';
import { SlidersHorizontal, ArrowRightLeft, Calendar, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export const PlantComparisonTool: React.FC = () => {
  const [plantA, setPlantA] = useState<PlantSpecies>(plantDatabase[0]); // Khejri
  const [plantB, setPlantB] = useState<PlantSpecies>(plantDatabase[1]); // Rohida

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section 1: Plant Side-by-Side Comparison Matrix */}
        <div>
          <div className="mb-8 pb-6 border-b border-amber-800/40">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Comparative Botanical Analysis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
              Plant Species Comparison Tool
            </h2>
            <p className="mt-2 text-sm text-amber-300/80 max-w-2xl">
              Compare traits, water requirements, Panchkuta inclusion, and ecological roles side-by-side between any two Thar desert species.
            </p>
          </div>

          {/* Plant Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-2xl bg-stone-900 border border-amber-800/50">
              <label className="text-xs font-bold text-amber-400 block mb-2">Select Species A:</label>
              <select
                value={plantA.id}
                onChange={(e) => setPlantA(plantDatabase.find(p => p.id === e.target.value) || plantDatabase[0])}
                className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              >
                {plantDatabase.map(p => (
                  <option key={p.id} value={p.id} className="bg-stone-900 text-amber-100">
                    {p.scientificName} ({p.localName})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900 border border-amber-800/50">
              <label className="text-xs font-bold text-amber-400 block mb-2">Select Species B:</label>
              <select
                value={plantB.id}
                onChange={(e) => setPlantB(plantDatabase.find(p => p.id === e.target.value) || plantDatabase[1])}
                className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              >
                {plantDatabase.map(p => (
                  <option key={p.id} value={p.id} className="bg-stone-900 text-amber-100">
                    {p.scientificName} ({p.localName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-3xl border border-amber-800/50 shadow-2xl bg-stone-900/90 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-950 border-b border-amber-800/50 text-amber-300 font-bold">
                  <th className="p-4 w-1/4">Feature / Trait</th>
                  <th className="p-4 w-3/8 text-amber-100 italic text-sm">{plantA.scientificName} ({plantA.localName})</th>
                  <th className="p-4 w-3/8 text-amber-100 italic text-sm">{plantB.scientificName} ({plantB.localName})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-800/30 text-amber-200">
                <tr>
                  <td className="p-4 font-bold text-amber-400">Growth Category</td>
                  <td className="p-4">{plantA.category}</td>
                  <td className="p-4">{plantB.category}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Botanical Family</td>
                  <td className="p-4 font-mono">{plantA.family}</td>
                  <td className="p-4 font-mono">{plantB.family}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Rainfall Requirement</td>
                  <td className="p-4 font-bold">{plantA.rainfallMinMm} - {plantA.rainfallMaxMm} mm</td>
                  <td className="p-4 font-bold">{plantB.rainfallMinMm} - {plantB.rainfallMaxMm} mm</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Panchkuta Component</td>
                  <td className="p-4">{plantA.panchkutaComponent ? `✅ ${plantA.panchkutaComponent}` : '❌ N/A'}</td>
                  <td className="p-4">{plantB.panchkutaComponent ? `✅ ${plantB.panchkutaComponent}` : '❌ N/A'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Conservation Status</td>
                  <td className="p-4">{plantA.conservationStatus}</td>
                  <td className="p-4">{plantB.conservationStatus}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Regional Endemic</td>
                  <td className="p-4">{plantA.endemic ? '✅ Yes' : 'No'}</td>
                  <td className="p-4">{plantB.endemic ? '✅ Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Invasive Alien Threat</td>
                  <td className="p-4">{plantA.isInvasive ? '⚠️ Yes (Prosopis juliflora)' : '✅ Native'}</td>
                  <td className="p-4">{plantB.isInvasive ? '⚠️ Yes (Prosopis juliflora)' : '✅ Native'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Ecological Role</td>
                  <td className="p-4 leading-relaxed">{plantA.ecologicalRole}</td>
                  <td className="p-4 leading-relaxed">{plantB.ecologicalRole}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-amber-400">Traditional Knowledge (TEK)</td>
                  <td className="p-4 leading-relaxed">{plantA.culturalSignificance}</td>
                  <td className="p-4 leading-relaxed">{plantB.culturalSignificance}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Seasonal Flowering Calendar Matrix */}
        <div className="pt-8 border-t border-amber-800/40 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phenological Calendar</span>
            </div>
            <h3 className="text-2xl font-extrabold text-amber-100">
              12-Month Seasonal Flowering & Fruiting Matrix
            </h3>
            <p className="text-xs text-amber-300/80 mt-1">
              Seasonal bloom phenology for key native species across the year.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-amber-800/50 bg-stone-900/90 text-xs">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-amber-950 border-b border-amber-800/50 text-amber-300 font-bold">
                  <th className="p-3 text-left w-1/4">Species</th>
                  {months.map((m) => (
                    <th key={m} className="p-3">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-800/30 text-amber-200">
                {plantDatabase.slice(0, 8).map((plant) => (
                  <tr key={plant.id}>
                    <td className="p-3 text-left font-semibold italic text-amber-100">
                      {plant.scientificName} ({plant.localName})
                    </td>
                    {months.map((m, idx) => {
                      // Check if month is in flowering period
                      const isBloom = plant.floweringPeriod.toLowerCase().includes(m.toLowerCase()) ||
                        (plant.floweringPeriod.includes('March') && idx >= 2 && idx <= 4) ||
                        (plant.floweringPeriod.includes('January') && (idx === 0 || idx === 1 || idx === 2 || idx === 3)) ||
                        (plant.floweringPeriod.includes('August') && (idx >= 7 && idx <= 10));

                      return (
                        <td key={m} className="p-3">
                          {isBloom ? (
                            <span className="w-6 h-6 rounded-full bg-amber-500 text-amber-950 inline-flex items-center justify-center font-bold text-[10px] shadow">
                              🌸
                            </span>
                          ) : (
                            <span className="text-stone-700">•</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
