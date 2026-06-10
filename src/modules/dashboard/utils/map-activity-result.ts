import type { AttractionProduct } from '@/src/hooks/use-attraction/attraction.types';
import type { ActivityData } from '@/src/modules/dashboard/types';

export function mapAttractionProductToActivityData(
  product: AttractionProduct,
  index: number,
): ActivityData {
  const price = product.representativePrice?.chargeAmount ?? 0;
  const city = product.ufiDetails?.bCityName;

  return {
    id: product.id ?? String(index),
    name: product.name ?? 'Activity',
    description: product.shortDescription ?? '',
    images: product.primaryPhoto?.small
      ? [product.primaryPhoto.small]
      : ['/assets/moma-museum.png'],
    rating: product.reviewsStats?.combinedNumericStats?.average ?? 0,
    reviewCount:
      product.reviewsStats?.combinedNumericStats?.total ??
      product.reviewsStats?.allReviewsCount ??
      0,
    duration: 'Varies',
    scheduledTime: city ? `In ${city}` : 'To be scheduled',
    price,
    whatsIncluded: product.cancellationPolicy?.hasFreeCancellation
      ? 'Free cancellation available'
      : 'See activity details',
    dayLabel: 'Day 1',
  };
}
