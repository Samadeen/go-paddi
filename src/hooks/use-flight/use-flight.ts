import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/src/config/api.service';
import { endpoints } from '@/src/config/endpoints';
import { useCurrencyQuery } from '@/src/hooks/meta/use-meta.query';

import type {
  FlightLocationSearchResponse,
  FlightSearchParams,
  FlightSearchResponse,
} from './flight.types';

type QueryEnabledOptions = {
  enabled?: boolean;
};

export { useCurrencyQuery };

export const searchFlightLocations = (query: string) =>
  api.get<FlightLocationSearchResponse>(
    endpoints.flights.searchFlightLocation,
    { params: { query } },
  );

export const searchFlights = (params: FlightSearchParams) =>
  api.get<FlightSearchResponse>(endpoints.flights.searchFlights, {
    params,
  });

export const useFlightLocationQuery = (
  query: string,
  { enabled = true }: QueryEnabledOptions = {},
) => {
  const trimmedQuery = query.trim();

  return useQuery<FlightLocationSearchResponse>({
    queryKey: ['flights', 'locations', trimmedQuery],
    queryFn: () => searchFlightLocations(trimmedQuery),
    enabled: enabled && trimmedQuery.length >= 2,
    placeholderData: (previousData) => previousData,
  });
};

export const useSearchFlightsMutation = () =>
  useMutation({
    mutationFn: searchFlights,
  });
