import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/src/config/api.service';
import { endpoints } from '@/src/config/endpoints';

import type {
  HotelDestinationSearchResponse,
  HotelFilterResponse,
  HotelSearchContextParams,
  HotelSearchParams,
  HotelSearchResponse,
  HotelSortByResponse,
} from './hotel.types';

type QueryEnabledOptions = {
  enabled?: boolean;
};

const HOTEL_META_STALE_TIME = 2 * 60 * 1000;

const hasHotelSearchContext = (params: HotelSearchContextParams | null) =>
  Boolean(
    params?.dest_id &&
      params.search_type &&
      params.arrival_date &&
      params.departure_date,
  );

export const searchHotelDestinations = (query: string) =>
  api.get<HotelDestinationSearchResponse>(
    endpoints.hotels.searchHotelDestination,
    { params: { query } },
  );

export const fetchHotelSortBy = (params: HotelSearchContextParams) =>
  api.get<HotelSortByResponse>(endpoints.hotels.getSortBy, { params });

export const fetchHotelFilters = (params: HotelSearchContextParams) =>
  api.get<HotelFilterResponse>(endpoints.hotels.getFilter, { params });

export const searchHotels = (params: HotelSearchParams) =>
  api.get<HotelSearchResponse>(endpoints.hotels.searchHotels, { params });

export const useHotelDestinationQuery = (
  query: string,
  { enabled = true }: QueryEnabledOptions = {},
) => {
  const trimmedQuery = query.trim();

  return useQuery<HotelDestinationSearchResponse>({
    queryKey: ['hotels', 'destinations', trimmedQuery],
    queryFn: () => searchHotelDestinations(trimmedQuery),
    enabled: enabled && trimmedQuery.length >= 2,
    placeholderData: (previousData) => previousData,
  });
};

export const useHotelSortByQuery = (
  params: HotelSearchContextParams | null,
  { enabled = true }: QueryEnabledOptions = {},
) =>
  useQuery<HotelSortByResponse>({
    queryKey: ['hotels', 'sortBy', params],
    queryFn: () => fetchHotelSortBy(params!),
    enabled: enabled && hasHotelSearchContext(params),
    staleTime: HOTEL_META_STALE_TIME,
  });

export const useHotelFilterQuery = (
  params: HotelSearchContextParams | null,
  { enabled = true }: QueryEnabledOptions = {},
) =>
  useQuery<HotelFilterResponse>({
    queryKey: ['hotels', 'filters', params],
    queryFn: () => fetchHotelFilters(params!),
    enabled: enabled && hasHotelSearchContext(params),
    staleTime: HOTEL_META_STALE_TIME,
  });

export const useSearchHotelsMutation = () =>
  useMutation({
    mutationFn: searchHotels,
  });
