import React from 'react';
import { Camera, MapPin, Smartphone, Satellite, Terminal, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const CitizenScienceSection: React.FC = () => {
  const futureModules = [
    {
      title: '📸 Citizen Science Plant Observations',
      status: 'In Development',
      description: 'Allow visitors, school students, and tourists to upload geotagged photo observations of Thar desert flora directly into our botanical verification database.',
      icon: Camera
    },
    {
      title: '📱 Offline Mobile Field Guide App',
      status: 'Planned 2027',
      description: 'Progressive Web App (PWA) with offline GIS map tiles and AI species recognition to help researchers identify plants without cell reception.',
      icon: Smartphone
    },
    {
      title: '🛰️ Satellite Vegetation Monitoring',
      status: 'Planned 2027',
      description: 'Integration with Sentinel-2 and Landsat multispectral imagery to track seasonal NDVI greenness and monitor Prosopis juliflora spread across districts.',
      icon: Satellite
    },
    {
      title: '💻 Open API for Botanical Researchers',
      status: 'Beta Preview',
      description: 'REST and GraphQL APIs allowing universities and conservation organizations to query our digitized Thar flora database programmatically.',
      icon: Terminal
    }
  ];

  return (
    <section className="py-12 bg-amber-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Future Roadmap & Community Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Citizen Science & Future Platform Features
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-3xl">
            Empowering communities, tourists, and researchers through upcoming crowdsourced observation tools, satellite vegetation tracking, and open APIs.
          </p>
        </div>

        {/* Future Modules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureModules.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-400 text-xs font-bold border border-amber-700/40 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-amber-100">{item.title}</h3>
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
