import { HabitatData } from '../types';

export const habitatDatabase: HabitatData[] = [
  {
    id: 'sand-dunes',
    name: 'Sand Dunes & Shifting Sands',
    localTerm: 'रेत के टीले (Dhoras)',
    areaCoveragePercent: 44,
    overview: 'Sand dunes occupy approximately 44% of the Thar Desert total area. These semi-stable to shifting dunes range from 70 to 120 meters in height, possessing porous topsoil consisting of 60% to 90% fine sand.',
    nativeFlora: ['Calligonum polygonoides (Phog)', 'Aerva javanica (Bui)', 'Citrullus colocynthis (Tumba)', 'Leptadenia pyrotechnica (Khip)', 'Panicum turgidum (Murut)'],
    typicalFauna: ['Spiny-tailed Lizard (Uromastyx)', 'Desert Fox', 'Sand Grouse', 'Saw-scaled Viper'],
    climate: 'Extreme diurnal heat, erratic rainfall (100–250 mm), intense wind erosion.',
    ecologicalImportance: 'Core sand stabilization zone; acts as windbreaks reducing dust storms and desert expansion.',
    threats: ['Mechanized dune leveling for commercial farming', 'Over-grazing by unmanaged herds'],
    conservationPractices: ['Restoration through biological sand binders (Phog, Khip)', 'Protection of natural vegetation crusts'],
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'interdunal-flats',
    name: 'Interdunal Flats',
    localTerm: 'टीलों के बीच के मैदान',
    areaCoveragePercent: 25,
    overview: 'Nestled between shifting dunes, these harder, more compacted surfaces retain rainwater longer, supporting denser assemblages of herbaceous and graminoid vegetation.',
    nativeFlora: ['Prosopis cineraria (Khejri)', 'Capparis decidua (Ker)', 'Ziziphus nummularia (Bordi)', 'Cucumis melo var. callosus (Kachri)'],
    typicalFauna: ['Chinkara (Indian Gazelle)', 'Desert Hare', 'Partridge', 'Desert Cat'],
    climate: 'Moderate water retention post-monsoon, high summer evaporation.',
    ecologicalImportance: 'Main agricultural & pastoral grazing grounds of traditional Thar communities.',
    threats: ['Groundwater table depletion', 'Chemical fertilizer run-off'],
    conservationPractices: ['Khejri-Bajra traditional agroforestry intercropping', 'Water harvesting via Kunds and Tanka'],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'magras',
    name: 'Rocky Outcrops & Hillocks',
    localTerm: 'मगरा (Magras)',
    areaCoveragePercent: 12,
    overview: 'Discontinuous rocky hillocks feature stiff gravelly surfaces that restrict deep root penetration, colonized by specialized lithophytic and xerophytic flora.',
    nativeFlora: ['Acacia senegal (Kumatiyo)', 'Commiphora wightii (Guggal)', 'Euphorbia caducifolia (Thor)', 'Anogeissus pendula (Dhok)'],
    typicalFauna: ['Rock Agama Lizard', 'Leopard (in southern fringes)', 'Porcupine', 'Eagle Owl'],
    climate: 'Low soil water retention, high solar radiation on bare rock surfaces.',
    ecologicalImportance: 'Refugium for rare medicinal species like endangered Guggal; catchment zone for rainfall run-off.',
    threats: ['Illegal stone mining and quarrying', 'Unregulated resin extraction'],
    conservationPractices: ['Establishment of protected rock parks', 'Community bans on destructive resin tapping'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'playas',
    name: 'Saline Basins & Playas',
    localTerm: 'खारे पानी के रन (Rann / Playas)',
    areaCoveragePercent: 8,
    overview: 'Encompassing roughly 720,000 hectares, these low-lying basins accumulate toxic concentrations of evaporated salts, supporting specialized halophytic plants.',
    nativeFlora: ['Salvadora oleoides (Kharo Jaal)', 'Salvadora persica (Meetha Jaal)', 'Salsola baryosma (Lani)', 'Suaeda fruticosa', 'Tamarix aphylla'],
    typicalFauna: ['Greater & Lesser Flamingos', 'Migratory Waders', 'Desert Jackal'],
    climate: 'Hyper-saline soils, shallow waterlogging during monsoon followed by crusted salt flats in summer.',
    ecologicalImportance: 'Unique halophytic habitat; crucial hydration and feeding site for migratory waterbirds.',
    threats: ['Commercial salt manufacturing expansion', 'Hydrological blockage by dams'],
    conservationPractices: ['Regulated salt mining buffers', 'Protection of old Jaal tree groves'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'grasslands',
    name: 'Sewan Pasturelands & Grasslands',
    localTerm: 'ओरण एवं राखल (Sewan Grasslands)',
    areaCoveragePercent: 7,
    overview: 'Open short-grass plains formed predominantly by high-protein Sewan grass (Lasiurus scindicus). Historically protected as princely reserves (Rakhal).',
    nativeFlora: ['Lasiurus scindicus (Sewan Grass)', 'Cenchrus biflorus (Bhurat)', 'Panicum turgidum (Murut)', 'Dactyloctenium sindicum (Ganthia)'],
    typicalFauna: ['Great Indian Bustard (Godawan)', 'Lesser Florican', 'Blackbuck', 'Spiny-tailed Lizard'],
    climate: 'Low precipitation (100–250 mm), open high-visibility savanna structure.',
    ecologicalImportance: 'Exclusive breeding and nesting habitat for the Critically Endangered Great Indian Bustard.',
    threats: ['Prosopis juliflora invasive thickets', 'High-tension power line collisions', 'Canal irrigation expansion'],
    conservationPractices: ['Underground power line cabling', 'Fencing predator-proof enclosures (Khetolai model)', 'Prosopis eradication'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'orans',
    name: 'Sacred Groves & Community Forests',
    localTerm: 'ओरण (Orans)',
    areaCoveragePercent: 4,
    overview: 'Community-conserved sacred virgin forests dedicated to local deities (e.g., Degrai Mata, Khejarli). Felling any green tree inside an Oran is strictly prohibited by socio-religious code.',
    nativeFlora: ['Prosopis cineraria (Khejri)', 'Salvadora oleoides (Jaal)', 'Tecomella undulata (Rohida)', 'Commiphora wightii (Guggal)'],
    typicalFauna: ['Vultures', 'Chinkara', 'Peafowl', 'Golden Jackal'],
    climate: 'Microclimate with higher relative humidity and dense canopy shade compared to surrounding degraded lands.',
    ecologicalImportance: 'Gene banks for indigenous desert flora; pristine wildlife corridors.',
    threats: ['Solar/wind energy park land acquisitions', 'Encroachment and loss of community titling'],
    conservationPractices: ['Legal recognition of Orans as Conservation Reserves', 'Bishnoi community vigilance'],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80'
  }
];
