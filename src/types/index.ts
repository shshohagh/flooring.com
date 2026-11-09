export type FlooringCategory = 'hardwood' | 'tile' | 'vinyl' | 'carpet' | 'commercial';

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  category: FlooringCategory;
  description: string;
  image: string;
  iconName: 'tree' | 'grid' | 'layers' | 'sparkles';
  features: string[];
  priceRange: string;
  durabilityRating: string;
  popularFor: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: FlooringCategory;
  location: string;
  image: string;
  material: string;
  squareFeet: number;
  completionTime: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  avatar: string;
  flooringInstalled: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  details: string[];
  iconName: 'message-square' | 'ruler' | 'wrench' | 'check-circle';
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface QuoteRequest {
  flooringType: FlooringCategory;
  squareFeet: number;
  roomType: string;
  needsSubfloorPrep: boolean;
  needsOldFloorRemoval: boolean;
  timeline: 'asap' | '1-2_weeks' | '1_month' | 'planning';
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  notes?: string;
}

export interface PriceEstimate {
  materialCostLow: number;
  materialCostHigh: number;
  laborCostLow: number;
  laborCostHigh: number;
  totalLow: number;
  totalHigh: number;
  avgPerSqFt: number;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}
