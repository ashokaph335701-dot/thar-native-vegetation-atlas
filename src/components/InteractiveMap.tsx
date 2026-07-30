import React, { useState } from 'react';
import { districtDatabase } from '../data/districtDatabase';
import { DistrictData, PlantSpecies } from '../types';
import { plantDatabase } from '../data/plantDatabase';
import { MapPin, Droplets, Thermometer, ArrowRight, ShieldCheck, Info, Leaf } from 'lucide-react';

interface InteractiveMapProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectPlant }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districtDatabase[0]);

  // Filter plant database for species present in selected district
  const districtPlants = plantDatabase.filter(plant =>
    plant.districts.includes(selectedDistrict.id)
  );

  return (
    <section className="py-10 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-bold shadow-lg">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Interactive District Vegetation Mapping</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-100">
            Explore Rajasthan Native Vegetation District-Wise
          </h2>
          <p className="text-sm text-amber-300/80 leading-relaxed">
            Click any district below on the Rajasthan map to see which native trees, shrubs, and grasses naturally grow in that region!
          </p>
        </div>

        {/* Map & District Telemetry Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map Visual (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl p-6 border border-amber-800/50 shadow-2xl space-y-4">
            
            {/* Quick District Buttons Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-800/30 text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" /> Click a District Pin Below:
              </span>
              <span className="text-amber-300/80">Selected: <strong>{selectedDistrict.name}</strong></span>
            </div>

            {/* Rajasthan Map Visual Container */}
            <div className="relative w-full h-[400px] sm:h-[460px] bg-gradient-to-br from-amber-950/80 via-stone-900 to-amber-950/90 rounded-2xl border border-amber-900/50 p-4 flex items-center justify-center overflow-hidden">
              
              {/* Decorative SVG Map Contour */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 100 100">
                <path d="M 15 35 Q 35 15 65 25 T 85 55 T 55 85 T 15 35 Z" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3,3" />
                <path d="M 25 45 Q 45 30 75 40 T 75 75 T 35 75 T 25 45 Z" fill="none" stroke="#10b981" strokeWidth="0.8" />
              </svg>

              {/* District Click Pins */}
              <div className="w-full h-full relative">
                {districtDatabase.map((dist) => {
                  const isSelected = selectedDistrict.id === dist.id;
                  return (
                    <button
                      key={dist.id}
                      onClick={() => setSelectedDistrict(dist)}
                      style={{
                        position: 'absolute',
                        left: `${dist.mapCoordinates.x}%`,
                        top: `${dist.mapCoordinates.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`group p-3 rounded-2xl flex flex-col items-center transition-all duration-300 z-20 ${
                        isSelected
                          ? 'bg-amber-500 text-amber-950 scale-110 shadow-2xl shadow-amber-500/50 ring-4 ring-amber-300'
                          : 'bg-stone-900/90 text-amber-200 hover:bg-amber-800/90 hover:text-amber-100 hover:scale-105 border border-amber-700/60 shadow-lg'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-950 animate-bounce' : 'text-amber-400'}`} />
                        <span className="font-extrabold text-xs tracking-tight">{dist.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-amber-950' : 'text-amber-400'}`}>
                        {dist.hindiName}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* District Plants Telemetry Card (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-amber-700/50 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="pb-4 border-b border-amber-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-amber-100">{selectedDistrict.name} ({selectedDistrict.hindiName})</h3>
                <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-bold">
                  {selectedDistrict.rainfallRange} Rain
                </span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">{selectedDistrict.geomorphology}</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/40">
                <span className="text-amber-400 font-semibold block">Rainfall</span>
                <p className="font-bold text-amber-100 text-sm mt-0.5">{selectedDistrict.rainfallRange}</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/40">
                <span className="text-amber-400 font-semibold block">Temperature</span>
                <p className="font-bold text-amber-100 text-sm mt-0.5">{selectedDistrict.temperatureRange}</p>
              </div>
            </div>

            {/* Plants List with Photos */}
            <div className="space-y-3">
              <span className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" /> Native Plants in {selectedDistrict.name} ({districtPlants.length}):
              </span>

              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                {districtPlants.map((plant: PlantSpecies) => (
                  <div
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="p-3 rounded-2xl bg-amber-950/50 hover:bg-amber-800/70 border border-amber-800/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={plant.imageUrl}
                        alt={plant.scientificName}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80';
                        }}
                        className="w-12 h-12 rounded-xl object-cover border border-amber-700/40 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className="font-extrabold text-amber-100 text-xs italic">{plant.scientificName}</h4>
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

      </div>
    </section>
  );
};
