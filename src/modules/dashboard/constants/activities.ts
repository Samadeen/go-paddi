import type { ActivityData } from '@/src/modules/dashboard/types';

export const defaultActivity: ActivityData = {
  id: '1',
  name: 'The Museum of Modern Art',
  description:
    'Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant',
  images: ['/assets/moma-museum.png'],
  rating: 4.5,
  reviewCount: 436,
  duration: '1 Hour',
  scheduledTime: '10:30 AM on Mar 19',
  price: 123450,
  whatsIncluded: 'Admission to the Empire State Building',
  dayLabel: 'Day 1',
  dayLabelBg: '#0a369d',
};

export { formatHotelPrice as formatActivityPrice } from '@/src/modules/dashboard/constants/hotels';

export const defaultActivities: ActivityData[] = [
  defaultActivity,
  { ...defaultActivity, id: '2', dayLabel: 'Day 1 - (2)' },
  { ...defaultActivity, id: '3', dayLabel: 'Day 2' },
];
