export type AttractionLocationProduct = {
  id: string;
  title: string;
  productId: string;
  productSlug: string;
  taxonomySlug: string;
  cityUfi: number;
  cityName: string;
  countryCode: string;
};

export type AttractionLocationDestination = {
  id: string;
  ufi: number;
  country: string;
  cityName: string;
  productCount: number;
  cc1: string;
};

export type AttractionLocation =
  | (AttractionLocationProduct & { kind: 'product' })
  | (AttractionLocationDestination & { kind: 'destination' });

export type AttractionLocationSearchResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: {
    products?: AttractionLocationProduct[];
    destinations?: AttractionLocationDestination[];
  };
};

export type AttractionSortBy = 'trending' | 'attr_book_score' | 'lowest_price';

export type AttractionSearchParams = {
  id: string;
  startDate?: string;
  endDate?: string;
  sortBy?: AttractionSortBy;
  currency_code?: string;
  languagecode?: string;
  typeFilters?: string;
  priceFilters?: string;
  ufiFilters?: string;
  labelFilters?: string;
};

export type AttractionFilterOption = {
  name: string;
  tagname: string;
  productCount?: number;
};

export type AttractionFilterOptions = {
  typeFilters?: AttractionFilterOption[] | null;
  priceFilters?: AttractionFilterOption[] | null;
  ufiFilters?: AttractionFilterOption[] | null;
  labelFilters?: AttractionFilterOption[] | null;
};

export type AttractionProduct = {
  id?: string;
  name?: string;
  slug?: string;
  shortDescription?: string;
  representativePrice?: {
    chargeAmount?: number;
    currency?: string;
    publicAmount?: number;
  };
  primaryPhoto?: {
    small?: string;
  };
  reviewsStats?: {
    allReviewsCount?: number;
    combinedNumericStats?: {
      average?: number;
      total?: number;
    };
  };
  cancellationPolicy?: {
    hasFreeCancellation?: boolean;
  };
  ufiDetails?: {
    bCityName?: string;
  };
};

export type AttractionSearchResponse = {
  status: boolean;
  message: string;
  timestamp: number;
  data: {
    products?: AttractionProduct[];
    filterOptions?: AttractionFilterOptions;
  } | null;
};
