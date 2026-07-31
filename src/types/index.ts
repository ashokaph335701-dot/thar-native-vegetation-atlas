export type PlantCategory = 'Tree' | 'Shrub' | 'Grass' | 'Climber' | 'Herb' | 'Succulent' | 'Vegetable';

export type ConservationStatus = 'Least Concern' | 'Vulnerable' | 'Endangered' | 'Critically Endangered' | 'Near Threatened';

export interface PlantSpecies {
  id: string;
  scientificName: string;
  hindiName: string;
  localName: string;
  commonName: string;
  family: string;
  category: PlantCategory;
  description: string;
  taxonomicGroup: string;
  identification: string[];
  habitat: string[];
  soilPreference: string[];
  rainfallMinMm: number;
  rainfallMaxMm: number;
  elevationMeters: string;
  floweringPeriod: string;
  fruitingPeriod: string;
  pollinators: string[];
  associatedWildlife: string[];
  ecologicalRole: string;
  traditionalUses: string[];
  medicinalImportance: string[];
  economicImportance: string[];
  culturalSignificance: string;
  conservationStatus: ConservationStatus;
  threats: string[];
  restorationValue: string;
  interestingFacts: string[];
  panchkutaComponent?: string;
  endemic: boolean;
  isInvasive?: boolean;
  districts: string[];
  imageUrl: string;
  references: string[];
}

export interface VisitorSubmission {
  id: string;
  category: PlantCategory;
  localName: string;
  hindiName: string;
  commonName: string;
  scientificName: string;
  description: string;
  district: string;
  imageUrl: string;
  contributorName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  adminNotes?: string;
}

export interface DistrictData {
  id: string;
  name: string;
  hindiName: string;
  localName?: string;
  geomorphology: string;
  rainfallRange: string;
  rainfallMin?: number;
  rainfallMax?: number;
  temperatureRange: string;
  soilTypes?: string[];
  characteristicEcosystems?: string[];
  dominantSpecies?: string[];
  dominantVegetation?: string[];
  keyVegetation?: string;
  protectedAreas?: string[];
  mapCoordinates: { x: number; y: number };
  svgPathD?: string;
  color?: string;
}

export interface ResearchDocument {
  id: string;
  title: string;
  authors: string;
  year: number;
  publication: string;
  abstract: string;
  sections: { title: string; content: string }[];
  fileSize: string;
}

export interface RAGAnswer {
  answer: string;
  citations: { docId: string; sectionTitle: string; quote: string }[];
  confidence: 'High' | 'Medium' | 'Low';
  relatedSpecies: string[];
  suggestedFollowUps: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  ragResult?: RAGAnswer;
}
