import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/src/config/api.service';
import { endpoints } from '@/src/config/endpoints';

import type {
  AttractionFilterOptions,
  AttractionLocationSearchResponse,
  AttractionSearchParams,
  AttractionSearchResponse,
} from './attraction.types';

type QueryEnabledOptions = {
  enabled?: boolean;
};

const ATTRACTION_FILTER_STALE_TIME = 2 * 60 * 1000;

export const searchAttractionLocations = (query: string) =>
  api.get<AttractionLocationSearchResponse>(
    endpoints.attractions.searchAttractionLocation,
    { params: { query } },
  );

export const searchAttractions = (params: AttractionSearchParams) =>
  api.get<AttractionSearchResponse>(endpoints.attractions.searchAttractions, {
    params,
  });

export const useAttractionLocationQuery = (
  query: string,
  { enabled = true }: QueryEnabledOptions = {},
) => {
  const trimmedQuery = query.trim();

  return useQuery<AttractionLocationSearchResponse>({
    queryKey: ['attractions', 'locations', trimmedQuery],
    queryFn: () => searchAttractionLocations(trimmedQuery),
    enabled: enabled && trimmedQuery.length >= 2,
    placeholderData: (previousData) => previousData,
  });
};

export const useAttractionFilterOptionsQuery = (
  params: AttractionSearchParams | null,
  { enabled = true }: QueryEnabledOptions = {},
) =>
  useQuery<AttractionSearchResponse, Error, AttractionFilterOptions | null>({
    queryKey: ['attractions', 'filterOptions', params],
    queryFn: () => searchAttractions(params!),
    enabled: enabled && Boolean(params?.id),
    staleTime: ATTRACTION_FILTER_STALE_TIME,
    select: (response) => response.data?.filterOptions ?? null,
  });

export const useSearchAttractionsMutation = () =>
  useMutation({
    mutationFn: searchAttractions,
  });
