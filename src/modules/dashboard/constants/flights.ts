import type { FlightData } from '@/src/modules/dashboard/types';

export const defaultFlight: FlightData = {
  id: '1',
  airlineName: 'American Airlines',
  flightNumber: 'AA-829',
  cabinClass: 'First Class',
  cabinClassBg: '#0a369d',
  departureTime: '08:35',
  departureDate: 'Sun, 20 Aug',
  arrivalTime: '09:55',
  arrivalDate: 'Sun, 20 Aug',
  duration: '1h 45m',
  stopType: 'Direct',
  originCode: 'LOS',
  destinationCode: 'SIN',
  price: 123450,
  facilities: [
    {
      id: 'baggage',
      type: 'baggage',
      label: 'Baggage: 20kg, Cabin Baggage: 8kg',
    },
    {
      id: 'entertainment',
      type: 'entertainment',
      label: 'In flight entertainment',
    },
    {
      id: 'meal',
      type: 'meal',
      label: 'In flight meal',
    },
    {
      id: 'usb',
      type: 'usb',
      label: 'USB Port',
    },
  ],
};

export function formatFlightPrice(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const defaultFlights: FlightData[] = [
  defaultFlight,
  { ...defaultFlight, id: '2' },
];
