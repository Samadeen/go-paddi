export type { Currency, CurrencyResponse } from '@/src/hooks/meta/use-meta.query';

export type FlightLocationDistance = {
  value: number;
  unit: string;
};

export type FlightLocation = {
  id: string;
  type: string;
  name: string;
  code?: string;
  city?: string;
  cityName?: string;
  region?: string;
  regionName?: string;
  country: string;
  countryName: string;
  countryNameShort?: string;
  photoUri?: string;
  distanceToCity?: FlightLocationDistance;
  parent?: string;
};

export type FlightLocationSearchResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: FlightLocation[];
};

export type FlightStopsFilter = 'none' | '0' | '1' | '2';

export type FlightSortOption = 'BEST' | 'CHEAPEST' | 'FASTEST';

export type FlightCabinClass =
  | 'ECONOMY'
  | 'PREMIUM_ECONOMY'
  | 'BUSINESS'
  | 'FIRST';

export type FlightSearchParams = {
  fromId: string;
  toId: string;
  departDate: string;
  returnDate: string;
  stops?: FlightStopsFilter;
  adults?: number;
  children?: string;
  sort?: FlightSortOption;
  cabinClass?: FlightCabinClass;
  currency_code?: string;
  pageNo?: number;
};

export type FlightCarrier = {
  name?: string;
  code?: string;
  logo?: string;
};

export type FlightSearchLeg = {
  departureTime?: string;
  arrivalTime?: string;
  cabinClass?: string;
  carriers?: string[];
  carriersData?: FlightCarrier[];
  totalTime?: number;
  flightInfo?: {
    flightNumber?: number;
    carrierInfo?: {
      operatingCarrier?: string;
      marketingCarrier?: string;
    };
  };
  flightStops?: unknown[];
};

export type FlightSearchSegment = {
  departureAirport?: { code?: string; name?: string };
  arrivalAirport?: { code?: string; name?: string };
  departureTime?: string;
  arrivalTime?: string;
  totalTime?: number;
  legs?: FlightSearchLeg[];
};

export type FlightBrandedFareFeature = {
  featureName?: string;
  category?: string;
  code?: string;
  label?: string;
  availability?: string;
  content?: { label?: string; icon?: string };
};

export type FlightBrandedFareInfo = {
  fareName?: string;
  cabinClass?: string;
  features?: FlightBrandedFareFeature[];
  featuresList?: FlightBrandedFareFeature[];
};

export type FlightOffer = {
  token?: string;
  flightKey?: string;
  priceBreakdown?: {
    total?: { units?: number; nanos?: number; currencyCode?: string };
    baseFare?: { units?: number; nanos?: number };
  };
  segments?: FlightSearchSegment[];
  travellerPrices?: unknown[];
  price?: { total?: number; currency?: string };
  cabinClass?: string;
  brandedFareInfo?: FlightBrandedFareInfo;
};

export type FlightSearchAggregation = {
  totalCount?: number;
  filteredTotalCount?: number;
};

export type FlightSearchResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: {
    flightOffers?: FlightOffer[];
    aggregation?: FlightSearchAggregation;
    searchId?: string;
    token?: string;
  } | null;
};
