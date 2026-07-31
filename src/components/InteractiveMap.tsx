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

  // Seamless contiguous SVG polygon map of Western Rajasthan districts
  const districtPaths: { [key: string]: { path: string; labelX: number; labelY: number; labelHindi: string; labelEng: string } } = {
    jaisalmer: {
      path: "M 20,170 L 90,120 L 170,140 L 175,200 L 165,250 L 175,290 L 140,320 L 70,300 L 20,230 Z",
      labelX: 95,
      labelY: 215,
      labelHindi: "जैसलमेर",
      labelEng: "Jaisalmer"
    },
    bikaner: {
      path: "M 170,140 L 250,30 L 310,70 L 290,145 L 265,175 L 210,180 L 175,200 Z",
      labelX: 235,
      labelY: 125,
      labelHindi: "बीकानेर",
      labelEng: "Bikaner"
    },
    churu: {
      path: "M 310,70 L 365,90 L 380,165 L 330,195 L 290,145 Z",
      labelX: 335,
      labelY: 135,
      labelHindi: "चूरू",
      labelEng: "Churu"
    },
    phalodi: {
      path: "M 175,200 L 210,180 L 250,205 L 235,265 L 185,260 Z",
      labelX: 210,
      labelY: 225,
      labelHindi: "फलोदी",
      labelEng: "Phalodi"
    },
    nagaur: {
      path: "M 265,175 L 330,195 L 365,225 L 340,295 L 265,275 L 250,205 Z",
      labelX: 305,
      labelY: 235,
      labelHindi: "नागौर",
      labelEng: "Nagaur"
    },
    jodhpur: {
      path: "M 185,260 L 235,265 L 265,275 L 275,330 L 205,335 L 175,290 L 165,250 Z",
      labelX: 218,
      labelY: 295,
      labelHindi: "जोधपुर",
      labelEng: "Jodhpur"
    },
    barmer: {
      path: "M 70,300 L 140,320 L 165,380 L 150,440 L 90,420 L 40,375 Z",
      labelX: 105,
      labelY: 370,
      labelHindi: "बाड़मेर",
      labelEng: "Barmer"
    },
    balotra: {
      path: "M 140,320 L 175,290 L 205,335 L 200,390 L 165,380 Z",
      labelX: 172,
      labelY: 345,
      labelHindi: "बालोतरा",
      labelEng: "Balotra"
    },
    pali: {
      path: "M 205,335 L 275,330 L 285,395 L 245,445 L 220,435 L 200,390 Z",
      labelX: 245,
      labelY: 380,
      labelHindi: "पाली",
      labelEng: "Pali"
    },
    jalor: {
      path: "M 150,440 L 165,380 L 200,390 L 220,435 L 190,475 L 135,460 Z",
      labelX: 172,
      labelY: 435,
      labelHindi: "जालौर",
      labelEng: "Jalor"
    }
  };

  return (
    <section className="py-16 bg-[#F5F1E8] text-[#333333] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E8D8B5] text-[#556B2F] text-xs font-nav font-semibold shadow-sm">
            <MapPin className="w-4 h-4 text-[#6B8E23]" />
            <span>Contiguous Rajasthan Cartography</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#4A3B2A]">
            Interactive Rajasthan Vegetation Map
          </h2>
          <p className="text-base font-sans text-[#333333]/80 leading-relaxed">
            Click on any district on the authentic Rajasthan state map to explore its native trees, shrubs, and vegetation.
          </p>
        </div>

        {/* Map & Information Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Base SVG Map of Rajasthan (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F3] rounded-3xl p-6 sm:p-8 border border-[#E8D8B5] premium-shadow space-y-4">
            
            {/* Quick District Selector Ribbon */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D8B5] text-xs flex-wrap gap-2">
              <span className="font-serif-heading font-bold text-base text-[#4A3B2A] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#556B2F]" /> Select District:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {districtDatabase.map((dist) => (
                  <button
                    key={dist.id}
                    onClick={() => setSelectedDistrict(dist)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-nav transition-all whitespace-nowrap ${
                      selectedDistrict.id === dist.id
                        ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                        : 'bg-[#F5F1E8] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
                    }`}
                  >
                    {dist.hindiName} ({dist.name})
                  </button>
                ))}
              </div>
            </div>

            {/* Seamless Contiguous Base Vector Map Canvas */}
            <div className="relative w-full h-[480px] sm:h-[540px] bg-[#F5F1E8] rounded-2xl border border-[#E8D8B5] p-4 flex items-center justify-center overflow-hidden">
              
              <svg viewBox="0 0 400 500" className="w-full h-full filter drop-shadow-md">
                
                {/* Overall Rajasthan State Boundary Outline */}
                <path
                  d="M 20,170 L 90,120 L 170,140 L 250,30 L 310,70 L 365,90 L 380,165 L 330,195 L 365,225 L 340,295 L 275,330 L 285,395 L 245,445 L 220,435 L 190,475 L 135,460 L 150,440 L 90,420 L 40,375 L 70,300 L 20,230 Z"
                  fill="none"
                  stroke="#B65A3C"
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                  className="opacity-60"
                />

                {/* Contiguous District Polygons */}
                {districtDatabase.map((dist) => {
                  const geom = districtPaths[dist.id];
                  if (!geom) return null;
                  const isSelected = selectedDistrict.id === dist.id;

                  return (
                    <g key={dist.id} className="cursor-pointer group" onClick={() => setSelectedDistrict(dist)}>
                      <path
                        d={geom.path}
                        fill={isSelected ? '#B65A3C' : dist.color || '#556B2F'}
                        fillOpacity={isSelected ? 0.95 : 0.75}
                        stroke={isSelected ? '#ffffff' : '#FAF8F3'}
                        strokeWidth={isSelected ? 3.5 : 1.8}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="transition-all duration-300 group-hover:fill-opacity-90"
                      />

                      <text
                        x={geom.labelX}
                        y={geom.labelY - 3}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={isSelected ? '14' : '12'}
                        fontWeight="800"
                        className="pointer-events-none transition-all drop-shadow-md"
                      >
                        {geom.labelHindi}
                      </text>

                      <text
                        x={geom.labelX}
                        y={geom.labelY + 9}
                        textAnchor="middle"
                        fill="#FAF8F3"
                        fontSize={isSelected ? '11' : '9.5'}
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
          <div className="lg:col-span-5 bg-[#FAF8F3] rounded-3xl p-6 sm:p-8 border border-[#E8D8B5] premium-shadow space-y-6">
            
            {/* 1. District Name */}
            <div className="pb-4 border-b border-[#E8D8B5] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-serif-heading font-bold text-[#4A3B2A]">{selectedDistrict.name}</h3>
                  <span className="text-xl font-serif-heading text-[#B65A3C]">({selectedDistrict.hindiName})</span>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#556B2F] text-white text-xs font-nav font-semibold shadow-sm">
                  {selectedDistrict.rainfallRange}
                </span>
              </div>
            </div>

            {/* 2. Brief Ecological Description */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#F5F1E8] border border-[#E8D8B5] text-xs sm:text-sm font-sans">
              <h4 className="font-serif-heading font-bold text-[#4A3B2A] text-sm uppercase tracking-wider">Brief Ecological Description:</h4>
              <p className="text-[#333333]/90 leading-relaxed">{selectedDistrict.geomorphology}</p>
            </div>

            {/* 3. Major Native Trees */}
            <div className="space-y-2 text-xs">
              <h4 className="font-serif-heading font-bold text-[#4A3B2A] text-sm uppercase tracking-wider flex items-center gap-1.5">
                <TreePine className="w-4 h-4 text-[#556B2F]" /> Major Native Trees ({majorTrees.length}):
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {majorTrees.map((tree) => (
                  <button
                    key={tree.id}
                    onClick={() => onSelectPlant(tree)}
                    className="px-3 py-1.5 rounded-xl bg-[#F5F1E8] hover:bg-[#E8D8B5]/50 border border-[#E8D8B5] text-[#4A3B2A] font-nav font-medium transition-colors flex items-center gap-1"
                  >
                    <span>{tree.localName}</span>
                    <span className="text-[10px] text-[#B65A3C] italic">({tree.scientificName})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Major Shrubs */}
            <div className="space-y-2 text-xs">
              <h4 className="font-serif-heading font-bold text-[#4A3B2A] text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#556B2F]" /> Major Shrubs ({majorShrubs.length}):
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {majorShrubs.map((shrub) => (
                  <button
                    key={shrub.id}
                    onClick={() => onSelectPlant(shrub)}
                    className="px-3 py-1.5 rounded-xl bg-[#F5F1E8] hover:bg-[#E8D8B5]/50 border border-[#E8D8B5] text-[#4A3B2A] font-nav font-medium transition-colors flex items-center gap-1"
                  >
                    <span>{shrub.localName}</span>
                    <span className="text-[10px] text-[#B65A3C] italic">({shrub.scientificName})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Native Plants & Vegetables */}
            <div className="space-y-2 text-xs pt-1">
              <h4 className="font-serif-heading font-bold text-[#4A3B2A] text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-[#B65A3C]" /> Native Plants & Vegetables ({nativePlants.length}):
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {nativePlants.map((plant) => (
                  <button
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="px-3 py-1.5 rounded-xl bg-[#F5F1E8] hover:bg-[#E8D8B5]/50 border border-[#E8D8B5] text-[#4A3B2A] font-nav font-medium transition-colors flex items-center gap-1"
                  >
                    <span>{plant.localName}</span>
                    <span className="text-[10px] text-[#B65A3C] italic">({plant.scientificName})</span>
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
