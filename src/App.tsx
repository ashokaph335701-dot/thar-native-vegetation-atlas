import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveMap } from './components/InteractiveMap';
import { VegetationExplorer } from './components/VegetationExplorer';
import { HabitatExplorer } from './components/HabitatExplorer';
import { TharBotanistAI } from './components/TharBotanistAI';
import { EducationalSection } from './components/EducationalSection';
import { PhotoGallery } from './components/PhotoGallery';
import { PlantComparisonTool } from './components/PlantComparisonTool';
import { AdminDashboard } from './components/AdminDashboard';
import { PlantDetailModal } from './components/PlantDetailModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { PlantSpecies } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [selectedPlant, setSelectedPlant] = useState<PlantSpecies | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 font-sans selection:bg-amber-500 selection:text-amber-950 flex flex-col justify-between">
      
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Renderer */}
      <main className="flex-1">
        {activeTab === 'hero' && (
          <HeroSection
            onExploreAtlas={() => setActiveTab('map')}
            onAskAI={() => setActiveTab('chatbot')}
            onExploreSpecies={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMap
            onSelectPlant={(plant) => setSelectedPlant(plant)}
          />
        )}

        {activeTab === 'explorer' && (
          <VegetationExplorer
            onSelectPlant={(plant) => setSelectedPlant(plant)}
          />
        )}

        {activeTab === 'habitats' && (
          <HabitatExplorer />
        )}

        {activeTab === 'chatbot' && (
          <TharBotanistAI />
        )}

        {activeTab === 'educational' && (
          <EducationalSection />
        )}

        {activeTab === 'gallery' && (
          <PhotoGallery />
        )}

        {activeTab === 'tools' && (
          <PlantComparisonTool />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Species Detail Modal */}
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onSelectPlant={(plant) => setSelectedPlant(plant)}
      />

      {/* Global Intelligent Search Modal (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPlant={(plant) => setSelectedPlant(plant)}
      />

      {/* Universal Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;
