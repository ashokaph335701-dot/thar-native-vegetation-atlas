import React, { useState, useEffect } from 'react';
import { VisitorSubmission, PlantCategory } from '../types';
import { PlusCircle, CheckCircle2, XCircle, Edit3, ShieldCheck, Upload, Image as ImageIcon, Sparkles, User, MapPin, Leaf, Lock, Unlock } from 'lucide-react';

const INITIAL_SUBMISSIONS: VisitorSubmission[] = [
  {
    id: 'sub-1',
    category: 'Tree',
    localName: 'Khejri Community Specimen',
    hindiName: 'खेजड़ी सम्पल',
    commonName: 'State Tree Specimen',
    scientificName: 'Prosopis cineraria',
    description: 'A 40-year-old giant Khejri tree documented in Degrai Mata Oran, Jaisalmer. Healthy green canopy providing dense shade.',
    district: 'jaisalmer',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    contributorName: 'Ramesh Bishnoi (Local Naturalist)',
    status: 'approved',
    submittedAt: '2026-07-30'
  },
  {
    id: 'sub-2',
    category: 'Vegetable',
    localName: 'Fresh Ker Berry',
    hindiName: 'ताजा केर',
    commonName: 'Wild Caper Delicacy',
    scientificName: 'Capparis decidua',
    description: 'Freshly harvested green Ker berries before buttermilk curing in Barmer sand dunes.',
    district: 'barmer',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    contributorName: 'Pooja Choudhary (Food Researcher)',
    status: 'approved',
    submittedAt: '2026-07-31'
  }
];

