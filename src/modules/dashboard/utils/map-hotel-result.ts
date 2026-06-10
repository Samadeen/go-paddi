import type { HotelSearchResult } from '@/src/hooks/use-hotel/hotel.types';
import type { HotelData } from '@/src/modules/dashboard/types';

function uniqueHotelPhotoUrls(urls: string[]) {
  const byPhotoId = new Map<string, string>();

  for (const url of urls) {
    const match = url.match(/\/(\d+)\.(jpg|jpeg|webp|png)/i);
    const key = match?.[1] ?? url.split('?')[0] ?? url;
    byPhotoId.set(key, url);
  }

  return [...byPhotoId.values()];
}

function formatDisplayDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}-${month}-${year}`;
}

function nightsBetween(arrivalDate: string, departureDate: string) {
  const start = new Date(arrivalDate);
  const end = new Date(departureDate);
  const diff = end.getTime() - start.getTime();
  if (Number.isNaN(diff) || diff <= 0) return 1;
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export function mapHotelResultToHotelData(
  result: HotelSearchResult,
  index: number,
  arrivalDate: string,
  departureDate: string,
  roomQty = 1,
): HotelData {
  const property = result.property ?? {};
  const price = property.priceBreakdown?.grossPrice?.value ?? 0;
  const nights = nightsBetween(arrivalDate, departureDate);
  const hotelId = property.id ?? result.hotel_id ?? index;

  return {
    id: String(hotelId),
    name: property.name ?? 'Hotel',
    address: property.wishlistName ?? property.countryCode ?? '',
    images: property.photoUrls?.length
      ? uniqueHotelPhotoUrls(property.photoUrls)
      : ['/assets/riviera-resort.png'],
    rating: property.reviewScore ?? 0,
    reviewCount: property.reviewCount ?? 0,
    roomType:
      property.propertyClass !== undefined
        ? `${property.propertyClass}-star property`
        : 'Hotel room',
    price,
    totalPrice: price,
    bookingSummary: `${roomQty} room${roomQty === 1 ? '' : 's'} x ${nights} night${nights === 1 ? '' : 's'} incl. taxes`,
    checkIn: formatDisplayDate(arrivalDate),
    checkOut: formatDisplayDate(departureDate),
    facilities: [],
  };
}
