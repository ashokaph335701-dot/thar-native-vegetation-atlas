import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Phone, Building } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="pb-6 border-b border-amber-800/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Research Inquiries & Community Outreach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Contact & Academic Inquiry
          </h2>
          <p className="mt-2 text-sm text-amber-300/80 max-w-3xl">
            Get in touch with our research team, submit herbarium datasets, or contribute traditional ecological knowledge (TEK) records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Contact Form (7 cols) */}
          <div className="md:col-span-7 p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-amber-100">Send an Inquiry or Research Feedback</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <h4 className="text-base font-bold text-emerald-100">Message Received!</h4>
                <p>Thank you for contributing to the Thar Native Vegetation Atlas. Our editorial team will review your submission.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-amber-400 block">Full Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Ramesh Bishnoi"
                      className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-amber-400 block">Email Address:</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@cazri.res.in"
                      className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-amber-400 block">Organization / Institution:</label>
                  <input
                    type="text"
                    placeholder="Central Arid Zone Research Institute (CAZRI), Jodhpur"
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-amber-400 block">Message / TEK Contribution:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share botanical observation notes, traditional usage corrections, or paper citations..."
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-700/50 text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Research Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Institutional Contact Info (5 cols) */}
          <div className="md:col-span-5 p-8 rounded-3xl bg-stone-900/90 border border-amber-800/50 shadow-2xl space-y-6 text-xs">
            <h3 className="text-xl font-bold text-amber-100">Project Secretariat & Coordinates</h3>

            <div className="space-y-4 text-amber-200">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-100 text-sm block">Thar Native Vegetation Atlas Secretariat</strong>
                  <p className="text-amber-300/80">Department of Arid Ecology & Conservation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-100 text-sm block">Location Coordinates</strong>
                  <p className="text-amber-300/80">Jodhpur - Jaisalmer Highway Region, Rajasthan 342003, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-100 text-sm block">Email Contact</strong>
                  <p className="text-amber-300/80">contact@thar-native-atlas.org</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
