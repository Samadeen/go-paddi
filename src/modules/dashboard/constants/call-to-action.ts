import type { CtaItem } from '@/src/modules/dashboard/types';

export const defaultCtaItems: CtaItem[] = [
  {
    id: 'activities',
    title: 'Activities',
    description:
      'Build, personalize, and optimize your itineraries with our trip planner.',
    buttonLabel: 'Add Activities',
    variant: 'dark',
    href: '/activities',
  },
  {
    id: 'hotels',
    title: 'Hotels',
    description:
      'Build, personalize, and optimize your itineraries with our trip planner.',
    buttonLabel: 'Add Hotels',
    variant: 'light',
    href: '/hotels',
  },
  {
    id: 'flights',
    title: 'Flights',
    description:
      'Build, personalize, and optimize your itineraries with our trip planner.',
    buttonLabel: 'Add Flights',
    variant: 'primary',
    href: '/flights',
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
