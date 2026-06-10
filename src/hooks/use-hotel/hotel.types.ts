export type HotelDestination = {
  dest_id: string;
  search_type: string;
  roundtrip?: string;
  name: string;
  dest_type: string;
  latitude?: number;
  region?: string;
  type?: string;
  country: string;
  label: string;
  city_name?: string;
  lc?: string;
  nr_hotels?: number;
  cc1?: string;
  city_ufi?: number | null;
  hotels?: number;
  image_url?: string;
  longitude?: number;
};

export type HotelDestinationSearchResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: HotelDestination[];
};

export type HotelSortOption = {
  id: string;
  title: string;
};

export type HotelSortByResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: HotelSortOption[];
};

export type HotelFilterCheckboxOption = {
  title: string;
  genericId: string;
  countNotAutoextended?: number;
};

export type HotelFilterGroup = {
  title: string;
  field: string;
  filterStyle: string;
  options: HotelFilterCheckboxOption[];
  min?: string;
  max?: string;
};

export type HotelFilterData = {
  pagination?: { nbResultsTotal?: number };
  availabilityInfo?: { totalAvailableNotAutoextended?: number };
  filters: HotelFilterGroup[];
};

export type HotelFilterResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: HotelFilterData;
};

export type HotelSearchContextParams = {
  dest_id: string;
  search_type: string;
  arrival_date: string;
  departure_date: string;
  adults?: number;
  children_age?: string;
  room_qty?: number;
  categories_filter?: string;
  languagecode?: string;
};

export type HotelUnits = 'metric' | 'imperial';

export type HotelTemperatureUnit = 'c' | 'f';

export type HotelSearchParams = HotelSearchContextParams & {
  price_min?: number;
  price_max?: number;
  sort_by?: string;
  units?: HotelUnits;
  temperature_unit?: HotelTemperatureUnit;
  currency_code?: string;
  location?: string;
  page_number?: number;
};

export type HotelSearchProperty = {
  id?: number;
  name?: string;
  wishlistName?: string;
  countryCode?: string;
  reviewScore?: number;
  reviewCount?: number;
  propertyClass?: number;
  checkinDate?: string;
  checkoutDate?: string;
  photoUrls?: string[];
  priceBreakdown?: {
    grossPrice?: { value?: number; currency?: string };
    strikethroughPrice?: { value?: number; currency?: string };
  };
};

export type HotelSearchResult = {
  hotel_id?: number;
  accessibilityLabel?: string;
  property?: HotelSearchProperty;
};

export type HotelSearchResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: {
    hotels?: HotelSearchResult[];
  } | null;
};
