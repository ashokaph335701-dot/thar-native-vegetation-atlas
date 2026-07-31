import React, { useState } from 'react';
import { districtDatabase } from '../data/districtDatabase';
import { DistrictData, PlantSpecies } from '../types';
import { plantDatabase } from '../data/plantDatabase';
import { MapPin, ArrowRight, Info, Leaf, TreePine, Utensils } from 'lucide-react';

interface InteractiveMapProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectPlant }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districtDatabase[0]);

  // Filter plant database for species present in selected district
  const districtFlora = plantDatabase.filter(plant =>
    plant.districts.includes(selectedDistrict.id)
  );

  const majorTrees = districtFlora.filter(p => p.category === 'Tree');
  const majorShrubs = districtFlora.filter(p => p.category === 'Shrub');
  const nativePlants = districtFlora.filter(p => p.category === 'Grass' || p.category === 'Herb' || p.category === 'Vegetable');

  // SVG Path geometries for Rajasthan districts matching authentic political state outline
  const districtPaths: { [key: string]: { path: string; labelX: number; labelY: number; labelHindi: string; labelEng: string } } = {
    jaisalmer: {
      path: "M 15,160 L 70,120 L 135,145 L 140,195 L 125,230 L 135,275 L 105,300 L 45,280 L 15,220 Z",
      labelX: 75,
      labelY: 195,
      labelHindi: "जैसलमेर",
      labelEng: "Jaisalmer"
    },
    bikaner: {
      path: "M 135,145 L 205,45 L 255,80 L 235,140 L 220,165 L 175,170 L 140,195 Z",
      labelX: 185,
      labelY: 120,
      labelHindi: "बीकानेर",
      labelEng: "Bikaner"
    },
    churu: {
      path: "M 255,80 L 295,95 L 305,160 L 265,185 L 235,140 Z",
      labelX: 275,
      labelY: 130,
      labelHindi: "चूरू",
      labelEng: "Churu"
    },
    phalodi: {
      path: "M 140,195 L 175,170 L 205,190 L 195,245 L 150,240 Z",
      labelX: 170,
      labelY: 210,
      labelHindi: "फलोदी",
      labelEng: "Phalodi"
    },
    nagaur: {
      path: "M 220,165 L 265,185 L 290,210 L 270,270 L 215,255 L 205,190 Z",
      labelX: 245,
      labelY: 215,
      labelHindi: "नागौर",
      labelEng: "Nagaur"
    },
    jodhpur: {
      path: "M 150,240 L 195,245 L 215,255 L 225,305 L 165,310 L 135,275 L 125,230 Z",
      labelX: 175,
      labelY: 275,
      labelHindi: "जोधपुर",
      labelEng: "Jodhpur"
    },
    barmer: {
      path: "M 45,280 L 105,300 L 125,355 L 115,405 L 65,385 L 20,345 Z",
      labelX: 75,
      labelY: 345,
      labelHindi: "बाड़मेर",
      labelEng: "Barmer"
    },
    balotra: {
      path: "M 105,300 L 135,275 L 165,310 L 160,360 L 125,355 Z",
      labelX: 138,
      labelY: 325,
      labelHindi: "बालोतरा",
      labelEng: "Balotra"
    },
    jalor: {
      path: "M 115,405 L 160,360 L 180,395 L 155,435 L 105,420 Z",
      labelX: 140,
      labelY: 400,
      labelHindi: "जालौर",
      labelEng: "Jalor"
    },
    pali: {
      path: "M 165,310 L 225,305 L 235,360 L 205,405 L 180,395 L 160,360 Z",
      labelX: 195,
      labelY: 350,
      labelHindi: "पाली",
      labelEng: "Pali"
    }
  };

  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-bold shadow-lg">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>District-Wise Vegetation Mapping</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-100">
            Interactive Rajasthan Vegetation Map
          </h2>
          <p className="text-sm text-amber-300/80 leading-relaxed">
            Click on any district to view its major native trees, shrubs, plants, and brief ecological description.
          </p>
        </div>

        {/* Map & District Information Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Base SVG Map of Rajasthan (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl p-6 border border-amber-800/50 shadow-2xl space-y-4">
            
            {/* Quick District Selector Ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-800/30 text-xs flex-wrap gap-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" /> Click a District Shape Below:
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

            {/* Rajasthan Base Vector Map */}
            <div className="relative w-full h-[460px] sm:h-[520px] bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/80 rounded-2xl border border-amber-800/40 p-2 flex items-center justify-center overflow-hidden">
              
              <svg viewBox="0 0 350 460" className="w-full h-full filter drop-shadow-2xl">
                
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* State Outline */}
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
                      <path
                        d={geom.path}
                        fill={isSelected ? '#f59e0b' : dist.color || '#38bdf8'}
                        fillOpacity={isSelected ? 0.9 : 0.55}
                        stroke={isSelected ? '#ffffff' : '#f59e0b'}
                        strokeWidth={isSelected ? 3.5 : 1.5}
                        filter={isSelected ? 'url(#glow)' : undefined}
                        className="transition-all duration-300 group-hover:fill-opacity-85 group-hover:stroke-amber-300"
                      />

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

          {/* Simple Information Panel (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-amber-700/50 shadow-2xl space-y-6">
            
            {/* 1. District Name */}
            <div className="pb-4 border-b border-amber-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-100">{selectedDistrict.name}</h3>
                  <span className="text-xl font-bold text-amber-400">({selectedDistrict.hindiName})</span>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-extrabold shadow-md">
                  {selectedDistrict.rainfallRange}
                </span>
              </div>
            </div>

            {/* 2. Brief Ecological Description */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-amber-950/50 border border-amber-800/40 text-xs sm:text-sm">
              <h4 className="font-extrabold text-amber-400 text-xs uppercase tracking-wider">Brief Ecological Description:</h4>
              <p className="text-amber-100/90 leading-relaxed">{selectedDistrict.geomorphology}</p>
            </div>

            {/* 3. Major Native Trees */}
            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <TreePine className="w-4 h-4 text-emerald-400" /> Major Native Trees ({majorTrees.length}):
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {majorTrees.map((tree) => (
                  <button
                    key={tree.id}
                    onClick={() => onSelectPlant(tree)}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-800/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>{tree.localName}</span>
                    <span className="text-[10px] text-amber-400 italic">({tree.scientificName})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Major Shrubs */}
            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" /> Major Shrubs ({majorShrubs.length}):
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {majorShrubs.map((shrub) => (
                  <button
                    key={shrub.id}
                    onClick={() => onSelectPlant(shrub)}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-800/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>{shrub.localName}</span>
                    <span className="text-[10px] text-amber-400 italic">({shrub.scientificName})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Native Plants & Vegetables */}
            <div className="space-y-2 text-xs pt-1">
              <h4 className="font-extrabold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-amber-400" /> Native Plants & Vegetables ({nativePlants.length}):
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {nativePlants.map((plant) => (
                  <button
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-800/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>{plant.localName}</span>
                    <span className="text-[10px] text-amber-400 italic">({plant.scientificName})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
