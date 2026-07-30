import React from 'react';
import { PlantSpecies } from '../types';
import { X, Droplets, MapPin, CheckCircle2, Leaf, HeartHandshake } from 'lucide-react';

interface PlantDetailModalProps {
  plant: PlantSpecies | null;
  onClose: () => void;
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-stone-900 rounded-3xl border border-amber-700/60 shadow-2xl overflow-hidden text-amber-50 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-amber-600 text-amber-100 transition-colors border border-amber-500/40"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Plant Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-amber-950/60">
          <img
            src={plant.imageUrl}
            alt={plant.scientificName}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent flex items-end p-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-extrabold text-xs tracking-wider uppercase mb-2 inline-block">
                {plant.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 italic">{plant.scientificName}</h2>
              <p className="text-base font-bold text-amber-300">{plant.localName} ({plant.hindiName})</p>
            </div>
          </div>
        </div>

        {/* Modal Body - Simple & Direct Text */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          
          {/* Simple Description */}
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-800/40 space-y-1">
            <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">Plant Overview:</h4>
            <p className="text-amber-100/90 leading-relaxed text-sm">{plant.description}</p>
          </div>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-center space-y-1">
              <Droplets className="w-5 h-5 text-blue-400 mx-auto" />
              <span className="text-amber-400/80 text-[11px] block">Rainfall Needed</span>
              <span className="font-bold text-amber-100">{plant.rainfallMinMm} - {plant.rainfallMaxMm} mm</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-center space-y-1">
              <Leaf className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-amber-400/80 text-[11px] block">Plant Family</span>
              <span className="font-bold text-amber-100">{plant.family}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-center space-y-1 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-5 h-5 text-amber-400 mx-auto" />
              <span className="text-amber-400/80 text-[11px] block">Status</span>
              <span className="font-bold text-amber-100">{plant.conservationStatus}</span>
            </div>
          </div>

          {/* Traditional Uses */}
          {plant.traditionalUses && plant.traditionalUses.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-extrabold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-400" /> Traditional Uses & Benefits:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {plant.traditionalUses.map((use, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/30 text-amber-200/90 flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Districts Found In */}
          <div className="space-y-2 pt-2 border-t border-amber-800/30">
            <h4 className="font-extrabold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" /> Found In Districts:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {plant.districts.map((dist, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/40 text-amber-200 text-xs font-bold capitalize">
                  {dist}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
