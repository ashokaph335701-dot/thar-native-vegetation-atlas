import React, { useState } from 'react';
import { Settings, Upload, Database, Layers, Plus, FileText, CheckCircle2, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'upload' | 'plants' | 'gis' | 'analytics'>('upload');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isReindexing, setIsReindexing] = useState(false);

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('Processing PDF... Extracting botanical entity chunks & generating vector embeddings.');
    setTimeout(() => {
      setUploadStatus('Successfully indexed document: "CAZRI Thar Flora Bulletin 2026.pdf" into RAG Knowledge Base! 14 new chunks added.');
    }, 1500);
  };

  const handleReindex = () => {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
      alert('RAG Vector Knowledge Base successfully re-indexed! 29 plant monographs & 9 research paper sections synchronized.');
    }, 1000);
  };

  return (
    <section className="py-12 bg-amber-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-amber-800/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>Administrative Data & RAG Management Console</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
              Atlas Admin & Dataset Panel
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-amber-300/80">
              Upload scientific research PDFs, re-index RAG vector embeddings, add plant records, manage GIS shapefile layers, and view query analytics.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={handleReindex}
              disabled={isReindexing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isReindexing ? 'animate-spin' : ''}`} />
              <span>{isReindexing ? 'Re-indexing Vector DB...' : 'Re-index RAG Knowledge Base'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-amber-800/40 pb-3 text-xs font-bold">
          {[
            { id: 'upload', label: 'Upload PDF Research & Datasets', icon: Upload },
            { id: 'plants', label: 'Manage Plant Records (29)', icon: Database },
            { id: 'gis', label: 'GIS Layer Management', icon: Layers },
            { id: 'analytics', label: 'Query Analytics & RAG Logs', icon: BarChart2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-500 text-amber-950 shadow-md'
                    : 'text-amber-300 hover:bg-amber-900/40'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeAdminTab === 'upload' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Upload Box (7 cols) */}
            <div className="md:col-span-7 bg-stone-900/90 rounded-3xl p-8 border border-amber-800/50 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-amber-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" /> Upload New Research Document or PDF
              </h3>
              
              <form onSubmit={handleSimulatedUpload} className="space-y-4 text-xs">
                <div className="border-2 border-dashed border-amber-700/60 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors bg-amber-950/40 cursor-pointer">
                  <Upload className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-bounce" />
                  <p className="font-bold text-amber-200 text-sm">Drag and drop research PDF paper here</p>
                  <p className="text-amber-400/70 text-[11px] mt-1">Supports PDF, GeoJSON, CSV, Shapefiles (up to 50MB)</p>
                  <input type="file" className="hidden" id="pdfUploadInput" />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-amber-300 block">Document Title / Publication Reference:</label>
                  <input
                    type="text"
                    placeholder="e.g. Flora of Rajasthan CAZRI Scientific Report 2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs shadow-lg transition-all"
                >
                  Index & Chunk PDF for Thar Botanist RAG
                </button>
              </form>

              {uploadStatus && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{uploadStatus}</span>
                </div>
              )}
            </div>

            {/* Currently Indexed Documents (5 cols) */}
            <div className="md:col-span-5 bg-stone-900/90 rounded-3xl p-6 border border-amber-800/50 shadow-2xl space-y-4 text-xs">
              <h3 className="text-base font-bold text-amber-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Grounded Knowledge Index
              </h3>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-100">Research on Native Vegetation_ Thar Desert.pdf</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold text-[10px]">ACTIVE</span>
                  </div>
                  <p className="text-amber-400/80 text-[11px]">Size: 260 KB | Chunks: 9 Sections | Status: 100% Vectorized</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/40 space-y-1 opacity-80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-100">CAZRI_Flora_Inventory_Table.csv</span>
                    <span className="px-2 py-0.5 rounded bg-amber-900 text-amber-300 font-bold text-[10px]">PARSED</span>
                  </div>
                  <p className="text-amber-400/80 text-[11px]">Size: 140 KB | Records: 29 Species | Status: Synced</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeAdminTab === 'plants' && (
          <div className="p-8 bg-stone-900/90 rounded-3xl border border-amber-800/50 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-amber-100">Botanical Records Registry (29 Monographed Species)</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-amber-950 font-bold text-xs">
                <Plus className="w-4 h-4" /> Add New Species Record
              </button>
            </div>
            <p className="text-amber-400">All 29 species extracted from the monograph are currently loaded and verified in memory.</p>
          </div>
        )}

        {activeAdminTab === 'gis' && (
          <div className="p-8 bg-stone-900/90 rounded-3xl border border-amber-800/50 shadow-2xl space-y-4 text-xs">
            <h3 className="text-lg font-bold text-amber-100">GIS Layer & District Boundary Coordinates</h3>
            <p className="text-amber-400">Active vector layer: Rajasthan District Boundaries GeoJSON v2026.</p>
          </div>
        )}

        {activeAdminTab === 'analytics' && (
          <div className="p-8 bg-stone-900/90 rounded-3xl border border-amber-800/50 shadow-2xl space-y-4 text-xs">
            <h3 className="text-lg font-bold text-amber-100">RAG AI Query Telemetry & Usage Analytics</h3>
            <p className="text-amber-400">Total User Queries Served: 142 | Average Confidence Score: 98.4% | Fallback Rate: 1.2%</p>
          </div>
        )}

      </div>
    </section>
  );
};
