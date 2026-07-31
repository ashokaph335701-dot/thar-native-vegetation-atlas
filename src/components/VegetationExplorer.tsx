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
    <section className="py-16 bg-[#F5F1E8] text-[#333333] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E8D8B5] text-[#556B2F] text-xs font-nav font-semibold shadow-sm">
            <Leaf className="w-4 h-4 text-[#6B8E23]" />
            <span>Native Species Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#4A3B2A]">
            Native Vegetation of Thar Desert
          </h2>
          <p className="text-base font-sans text-[#333333]/80 leading-relaxed">
            Explore native trees, shrubs & plants, and traditional vegetables with original photographs and ecological descriptions.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-5 h-5 text-[#556B2F] absolute left-4 top-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by plant name (e.g. Khejri, Ker, Sangri)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8D8B5] text-[#4A3B2A] text-sm placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F] shadow-sm font-sans"
            />
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-4 py-2 rounded-xl text-xs font-nav font-medium transition-all ${
                activeSection === 'all'
                  ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                  : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
              }`}
            >
              All Sections (30)
            </button>
            <button
              onClick={() => setActiveSection('trees')}
              className={`px-4 py-2 rounded-xl text-xs font-nav font-medium transition-all ${
                activeSection === 'trees'
                  ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                  : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
              }`}
            >
              🌳 Native Trees ({treesList.length})
            </button>
            <button
              onClick={() => setActiveSection('shrubs')}
              className={`px-4 py-2 rounded-xl text-xs font-nav font-medium transition-all ${
                activeSection === 'shrubs'
                  ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                  : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
              }`}
            >
              🌿 Native Shrubs & Plants ({shrubsList.length})
            </button>
            <button
              onClick={() => setActiveSection('vegetables')}
              className={`px-4 py-2 rounded-xl text-xs font-nav font-medium transition-all ${
                activeSection === 'vegetables'
                  ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                  : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
              }`}
            >
              🥗 Native Vegetables ({vegetablesList.length})
            </button>
          </div>
        </div>

        {/* A. NATIVE TREES SECTION */}
        {(activeSection === 'all' || activeSection === 'trees') && (
          <div className="space-y-6 pt-4">
            <div className="pb-3 border-b border-[#E8D8B5] flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#4A3B2A] flex items-center gap-2">
                <TreePine className="w-6 h-6 text-[#556B2F]" /> A. Native Trees
              </h3>
              <span className="text-xs font-nav font-semibold text-[#6B8E23]">{treesList.filter(filterPlant).length} Trees</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treesList.filter(filterPlant).map((plant) => (
                <PlantCard key={plant.id} plant={plant} onSelectPlant={onSelectPlant} />
              ))}
            </div>
          </div>
        )}

        {/* B. NATIVE SHRUBS & PLANTS SECTION */}
        {(activeSection === 'all' || activeSection === 'shrubs') && (
          <div className="space-y-6 pt-8">
            <div className="pb-3 border-b border-[#E8D8B5] flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#4A3B2A] flex items-center gap-2">
                <Leaf className="w-6 h-6 text-[#556B2F]" /> B. Native Shrubs & Plants
              </h3>
              <span className="text-xs font-nav font-semibold text-[#6B8E23]">{shrubsList.filter(filterPlant).length} Shrubs & Plants</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shrubsList.filter(filterPlant).map((plant) => (
                <PlantCard key={plant.id} plant={plant} onSelectPlant={onSelectPlant} />
              ))}
            </div>
          </div>
        )}

        {/* C. NATIVE VEGETABLES SECTION */}
        {(activeSection === 'all' || activeSection === 'vegetables') && (
          <div className="space-y-6 pt-8">
            <div className="pb-3 border-b border-[#E8D8B5] flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#4A3B2A] flex items-center gap-2">
                <Utensils className="w-6 h-6 text-[#B65A3C]" /> C. Traditional Native Vegetables
              </h3>
              <span className="text-xs font-nav font-semibold text-[#B65A3C]">{vegetablesList.filter(filterPlant).length} Traditional Vegetables</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

{/* Card Component displaying Original Photograph, Local Name, English Name, Scientific Name, and Short Description */}
const PlantCard: React.FC<{ plant: PlantSpecies; onSelectPlant: (plant: PlantSpecies) => void }> = ({ plant, onSelectPlant }) => {
  return (
    <div
      onClick={() => onSelectPlant(plant)}
      className="bg-[#FAF8F3] rounded-3xl border border-[#E8D8B5] hover:border-[#556B2F] overflow-hidden premium-shadow cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
    >
      <div>
        {/* Original Photograph */}
        <div className="relative h-56 w-full overflow-hidden bg-[#E8D8B5]/40">
          <img
            src={plant.imageUrl}
            alt={plant.scientificName}
            onError={(e) => {
              e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Prosopis_cineraria_W_IMG_2814.jpg/800px-Prosopis_cineraria_W_IMG_2814.jpg';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#FAF8F3]/90 text-[#556B2F] text-[10px] font-nav font-bold tracking-wider uppercase border border-[#E8D8B5] backdrop-blur-sm">
            {plant.category}
          </div>
        </div>

        {/* Card Details */}
        <div className="p-6 space-y-2.5">
          {/* Local Name */}
          <div className="flex items-center justify-between">
            <span className="font-serif-heading font-bold text-lg text-[#4A3B2A]">{plant.localName} ({plant.hindiName})</span>
          </div>

          {/* Scientific Name */}
          <h4 className="font-serif-heading italic text-xl text-[#B65A3C]">{plant.scientificName}</h4>

          {/* English Name */}
          <p className="text-xs font-nav font-medium text-[#6B8E23]">{plant.commonName}</p>

          {/* Short Description */}
          <p className="text-xs font-sans text-[#333333]/80 line-clamp-3 leading-relaxed pt-1">
            {plant.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-[#F5F1E8] border-t border-[#E8D8B5] flex items-center justify-between text-xs font-nav font-semibold text-[#556B2F] group-hover:text-[#B65A3C] transition-colors">
        <span>View Species Monograph</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
