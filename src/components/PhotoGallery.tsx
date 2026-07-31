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
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-bold shadow-lg">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>Visual Photography Archive</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-100">
            Thar Vegetation Photo Gallery
          </h2>
          <p className="text-sm text-amber-300/80">
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                    : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-64 rounded-3xl overflow-hidden bg-stone-900 border border-amber-800/40 cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-amber-500"
            >
              <img
                src={item.imageUrl}
                alt={item.scientificName}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-amber-950 font-extrabold text-[10px] uppercase w-fit mb-1">
                  {item.category}
                </span>
                <h3 className="font-extrabold text-sm text-amber-100 italic">{item.scientificName}</h3>
                <p className="text-xs font-bold text-amber-300">{item.localName} ({item.hindiName})</p>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Larger Image Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-3xl w-full bg-stone-900 rounded-3xl border border-amber-700/60 overflow-hidden text-amber-50 shadow-2xl space-y-4 p-6">
            
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-amber-100 hover:bg-amber-600 border border-amber-500/40"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image View */}
            <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-amber-950/60 border border-amber-800/40">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.scientificName}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80';
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Plant Information */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-amber-100 italic">{selectedPhoto.scientificName}</h3>
                <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-bold text-xs uppercase">
                  {selectedPhoto.category}
                </span>
              </div>
              <p className="text-sm font-bold text-amber-300">{selectedPhoto.localName} ({selectedPhoto.hindiName}) — <em>{selectedPhoto.commonName}</em></p>
              <p className="text-xs text-amber-200/90 leading-relaxed pt-1">{selectedPhoto.description}</p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
