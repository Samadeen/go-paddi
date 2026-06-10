export type TripParticipant = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type TripInfoData = {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  tripType: string;
  participants: TripParticipant[];
};

export type CtaCardVariant = 'dark' | 'light' | 'primary';

export type CtaModalId = 'flights' | 'hotels' | 'activities';

export type CtaItem = {
  id: CtaModalId;
  title: string;
  description: string;
  buttonLabel: string;
  variant: CtaCardVariant;
  href?: string;
};

export type FlightFacilityType =
  | 'baggage'
  | 'entertainment'
  | 'meal'
  | 'usb';

export type FlightFacility = {
  id: string;
  type: FlightFacilityType;
  label: string;
};

export type FlightData = {
  id: string;
  airlineName: string;
  airlineLogo?: string;
  flightNumber: string;
  cabinClass: string;
  cabinClassBg?: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  duration: string;
  stopType: string;
  originCode: string;
  destinationCode: string;
  price: number;
  facilities: FlightFacility[];
};

export type HotelFacilityType = 'pool' | 'bar';

export type HotelFacility = {
  id: string;
  type: HotelFacilityType;
  label: string;
};

export type HotelData = {
  id: string;
  name: string;
  address: string;
  images: string[];
  rating: number;
  reviewCount: number;
  roomType: string;
  price: number;
  totalPrice: number;
  bookingSummary: string;
  checkIn: string;
  checkOut: string;
  facilities: HotelFacility[];
};

export type ActivityData = {
  id: string;
  name: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  duration: string;
  scheduledTime: string;
  price: number;
  whatsIncluded: string;
  dayLabel: string;
  dayLabelBg?: string;
};

