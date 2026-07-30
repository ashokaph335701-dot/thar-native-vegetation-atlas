import React from 'react';
import { PlantSpecies } from '../types';
import { X, Droplets, Thermometer, ShieldAlert, Sparkles, BookOpen, HeartPulse, Utensils, Feather, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';

interface PlantDetailModalProps {
  plant: PlantSpecies | null;
  onClose: () => void;
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({ plant, onClose, onSelectPlant }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-amber-700/60 rounded-3xl shadow-2xl overflow-hidden text-amber-50 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-amber-950/95 border-b border-amber-800/50 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-bold uppercase tracking-wider">
              {plant.category} Monograph
            </span>
            {plant.panchkutaComponent && (
              <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-200 border border-emerald-500/40 text-xs font-bold">
                🥘 Panchkuta Ingredient
              </span>
            )}
            {plant.isInvasive && (
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold animate-pulse">
                ⚠️ Invasive Threat
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-amber-900/60 text-amber-300 hover:text-amber-100 hover:bg-amber-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Top Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Plant Image (5 cols) */}
            <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-2xl overflow-hidden border border-amber-700/50 shadow-2xl group">
              <img
                src={plant.imageUrl}
                alt={plant.scientificName}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-amber-400 block">{plant.taxonomicGroup}</span>
                <p className="text-xs text-amber-200/80 mt-1 italic font-mono">Ref: {plant.references.join(', ')}</p>
              </div>
            </div>

            {/* Title & Key Highlights (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Family: {plant.family}</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-100 italic tracking-tight">
                  {plant.scientificName}
                </h1>
                <p className="text-xl font-bold text-amber-300 mt-1">
                  {plant.localName} ({plant.hindiName})
                </p>
                <p className="text-sm font-medium text-amber-400/80 italic mt-0.5">{plant.commonName}</p>
              </div>

              <p className="text-sm text-amber-200/90 leading-relaxed bg-amber-950/40 p-4 rounded-xl border border-amber-800/40">
                {plant.description}
              </p>

              {/* Specs Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/40">
                  <span className="text-amber-400 font-semibold block text-[11px]">Rainfall Tolerance</span>
                  <p className="font-bold text-amber-100 mt-0.5 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" /> {plant.rainfallMinMm} - {plant.rainfallMaxMm} mm
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/40">
                  <span className="text-amber-400 font-semibold block text-[11px]">Flowering Season</span>
                  <p className="font-bold text-amber-100 mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {plant.floweringPeriod}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800/40 col-span-2 sm:col-span-1">
                  <span className="text-amber-400 font-semibold block text-[11px]">Conservation Status</span>
                  <p className="font-bold text-amber-100 mt-0.5 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" /> {plant.conservationStatus}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Detailed Tabulated Information Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Identification Traits */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-amber-800/40 space-y-3">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Morphological Identification Traits
              </h3>
              <ul className="space-y-2 text-xs text-amber-200/90 list-disc list-inside">
                {plant.identification.map((trait, idx) => (
                  <li key={idx} className="leading-relaxed">{trait}</li>
                ))}
              </ul>
            </div>

            {/* Habitat & Soil Preference */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-amber-800/40 space-y-3">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" /> Habitat & Edaphic Preference
              </h3>
              <div className="space-y-2 text-xs text-amber-200">
                <p><strong className="text-amber-400">Habitats:</strong> {plant.habitat.join(', ')}</p>
                <p><strong className="text-amber-400">Soil Types:</strong> {plant.soilPreference.join(', ')}</p>
                <p><strong className="text-amber-400">Elevation:</strong> {plant.elevationMeters}</p>
                <p><strong className="text-amber-400">Fruiting Period:</strong> {plant.fruitingPeriod}</p>
              </div>
            </div>

            {/* Ethnomedicine & Medicinal Importance */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-amber-800/40 space-y-3">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-red-400" /> Ethnomedicine & Ayurvedic Value
              </h3>
              <ul className="space-y-2 text-xs text-amber-200/90 list-disc list-inside">
                {plant.medicinalImportance.map((med, idx) => (
                  <li key={idx} className="leading-relaxed">{med}</li>
                ))}
              </ul>
            </div>

            {/* Traditional Uses & Panchkuta */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-amber-800/40 space-y-3">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" /> Traditional Uses & Culinary Heritage
              </h3>
              <ul className="space-y-2 text-xs text-amber-200/90 list-disc list-inside">
                {plant.traditionalUses.map((use, idx) => (
                  <li key={idx} className="leading-relaxed">{use}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Cultural & Spiritual Significance */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 to-stone-900 border border-amber-700/50 space-y-2">
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <Feather className="w-5 h-5 text-amber-400" /> Cultural & Sacred Cosmology
            </h3>
            <p className="text-xs text-amber-200/90 leading-relaxed">{plant.culturalSignificance}</p>
          </div>

          {/* Ecological Role & Wildlife Integration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-amber-800/40 space-y-2">
              <h4 className="font-bold text-amber-300">Ecological Role & Ecosystem Services</h4>
              <p className="text-amber-200/90 leading-relaxed">{plant.ecologicalRole}</p>
              <div className="pt-2 border-t border-amber-800/30 text-amber-400">
                <strong>Pollinators:</strong> {plant.pollinators.join(', ')}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-amber-800/40 space-y-2">
              <h4 className="font-bold text-amber-300">Fauna Reliance & Wildlife Associations</h4>
              <p className="text-amber-200/90">{plant.associatedWildlife.join(', ')}</p>
              <div className="pt-2 border-t border-amber-800/30 text-emerald-300">
                <strong>Restoration Value:</strong> {plant.restorationValue}
              </div>
            </div>
          </div>

          {/* Interesting Facts Carousel */}
          <div className="p-5 rounded-2xl bg-amber-950/60 border border-amber-700/40 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              💡 Fascinating Scientific & Ethno-Botanical Facts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {plant.interestingFacts.map((fact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-900/80 border border-amber-800/30 text-amber-200 flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Threats & Conservation Warning */}
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-red-300 block">Threats & Human Impact:</span>
              <p className="mt-0.5">{plant.threats.join(' • ')}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 bg-amber-950/95 border-t border-amber-800/50 flex items-center justify-between text-xs">
          <span className="text-amber-400 font-medium">CAZRI Botanical Registry ID: #{plant.id}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-amber-950 font-bold transition-all"
          >
            Close Monograph
          </button>
        </div>

      </div>
    </div>
  );
};
