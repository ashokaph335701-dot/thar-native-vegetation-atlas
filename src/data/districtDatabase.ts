import { DistrictData } from '../types';

export const districtDatabase: DistrictData[] = [
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    hindiName: 'जैसलमेर',
    rainfallRange: '100 - 180 mm',
    temperatureRange: '2°C - 49°C',
    geomorphology: 'Hyper-arid shifting sand dunes (Sam & Khuri), interdunal flats, hyper-saline playas, and sparse rocky plateaus. Home to the core Great Indian Bustard breeding habitat.',
    dominantVegetation: ['Lasiurus scindicus (Sewan Grass)', 'Prosopis cineraria (Khejri)', 'Calligonum polygonoides (Phog)', 'Capparis decidua (Ker)', 'Citrullus colocynthis (Tumba)'],
    mapCoordinates: { x: 22, y: 44 },
    color: '#D97706'
  },
  {
    id: 'barmer',
    name: 'Barmer',
    hindiName: 'बाड़मेर',
    rainfallRange: '150 - 250 mm',
    temperatureRange: '4°C - 48°C',
    geomorphology: 'Extensive sand dunes, gravelly pediments (Magras), volcanic hillocks (Siwana), and dry salt basins. Rich in traditional ethno-botanical gums and resinous shrubs.',
    dominantVegetation: ['Tecomella undulata (Rohida)', 'Acacia senegal (Kumatiyo)', 'Commiphora wightii (Guggal)', 'Salvadora oleoides (Jaal)', 'Ziziphus nummularia (Bordi)'],
    mapCoordinates: { x: 20, y: 64 },
    color: '#B65A3C'
  },
  {
    id: 'balotra',
    name: 'Balotra',
    hindiName: 'बालोतरा',
    localName: 'Balotra',
    rainfallRange: '200 - 280 mm',
    temperatureRange: '5°C - 47°C',
    geomorphology: 'Luni River basin, saline alluvial tracts, and rocky granite outcrops around Pachpadra salt basin.',
    dominantVegetation: ['Salvadora persica (Meetha Jaal)', 'Capparis decidua (Ker)', 'Acacia nilotica (Babool)', 'Cucumis melo (Kachri)'],
    mapCoordinates: { x: 30, y: 61 },
    color: '#A16207'
  },
  {
    id: 'phalodi',
    name: 'Phalodi',
    hindiName: 'फलोदी',
    rainfallRange: '160 - 220 mm',
    temperatureRange: '3°C - 49°C',
    geomorphology: 'Salt playas (Phalodi Salt Lake), flat interdunal gravel plains, and hyper-arid scrublands.',
    dominantVegetation: ['Salvadora oleoides (Kharo Jaal)', 'Calligonum polygonoides (Phog)', 'Cenchrus biflorus (Bhurat)', 'Calotropis procera (Aak)'],
    mapCoordinates: { x: 34, y: 41 },
    color: '#6B8E23'
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    hindiName: 'जोधपुर',
    rainfallRange: '250 - 360 mm',
    temperatureRange: '5°C - 46°C',
    geomorphology: 'Rocky sandstone plateaus (Marwar Magras), semi-arid alluvial plains, and ancient protected sacred groves (Orans like Khejarli and Osian).',
    dominantVegetation: ['Prosopis cineraria (Khejri)', 'Tecomella undulata (Rohida)', 'Acacia senegal (Kumatiyo)', 'Withania somnifera (Ashwagandha)', 'Cordia dichotoma (Gunda)'],
    mapCoordinates: { x: 40, y: 53 },
    color: '#556B2F'
  },
  {
    id: 'bikaner',
    name: 'Bikaner',
    hindiName: 'बीकानेर',
    rainfallRange: '180 - 300 mm',
    temperatureRange: '2°C - 48°C',
    geomorphology: 'Northern Thar sand dune complexes, interdunal clay depressions, and protected Orans (Deshnoke Karni Mata Oran).',
    dominantVegetation: ['Prosopis cineraria (Khejri)', 'Lasiurus scindicus (Sewan)', 'Calligonum polygonoides (Phog)', 'Aerva javanica (Bui)', 'Panicum turgidum (Murut)'],
    mapCoordinates: { x: 42, y: 28 },
    color: '#92400E'
  },
  {
    id: 'churu',
    name: 'Churu',
    hindiName: 'चूरू',
    rainfallRange: '250 - 350 mm',
    temperatureRange: '-1°C - 49°C',
    geomorphology: 'High-amplitude sand dunes, shifting sand ridges, and Tal Chhapar blackbuck grassland sanctuary.',
    dominantVegetation: ['Calligonum polygonoides (Phog)', 'Prosopis cineraria (Khejri)', 'Cenchrus biflorus (Bhurat)', 'Ziziphus nummularia (Bordi)'],
    mapCoordinates: { x: 57, y: 23 },
    color: '#78350F'
  },
  {
    id: 'nagaur',
    name: 'नागौर',
    hindiName: 'नागौर',
    rainfallRange: '300 - 400 mm',
    temperatureRange: '4°C - 46°C',
    geomorphology: 'Central Rajasthan alluvial plains, saline depressions (Didwana & Sambhar basin edges), and dense agricultural Khejri agroforestry belts.',
    dominantVegetation: ['Prosopis cineraria (Khejri)', 'Acacia nilotica (Babool)', 'Ziziphus mauritiana (Ber)', 'Cucumis melo (Kachri)', 'Boerhavia diffusa (Punarnava)'],
    mapCoordinates: { x: 50, y: 44 },
    color: '#B65A3C'
  },
  {
    id: 'pali',
    name: 'Pali',
    hindiName: 'पाली',
    rainfallRange: '350 - 500 mm',
    temperatureRange: '6°C - 44°C',
    geomorphology: 'Western Aravalli foothills, gravelly stream beds, and semi-arid savannah transition zone.',
    dominantVegetation: ['Acacia senegal (Kumatiyo)', 'Tecomella undulata (Rohida)', 'Dalbergia sissoo (Shisham)', 'Saccharum bengalense (Munj)'],
    mapCoordinates: { x: 44, y: 66 },
    color: '#556B2F'
  },
  {
    id: 'jalor',
    name: 'Jalor',
    hindiName: 'जालौर',
    rainfallRange: '300 - 450 mm',
    temperatureRange: '6°C - 45°C',
    geomorphology: 'Granite hills (Jalor Fort hillocks), Luni river floodplains, and southern desert scrub boundary.',
    dominantVegetation: ['Tecomella undulata (Rohida)', 'Acacia senegal (Kumatiyo)', 'Capparis decidua (Ker)', 'Salvadora oleoides (Jaal)'],
    mapCoordinates: { x: 32, y: 73 },
    color: '#D97706'
  }
];
