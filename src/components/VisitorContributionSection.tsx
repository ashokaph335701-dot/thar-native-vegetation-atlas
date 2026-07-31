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
  const [isAdminMode, setIsAdminMode] = useState(true);
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

  useEffect(() => {
    localStorage.setItem('thar_visitor_submissions', JSON.stringify(submissions));
  }, [submissions]);

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
    
    setLocalName('');
    setHindiName('');
    setCommonName('');
    setScientificName('');
    setDescription('');
    setImageUrl('');
    setContributorName('');

    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const handleApprove = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'approved' } : sub)
    );
    setEditingSubId(null);
  };

  const handleReject = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'rejected' } : sub)
    );
    setEditingSubId(null);
  };

  const handleAdminUpdate = (id: string, updatedFields: Partial<VisitorSubmission>) => {
    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, ...updatedFields } : sub)
    );
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const approvedSubmissions = submissions.filter(s => s.status === 'approved');

  return (
    <section className="py-16 bg-[#F5F1E8] text-[#333333] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E8D8B5] text-[#556B2F] text-xs font-nav font-semibold shadow-sm">
            <User className="w-4 h-4 text-[#6B8E23]" />
            <span>Community Flora Contributions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold text-[#4A3B2A]">
            Contribute Native Flora Photo & Details
          </h2>
          <p className="text-base font-sans text-[#333333]/80 leading-relaxed">
            Visitors can submit photographs and information about Thar trees, shrubs, plants, and vegetables. Submissions are reviewed & edited for grammar by the Admin before being published live!
          </p>

          {/* Navigation & Admin Toggle Ribbon */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E8D8B5] flex-wrap gap-4">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-4 py-2.5 rounded-xl text-xs font-nav font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'submit'
                    ? 'bg-[#B65A3C] text-white shadow-md font-semibold'
                    : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Flora Photo</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2.5 rounded-xl text-xs font-nav font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'admin'
                    ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                    : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Approval Portal ({pendingSubmissions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2.5 rounded-xl text-xs font-nav font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'approved'
                    ? 'bg-[#556B2F] text-white shadow-md font-semibold'
                    : 'bg-[#FAF8F3] text-[#4A3B2A] hover:bg-[#E8D8B5]/40 border border-[#E8D8B5]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approved Flora ({approvedSubmissions.length})</span>
              </button>
            </div>

            {/* Admin Toggle Switch */}
            <div className="flex items-center gap-2 bg-[#FAF8F3] px-3 py-2 rounded-xl border border-[#E8D8B5] text-xs font-nav">
              <span className="text-[#4A3B2A] font-semibold flex items-center gap-1">
                {isAdminMode ? <Unlock className="w-4 h-4 text-[#556B2F]" /> : <Lock className="w-4 h-4 text-[#B65A3C]" />}
                Admin Controls:
              </span>
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  isAdminMode ? 'bg-[#556B2F] text-white' : 'bg-[#E8D8B5] text-[#4A3B2A]'
                }`}
              >
                {isAdminMode ? 'ENABLED (Admin)' : 'DISABLED'}
              </button>
            </div>

          </div>
        </div>

        {/* TAB 1: VISITOR SUBMISSION FORM */}
        {activeTab === 'submit' && (
          <div className="max-w-3xl mx-auto bg-[#FAF8F3] rounded-3xl p-6 sm:p-10 border border-[#E8D8B5] premium-shadow space-y-6">
            <div className="border-b border-[#E8D8B5] pb-4">
              <h3 className="text-3xl font-serif-heading font-bold text-[#4A3B2A] flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-[#B65A3C]" /> Visitor Contribution Form
              </h3>
              <p className="text-xs font-sans text-[#333333]/80">Submit your observation of a native tree, shrub, plant, or traditional vegetable.</p>
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-2xl bg-[#556B2F]/10 border border-[#556B2F] text-[#556B2F] text-sm font-nav font-semibold flex items-center gap-3 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 text-[#556B2F]" />
                <span>Thank you! Your contribution has been submitted and queued for Admin review & approval.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              
              <div className="space-y-1.5">
                <label className="font-nav font-semibold text-[#4A3B2A]">Category:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Tree', 'Shrub', 'Grass', 'Vegetable'] as PlantCategory[]).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`py-3 px-3 rounded-xl font-nav font-medium border text-xs transition-all ${
                        category === cat
                          ? 'bg-[#556B2F] text-white border-[#556B2F] shadow-sm font-semibold'
                          : 'bg-[#F5F1E8] text-[#4A3B2A] border-[#E8D8B5] hover:bg-[#E8D8B5]/40'
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-nav font-semibold text-[#4A3B2A]">Local Name (Desi Name) *:</label>
                  <input
                    type="text"
                    required
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    placeholder="e.g. Khejri, Ker, Sangri, Bordi..."
                    className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-nav font-semibold text-[#4A3B2A]">Hindi Name:</label>
                  <input
                    type="text"
                    value={hindiName}
                    onChange={(e) => setHindiName(e.target.value)}
                    placeholder="e.g. खेजड़ी, केर, सांगरी..."
                    className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-nav font-semibold text-[#4A3B2A]">Scientific Name (Botanical Name):</label>
                  <input
                    type="text"
                    value={scientificName}
                    onChange={(e) => setScientificName(e.target.value)}
                    placeholder="e.g. Prosopis cineraria"
                    className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] italic placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-nav font-semibold text-[#4A3B2A]">English Name:</label>
                  <input
                    type="text"
                    value={commonName}
                    onChange={(e) => setCommonName(e.target.value)}
                    placeholder="e.g. Wonder Tree of Thar"
                    className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-nav font-semibold text-[#4A3B2A]">District Found In:</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] focus:outline-none focus:border-[#556B2F]"
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
                  <label className="font-nav font-semibold text-[#4A3B2A]">Your Name (Contributor):</label>
                  <input
                    type="text"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    placeholder="e.g. Ashok Kumar"
                    className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-nav font-semibold text-[#4A3B2A] flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#556B2F]" /> Plant Photograph:
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#F5F1E8] hover:bg-[#E8D8B5]/50 border border-[#E8D8B5] text-[#4A3B2A] font-nav font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4 text-[#556B2F]" />
                    <span>Upload Image File</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <span className="text-[#333333]/60 text-xs">or paste image URL below:</span>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F]"
                  />
                </div>

                {imageUrl && (
                  <div className="h-40 w-full max-w-sm rounded-xl overflow-hidden bg-[#E8D8B5]/30 border border-[#E8D8B5] mt-2">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-nav font-semibold text-[#4A3B2A]">Plant Details & Observation Description *:</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe where you found this plant, its leaves, flowers, fruits, or traditional uses..."
                  className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#4A3B2A] placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#B65A3C] hover:bg-[#a04b30] text-white font-nav font-semibold text-sm shadow-xl transition-all"
              >
                Submit Contribution for Admin Review
              </button>

            </form>
          </div>
        )}

        {/* TAB 2: ADMIN APPROVAL & EDITING PORTAL */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-8 border border-[#E8D8B5] premium-shadow flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-3xl font-serif-heading font-bold text-[#4A3B2A] flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#556B2F]" /> Admin Approval & Grammar Editing Dashboard
                </h3>
                <p className="text-xs font-sans text-[#333333]/80">Review visitor submissions, edit text for grammar & scientific accuracy, and approve for live display.</p>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-[#556B2F] text-white text-xs font-nav font-semibold">
                {pendingSubmissions.length} Pending Approvals
              </span>
            </div>

            {pendingSubmissions.length === 0 ? (
              <div className="p-12 text-center bg-[#FAF8F3] rounded-3xl border border-[#E8D8B5] text-[#4A3B2A] text-sm font-sans">
                🎉 All visitor submissions have been reviewed! No pending approvals.
              </div>
            ) : (
              <div className="space-y-6">
                {pendingSubmissions.map((sub) => {
                  const isEditing = editingSubId === sub.id;

                  return (
                    <div
                      key={sub.id}
                      className="bg-[#FAF8F3] rounded-3xl border border-[#E8D8B5] p-6 sm:p-8 premium-shadow space-y-4 text-xs font-sans"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-full sm:w-56 h-48 rounded-2xl overflow-hidden bg-[#E8D8B5]/30 shrink-0 border border-[#E8D8B5]">
                          <img src={sub.imageUrl} alt={sub.localName} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-[#556B2F] text-white font-nav font-semibold text-[10px] uppercase">
                              {sub.category}
                            </span>
                            <span className="text-[#6B8E23] text-xs font-nav">Contributed by: <strong>{sub.contributorName}</strong> ({sub.submittedAt})</span>
                          </div>

                          {isEditing ? (
                            <div className="space-y-3 p-4 rounded-2xl bg-[#F5F1E8] border border-[#E8D8B5]">
                              <h4 className="font-serif-heading font-bold text-[#4A3B2A] flex items-center gap-1.5 text-base">
                                <Edit3 className="w-4 h-4 text-[#B65A3C]" /> Edit Visitor Content (Fix Grammar & Scientific Details):
                              </h4>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="font-nav font-semibold text-[#4A3B2A]">Local Name:</label>
                                  <input
                                    type="text"
                                    value={sub.localName}
                                    onChange={(e) => handleAdminUpdate(sub.id, { localName: e.target.value })}
                                    className="w-full p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8D8B5] text-[#4A3B2A]"
                                  />
                                </div>

                                <div>
                                  <label className="font-nav font-semibold text-[#4A3B2A]">Scientific Name:</label>
                                  <input
                                    type="text"
                                    value={sub.scientificName}
                                    onChange={(e) => handleAdminUpdate(sub.id, { scientificName: e.target.value })}
                                    className="w-full p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8D8B5] text-[#4A3B2A] italic"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="font-nav font-semibold text-[#4A3B2A]">Edit Description (Grammar Correction):</label>
                                <textarea
                                  rows={3}
                                  value={sub.description}
                                  onChange={(e) => handleAdminUpdate(sub.id, { description: e.target.value })}
                                  className="w-full p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8D8B5] text-[#4A3B2A]"
                                />
                              </div>

                              <button
                                onClick={() => setEditingSubId(null)}
                                className="px-4 py-2 rounded-xl bg-[#556B2F] text-white font-nav font-semibold text-xs"
                              >
                                Save Edits
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <h4 className="text-2xl font-serif-heading font-bold text-[#4A3B2A]">{sub.localName} ({sub.hindiName})</h4>
                              <p className="font-serif-heading text-lg text-[#B65A3C] italic">{sub.scientificName}</p>
                              <p className="text-[#333333]/90 leading-relaxed">{sub.description}</p>
                            </div>
                          )}

                          <div className="flex items-center gap-3 pt-4 border-t border-[#E8D8B5]">
                            <button
                              onClick={() => handleApprove(sub.id)}
                              className="px-5 py-2.5 rounded-xl bg-[#556B2F] hover:bg-[#465826] text-white font-nav font-semibold transition-all flex items-center gap-2 shadow-sm"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve & Publish Live</span>
                            </button>

                            <button
                              onClick={() => setEditingSubId(isEditing ? null : sub.id)}
                              className="px-4 py-2.5 rounded-xl bg-[#F5F1E8] hover:bg-[#E8D8B5]/50 text-[#4A3B2A] font-nav font-medium border border-[#E8D8B5] transition-all flex items-center gap-2"
                            >
                              <Edit3 className="w-4 h-4 text-[#B65A3C]" />
                              <span>{isEditing ? 'Close Editor' : 'Edit Grammar & Content'}</span>
                            </button>

                            <button
                              onClick={() => handleReject(sub.id)}
                              className="px-4 py-2.5 rounded-xl bg-[#B65A3C] hover:bg-[#a04b30] text-white font-nav font-medium transition-all flex items-center gap-2 ml-auto"
                            >
                              <XCircle className="w-4 h-4" />
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

        {/* TAB 3: APPROVED COMMUNITY FLORA */}
        {activeTab === 'approved' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-[#E8D8B5] flex items-center justify-between">
              <h3 className="text-3xl font-serif-heading font-bold text-[#4A3B2A] flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#556B2F]" /> Admin-Approved Community Flora ({approvedSubmissions.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-[#FAF8F3] rounded-3xl border border-[#E8D8B5] overflow-hidden premium-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full bg-[#E8D8B5]/30">
                      <img src={sub.imageUrl} alt={sub.localName} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#556B2F] text-white text-[10px] font-nav font-semibold uppercase">
                        Admin Verified
                      </div>
                    </div>

                    <div className="p-6 space-y-2 font-sans text-xs">
                      <h4 className="font-serif-heading font-bold text-xl text-[#4A3B2A]">{sub.localName} ({sub.hindiName})</h4>
                      <p className="font-serif-heading text-base text-[#B65A3C] italic">{sub.scientificName}</p>
                      <p className="text-[#333333]/80 leading-relaxed">{sub.description}</p>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-[#F5F1E8] border-t border-[#E8D8B5] text-xs font-nav font-medium text-[#556B2F] flex items-center justify-between">
                    <span>Contributed by: {sub.contributorName}</span>
                    <span className="text-[#556B2F] font-semibold">Approved</span>
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
