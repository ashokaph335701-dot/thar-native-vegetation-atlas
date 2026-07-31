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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A3B2A]/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F3] rounded-3xl border border-[#E8D8B5] premium-shadow-lg overflow-hidden text-[#333333] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#FAF8F3]/90 text-[#4A3B2A] hover:bg-[#B65A3C] hover:text-white transition-colors border border-[#E8D8B5] shadow-sm backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Plant Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-[#E8D8B5]/40">
          <img
            src={plant.imageUrl}
            alt={plant.scientificName}
            onError={(e) => {
              e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Prosopis_cineraria_W_IMG_2814.jpg/800px-Prosopis_cineraria_W_IMG_2814.jpg';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/40 to-transparent flex items-end p-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#556B2F] text-white font-nav font-semibold text-xs uppercase tracking-wider mb-2 inline-block shadow-sm">
                {plant.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-heading font-bold text-[#4A3B2A] italic">{plant.scientificName}</h2>
              <p className="text-base font-nav font-semibold text-[#B65A3C]">{plant.localName} ({plant.hindiName}) — <em>{plant.commonName}</em></p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-sans">
          
          {/* Simple Description */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F1E8] border border-[#E8D8B5] space-y-1.5">
            <h4 className="font-serif-heading font-bold text-[#4A3B2A] text-sm uppercase tracking-wider">Plant Overview:</h4>
            <p className="text-[#333333]/90 leading-relaxed">{plant.description}</p>
          </div>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans">
            <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E8D8B5] text-center space-y-1">
              <Droplets className="w-5 h-5 text-[#556B2F] mx-auto" />
              <span className="text-[#333333]/70 text-[11px] font-nav block">Rainfall Needed</span>
              <span className="font-nav font-bold text-[#4A3B2A] text-xs sm:text-sm">{plant.rainfallMinMm} - {plant.rainfallMaxMm} mm</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E8D8B5] text-center space-y-1">
              <Leaf className="w-5 h-5 text-[#6B8E23] mx-auto" />
              <span className="text-[#333333]/70 text-[11px] font-nav block">Plant Family</span>
              <span className="font-nav font-bold text-[#4A3B2A] text-xs sm:text-sm">{plant.family}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E8D8B5] text-center space-y-1 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-5 h-5 text-[#B65A3C] mx-auto" />
              <span className="text-[#333333]/70 text-[11px] font-nav block">Status</span>
              <span className="font-nav font-bold text-[#4A3B2A] text-xs sm:text-sm">{plant.conservationStatus}</span>
            </div>
          </div>

          {/* Traditional Uses */}
          {plant.traditionalUses && plant.traditionalUses.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="font-serif-heading font-bold text-[#4A3B2A] text-base flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#B65A3C]" /> Traditional Uses & Benefits:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                {plant.traditionalUses.map((use, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#333333]/90 flex items-start gap-2">
                    <span className="text-[#556B2F] font-bold">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Districts Found In */}
          <div className="space-y-2 pt-2 border-t border-[#E8D8B5]">
            <h4 className="font-serif-heading font-bold text-[#4A3B2A] text-base flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#556B2F]" /> Found In Districts:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {plant.districts.map((dist, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#E8D8B5]/50 border border-[#E8D8B5] text-[#4A3B2A] text-xs font-nav font-semibold capitalize">
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
