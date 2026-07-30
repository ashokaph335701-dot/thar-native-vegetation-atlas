import React, { useState, useMemo } from 'react';
import { plantDatabase } from '../data/plantDatabase';
import { PlantSpecies, PlantCategory, ConservationStatus } from '../types';
import { Search, Filter, Leaf, Droplets, ShieldAlert, ArrowUpRight, Sparkles, RefreshCw } from 'lucide-react';

interface VegetationExplorerProps {
  onSelectPlant: (plant: PlantSpecies) => void;
  initialCategory?: string;
}

export const VegetationExplorer: React.FC<VegetationExplorerProps> = ({ onSelectPlant, initialCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedConservation, setSelectedConservation] = useState<string>('All');
  const [maxRainfall, setMaxRainfall] = useState<number>(600);
  const [showInvasiveOnly, setShowInvasiveOnly] = useState(false);
  const [showEndemicOnly, setShowEndemicOnly] = useState(false);
  const [showPanchkutaOnly, setShowPanchkutaOnly] = useState(false);

  const categories: (PlantCategory | 'All')[] = ['All', 'Tree', 'Shrub', 'Grass', 'Climber', 'Herb', 'Succulent'];
  
  const families = useMemo(() => {
    const fSet = new Set(plantDatabase.map(p => p.family));
    return ['All', ...Array.from(fSet)];
  }, []);

  const filteredPlants = useMemo(() => {
    return plantDatabase.filter((plant) => {
      // Category filter
      if (selectedCategory !== 'All' && plant.category !== selectedCategory) return false;
      // Family filter
      if (selectedFamily !== 'All' && plant.family !== selectedFamily) return false;
      // Conservation status
      if (selectedConservation !== 'All' && plant.conservationStatus !== selectedConservation) return false;
      // Max Rainfall filter
      if (plant.rainfallMinMm > maxRainfall) return false;
      // Invasive toggle
      if (showInvasiveOnly && !plant.isInvasive) return false;
      // Endemic toggle
      if (showEndemicOnly && !plant.endemic) return false;
      // Panchkuta toggle
      if (showPanchkutaOnly && !plant.panchkutaComponent) return false;

      // Global Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          plant.scientificName.toLowerCase().includes(q) ||
          plant.hindiName.toLowerCase().includes(q) ||
          plant.localName.toLowerCase().includes(q) ||
          plant.commonName.toLowerCase().includes(q) ||
          plant.family.toLowerCase().includes(q) ||
          plant.description.toLowerCase().includes(q) ||
          plant.ecologicalRole.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedFamily, selectedConservation, maxRainfall, showInvasiveOnly, showEndemicOnly, showPanchkutaOnly]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFamily('All');
    setSelectedConservation('All');
    setMaxRainfall(600);
    setShowInvasiveOnly(false);
    setShowEndemicOnly(false);
    setShowPanchkutaOnly(false);
  };

  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-amber-800/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Searchable Floristic Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
              Vegetation Explorer & Species Database
            </h2>
            <p className="mt-2 text-sm text-amber-300/80 max-w-2xl">
              Browse native Thar desert flora by growth form, scientific taxonomy, rainfall requirements, medicinal importance, or Panchkuta culinary integration.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-amber-900/40 border border-amber-700/50 text-amber-200 font-bold">
              Showing {filteredPlants.length} of {plantDatabase.length} Species
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
              }`}
            >
              {cat === 'All' ? '🌿 All Growth Forms' : cat}
            </button>
          ))}
        </div>

        {/* Filter Toolbar Card */}
        <div className="p-5 rounded-2xl bg-stone-900/90 border border-amber-800/50 shadow-xl mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Scientific, Hindi, Local Name or Use..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 text-xs placeholder-amber-400/50 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Family Select */}
            <div>
              <label className="text-[11px] font-semibold text-amber-400 block mb-1">Botanical Family:</label>
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              >
                {families.map((f) => (
                  <option key={f} value={f} className="bg-stone-900 text-amber-100">{f}</option>
                ))}
              </select>
            </div>

            {/* Conservation Status */}
            <div>
              <label className="text-[11px] font-semibold text-amber-400 block mb-1">Conservation Status:</label>
              <select
                value={selectedConservation}
                onChange={(e) => setSelectedConservation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              >
                {['All', 'Least Concern', 'Vulnerable', 'Near Threatened', 'Critically Endangered'].map((status) => (
                  <option key={status} value={status} className="bg-stone-900 text-amber-100">{status}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Secondary Toggles & Sliders */}
          <div className="pt-4 border-t border-amber-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            
            {/* Rainfall Slider */}
            <div className="flex items-center gap-3 max-w-sm w-full">
              <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-amber-300 font-semibold shrink-0">Max Rainfall:</span>
              <input
                type="range"
                min="100"
                max="600"
                step="50"
                value={maxRainfall}
                onChange={(e) => setMaxRainfall(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="font-bold text-amber-400 shrink-0">{maxRainfall} mm</span>
            </div>

            {/* Specialty Checkboxes */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-amber-200">
                <input
                  type="checkbox"
                  checked={showPanchkutaOnly}
                  onChange={(e) => setShowPanchkutaOnly(e.target.checked)}
                  className="rounded bg-amber-950 border-amber-600 text-amber-500 focus:ring-0"
                />
                <span className="font-medium">🥘 Panchkuta Ingredient</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-amber-200">
                <input
                  type="checkbox"
                  checked={showEndemicOnly}
                  onChange={(e) => setShowEndemicOnly(e.target.checked)}
                  className="rounded bg-amber-950 border-amber-600 text-amber-500 focus:ring-0"
                />
                <span className="font-medium">🌵 Regional Endemic</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-red-300">
                <input
                  type="checkbox"
                  checked={showInvasiveOnly}
                  onChange={(e) => setShowInvasiveOnly(e.target.checked)}
                  className="rounded bg-amber-950 border-red-600 text-red-500 focus:ring-0"
                />
                <span className="font-medium flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> Invasive Alien Threat
                </span>
              </label>
            </div>

          </div>

        </div>

        {/* Species Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => onSelectPlant(plant)}
              className={`group rounded-3xl overflow-hidden bg-stone-900/80 border transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col shadow-xl ${
                plant.isInvasive
                  ? 'border-red-600/40 hover:border-red-500'
                  : 'border-amber-800/40 hover:border-amber-500/80'
              }`}
            >
              
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-amber-950">
                <img
                  src={plant.imageUrl}
                  alt={plant.scientificName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-200 text-[10px] font-bold border border-amber-600/40 backdrop-blur-md">
                    {plant.category}
                  </span>
                  {plant.panchkutaComponent && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-amber-950 text-[10px] font-bold shadow-md">
                      🥘 Panchkuta
                    </span>
                  )}
                  {plant.isInvasive && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-md animate-pulse">
                      ⚠️ Invasive
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-amber-50 group-hover:text-amber-400 transition-colors italic">
                      {plant.scientificName}
                    </h3>
                    <p className="text-xs font-semibold text-amber-300">{plant.localName} ({plant.hindiName})</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-900/80 text-amber-400 font-mono border border-amber-700/40">
                    {plant.family}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <p className="text-xs text-amber-200/80 line-clamp-3 leading-relaxed">
                  {plant.description}
                </p>

                {/* Specs Pill Summary */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-amber-800/30">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Droplets className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{plant.rainfallMinMm} - {plant.rainfallMaxMm} mm</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{plant.floweringPeriod}</span>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  <span>View Full Monograph & TEK</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

              </div>

            </div>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-16 p-8 rounded-3xl bg-stone-900 border border-amber-800/40 space-y-3">
            <Leaf className="w-12 h-12 text-amber-500/40 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-amber-200">No Plant Species Match Selected Filters</h3>
            <p className="text-xs text-amber-400/80">Try adjusting your rainfall threshold or search query.</p>
            <button
              onClick={resetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-600 text-amber-950 font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
