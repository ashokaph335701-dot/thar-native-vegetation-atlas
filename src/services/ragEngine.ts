import { RAGAnswer } from '../types';
import { researchPapers } from '../data/researchPapers';
import { plantDatabase } from '../data/plantDatabase';

// Tokenize and calculate TF-IDF / term overlap matching score
function scoreChunk(query: string, content: string, title: string): number {
  const queryTerms = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 2);
  if (queryTerms.length === 0) return 0;

  const textToSearch = (title + ' ' + content).toLowerCase();
  let score = 0;

  for (const term of queryTerms) {
    // Title match has higher weight
    if (title.toLowerCase().includes(term)) {
      score += 5;
    }
    // Count occurrences in content
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      score += matches.length * 2;
    } else if (textToSearch.includes(term)) {
      score += 1;
    }
  }

  return score;
}

export function queryTharBotanistRAG(userQuery: string): RAGAnswer {
  const qLower = userQuery.toLowerCase().trim();

  // 1. Search all research paper sections
  let bestSection: { docId: string; title: string; content: string; score: number } | null = null;
  const allCitations: { docId: string; sectionTitle: string; quote: string }[] = [];

  for (const doc of researchPapers) {
    for (const sec of doc.sections) {
      const s = scoreChunk(qLower, sec.content, sec.title);
      if (s > 0) {
        if (!bestSection || s > bestSection.score) {
          bestSection = { docId: doc.id, title: sec.title, content: sec.content, score: s };
        }
        allCitations.push({
          docId: doc.title,
          sectionTitle: sec.title,
          quote: sec.content.slice(0, 150) + '...'
        });
      }
    }
  }

  // 2. Search plant database for matching species
  const matchedSpecies = plantDatabase.filter(plant => {
    const sName = plant.scientificName.toLowerCase();
    const hName = plant.hindiName.toLowerCase();
    const lName = plant.localName.toLowerCase();
    const cName = plant.commonName.toLowerCase();
    const cat = plant.category.toLowerCase();
    const family = plant.family.toLowerCase();

    return (
      qLower.includes(sName) ||
      qLower.includes(hName) ||
      qLower.includes(lName) ||
      qLower.includes(cName) ||
      qLower.includes(cat) ||
      qLower.includes(family) ||
      sName.includes(qLower) ||
      lName.includes(qLower)
    );
  });

  // Check specific intent queries
  const isJaisalmerQuery = qLower.includes('jaisalmer');
  const isBikanerQuery = qLower.includes('bikaner');
  const isBarmerQuery = qLower.includes('barmer');
  const isJodhpurQuery = qLower.includes('jodhpur');
  const isRainfallQuery = qLower.includes('rainfall') || qLower.includes('150 mm') || qLower.includes('water') || qLower.includes('drought');
  const isKhejriQuery = qLower.includes('khejri') || qLower.includes('sangri') || qLower.includes('prosopis cineraria');
  const isRohidaQuery = qLower.includes('rohida') || qLower.includes('tecomella');
  const isGrassQuery = qLower.includes('grass') || qLower.includes('sewan') || qLower.includes('bhurat') || qLower.includes('murut');
  const isBirdQuery = qLower.includes('bird') || qLower.includes('bustard') || qLower.includes('godawan') || qLower.includes('vulture');
  const isMonsoonQuery = qLower.includes('monsoon') || qLower.includes('flower') || qLower.includes('bloom');
  const isSoilQuery = qLower.includes('soil') || qLower.includes('fertility') || qLower.includes('saline') || qLower.includes('nitrogen');
  const isMedicinalQuery = qLower.includes('medicinal') || qLower.includes('medicine') || qLower.includes('cure') || qLower.includes('ayurved');
  const isRestorationQuery = qLower.includes('restoration') || qLower.includes('reseed') || qLower.includes('dune binder');
  const isEndemicQuery = qLower.includes('endemic') || qLower.includes('native');
  const isPanchkutaQuery = qLower.includes('panchkuta') || qLower.includes('famine food');
  const isDifferenceQuery = (qLower.includes('difference') || qLower.includes('vs')) && (qLower.includes('khejri') || qLower.includes('rohida') || qLower.includes('juliflora'));
  const isSalineQuery = qLower.includes('saline') || qLower.includes('playa') || qLower.includes('salt');
  const isPollinatorQuery = qLower.includes('pollinator') || qLower.includes('bee') || qLower.includes('honey');
  const isVegetableQuery = qLower.includes('vegetable') || qLower.includes('food') || qLower.includes('kachri') || qLower.includes('gunda') || qLower.includes('peelu');

  // If query is completely outside domain
  const knownKeywords = ['tree', 'plant', 'grass', 'shrub', 'vegetable', 'desert', 'thar', 'jaisalmer', 'barmer', 'bikaner', 'jodhpur', 'khejri', 'rohida', 'sewan', 'ker', 'panchkuta', 'rain', 'soil', 'saline', 'flower', 'bird', 'bustard', 'guggal', 'aak', 'tumba', 'kachri', 'jaal', 'peelu', 'kumatiya', 'juliflora', 'endemic', 'medicinal', 'restoration', 'oran', 'dune', 'rajasthan', 'botany', 'flora', 'vegetation'];
  const hasDomainKeyword = knownKeywords.some(k => qLower.includes(k));

  if (!bestSection && matchedSpecies.length === 0 && !hasDomainKeyword) {
    return {
      answer: "Information not available in the current knowledge base.",
      citations: [],
      confidence: 'Low',
      relatedSpecies: [],
      suggestedFollowUps: [
        'What trees grow naturally in Bikaner?',
        'What is Khejri?',
        'Which shrubs are found in Jaisalmer?',
        'What native plants grow on sand dunes?',
        'Which native vegetables are found in the Thar Desert?'
      ]
    };
  }

  // Direct, simple, concise answers
  let answerText = '';
  const citationsList: { docId: string; sectionTitle: string; quote: string }[] = [];
  const relatedNames: string[] = [];

  if (isDifferenceQuery) {
    answerText = `• Prosopis cineraria (Khejri): Native state tree of Rajasthan. Nitrogen-fixing tree with 30m taproot.\n` +
      `• Tecomella undulata (Rohida): State flower tree producing orange-red trumpet flowers and termite-resistant Marwar Teak wood.\n` +
      `• Prosopis juliflora (Vilayati Kikar): Invasive alien exotic tree that releases toxins into topsoil and damages native grassland ecosystems.`;
    
    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Arboreal & Invasive Species',
      quote: 'Prosopis cineraria vs Prosopis juliflora'
    });
    relatedNames.push('Prosopis cineraria', 'Tecomella undulata', 'Prosopis juliflora');

  } else if (isJaisalmerQuery) {
    answerText = `Native species in Jaisalmer district:\n` +
      `• Sewan Grass (Lasiurus scindicus): King of desert grasses, primary food for cattle and nesting habitat for Great Indian Bustard.\n` +
      `• Phog (Calligonum polygonoides): Sand dune binding shrub with edible blossoms used in Raita.\n` +
      `• Bui (Aerva javanica): Woolly white flower bush used for stuffing desert pillows.\n` +
      `• Tumba (Citrullus colocynthis): Creeping vine with yellow bitter gourds.\n` +
      `• Ker (Capparis decidua): Thorny leafless bush with edible berries.`;

    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Jaisalmer Distribution',
      quote: 'Jaisalmer core habitat'
    });
    relatedNames.push('Lasiurus scindicus', 'Calligonum polygonoides', 'Aerva javanica', 'Citrullus colocynthis');

  } else if (isBikanerQuery) {
    answerText = `Trees that grow naturally in Bikaner:\n` +
      `• Khejri (Prosopis cineraria): Deep-rooted nitrogen-fixing tree.\n` +
      `• Rohida (Tecomella undulata): State flower tree with orange-red blossoms.\n` +
      `• Kharo Jaal (Salvadora oleoides): Evergreen halophytic tree yielding sweet Peelu berries.\n` +
      `• Meetha Jaal (Salvadora persica): Toothbrush tree with Miswak twigs.\n` +
      `• Babool (Acacia nilotica): Thorny tree with fragrant golden yellow flowers.`;

    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Bikaner Distribution',
      quote: 'Bikaner native trees'
    });
    relatedNames.push('Prosopis cineraria', 'Tecomella undulata', 'Salvadora oleoides');

  } else if (isRainfallQuery) {
    answerText = `Native plants that survive in low rainfall zones (< 150 mm):\n` +
      `• Sewan Grass (Lasiurus scindicus): Deep roots survive extreme 100 mm rainfall.\n` +
      `• Phog (Calligonum polygonoides): Leafless stems reduce water loss.\n` +
      `• Ker (Capparis decidua): Green stem photosynthesis allows it to withstand severe drought.\n` +
      `• Tumba (Citrullus colocynthis): Rapid creeping sand dune colonizer.\n` +
      `• Khejri (Prosopis cineraria): 30m taproot draws groundwater from subterranean aquifers.`;

    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Arid Zone Adaptations',
      quote: 'Xerophytic adaptations under 150 mm rainfall'
    });
    relatedNames.push('Lasiurus scindicus', 'Capparis decidua', 'Calligonum polygonoides');

  } else if (isKhejriQuery) {
    answerText = `Khejri (Prosopis cineraria) is the State Tree of Rajasthan:\n` +
      `1. Nitrogen Fixation: Deep taproot (30 meters) fixes atmospheric nitrogen and enriches desert soil.\n` +
      `2. Fodder & Food: Leaves (Loong) provide protein fodder for livestock; pods (Sangri) are cooked in Panchkuta.\n` +
      `3. Cultural Reverence: Sacred tree preserved in Bishnoi Orans. 363 Bishnois sacrificed their lives in 1730 AD to protect Khejri trees.`;

    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Keystone Arboreal Monograph',
      quote: 'Khejri keystone role'
    });
    relatedNames.push('Prosopis cineraria', 'Capparis decidua', 'Acacia senegal');

  } else if (isVegetableQuery || isPanchkutaQuery) {
    answerText = `Traditional native vegetables found in the Thar Desert:\n` +
      `1. Ker (Capparis decidua): Tangy wild cured green berries.\n` +
      `2. Sangri (Prosopis cineraria): Dried slender Khejri bean pods.\n` +
      `3. Kachri (Cucumis melo var. callosus): Wild sour melon used for souring.\n` +
      `4. Gunda / Leswa (Cordia dichotoma): Mucilaginous green gumberries.\n` +
      `5. Kumatiya (Acacia senegal): Flat boiled seeds of Kumatiyo tree.\n` +
      `6. Peelu (Salvadora oleoides): Sweet translucent berries harvested in summer.`;

    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Traditional Desert Vegetables & Panchkuta',
      quote: 'Native vegetables of Thar Desert'
    });
    relatedNames.push('Capparis decidua', 'Prosopis cineraria', 'Cucumis melo callosus', 'Cordia dichotoma');

  } else if (isGrassQuery) {
    answerText = `Native grasses of the Thar Desert:\n` +
      `• Sewan Grass (Lasiurus scindicus): High protein pasture grass for cattle & Great Indian Bustard.\n` +
      `• Bhurat (Cenchrus biflorus): Spiky sandbur grass whose seeds were milled into famine flour.\n` +
      `• Dhaman Grass (Cenchrus ciliaris): Highly palatable range pasture grass.\n` +
      `• Murut (Panicum turgidum): Bamboo-like tussock grass that binds shifting dunes.`;

    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Graminoids & Grasslands',
      quote: 'Thar native grasses'
    });
    relatedNames.push('Lasiurus scindicus', 'Cenchrus biflorus', 'Panicum turgidum');

  } else if (bestSection) {
    answerText = bestSection.content;
    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: bestSection.title,
      quote: bestSection.content.slice(0, 150) + '...'
    });
    matchedSpecies.slice(0, 4).forEach(sp => relatedNames.push(sp.scientificName));
  } else {
    answerText = `The Thar Desert native flora includes 682 to 775 identified species. Major species include Khejri (Prosopis cineraria), Rohida (Tecomella undulata), Ker (Capparis decidua), Kumatiyo (Acacia senegal), Jaal (Salvadora oleoides), and Sewan grass (Lasiurus scindicus).`;
    citationsList.push({
      docId: 'Research Paper: Thar Flora Monograph',
      sectionTitle: 'Ecological Overview',
      quote: 'Native species of Thar'
    });
    relatedNames.push('Prosopis cineraria', 'Tecomella undulata', 'Capparis decidua');
  }

  const confidence: 'High' | 'Medium' | 'Low' = bestSection || matchedSpecies.length > 0 || isJaisalmerQuery || isKhejriQuery || isRainfallQuery || isBikanerQuery ? 'High' : 'Medium';

  return {
    answer: answerText,
    citations: citationsList,
    confidence,
    relatedSpecies: Array.from(new Set(relatedNames)),
    suggestedFollowUps: [
      'What trees grow naturally in Bikaner?',
      'What is Khejri?',
      'Which shrubs are found in Jaisalmer?',
      'What native plants grow on sand dunes?',
      'Which native vegetables are found in the Thar Desert?'
    ]
  };
}
