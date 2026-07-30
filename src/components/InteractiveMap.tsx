import React, { useState } from 'react';
import { districtDatabase } from '../data/districtDatabase';
import { DistrictData, PlantSpecies } from '../types';
import { plantDatabase } from '../data/plantDatabase';
import { MapPin, Droplets, Thermometer, Mountain, ShieldCheck, TreePine, ArrowRight, Layers, Info } from 'lucide-react';

interface InteractiveMapProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectPlant }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districtDatabase[0]);
  const [activeOverlay, setActiveOverlay] = useState<'rainfall' | 'geomorphology' | 'ecosystems'>('rainfall');

  // Filter plant database for species present in selected district
  const districtPlants = plantDatabase.filter(plant =>
    plant.districts.includes(selectedDistrict.id)
  );

  return (
    <section className="py-12 bg-amber-950/95 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-amber-800/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive GIS Rajasthan Atlas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
              Thar Desert District Ecosystem Telemetry
            </h2>
            <p className="mt-2 text-sm text-amber-300/80 max-w-2xl">
              Click any district on the interactive map to explore native vegetation, dominant species, rainfall gradients, soil parameters, and protected Orans.
            </p>
          </div>

          {/* GIS Overlay Controls */}
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-amber-900/40 p-1.5 rounded-xl border border-amber-800/50">
            <span className="text-xs font-semibold text-amber-400 px-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Overlay:
            </span>
            {(['rainfall', 'geomorphology', 'ecosystems'] as const).map((overlay) => (
              <button
                key={overlay}
                onClick={() => setActiveOverlay(overlay)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  activeOverlay === overlay
                    ? 'bg-amber-600 text-amber-950 shadow-md'
                    : 'text-amber-300/80 hover:text-amber-100 hover:bg-amber-800/40'
                }`}
              >
                {overlay}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Interactive Map SVG + Telemetry Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive GIS Map Canvas Container (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/80 rounded-3xl p-6 border border-amber-800/50 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {/* Legend Banner */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-800/30 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" /> Selected District
                </span>
                <span className="flex items-center gap-1.5 text-amber-400/80">
                  <span className="w-3 h-3 rounded-full bg-emerald-700/60 border border-emerald-500/40" /> Hyper-Arid Core
                </span>
                <span className="flex items-center gap-1.5 text-amber-400/80">
                  <span className="w-3 h-3 rounded-full bg-amber-800/60 border border-amber-600/40" /> Semi-Arid Fringe
                </span>
              </div>
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Click District Boundary
              </span>
            </div>

            {/* Interactive Custom Rajasthan GIS Vector Map */}
            <div className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center bg-amber-950/40 rounded-2xl border border-amber-900/40 p-4">
              
              {/* Background Map Grid & Compass */}
              <div className="absolute top-4 left-4 text-[10px] text-amber-500/40 font-mono">
                <p>LAT: 26.9157° N</p>
                <p>LON: 70.9083° E</p>
                <p>BIOME: Great Indian Thar</p>
              </div>

              {/* District Buttons Grid Overlay */}
              <div className="w-full h-full relative flex items-center justify-center">
                
                {/* SVG Visual Contour Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                  <path d="M 10 30 Q 30 10 60 20 T 90 60 T 50 90 T 10 30 Z" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2,2" />
                  <path d="M 20 40 Q 40 25 70 35 T 80 70 T 40 80 T 20 40 Z" fill="none" stroke="#10b981" strokeWidth="0.5" />
                </svg>

                {/* District Pin Cards positioned geographically */}
                {districtDatabase.map((dist) => {
                  const isSelected = selectedDistrict.id === dist.id;
                  return (
                    <div
                      key={dist.id}
                      style={{
                        position: 'absolute',
                        left: `${dist.mapCoordinates.x}%`,
                        top: `${dist.mapCoordinates.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className="z-10"
                    >
                      <button
                        onClick={() => setSelectedDistrict(dist)}
                        className={`group relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-amber-950 scale-110 shadow-xl shadow-amber-500/30 ring-4 ring-amber-400/50 z-30'
                            : 'bg-stone-900/90 text-amber-200 hover:bg-amber-800/80 hover:text-amber-100 hover:scale-105 border border-amber-700/60 shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-950 animate-bounce' : 'text-amber-400'}`} />
                          <span className="font-bold text-xs sm:text-sm tracking-tight">{dist.name}</span>
                        </div>
                        <span className={`text-[10px] font-semibold mt-0.5 ${isSelected ? 'text-amber-950' : 'text-amber-400'}`}>
                          {dist.hindiName}
                        </span>

                        {/* Hover Telemetry Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 px-3 py-1.5 rounded-lg bg-black/90 text-amber-200 text-[10px] whitespace-nowrap border border-amber-600/40 pointer-events-none shadow-xl z-40">
                          <p className="font-bold">{dist.rainfallRange} | {dist.temperatureRange}</p>
                          <p className="text-amber-400">{dist.characteristicEcosystems[0]}</p>
                        </div>
                      </button>
                    </div>
                  );
                })}

              </div>

              {/* Dynamic Overlay Bar */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-amber-950/80 border border-amber-800/60 backdrop-blur-md flex items-center justify-between text-xs text-amber-200">
                <span className="font-semibold text-amber-400">Active GIS Data Layer:</span>
                <span>
                  {activeOverlay === 'rainfall' && '🌧️ Rainfall Gradient: 100mm (West) to 500mm (East)'}
                  {activeOverlay === 'geomorphology' && '🏜️ Dunes (44%) | Magras (12%) | Playas (8%)'}
                  {activeOverlay === 'ecosystems' && '🌿 Orans & Sewan Pastures Protection Index'}
                </span>
              </div>

            </div>

          </div>

          {/* District Telemetry Drawer (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl p-6 border border-amber-700/50 shadow-2xl space-y-6">
            
            {/* Header Title */}
            <div className="pb-4 border-b border-amber-800/40 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-amber-100">{selectedDistrict.name} District</h3>
                  <span className="text-base font-medium text-amber-400">({selectedDistrict.hindiName})</span>
                </div>
                <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified CAZRI & Monograph Telemetry
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-300 text-xs font-bold border border-amber-700/40">
                {selectedDistrict.rainfallRange}
              </span>
            </div>

            {/* Geomorphology Card */}
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/40 text-xs space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Mountain className="w-4 h-4 text-amber-500" /> Geomorphology & Micro-Habitats
              </span>
              <p className="text-amber-200/90 leading-relaxed">{selectedDistrict.geomorphology}</p>
            </div>

            {/* Environmental Parameters Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40">
                <span className="text-amber-400 font-semibold flex items-center gap-1 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" /> Rainfall Range
                </span>
                <p className="text-amber-100 font-bold text-sm">{selectedDistrict.rainfallRange}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40">
                <span className="text-amber-400 font-semibold flex items-center gap-1 mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-red-400" /> Temperature Oscillation
                </span>
                <p className="text-amber-100 font-bold text-sm">{selectedDistrict.temperatureRange}</p>
              </div>
            </div>

            {/* Soil & Ecosystem Badges */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-amber-400 block mb-1.5">Dominant Soil Types:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDistrict.soilTypes.map((soil, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-800 text-amber-200 border border-stone-700">
                      {soil}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-amber-400 block mb-1.5">Protected Orans & Sanctuaries:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDistrict.protectedAreas.map((area, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium">
                      🛡️ {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Species Occurring Naturally in District */}
            <div className="pt-4 border-t border-amber-800/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <TreePine className="w-4 h-4 text-emerald-400" /> Species Occurring Naturally in {selectedDistrict.name}:
                </span>
                <span className="text-amber-400/80 font-medium">{districtPlants.length} Flora Monographed</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {districtPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="p-3 rounded-xl bg-amber-950/50 hover:bg-amber-800/60 border border-amber-800/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-100 text-xs">{plant.scientificName}</span>
                        <span className="text-[11px] text-amber-300">({plant.localName})</span>
                      </div>
                      <p className="text-[10px] text-amber-400/80 mt-0.5">{plant.category} | {plant.family}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
