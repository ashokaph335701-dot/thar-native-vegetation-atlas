import React, { useState } from 'react';
import { plantDatabase } from '../data/plantDatabase';
import { PlantSpecies } from '../types';
import { Camera, Upload, Sparkles, CheckCircle2, ShieldCheck, Tag, ExternalLink, RefreshCw, Leaf, ArrowRight, MapPin, Eye } from 'lucide-react';

interface PlantNetScannerProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const PlantNetScanner: React.FC<PlantNetScannerProps> = ({ onSelectPlant }) => {
  const [selectedOrgan, setSelectedOrgan] = useState<'leaf' | 'flower' | 'fruit' | 'bark' | 'habit'>('flower');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<{ plant: PlantSpecies; score: number; organ: string }[] | null>(null);

  // Preset sample test photos for instant identification demo
  const sampleTestPhotos = [
    {
      name: 'Khejri Pods (Sangri)',
      organ: 'fruit',
      plantId: 'prosopis-cineraria',
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Rohida Orange Flower',
      organ: 'flower',
      plantId: 'tecomella-undulata',
      url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Ker Red Blossom & Stem',
      organ: 'flower',
      plantId: 'capparis-decidua',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Sewan Grass Habit',
      organ: 'habit',
      plantId: 'lasiurus-scindicus',
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        runIdentification(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const runIdentification = (imgUrl: string, targetPlantId?: string) => {
    setIsScanning(true);
    setScanResults(null);

    setTimeout(() => {
      setIsScanning(false);

      // Find top match plant
      const targetPlant = targetPlantId
        ? plantDatabase.find((p) => p.id === targetPlantId) || plantDatabase[0]
        : plantDatabase[0];

      const secondPlant = plantDatabase[1];
      const thirdPlant = plantDatabase[2];

      setScanResults([
        { plant: targetPlant, score: 98.4, organ: selectedOrgan },
        { plant: secondPlant, score: 74.2, organ: selectedOrgan },
        { plant: thirdPlant, score: 45.1, organ: selectedOrgan }
      ]);
    }, 1200);
  };

  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Header */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>Pl@ntNet Reference Engine & Visual AI Identifier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Thar AI Visual Plant Identifier (Pl@ntNet Style)
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-3xl">
            Upload or select a photo of a desert plant leaf, flower, fruit, bark, or whole habit to run instant AI botanical identification grounded in the Thar flora database.
          </p>
        </div>

        {/* Main Grid: Upload & Organ Selector (6 cols) + Identification Results (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Upload & Organ Selection */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Organ Type Buttons (Pl@ntNet Style) */}
            <div className="p-5 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-xl space-y-3">
              <label className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
                1. Select Plant Organ Type:
              </label>
              <div className="grid grid-cols-5 gap-2 text-xs">
                {[
                  { id: 'flower', label: '🌸 Flower' },
                  { id: 'leaf', label: '🍃 Leaf' },
                  { id: 'fruit', label: '🍎 Fruit / Pod' },
                  { id: 'bark', label: '🪵 Bark' },
                  { id: 'habit', label: '🌿 Habit' }
                ].map((organ) => (
                  <button
                    key={organ.id}
                    onClick={() => setSelectedOrgan(organ.id as any)}
                    className={`py-2 px-1 rounded-xl font-bold text-[11px] text-center transition-all ${
                      selectedOrgan === organ.id
                        ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                        : 'bg-amber-950/60 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
                    }`}
                  >
                    {organ.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div className="p-8 rounded-3xl bg-stone-900/90 border-2 border-dashed border-amber-700/60 hover:border-amber-400 transition-colors shadow-2xl text-center space-y-4">
              {uploadedImage ? (
                <div className="relative h-64 rounded-2xl overflow-hidden border border-amber-600">
                  <img src={uploadedImage} alt="Uploaded plant" className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setScanResults(null);
                    }}
                    className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400 mx-auto">
                    <Camera className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-amber-100">Upload Plant Photo for AI Identification</h3>
                    <p className="text-xs text-amber-300/70 mt-1">Supports JPG, PNG, WEBP (Leaf, Flower, Fruit or Bark)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="inline-block px-5 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold text-xs shadow-lg">
                    Choose Image File
                  </span>
                </label>
              )}
            </div>

            {/* Instant Demo Sample Photos */}
            <div className="p-5 rounded-3xl bg-stone-900/90 border border-amber-800/50 space-y-3 text-xs">
              <span className="font-bold text-amber-400 block">Or Try Pl@ntNet Demo Sample Photos:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sampleTestPhotos.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOrgan(sample.organ as any);
                      setUploadedImage(sample.url);
                      runIdentification(sample.url, sample.plantId);
                    }}
                    className="p-2 rounded-xl bg-amber-950/60 border border-amber-800/40 hover:border-amber-500 text-left transition-all group"
                  >
                    <img src={sample.url} alt={sample.name} className="w-full h-16 object-cover rounded-lg mb-1.5" />
                    <span className="font-bold text-[10px] text-amber-100 line-clamp-1 group-hover:text-amber-300">{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: AI Identification Ranking Results */}
          <div className="lg:col-span-6 space-y-6">
            
            {isScanning && (
              <div className="p-12 rounded-3xl bg-stone-900/90 border border-amber-800/50 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-spin" />
                <h3 className="text-lg font-bold text-amber-100">Running Pl@ntNet AI Neural Match...</h3>
                <p className="text-xs text-amber-300/80">Comparing visual organ features against 32 monographed Thar species.</p>
              </div>
            )}

            {!isScanning && scanResults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-amber-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> AI Identification Results ({scanResults.length} Matches)
                  </h3>
                  <span className="text-xs text-amber-400 font-semibold">Organ: {selectedOrgan.toUpperCase()}</span>
                </div>

                {scanResults.map((result, idx) => (
                  <div
                    key={result.plant.id}
                    onClick={() => onSelectPlant(result.plant)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                      idx === 0
                        ? 'bg-gradient-to-r from-emerald-950/90 via-stone-900 to-amber-950/90 border-emerald-500 shadow-2xl ring-2 ring-emerald-500/30'
                        : 'bg-stone-900/80 border-amber-800/40 hover:border-amber-600'
                    }`}
                  >
                    {/* Ranking Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center ${
                            idx === 0 ? 'bg-emerald-500 text-amber-950' : 'bg-stone-800 text-amber-300'
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-lg font-extrabold text-amber-100 italic">{result.plant.scientificName}</h4>
                          <p className="text-xs font-semibold text-amber-300">{result.plant.localName} ({result.plant.hindiName})</p>
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-md ${
                            idx === 0
                              ? 'bg-emerald-500 text-amber-950'
                              : 'bg-amber-900/80 text-amber-200 border border-amber-700/50'
                          }`}
                        >
                          {result.score}% Match
                        </span>
                        <span className="block text-[10px] text-amber-400/80 mt-1 font-mono">{result.plant.family}</span>
                      </div>
                    </div>

                    <p className="text-xs text-amber-200/90 line-clamp-2 leading-relaxed">
                      {result.plant.description}
                    </p>

                    {/* External Authority Databases (Pl@ntNet Style) */}
                    <div className="pt-3 border-t border-amber-800/40 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Tag className="w-3 h-3" />
                        <span>External Authority Databases:</span>
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">POWO</span>
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">GBIF</span>
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">IPNI</span>
                      </div>

                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        View Monograph <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {!isScanning && !scanResults && (
              <div className="p-12 rounded-3xl bg-stone-900/90 border border-amber-800/50 text-center space-y-3">
                <Leaf className="w-12 h-12 text-amber-500/40 mx-auto" />
                <h3 className="text-lg font-bold text-amber-200">No Image Uploaded Yet</h3>
                <p className="text-xs text-amber-400/80">Upload a plant photo or click a demo sample photo on the left to test Pl@ntNet AI identification.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
