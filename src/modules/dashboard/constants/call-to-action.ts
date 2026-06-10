import type { CtaItem, TripInfoData } from '@/src/modules/dashboard/types';

export const defaultCtaItems: CtaItem[] = [
  {
    id: 'activities',
    title: 'Activities',
    description:
      'Build, personalize, and optimize your itineraries with our trip planner.',
    buttonLabel: 'Add Activities',
    variant: 'dark',
  },
  {
    id: 'hotels',
    title: 'Hotels',
    description:
      'Build, personalize, and optimize your itineraries with our trip planner.',
    buttonLabel: 'Add Hotels',
    variant: 'light',
  },
  {
    id: 'flights',
    title: 'Flights',
    description:
      'Build, personalize, and optimize your itineraries with our trip planner.',
    buttonLabel: 'Add Flights',
    variant: 'primary',
  },
];

export const ctaCardStyles = {
  dark: {
    card: 'bg-[#000031]',
    title: 'text-white',
    description: 'text-white',
    button: 'bg-primary-600 text-white',
  },
  light: {
    card: 'bg-primary-100',
    title: 'text-black',
    description: 'text-text-primary',
    button: 'bg-primary-600 text-white',
  },
  primary: {
    card: 'bg-primary-600',
    title: 'text-white',
    description: 'text-white',
    button: 'bg-white text-primary-600',
  },
} as const;

export const defaultTrip: TripInfoData = {
  title: 'Bahamas Family Trip',
  startDate: '2024-03-21',
  endDate: '2024-04-21',
  location: 'New York, United States of America',
  tripType: 'Solo Trip',
  participants: [{ id: '1', name: 'Trip member' }],
};
