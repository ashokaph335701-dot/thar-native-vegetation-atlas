import React, { useState } from 'react';
import { plantDatabase } from '../data/plantDatabase';
import { PlantSpecies } from '../types';
import { Search, Leaf, TreePine, Sparkles, Utensils, ArrowRight } from 'lucide-react';

interface VegetationExplorerProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const VegetationExplorer: React.FC<VegetationExplorerProps> = ({ onSelectPlant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'all' | 'trees' | 'shrubs' | 'vegetables'>('all');

  const treesList = plantDatabase.filter((p) => p.category === 'Tree');
  const shrubsList = plantDatabase.filter((p) => p.category === 'Shrub' || p.category === 'Grass' || p.category === 'Herb');
  const vegetablesList = plantDatabase.filter((p) => p.category === 'Vegetable');

  const filterPlant = (plant: PlantSpecies) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      plant.scientificName.toLowerCase().includes(q) ||
      plant.localName.toLowerCase().includes(q) ||
      plant.hindiName.toLowerCase().includes(q) ||
      plant.commonName.toLowerCase().includes(q)
    );
  };

  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-bold shadow-lg">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Native Species Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-100">
            Native Vegetation of Thar Desert
          </h2>
          <p className="text-sm text-amber-300/80 leading-relaxed">
            Explore native trees, shrubs & plants, and traditional vegetables with original photographs and ecological descriptions.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by plant name (e.g. Khejri, Ker, Sangri)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-stone-900 border border-amber-700/60 text-amber-100 text-sm placeholder-amber-400/50 focus:outline-none focus:border-amber-400 shadow-xl"
            />
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'all'
                  ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                  : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
              }`}
            >
              All Sections (30)
            </button>
            <button
              onClick={() => setActiveSection('trees')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'trees'
                  ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                  : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
              }`}
            >
              🌳 Native Trees ({treesList.length})
            </button>
            <button
              onClick={() => setActiveSection('shrubs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'shrubs'
                  ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                  : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
              }`}
            >
              🌿 Native Shrubs & Plants ({shrubsList.length})
            </button>
            <button
              onClick={() => setActiveSection('vegetables')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'vegetables'
                  ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                  : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
              }`}
            >
              🥗 Native Vegetables ({vegetablesList.length})
            </button>
          </div>
        </div>

        {/* ==================== A. NATIVE TREES SECTION ==================== */}
        {(activeSection === 'all' || activeSection === 'trees') && (
          <div className="space-y-6 pt-4">
            <div className="pb-3 border-b border-amber-800/40 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-amber-100 flex items-center gap-2">
                <TreePine className="w-6 h-6 text-emerald-400" /> A. Native Trees
              </h3>
              <span className="text-xs text-amber-400 font-semibold">{treesList.filter(filterPlant).length} Trees</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treesList.filter(filterPlant).map((plant) => (
                <PlantCard key={plant.id} plant={plant} onSelectPlant={onSelectPlant} />
              ))}
            </div>
          </div>
        )}

        {/* ==================== B. NATIVE SHRUBS & PLANTS SECTION ==================== */}
        {(activeSection === 'all' || activeSection === 'shrubs') && (
          <div className="space-y-6 pt-8">
            <div className="pb-3 border-b border-amber-800/40 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-amber-100 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-400" /> B. Native Shrubs & Plants
              </h3>
              <span className="text-xs text-amber-400 font-semibold">{shrubsList.filter(filterPlant).length} Shrubs & Plants</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shrubsList.filter(filterPlant).map((plant) => (
                <PlantCard key={plant.id} plant={plant} onSelectPlant={onSelectPlant} />
              ))}
            </div>
          </div>
        )}

        {/* ==================== C. NATIVE VEGETABLES SECTION ==================== */}
        {(activeSection === 'all' || activeSection === 'vegetables') && (
          <div className="space-y-6 pt-8">
            <div className="pb-3 border-b border-amber-800/40 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-amber-100 flex items-center gap-2">
                <Utensils className="w-6 h-6 text-amber-400" /> C. Traditional Native Vegetables
              </h3>
              <span className="text-xs text-amber-400 font-semibold">{vegetablesList.filter(filterPlant).length} Traditional Vegetables</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vegetablesList.filter(filterPlant).map((plant) => (
                <PlantCard key={plant.id} plant={plant} onSelectPlant={onSelectPlant} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

{/* Clean Card Component displaying Original Photograph, Local Name, English Name, Scientific Name, and Short Description */}
const PlantCard: React.FC<{ plant: PlantSpecies; onSelectPlant: (plant: PlantSpecies) => void }> = ({ plant, onSelectPlant }) => {
  return (
    <div
      onClick={() => onSelectPlant(plant)}
      className="bg-stone-900 rounded-3xl border border-amber-800/50 hover:border-amber-500 overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group"
    >
      <div>
        {/* Original Photograph */}
        <div className="relative h-48 w-full overflow-hidden bg-amber-950/60">
          <img
            src={plant.imageUrl}
            alt={plant.scientificName}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 text-amber-300 text-[10px] font-extrabold tracking-wider uppercase border border-amber-500/40">
            {plant.category}
          </div>
        </div>

        {/* Card Details */}
        <div className="p-5 space-y-2 text-xs">
          {/* Local Name */}
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-amber-300">{plant.localName} ({plant.hindiName})</span>
          </div>

          {/* Scientific Name */}
          <h4 className="font-extrabold text-base text-amber-100 italic">{plant.scientificName}</h4>

          {/* English Name */}
          <p className="text-[11px] font-semibold text-amber-400/90">{plant.commonName}</p>

          {/* Short Description */}
          <p className="text-amber-200/80 line-clamp-3 leading-relaxed pt-1">
            {plant.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 bg-amber-950/40 border-t border-amber-800/30 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-200">
        <span>View Plant Details</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
