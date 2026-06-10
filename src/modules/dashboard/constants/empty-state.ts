export type EmptyStateType = 'flights' | 'hotels' | 'activities';

export const emptyStateConfig = {
  flights: {
    icon: '/assets/flight-icon.svg',
    actionLabel: 'Add Flight',
  },
  hotels: {
    icon: '/assets/hotel-icon.svg',
    actionLabel: 'Add Hotel',
  },
  activities: {
    icon: '/assets/activities-icon.svg',
    actionLabel: 'Add Activity',
  },
} as const satisfies Record<
  EmptyStateType,
  { icon: string; actionLabel: string }
>;