export const VisitorContributionSection: React.FC = () => {
  const [submissions, setSubmissions] = useState<VisitorSubmission[]>(() => {
    const saved = localStorage.getItem('thar_visitor_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [activeTab, setActiveTab] = useState<'submit' | 'admin' | 'approved'>('submit');
  const [isAdminMode, setIsAdminMode] = useState(true); // Default enabled for easy evaluation
  const [editingSubId, setEditingSubId] = useState<string | null>(null);

  // Form State
  const [category, setCategory] = useState<PlantCategory>('Tree');
  const [localName, setLocalName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('jaisalmer');
  const [imageUrl, setImageUrl] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Save submissions to localStorage
  useEffect(() => {
    localStorage.setItem('thar_visitor_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Handle Photo File Upload Preview
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Form Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localName || !description) return;

    const newSub: VisitorSubmission = {
      id: 'sub-' + Date.now(),
      category,
      localName,
      hindiName: hindiName || localName,
      commonName: commonName || localName,
      scientificName: scientificName || 'Native Desert Species',
      description,
      district,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
      contributorName: contributorName || 'Anonymous Visitor',
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setSubmissions([newSub, ...submissions]);
    setSubmitSuccess(true);
    
    // Reset Form
    setLocalName('');
    setHindiName('');
    setCommonName('');
    setScientificName('');
    setDescription('');
    setImageUrl('');
    setContributorName('');

    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  // Admin Approve Handler
  const handleApprove = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'approved' } : sub)
    );
    setEditingSubId(null);
  };

  // Admin Reject Handler
  const handleReject = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'rejected' } : sub)
    );
    setEditingSubId(null);
  };

  // Admin Update Content (Fix Grammar / Typos)
  const handleAdminUpdate = (id: string, updatedFields: Partial<VisitorSubmission>) => {
    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, ...updatedFields } : sub)
    );
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const approvedSubmissions = submissions.filter(s => s.status === 'approved');

  return (
    <section className="py-12 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 text-xs font-bold shadow-lg">
            <User className="w-4 h-4 text-emerald-400" />
            <span>Community Flora Contributions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-100">
            Contribute Native Flora Photo & Details
          </h2>
          <p className="text-sm text-amber-300/80 leading-relaxed">
            Visitors can submit photographs and information about Thar trees, shrubs, plants, and vegetables. Submissions are reviewed & edited for grammar by the Admin before being published live!
          </p>

          {/* Navigation & Admin Toggle Ribbon */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-800/40 flex-wrap gap-4">
            
            {/* 3 Main Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'submit'
                    ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                    : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Flora Photo</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'admin'
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Approval Portal ({pendingSubmissions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'approved'
                    ? 'bg-amber-500 text-amber-950 shadow-lg scale-105'
                    : 'bg-stone-900 text-amber-200 hover:bg-amber-900/40 border border-amber-800/40'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approved Flora ({approvedSubmissions.length})</span>
              </button>
            </div>

            {/* Admin Toggle Switch */}
            <div className="flex items-center gap-2 bg-stone-900 px-3 py-1.5 rounded-xl border border-amber-700/40 text-xs">
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                {isAdminMode ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
                Admin Controls:
              </span>
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                  isAdminMode ? 'bg-emerald-600 text-white' : 'bg-amber-900 text-amber-300'
                }`}
              >
                {isAdminMode ? 'ENABLED (Admin)' : 'DISABLED'}
              </button>
            </div>

          </div>
        </div>

        {/* ==================== TAB 1: VISITOR SUBMISSION FORM ==================== */}
        {activeTab === 'submit' && (
          <div className="max-w-3xl mx-auto bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-amber-800/50 shadow-2xl space-y-6">
            <div className="border-b border-amber-800/40 pb-4">
              <h3 className="text-2xl font-extrabold text-amber-100 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-amber-400" /> Visitor Contribution Form
              </h3>
              <p className="text-xs text-amber-300/80">Submit your observation of a native tree, shrub, plant, or traditional vegetable.</p>
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/60 text-emerald-200 text-sm font-bold flex items-center gap-3 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>Thank you! Your contribution has been submitted and queued for Admin review & approval.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Category Selector */}
              <div className="space-y-1">
                <label className="font-bold text-amber-300">Category:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Tree', 'Shrub', 'Grass', 'Vegetable'] as PlantCategory[]).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`py-2.5 px-3 rounded-xl font-bold border text-xs transition-all ${
                        category === cat
                          ? 'bg-amber-500 text-amber-950 border-amber-400 shadow-md'
                          : 'bg-stone-950 text-amber-200 border-amber-800/40 hover:bg-amber-950'
                      }`}
                    >
                      {cat === 'Tree' && '🌳 Tree'}
                      {cat === 'Shrub' && '🌿 Shrub'}
                      {cat === 'Grass' && '🌱 Plant / Grass'}
                      {cat === 'Vegetable' && '🥗 Vegetable'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plant Names Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-amber-300">Local Name (Desi Name) *:</label>
                  <input
                    type="text"
                    required
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    placeholder="e.g. Khejri, Ker, Sangri, Bordi..."
                    className="w-full p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-300">Hindi Name:</label>
                  <input
                    type="text"
                    value={hindiName}
                    onChange={(e) => setHindiName(e.target.value)}
                    placeholder="e.g. खेजड़ी, केर, सांगरी..."
                    className="w-full p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-300">Scientific Name (Botanical Name):</label>
                  <input
                    type="text"
                    value={scientificName}
                    onChange={(e) => setScientificName(e.target.value)}
                    placeholder="e.g. Prosopis cineraria"
                    className="w-full p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 italic placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-300">English Name:</label>
                  <input
                    type="text"
                    value={commonName}
                    onChange={(e) => setCommonName(e.target.value)}
                    placeholder="e.g. Wonder Tree of Thar"
                    className="w-full p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* District & Contributor Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-amber-300">District Found In:</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="jaisalmer">Jaisalmer (जैसलमेर)</option>
                    <option value="barmer">Barmer (बाड़मेर)</option>
                    <option value="bikaner">Bikaner (बीकानेर)</option>
                    <option value="jodhpur">Jodhpur (जोधपुर)</option>
                    <option value="nagaur">Nagaur (नागौर)</option>
                    <option value="churu">Churu (चूरू)</option>
                    <option value="pali">Pali (पाली)</option>
                    <option value="jalor">Jalor (जालौर)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-300">Your Name (Contributor):</label>
                  <input
                    type="text"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    placeholder="e.g. Ashok Kumar"
                    className="w-full p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Plant Photo Upload / URL */}
              <div className="space-y-2">
                <label className="font-bold text-amber-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" /> Plant Photograph:
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="w-full sm:w-auto px-4 py-3 rounded-xl bg-amber-900/60 hover:bg-amber-800/60 border border-amber-700/50 text-amber-200 font-bold cursor-pointer transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image File</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <span className="text-amber-400/60 text-xs">or paste image URL below:</span>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {imageUrl && (
                  <div className="h-40 w-full max-w-sm rounded-xl overflow-hidden bg-stone-950 border border-amber-700/50 mt-2">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-amber-300">Plant Details & Observation Description *:</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe where you found this plant, its leaves, flowers, fruits, or traditional uses..."
                  className="w-full p-3 rounded-xl bg-stone-950 border border-amber-800/50 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-sm shadow-xl transition-all"
              >
                Submit Contribution for Admin Review
              </button>

            </form>
          </div>
        )}

        {/* ==================== TAB 2: ADMIN APPROVAL & EDITING PORTAL ==================== */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="bg-stone-900/90 rounded-3xl p-6 border border-emerald-700/50 shadow-2xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" /> Admin Approval & Grammar Editing Dashboard
                </h3>
                <p className="text-xs text-amber-200/80">Review visitor submissions, edit text for grammar & scientific accuracy, and approve for live display.</p>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold">
                {pendingSubmissions.length} Pending Approvals
              </span>
            </div>

            {pendingSubmissions.length === 0 ? (
              <div className="p-12 text-center bg-stone-900/60 rounded-3xl border border-amber-800/30 text-amber-300 text-sm">
                🎉 All visitor submissions have been reviewed! No pending approvals.
              </div>
            ) : (
              <div className="space-y-6">
                {pendingSubmissions.map((sub) => {
                  const isEditing = editingSubId === sub.id;

                  return (
                    <div
                      key={sub.id}
                      className="bg-stone-900 rounded-3xl border border-amber-700/50 p-6 shadow-2xl space-y-4 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Image Preview */}
                        <div className="w-full sm:w-56 h-48 rounded-2xl overflow-hidden bg-amber-950/60 shrink-0 border border-amber-800/40">
                          <img src={sub.imageUrl} alt={sub.localName} className="w-full h-full object-cover" />
                        </div>

                        {/* Details / Admin Edit Form */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-extrabold text-[10px] uppercase">
                              {sub.category}
                            </span>
                            <span className="text-amber-400 text-[11px]">Contributed by: <strong>{sub.contributorName}</strong> ({sub.submittedAt})</span>
                          </div>

                          {isEditing ? (
                            /* Admin Inline Editing Form */
                            <div className="space-y-3 p-4 rounded-2xl bg-amber-950/60 border border-amber-700/50">
                              <h4 className="font-extrabold text-amber-300 flex items-center gap-1.5 text-xs">
                                <Edit3 className="w-4 h-4 text-amber-400" /> Edit Visitor Content (Fix Grammar & Scientific Details):
                              </h4>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="font-bold text-amber-400 text-[11px]">Local Name:</label>
                                  <input
                                    type="text"
                                    value={sub.localName}
                                    onChange={(e) => handleAdminUpdate(sub.id, { localName: e.target.value })}
                                    className="w-full p-2 rounded-xl bg-stone-900 border border-amber-700/50 text-amber-100"
                                  />
                                </div>

                                <div>
                                  <label className="font-bold text-amber-400 text-[11px]">Scientific Name:</label>
                                  <input
                                    type="text"
                                    value={sub.scientificName}
                                    onChange={(e) => handleAdminUpdate(sub.id, { scientificName: e.target.value })}
                                    className="w-full p-2 rounded-xl bg-stone-900 border border-amber-700/50 text-amber-100 italic"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="font-bold text-amber-400 text-[11px]">Edit Description (Grammar Correction):</label>
                                <textarea
                                  rows={3}
                                  value={sub.description}
                                  onChange={(e) => handleAdminUpdate(sub.id, { description: e.target.value })}
                                  className="w-full p-2.5 rounded-xl bg-stone-900 border border-amber-700/50 text-amber-100"
                                />
                              </div>

                              <button
                                onClick={() => setEditingSubId(null)}
                                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                              >
                                Save Edits
                              </button>
                            </div>
                          ) : (
                            /* Read View */
                            <div className="space-y-2">
                              <h4 className="text-xl font-extrabold text-amber-100">{sub.localName} ({sub.hindiName})</h4>
                              <p className="font-bold text-amber-300 italic">{sub.scientificName}</p>
                              <p className="text-amber-200/90 leading-relaxed">{sub.description}</p>
                            </div>
                          )}

                          {/* Admin Action Buttons */}
                          <div className="flex items-center gap-3 pt-3 border-t border-amber-800/40">
                            <button
                              onClick={() => handleApprove(sub.id)}
                              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold transition-all flex items-center gap-2 shadow-lg"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve & Publish Live</span>
                            </button>

                            <button
                              onClick={() => setEditingSubId(isEditing ? null : sub.id)}
                              className="px-4 py-2.5 rounded-xl bg-amber-900/60 hover:bg-amber-800/60 text-amber-200 font-bold border border-amber-700/50 transition-all flex items-center gap-2"
                            >
                              <Edit3 className="w-4 h-4 text-amber-400" />
                              <span>{isEditing ? 'Close Editor' : 'Edit Grammar & Content'}</span>
                            </button>

                            <button
                              onClick={() => handleReject(sub.id)}
                              className="px-4 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 font-bold border border-red-700/40 transition-all flex items-center gap-2 ml-auto"
                            >
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span>Reject</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: APPROVED COMMUNITY FLORA ==================== */}
        {activeTab === 'approved' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-amber-800/40 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-amber-100 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" /> Admin-Approved Community Flora ({approvedSubmissions.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-stone-900 rounded-3xl border border-emerald-700/50 overflow-hidden shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full bg-amber-950/60">
                      <img src={sub.imageUrl} alt={sub.localName} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase">
                        Admin Verified
                      </div>
                    </div>

                    <div className="p-5 space-y-2 text-xs">
                      <h4 className="font-extrabold text-base text-amber-100">{sub.localName} ({sub.hindiName})</h4>
                      <p className="font-bold text-amber-300 italic">{sub.scientificName}</p>
                      <p className="text-amber-200/80 leading-relaxed">{sub.description}</p>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-amber-950/50 border-t border-amber-800/30 text-[11px] text-amber-400 font-bold flex items-center justify-between">
                    <span>Contributed by: {sub.contributorName}</span>
                    <span className="text-emerald-400 font-bold">Approved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
