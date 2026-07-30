import React, { useState } from 'react';
import { plantDatabase } from '../data/plantDatabase';
import { PlantSpecies } from '../types';
import { Search, X, Leaf, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectPlant }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? plantDatabase.filter(p =>
        p.scientificName.toLowerCase().includes(query.toLowerCase()) ||
        p.hindiName.toLowerCase().includes(query.toLowerCase()) ||
        p.localName.toLowerCase().includes(query.toLowerCase()) ||
        p.commonName.toLowerCase().includes(query.toLowerCase()) ||
        p.family.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : plantDatabase.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-700/60 rounded-3xl shadow-2xl overflow-hidden text-amber-50">
        
        {/* Search Bar */}
        <div className="p-4 bg-amber-950/90 border-b border-amber-800/40 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Global search by Scientific name, Local name, Family, Panchkuta..."
            className="flex-1 bg-transparent text-amber-100 placeholder-amber-400/50 text-sm focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-lg text-amber-400 hover:text-amber-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2 custom-scrollbar">
          {results.map((plant) => (
            <div
              key={plant.id}
              onClick={() => {
                onSelectPlant(plant);
                onClose();
              }}
              className="p-3 rounded-2xl bg-amber-950/40 hover:bg-amber-800/60 border border-amber-800/30 cursor-pointer transition-all flex items-center justify-between group text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-100 italic">{plant.scientificName}</span>
                  <span className="text-amber-300">({plant.localName})</span>
                </div>
                <p className="text-[11px] text-amber-400/80 mt-0.5">{plant.category} • {plant.family} • {plant.rainfallMinMm}-{plant.rainfallMaxMm}mm Rain</p>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}

          {results.length === 0 && (
            <div className="text-center py-8 text-xs text-amber-400">
              No native species found matching "{query}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
