export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  mapUrl?: string;
  description: string;
  image?: string;
  ticketUrl?: string;
  category: "traditional" | "festival" | "cultural" | "social";
  programDetails?: EventProgramDay[];
}

export interface EventProgramDay {
  date: string;
  label: string;
  items: EventProgramItem[];
}

export interface EventProgramItem {
  time: string;
  period: "morning" | "afternoon" | "evening";
  title: string;
  description?: string;
  url?: string;
}

export interface CulturalProgramItem {
  time: string;
  title: string;
  segment: string;
  performer?: string;
  description?: string;
}

export interface CulturalProgramDay {
  date: string;
  label: string;
  items: CulturalProgramItem[];
}

export interface FoodMealService {
  name: string;
  time?: string;
  items: string[];
  note?: string;
}

export interface FoodStall {
  name: string;
  cateringPartner?: string;
  cuisine?: string;
  specialty?: string;
  items: string[];
  note?: string;
}

export interface FoodMenuDay {
  date: string;
  label: string;
  mode: "meals" | "stalls" | "mixed";
  note?: string;
  cateringPartner?: string;
  meals?: FoodMealService[];
  stalls?: FoodStall[];
}

export interface EventTicketPriceOption {
  label: "veg" | "non-veg" | "standard";
  price: number;
}

export interface EventTicket {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  priceOptions?: EventTicketPriceOption[];
  currency: string;
  category: "puja" | "food" | "cultural" | "dandiya" | "special" | "pass";
  date: string;
  time?: string;
  includes: string[];
  note?: string;
  available: boolean;
  featured?: boolean;
  maxPerPerson?: number;
  ticketUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
}

export interface Partner {
  id: string;
  name: string;
  website?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
}
