import React, { useState } from 'react';
import { plantDatabase } from '../data/plantDatabase';
import { PlantSpecies } from '../types';
import { Image as ImageIcon, X, ArrowRight, Eye, Leaf } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trees' | 'shrubs' | 'plants' | 'vegetables'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PlantSpecies | null>(null);

  const galleryItems = plantDatabase.filter((plant) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'trees') return plant.category === 'Tree';
    if (activeCategory === 'shrubs') return plant.category === 'Shrub';
    if (activeCategory === 'plants') return plant.category === 'Grass' || plant.category === 'Herb';
    if (activeCategory === 'vegetables') return plant.category === 'Vegetable';
    return true;
  });

  return (
    <section className="py-16 bg-[#F5F1E8] text-[#333333] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E8D8B5] text-[#556B2F] text-xs font-nav font-semibold shadow-sm">
            <ImageIcon className="w-4 h-4 text-[#6B8E23]" />
            <span>Visual Botanical Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#4A3B2A]">
            Thar Vegetation Photo Gallery
          </h2>
          <p className="text-base font-sans text-[#333333]/80">
            Browse original botanical photographs categorized by Trees, Shrubs, Plants, and Vegetables. Click any photo for a larger view!
          </p>

          {/* 4 Category Tabs */}
          <div className="flex items-center justify-center gap-2 pt-3 flex-wrap">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'trees', label: '🌳 Trees' },
              { id: 'shrubs', label: '🌿 Shrubs' },
              { id: 'plants', label: '🌱 Plants & Grasses' },
              { id: 'vegetables', label: '🥗 Traditional Vegetables' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-nav font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                    : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-72 rounded-3xl overflow-hidden bg-[#FAF8F3] border border-[#E8D8B5] cursor-pointer premium-shadow transition-all duration-300 hover:-translate-y-1 hover:border-[#556B2F]"
            >
              <img
                src={item.imageUrl}
                alt={item.scientificName}
                onError={(e) => {
                  e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Prosopis_cineraria_W_IMG_2814.jpg/800px-Prosopis_cineraria_W_IMG_2814.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B2A]/90 via-[#4A3B2A]/30 to-transparent p-6 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="px-2.5 py-0.5 rounded-full bg-[#556B2F] text-white font-nav font-semibold text-[10px] uppercase w-fit mb-1 shadow-sm">
                  {item.category}
                </span>
                <h3 className="font-serif-heading font-bold text-[#FAF8F3] text-lg italic">{item.scientificName}</h3>
                <p className="text-xs font-nav font-medium text-amber-200">{item.localName} ({item.hindiName})</p>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#FAF8F3]/80 backdrop-blur-sm flex items-center justify-center text-[#556B2F] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Larger Image Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A3B2A]/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-3xl w-full bg-[#FAF8F3] rounded-3xl border border-[#E8D8B5] overflow-hidden text-[#333333] premium-shadow-lg space-y-4 p-8">
            
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#F5F1E8] text-[#4A3B2A] hover:bg-[#B65A3C] hover:text-white border border-[#E8D8B5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image View */}
            <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#E8D8B5]/30 border border-[#E8D8B5]">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.scientificName}
                onError={(e) => {
                  e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Prosopis_cineraria_W_IMG_2814.jpg/800px-Prosopis_cineraria_W_IMG_2814.jpg';
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Plant Information */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-serif-heading font-bold text-[#4A3B2A] italic">{selectedPhoto.scientificName}</h3>
                <span className="px-3.5 py-1 rounded-full bg-[#556B2F] text-white font-nav font-semibold text-xs uppercase">
                  {selectedPhoto.category}
                </span>
              </div>
              <p className="text-sm font-nav font-semibold text-[#B65A3C]">{selectedPhoto.localName} ({selectedPhoto.hindiName}) — <em>{selectedPhoto.commonName}</em></p>
              <p className="text-sm font-sans text-[#333333]/90 leading-relaxed pt-1">{selectedPhoto.description}</p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
