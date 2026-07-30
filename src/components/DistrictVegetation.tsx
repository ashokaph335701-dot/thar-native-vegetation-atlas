import React, { useState } from 'react';
import { districtDatabase } from '../data/districtDatabase';
import { plantDatabase } from '../data/plantDatabase';
import { DistrictData, PlantSpecies } from '../types';
import { MapPin, Droplets, Thermometer, ShieldCheck, TreePine, ArrowRight, Layers } from 'lucide-react';

interface DistrictVegetationProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const DistrictVegetation: React.FC<DistrictVegetationProps> = ({ onSelectPlant }) => {
  const [selectedDist, setSelectedDist] = useState<DistrictData>(districtDatabase[0]);

  const districtFlora = plantDatabase.filter((p) => p.districts.includes(selectedDist.id));

  return (
    <section className="py-12 bg-amber-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>District-Wise Ecological Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            District-Wise Native Vegetation
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-3xl">
            Explore native plant species occurring naturally across each district of the Thar Desert in Rajasthan.
          </p>
        </div>

        {/* District Selector Buttons Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {districtDatabase.map((dist) => {
            const isSelected = selectedDist.id === dist.id;
            return (
              <button
                key={dist.id}
                onClick={() => setSelectedDist(dist)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 border-amber-300 shadow-xl scale-105'
                    : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border-amber-800/40'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-950' : 'text-amber-400'}`} />
                <span>{dist.name} ({dist.hindiName})</span>
              </button>
            );
          })}
        </div>

        {/* Selected District Telemetry Card */}
        <div className="p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-amber-800/40 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-extrabold text-amber-100">{selectedDist.name} District</h3>
                <span className="text-xl font-bold text-amber-400">({selectedDist.hindiName})</span>
              </div>
              <p className="text-xs text-amber-300/80 mt-1 max-w-2xl">{selectedDist.geomorphology}</p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-950 text-amber-300 border border-amber-700/40 font-bold flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-400" /> {selectedDist.rainfallRange} Rain
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-950 text-amber-300 border border-amber-700/40 font-bold flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-red-400" /> {selectedDist.temperatureRange}
              </span>
            </div>
          </div>

          {/* Flora Grid for Selected District */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold text-amber-300 flex items-center gap-2 text-sm">
                <TreePine className="w-4 h-4 text-emerald-400" /> Monographed Flora Occurring in {selectedDist.name} ({districtFlora.length} Species):
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {districtFlora.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => onSelectPlant(plant)}
                  className="p-4 rounded-2xl bg-amber-950/40 hover:bg-amber-800/60 border border-amber-800/40 cursor-pointer transition-all flex items-center justify-between group text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={plant.imageUrl}
                      alt={plant.scientificName}
                      className="w-12 h-12 rounded-xl object-cover border border-amber-700/40"
                    />
                    <div>
                      <h5 className="font-bold text-amber-100 italic">{plant.scientificName}</h5>
                      <p className="text-[11px] font-semibold text-amber-300">{plant.localName} ({plant.hindiName})</p>
                      <span className="text-[10px] text-amber-400/80">{plant.category} • {plant.family}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
