import type { HotelData } from '@/src/modules/dashboard/types';

export const defaultHotel: HotelData = {
  id: '1',
  name: 'Riviera Resort, Lekki',
  address:
    '18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1',
  images: ['/assets/riviera-resort.png'],
  rating: 8.5,
  reviewCount: 436,
  roomType: 'King size room',
  price: 123450,
  totalPrice: 560000,
  bookingSummary: '1 room x 10 nights incl. taxes',
  checkIn: '20-04-2024',
  checkOut: '29-04-2024',
  facilities: [
    { id: 'pool', type: 'pool', label: 'Pool' },
    { id: 'bar', type: 'bar', label: 'Bar' },
  ],
};

export function formatHotelPrice(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatHotelTotalPrice(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const defaultHotels: HotelData[] = [
  defaultHotel,
  { ...defaultHotel, id: '2' },
];
