import React from 'react';
import { researchPapers } from '../data/researchPapers';
import { BookOpen, FileText, Download, ShieldCheck, ExternalLink, Search } from 'lucide-react';

export const ResearchLibrary: React.FC = () => {
  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Botanical Index & Peer-Reviewed Literature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Research Library & Botanical Papers
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-3xl">
            Access, view, and cite peer-reviewed monographs, government publications, flora surveys, and CAZRI research bulletins used to train the Thar Botanist AI.
          </p>
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {researchPapers.map((paper) => (
            <div
              key={paper.id}
              className="p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-amber-800/40">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-bold border border-amber-700/40">
                    Publication Year: {paper.year} • Size: {paper.fileSize}
                  </span>
                  <h3 className="text-xl font-extrabold text-amber-100 mt-2">{paper.title}</h3>
                  <p className="text-xs font-semibold text-amber-400">{paper.authors} — <em>{paper.publication}</em></p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="./Research on Native Vegetation_ Thar Desert.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs shadow-lg transition-all"
                  >
                    <Download className="w-4 h-4" /> Download PDF Monograph
                  </a>
                </div>
              </div>

              {/* Abstract */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Executive Abstract:</span>
                <p className="text-amber-200/90 leading-relaxed bg-amber-950/40 p-4 rounded-xl border border-amber-800/40">
                  {paper.abstract}
                </p>
              </div>

              {/* Sections Accordion Grid */}
              <div className="space-y-3 pt-2 text-xs">
                <span className="font-bold text-amber-300 text-sm">Indexed Monograph Sections (RAG Vector Chunks):</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paper.sections.map((sec, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-amber-950/50 border border-amber-800/30 space-y-1.5">
                      <h4 className="font-bold text-amber-200 text-xs flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400" /> {sec.title}
                      </h4>
                      <p className="text-amber-300/80 text-[11px] line-clamp-3 leading-relaxed">{sec.content}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
