import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, TreePine, Zap, Flame, Shield } from 'lucide-react';

export const ConservationSection: React.FC = () => {
  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-700/50 text-red-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Biodiversity Protection & Ecosystem Restoration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Thar Desert Biodiversity & Flora Conservation
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-3xl">
            Critical analysis of existential threats facing Thar desert vegetation and strategic frameworks for grassland regeneration, species protection, and invasive species eradication.
          </p>
        </div>

        {/* Threat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-red-800/50 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-red-200">1. Invasive Alien Mesquite (*Prosopis juliflora*)</h3>
            <p className="text-amber-200/90 leading-relaxed">
              Intentionally introduced mid-20th century, *P. juliflora* is highly allelopathic, releases toxins into topsoil, monopolies groundwater, and shades out understory fodder grasses (*Sewan*). Its dense thickets destroy open nesting habitats needed by Great Indian Bustards and Blackbucks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900/90 border border-red-800/50 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 flex items-center justify-center text-red-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-red-200">2. Solar & Wind Power Lines</h3>
            <p className="text-amber-200/90 leading-relaxed">
              Unregulated expansion of renewable energy infrastructure has crisscrossed traditional Orans and Sewan grasslands with high-tension power lines, causing up to 6 Great Indian Bustard collisions per kilometer per month.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900/90 border border-red-800/50 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 flex items-center justify-center text-red-400">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-red-200">3. Canal Waterlogging & Salinization</h3>
            <p className="text-amber-200/90 leading-relaxed">
              Indira Gandhi Canal (IGNP) radically altered hydrology, expanding commercial crops but causing secondary salinization, waterlogging, and drastic shrinking of pristine pastoral pasturelands (*Rakhal*).
            </p>
          </div>

        </div>

        {/* Action Framework Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950 border border-emerald-700/50 shadow-2xl space-y-6">
          <h3 className="text-2xl font-extrabold text-emerald-200 flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" /> Recommended Conservation Frameworks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-emerald-100">
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
              <h4 className="font-bold text-emerald-300 text-sm">🌾 Sewan Grassland Reseeding (Khetolai Model)</h4>
              <p className="leading-relaxed text-emerald-200/90">
                Create predator-proof 2-year protected enclosures (fencing out feral dogs and overpopulated livestock) combined with aggressive reseeding of native *Lasiurus scindicus* and *Cenchrus biflorus*.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
              <h4 className="font-bold text-emerald-300 text-sm">⚡ Underground Power Line Cabling</h4>
              <p className="leading-relaxed text-emerald-200/90">
                Mandatory underground cabling of high-tension power lines traversing core Great Indian Bustard breeding and nesting zones in Jaisalmer and Barmer.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
