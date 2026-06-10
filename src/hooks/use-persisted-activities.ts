'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import type { ActivityData } from '@/src/modules/dashboard/types';

const ACTIVITIES_STORAGE_KEY = 'go-paddi:activities';

type PersistedActivities = {
  activities: ActivityData[];
  setActivities: Dispatch<SetStateAction<ActivityData[]>>;
  hydrated: boolean;
};

function readStoredActivities(): ActivityData[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as ActivityData[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function usePersistedActivities(
  initialActivities?: ActivityData[],
): PersistedActivities {
  const [activities, setActivities] = useState<ActivityData[]>(
    initialActivities ?? [],
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredActivities();
    setActivities(stored.length > 0 ? stored : (initialActivities ?? []));
    setHydrated(true);
  }, [initialActivities]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  }, [activities, hydrated]);

  return { activities, setActivities, hydrated };
}
