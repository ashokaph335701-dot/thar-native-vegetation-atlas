import { ResearchDocument } from '../types';

export const researchPapers: ResearchDocument[] = [
  {
    id: 'monograph-thar-flora-2026',
    title: 'Comprehensive Monograph on the Flora of the Thar Desert: Ecology, Ethnobotany, and Cultural Heritage',
    authors: 'Central Arid Zone Research Institute (CAZRI) & Indian Botanical Survey',
    year: 2026,
    publication: 'Journal of Arid Ecosystems & Indigenous Knowledge Systems',
    fileSize: '260 KB',
    abstract: 'An exhaustive scientific monograph analyzing the 682 to 775 identified plant species of the Thar Desert in Rajasthan. Details geomorphology, climate extremes (0°C to 50°C), district-wise distribution across Jaisalmer, Barmer, Jodhpur, and Bikaner, Traditional Ecological Knowledge (TEK), Panchkuta famine culinary heritage, Bishnoi sacred grove conservation history, and severe threats posed by invasive Prosopis juliflora.',
    sections: [
      {
        title: 'Section 1: Introduction & Ecosystem Paradox',
        content: `The Great Indian Desert (Thar Desert) covers ~385,000 sq km primarily in Rajasthan. It is the most densely populated desert on Earth with >80 persons/sq km. Historically a verdant plain along the Saraswati and Ghaggar rivers. Today sustained by specialized agro-pastoral communities including Bishnoi, Raika, Rebari, Charan, Meghwal, Bhil, Garasia, and Jat.`
      },
      {
        title: 'Section 2: Geomorphological, Climatic & Edaphic Context',
        content: `Bounded by the Aravalli Range to the east. Diurnal temperature swings from -2°C in winter to 50°C in summer. Rainfall gradient: 100-150 mm in hyper-arid western Jaisalmer up to 500 mm near Aravallis. Micro-habitats: Sand Dunes (44% area, 70-120m height), Interdunal Flats, Magras (Rocky Outcrops around Jodhpur & Barmer), and Playas (Saline Depressions, ~720,000 hectares).`
      },
      {
        title: 'Section 3: Ecophysiological Adaptations & Species Counts',
        content: `Comprises 682 to 775 identified species, 352 genera, 87 families with 6.4% regional endemism. Xerophytic adaptations include reduced leaf surface area, thick waxy cuticles, thorns/spines breaking wind boundary layers, dimorphic root systems plunge up to 30m into aquifers, seed banks dormant until monsoon.`
      },
      {
        title: 'Section 4: District-Wise Distribution of Native Flora',
        content: `Jaisalmer (Hyper-arid, 100-150mm): Core habitat for Sewan grass (Lasiurus scindicus), sand binders Phog (Calligonum polygonoides), Bui (Aerva javanica), Tumba (Citrullus colocynthis). Barmer (Mixed sandy & Magras): Lithophytic flora Kumatiyo (Acacia senegal), Guggal (Commiphora wightii), Thor (Euphorbia caducifolia), Rohida (Tecomella undulata), Kair (Capparis decidua). Jodhpur (Transition zone): Guggal, Gangeti (Grewia tenax), Khejri (Prosopis cineraria), Bordi (Ziziphus nummularia), Babool (Acacia nilotica). Bikaner (Sandy & Playas): Sewan grass, Kharo Jaal (Salvadora oleoides), Lani (Salsola baryosma), Suaeda fruticosa.`
      },
      {
        title: 'Section 5: Keystone Arboreal Flora & Traditional Ecological Knowledge (TEK)',
        content: `Prosopis cineraria (Khejri): State Tree of Rajasthan. Taproot up to 30m. Nitrogen fixer. 100% canopy lopping before winter yields 25-30kg dry loong fodder while letting light reach bajra crops. Founded in 1485 AD, Bishnoi sect strictly protects Khejri in Orans; Amrita Devi & 362 Bishnois sacrificed lives in 1730 AD at Khejarli. Slender pods (sangri) used in Panchkuta. Tecomella undulata (Rohida): State Flower. Termite-resistant wood (lapachol) used for Gada wheels. Bark yields Rohitakarishta for hepatosplenomegaly & jaundice; leaves yield betulinic acid (anti-HIV). Acacia senegal (Kumatiyo): Tapped for gum arabic; seeds (kumatiya) in Panchkuta. Salvadora oleoides/persica (Jaal/Peelu): Halophytes, sweet berries (peelu) for summer hydration, Miswak oral hygiene sticks. Balanites aegyptiaca (Hingot): Natural fences (badas), woody fruits used medicinally and historically packed for Diwali firecrackers.`
      },
      {
        title: 'Section 6: Understory Shrubs, Ethnomedicinal Herbs & Graminoids',
        content: `Capparis decidua (Ker): Photosynthetic green stems, berries cured in salt water for Panchkuta & Sheetla Saptami. Proverb: "Famine says I will strike seven times; the Ker replies I will bloom seven times". Ziziphus nummularia (Bordi): Leaves (Pala) fodder, pyre bases. Calligonum polygonoides (Phog): Sand binder, flowers (phogalo) in raita, roots make high-temp iron smelting charcoal. Commiphora wightii (Guggal): Critically Endangered on Magras, resin lowers cholesterol (guggulsterones). Calotropis procera (Aak): Toxic latex for blisters, sacred to Shiva. Citrullus colocynthis (Tumba): Toxic seeds boiled & mixed with bajra flour during famines. Cucumis melo var. callosus (Kachri): Wild sour melon in Panchkuta. Lasiurus scindicus (Sewan Grass): High-protein grass for Rathi dairy cattle and mandatory nesting habitat for Critically Endangered Great Indian Bustard (Ardeotis nigriceps). Cenchrus biflorus (Bhurat): Spiky seeds milled into famine flour. Panicum turgidum (Murut), Dactyloctenium sindicum (Ganthia), Saccharum bengalense (Munj).`
      },
      {
        title: 'Section 7: Agro-Pastoralism & Panchkuta Famine Foods',
        content: `Khejri-Bajra symbiosis: Intercroppping Khejri (30-200 trees/ha) with Bajra increases farm income from Rs 1,600/ha to Rs 4,600/ha. Panchkuta 5 ingredients: Ker (Capparis decidua), Sangri (Prosopis cineraria), Kumatiya (Acacia senegal), Gunda/Leswa (Cordia dichotoma), Kachri (Cucumis melo var. callosus). Soaked overnight, boiled, tempered in mustard oil. Today Ker retails at Rs 2,000/kg and Sangri at Rs 1,600/kg.`
      },
      {
        title: 'Section 8: Ecological Disruptions & Biological Invasions',
        content: `Prosopis juliflora (Vilayati Kikar / Mesquite): Destructive invasive introduced mid-20th century. Highly allelopathic, monopolizes groundwater, shades out understory fodder grasses (Sewan), forms impenetrable thickets fatal to Great Indian Bustard, Chinkara, and Blackbuck. Infrastructure threats: High-tension power lines in solar/wind parks cause up to 6 GIB collisions/km/month. Canal waterlogging from IGNP canal.`
      },
      {
        title: 'Section 9: Conservation Frameworks & Grassland Regeneration',
        content: `Requires manual eradication of Prosopis juliflora, aggressive reseeding of Sewan grass (Lasiurus scindicus), 2-year protected enclosures (Khetolai BNHS model), and underground power lines in GIB nesting grounds.`
      }
    ]
  }
];
