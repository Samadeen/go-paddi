import { useQuery } from '@tanstack/react-query';

import { api } from '@/src/config/api.service';
import { endpoints } from '@/src/config/endpoints';

export type MetaApiResponse<T> = {
  status: boolean;
  message: string;
  timestamp: number;
  data: T;
};

export type Currency = {
  name: string;
  code: string;
  encodedSymbol: string;
  symbol: string;
};

export type CurrencyResponse = MetaApiResponse<Currency[]>;

export type Language = {
  name: string;
  code: string;
  countryFlag: string;
};

export type LanguageResponse = MetaApiResponse<Language[]>;

export type LocationCode = string;

export type LocationResponse = MetaApiResponse<LocationCode[]>;

const META_STALE_TIME = 5 * 60 * 1000;

export const fetchCurrencies = () =>
  api.get<CurrencyResponse>(endpoints.meta.currency);

export const fetchLanguages = () =>
  api.get<LanguageResponse>(endpoints.meta.language);

export const fetchLocations = () =>
  api.get<LocationResponse>(endpoints.meta.location);

export const useCurrencyQuery = (enabled = true) =>
  useQuery<CurrencyResponse>({
    queryKey: ['meta', 'currency'],
    queryFn: fetchCurrencies,
    enabled,
    staleTime: META_STALE_TIME,
  });

export const useLanguageQuery = (enabled = true) =>
  useQuery<LanguageResponse>({
    queryKey: ['meta', 'language'],
    queryFn: fetchLanguages,
    enabled,
    staleTime: META_STALE_TIME,
  });

export const useLocationQuery = (enabled = true) =>
  useQuery<LocationResponse>({
    queryKey: ['meta', 'location'],
    queryFn: fetchLocations,
    enabled,
    staleTime: META_STALE_TIME,
  });
