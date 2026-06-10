'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import type { HotelData } from '@/src/modules/dashboard/types';

const HOTELS_STORAGE_KEY = 'go-paddi:hotels';

type PersistedHotels = {
  hotels: HotelData[];
  setHotels: Dispatch<SetStateAction<HotelData[]>>;
  hydrated: boolean;
};

function readStoredHotels(): HotelData[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(HOTELS_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as HotelData[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function usePersistedHotels(
  initialHotels?: HotelData[],
): PersistedHotels {
  const [hotels, setHotels] = useState<HotelData[]>(initialHotels ?? []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredHotels();
    setHotels(stored.length > 0 ? stored : (initialHotels ?? []));
    setHydrated(true);
  }, [initialHotels]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
  }, [hotels, hydrated]);

  return { hotels, setHotels, hydrated };
}
