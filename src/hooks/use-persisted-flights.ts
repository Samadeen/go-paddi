'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import type { FlightData } from '@/src/modules/dashboard/types';

const FLIGHTS_STORAGE_KEY = 'go-paddi:flights';

type PersistedFlights = {
  flights: FlightData[];
  setFlights: Dispatch<SetStateAction<FlightData[]>>;
  hydrated: boolean;
};

function readStoredFlights(): FlightData[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(FLIGHTS_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as FlightData[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function usePersistedFlights(
  initialFlights?: FlightData[],
): PersistedFlights {
  const [flights, setFlights] = useState<FlightData[]>(initialFlights ?? []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredFlights();
    setFlights(stored.length > 0 ? stored : (initialFlights ?? []));
    setHydrated(true);
  }, [initialFlights]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(flights));
  }, [flights, hydrated]);

  return { flights, setFlights, hydrated };
}
