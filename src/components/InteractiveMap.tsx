import React, { useState } from 'react';
import { districtDatabase } from '../data/districtDatabase';
import { DistrictData, PlantSpecies } from '../types';
import { plantDatabase } from '../data/plantDatabase';
import { MapPin, Droplets, Thermometer, ArrowRight, Info, Leaf, Sparkles } from 'lucide-react';

interface InteractiveMapProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectPlant }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districtDatabase[0]);

  // Filter plant database for species present in selected district
  const districtPlants = plantDatabase.filter(plant =>
    plant.districts.includes(selectedDistrict.id)
  );

  // SVG Path geometries for Rajasthan districts matching authentic political state outline
  const districtPaths: { [key: string]: { path: string; labelX: number; labelY: number; labelHindi: string; labelEng: string } } = {
    jaisalmer: {
      // Jaisalmer (Far West - Large light blue polygon)
      path: "M 15,160 L 70,120 L 135,145 L 140,195 L 125,230 L 135,275 L 105,300 L 45,280 L 15,220 Z",
      labelX: 75,
      labelY: 195,
      labelHindi: "जैसलमेर",
      labelEng: "Jaisalmer"
    },
    bikaner: {
      // Bikaner (Northwest - Pinkish shape)
      path: "M 135,145 L 205,45 L 255,80 L 235,140 L 220,165 L 175,170 L 140,195 Z",
      labelX: 185,
      labelY: 120,
      labelHindi: "बीकानेर",
      labelEng: "Bikaner"
    },
    churu: {
      // Churu (North - Purple shape)
      path: "M 255,80 L 295,95 L 305,160 L 265,185 L 235,140 Z",
      labelX: 275,
      labelY: 130,
      labelHindi: "चूरू",
      labelEng: "Churu"
    },
    phalodi: {
      // Phalodi (Between Bikaner, Jaisalmer & Jodhpur)
      path: "M 140,195 L 175,170 L 205,190 L 195,245 L 150,240 Z",
      labelX: 170,
      labelY: 210,
      labelHindi: "फलोदी",
      labelEng: "Phalodi"
    },
    nagaur: {
      // Nagaur (Center - Pink shape)
      path: "M 220,165 L 265,185 L 290,210 L 270,270 L 215,255 L 205,190 Z",
      labelX: 245,
      labelY: 215,
      labelHindi: "नागौर",
      labelEng: "Nagaur"
    },
    jodhpur: {
      // Jodhpur (Center-West - Dark blue shape)
      path: "M 150,240 L 195,245 L 215,255 L 225,305 L 165,310 L 135,275 L 125,230 Z",
      labelX: 175,
      labelY: 275,
      labelHindi: "जोधपुर",
      labelEng: "Jodhpur"
    },
    barmer: {
      // Barmer (Southwest - Purple shape)
      path: "M 45,280 L 105,300 L 125,355 L 115,405 L 65,385 L 20,345 Z",
      labelX: 75,
      labelY: 345,
      labelHindi: "बाड़मेर",
      labelEng: "Barmer"
    },
    balotra: {
      // Balotra (Between Barmer, Jodhpur & Jalor)
      path: "M 105,300 L 135,275 L 165,310 L 160,360 L 125,355 Z",
      labelX: 138,
      labelY: 325,
      labelHindi: "बालोतरा",
      labelEng: "Balotra"
    },
    jalor: {
      // Jalor (Southwest - Pinkish-orange shape)
      path: "M 115,405 L 160,360 L 180,395 L 155,435 L 105,420 Z",
      labelX: 140,
      labelY: 400,
      labelHindi: "जालौर",
      labelEng: "Jalor"
    },
    pali: {
      // Pali (South-Center - Light blue shape)
      path: "M 165,310 L 225,305 L 235,360 L 205,405 L 180,395 L 160,360 Z",
      labelX: 195,
      labelY: 350,
      labelHindi: "पाली",
      labelEng: "Pali"
    }
  };

  return (
    <section className="py-8 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-bold shadow-lg">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Authentic Rajasthan Political Map Reference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-100">
            Interactive Rajasthan District Vegetation Map
          </h2>
          <p className="text-sm text-amber-300/80 leading-relaxed">
            Click any district directly on the Rajasthan map to view native trees, shrubs, and grasses with authentic photos!
          </p>
        </div>

        {/* Map & District Telemetry Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SVG Rajasthan Vector Map (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl p-6 border border-amber-800/50 shadow-2xl space-y-4">
            
            {/* Quick District Selector Ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-800/30 text-xs flex-wrap gap-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" /> Select District:
              </span>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
                {districtDatabase.map((dist) => (
                  <button
                    key={dist.id}
                    onClick={() => setSelectedDistrict(dist)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                      selectedDistrict.id === dist.id
                        ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                        : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
                    }`}
                  >
                    {dist.hindiName} ({dist.name})
                  </button>
                ))}
              </div>
            </div>

            {/* Rajasthan SVG District Map Container */}
            <div className="relative w-full h-[460px] sm:h-[520px] bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/80 rounded-2xl border border-amber-800/40 p-2 flex items-center justify-center overflow-hidden">
              
              <svg viewBox="0 0 350 460" className="w-full h-full filter drop-shadow-2xl">
                
                <defs>
                  {/* Glowing Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Authentic Rajasthan External Boundary Outline matching user's map */}
                <path
                  d="M 205,25 L 255,45 L 295,80 L 325,120 L 315,170 L 335,230 L 315,290 L 275,320 L 225,370 L 185,360 L 155,435 L 105,420 L 65,385 L 20,345 L 15,220 L 15,160 L 70,120 L 135,145 Z"
                  fill="#1c1917"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className="opacity-60"
                />

                {/* District Polygons */}
                {districtDatabase.map((dist) => {
                  const geom = districtPaths[dist.id];
                  if (!geom) return null;
                  const isSelected = selectedDistrict.id === dist.id;

                  return (
                    <g key={dist.id} className="cursor-pointer group" onClick={() => setSelectedDistrict(dist)}>
                      {/* Polygon */}
                      <path
                        d={geom.path}
                        fill={isSelected ? '#f59e0b' : dist.color || '#38bdf8'}
                        fillOpacity={isSelected ? 0.9 : 0.55}
                        stroke={isSelected ? '#ffffff' : '#f59e0b'}
                        strokeWidth={isSelected ? 3.5 : 1.5}
                        filter={isSelected ? 'url(#glow)' : undefined}
                        className="transition-all duration-300 group-hover:fill-opacity-85 group-hover:stroke-amber-300"
                      />

                      {/* Hindi Label */}
                      <text
                        x={geom.labelX}
                        y={geom.labelY - 4}
                        textAnchor="middle"
                        fill={isSelected ? '#0c0a09' : '#ffffff'}
                        fontSize={isSelected ? '13' : '11'}
                        fontWeight="800"
                        className="pointer-events-none transition-all drop-shadow-md"
                      >
                        {geom.labelHindi}
                      </text>

                      {/* English Sub-Label */}
                      <text
                        x={geom.labelX}
                        y={geom.labelY + 9}
                        textAnchor="middle"
                        fill={isSelected ? '#0c0a09' : '#fef3c7'}
                        fontSize={isSelected ? '10' : '9'}
                        fontWeight="700"
                        className="pointer-events-none opacity-90"
                      >
                        {geom.labelEng}
                      </text>
                    </g>
                  );
                })}

              </svg>

            </div>

          </div>

          {/* District Vegetation Side Panel (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-amber-700/50 shadow-2xl space-y-6">
            
            {/* Selected District Header */}
            <div className="pb-4 border-b border-amber-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-extrabold text-amber-100">{selectedDistrict.name}</h3>
                  <span className="text-xl font-bold text-amber-400">({selectedDistrict.hindiName})</span>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-bold shadow-md">
                  {selectedDistrict.rainfallRange}
                </span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">{selectedDistrict.geomorphology}</p>
            </div>

            {/* Environment Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-800/40 space-y-0.5">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" /> Rainfall
                </span>
                <p className="font-bold text-amber-100 text-sm">{selectedDistrict.rainfallRange}</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-800/40 space-y-0.5">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-red-400" /> Temperature
                </span>
                <p className="font-bold text-amber-100 text-sm">{selectedDistrict.temperatureRange}</p>
              </div>
            </div>

            {/* Native Vegetation Species Grid */}
            <div className="space-y-3">
              <span className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" /> Native Species in {selectedDistrict.name} ({districtPlants.length}):
              </span>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                {districtPlants.map((plant: PlantSpecies) => (
                  <div
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="p-3.5 rounded-2xl bg-amber-950/50 hover:bg-amber-800/70 border border-amber-800/40 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={plant.imageUrl}
                        alt={plant.scientificName}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80';
                        }}
                        className="w-12 h-12 rounded-xl object-cover border border-amber-700/40 group-hover:scale-105 transition-transform shrink-0"
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
