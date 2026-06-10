import type { FlightOffer } from '@/src/hooks/use-flight/flight.types';
import type {
  FlightData,
  FlightFacility,
} from '@/src/modules/dashboard/types';

const cabinClassLabels: Record<string, string> = {
  ECONOMY: 'Economy',
  PREMIUM_ECONOMY: 'Premium Economy',
  BUSINESS: 'Business',
  FIRST: 'First Class',
};

const cabinClassColors: Record<string, string> = {
  ECONOMY: '#0a369d',
  PREMIUM_ECONOMY: '#1e5a8a',
  BUSINESS: '#344054',
  FIRST: '#7a4504',
};

function formatTime(iso?: string) {
  if (!iso) return '--:--';

  const date = new Date(iso);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatDate(iso?: string) {
  if (!iso) return '--';

  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function formatDuration(totalTime?: number | string) {
  if (typeof totalTime === 'number') {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  if (typeof totalTime === 'string' && totalTime.trim()) {
    return totalTime;
  }

  return 'N/A';
}

function getPrice(offer: FlightOffer) {
  if (offer.price?.total) {
    return offer.price.total;
  }

  const units = offer.priceBreakdown?.total?.units ?? 0;
  const nanos = offer.priceBreakdown?.total?.nanos ?? 0;

  return units + nanos / 1_000_000_000;
}

function getStopLabel(segment?: NonNullable<FlightOffer['segments']>[number]) {
  const legCount = segment?.legs?.length ?? 0;
  const stops = Math.max(0, legCount - 1);

  if (stops === 0) return 'Direct';
  if (stops === 1) return '1 Stop';
  return `${stops} Stops`;
}

function mapFacilities(offer: FlightOffer): FlightFacility[] {
  const features = offer.brandedFareInfo?.features ?? [];
  const facilities: FlightFacility[] = [];

  for (const feature of features) {
    if (feature.availability !== 'INCLUDED') continue;

    const label = feature.label ?? feature.content?.label;
    if (!label) continue;

    let type: FlightFacility['type'] = 'baggage';
    if (feature.featureName === 'CABIN_BAGGAGE') type = 'baggage';
    else if (feature.featureName === 'PERSONAL_BAGGAGE') type = 'baggage';
    else if (feature.featureName === 'CHECK_BAGGAGE') type = 'baggage';

    facilities.push({
      id: feature.code ?? feature.featureName ?? label,
      type,
      label,
    });
  }

  return facilities;
}

function getCabinClass(offer: FlightOffer) {
  const cabinKey =
    offer.brandedFareInfo?.cabinClass ??
    offer.segments?.[0]?.legs?.[0]?.cabinClass ??
    offer.cabinClass ??
    'ECONOMY';

  const fareName = offer.brandedFareInfo?.fareName;
  const label = cabinClassLabels[cabinKey] ?? cabinKey;

  return fareName ? `${label} · ${fareName}` : label;
}

export function mapFlightOfferToFlightData(
  offer: FlightOffer,
  index: number,
): FlightData {
  const segment = offer.segments?.[0];
  const firstLeg = segment?.legs?.[0];
  const lastLeg = segment?.legs?.[segment.legs.length - 1];
  const carrier = firstLeg?.carriersData?.[0];
  const cabinKey =
    offer.brandedFareInfo?.cabinClass ??
    firstLeg?.cabinClass ??
    'ECONOMY';
  const flightNumber = firstLeg?.flightInfo?.flightNumber;
  const carrierCode =
    firstLeg?.flightInfo?.carrierInfo?.operatingCarrier ?? carrier?.code ?? '';

  return {
    id: offer.token ?? offer.flightKey ?? `flight-${index}`,
    airlineName: carrier?.name ?? firstLeg?.carriers?.[0] ?? 'Airline',
    airlineLogo: carrier?.logo,
    flightNumber: flightNumber ? `${carrierCode}${flightNumber}` : 'N/A',
    cabinClass: getCabinClass(offer),
    cabinClassBg: cabinClassColors[cabinKey] ?? '#0a369d',
    departureTime: formatTime(segment?.departureTime ?? firstLeg?.departureTime),
    departureDate: formatDate(segment?.departureTime ?? firstLeg?.departureTime),
    arrivalTime: formatTime(segment?.arrivalTime ?? lastLeg?.arrivalTime),
    arrivalDate: formatDate(segment?.arrivalTime ?? lastLeg?.arrivalTime),
    duration: formatDuration(segment?.totalTime),
    stopType: getStopLabel(segment),
    originCode: segment?.departureAirport?.code ?? '---',
    destinationCode: segment?.arrivalAirport?.code ?? '---',
    price: getPrice(offer),
    facilities: mapFacilities(offer),
  };
}

export function mapFlightOffersToFlightData(offers: FlightOffer[]): FlightData[] {
  return offers.map((offer, index) => mapFlightOfferToFlightData(offer, index));
}
