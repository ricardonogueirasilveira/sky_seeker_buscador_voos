export interface FlightQuery {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: number;
}

export interface FlightOption {
  provider: string;
  priceEstimate?: string;
  duration?: string;
  airline?: string; // Novo campo
  stops?: string;
  deepLink: string;
  logoUrl: string;
  badges?: string[];
  description: string;
}

export interface RouteInsight {
  summary: string;
  tips: string[];
  bestTimeToFly?: string;
  airlines?: string[];
  // Novos campos retornados pela IA
  cheapestPrice?: string;
  fastestDuration?: string;
  mainAirline?: string;
}