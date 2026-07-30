import React, { useState } from 'react';
import { plantDatabase } from '../data/plantDatabase';
import { habitatDatabase } from '../data/habitatDatabase';
import { Image, Filter, Eye, Camera } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const galleryItems = [
    ...plantDatabase.map(p => ({
      id: p.id,
      title: p.scientificName,
      subtitle: `${p.localName} (${p.hindiName})`,
      category: p.category,
      imageUrl: p.imageUrl,
      tag: p.family
    })),
    ...habitatDatabase.map(h => ({
      id: h.id,
      title: h.name,
      subtitle: h.localTerm,
      category: 'Habitats',
      imageUrl: h.imageUrl,
      tag: 'Ecosystem'
    })),
    {
      id: 'gib-sewan',
      title: 'Great Indian Bustard in Sewan Grassland',
      subtitle: 'Wildlife Interaction',
      category: 'Wildlife',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      tag: 'Conservation'
    },
    {
      id: 'rohida-bloom',
      title: 'Rohida Blossom Bloom Season',
      subtitle: 'State Flower of Rajasthan',
      category: 'Flowers',
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      tag: 'Blossoms'
    }
  ];

  const categories = ['All', 'Tree', 'Shrub', 'Grass', 'Flowers', 'Habitats', 'Wildlife'];

  const filteredItems = galleryItems.filter(item =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section className="py-12 bg-amber-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Resolution Visual Archive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Thar Native Flora Photo Gallery
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-2xl">
            High-definition scientific photography of Thar desert flora, xerophytic adaptations, seasonal blooms, and wildlife interactions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                  : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 rounded-3xl overflow-hidden bg-stone-900 border border-amber-800/40 shadow-xl cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 text-[10px] font-bold border border-amber-700/50 backdrop-blur-md">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="text-sm font-bold text-amber-100 italic group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-amber-400/90">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
