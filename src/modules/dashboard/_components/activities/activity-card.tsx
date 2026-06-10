'use client';

import {
  CaretCircleDownIcon,
  CaretCircleLeftIcon,
  CaretCircleRightIcon,
  CaretCircleUpIcon,
  ClockIcon,
  CurrencyNgnIcon,
  MapPinIcon,
  StarIcon,
  XIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { formatActivityPrice } from '@/src/modules/dashboard/constants/activities';
import type { ActivityData } from '@/src/modules/dashboard/types';

const actionClassName =
  'cursor-pointer text-sm font-medium leading-[26px] tracking-[-0.01em] text-primary-600 transition-colors hover:text-primary-700 hover:underline';

const iconButtonClassName =
  'cursor-pointer transition-opacity hover:opacity-70';

type ActivityCardProps = ActivityData & {
  showRemove?: boolean;
  showActions?: boolean;
  showReorder?: boolean;
  onRemove?: () => void;
  onDirections?: () => void;
  onSeeMore?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onActivityDetails?: () => void;
  onPriceDetails?: () => void;
  onEditDetails?: () => void;
};

const ActivityCard = ({
  name,
  description,
  images,
  rating,
  reviewCount,
  duration,
  scheduledTime,
  price,
  whatsIncluded,
  dayLabel,
  dayLabelBg = '#0a369d',
  showRemove = true,
  showActions = true,
  showReorder = true,
  onRemove,
  onDirections,
  onSeeMore,
  onMoveUp,
  onMoveDown,
  onActivityDetails,
  onPriceDetails,
  onEditDetails,
}: ActivityCardProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setActiveImageIndex(0);
  }, [images]);

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <article className="relative flex overflow-hidden rounded bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex min-w-0 flex-1 gap-4 p-6">
        <div className="relative h-[246px] w-[232px] shrink-0 self-start overflow-hidden rounded">
          <Image
            key={images[activeImageIndex]}
            src={images[activeImageIndex]}
            alt={`${name} — image ${activeImageIndex + 1} of ${images.length}`}
            fill
            sizes="232px"
            className="object-cover"
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                aria-label="Previous image"
              >
                <CaretCircleLeftIcon
                  size={32}
                  weight="fill"
                  className="text-white drop-shadow"
                />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                aria-label="Next image"
              >
                <CaretCircleRightIcon
                  size={32}
                  weight="fill"
                  className="text-white drop-shadow"
                />
              </button>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-semibold leading-7 tracking-[-0.02em] text-black">
                {name}
              </h3>
              <p className="mt-1 text-base font-medium leading-6 tracking-[-0.01em] text-text-primary">
                {description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-2">
                <button
                  type="button"
                  onClick={onDirections}
                  className="flex cursor-pointer items-center gap-1 text-base font-medium leading-6 tracking-[-0.01em] text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                >
                  <MapPinIcon size={18} weight="regular" aria-hidden />
                  Directions
                </button>

                <div className="flex items-center gap-1">
                  <StarIcon
                    size={18}
                    weight="fill"
                    className="text-[#f4b400]"
                    aria-hidden
                  />
                  <span className="text-base font-medium leading-6 tracking-[-0.01em] text-text-muted">
                    {rating} ({reviewCount})
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <ClockIcon
                    size={18}
                    weight="regular"
                    className="text-text-muted"
                    aria-hidden
                  />
                  <span className="text-base font-medium leading-6 tracking-[-0.01em] text-text-muted">
                    {duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="flex items-center justify-end gap-1">
                <CurrencyNgnIcon
                  size={28}
                  weight="regular"
                  className="shrink-0 text-text-primary"
                  aria-hidden
                />
                <span className="text-[28px] font-semibold leading-9 tracking-[-0.02em] text-text-primary">
                  {formatActivityPrice(price)}
                </span>
              </div>
              <p className="mt-1 text-base font-medium leading-6 tracking-[-0.01em] text-text-primary">
                {scheduledTime}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-neutral-400 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium leading-[26px] tracking-[-0.01em] text-text-secondary">
                What&apos;s Included:
              </span>
              <span className="text-sm font-medium leading-[26px] tracking-[-0.01em] text-text-secondary">
                {whatsIncluded}
              </span>
              <button
                type="button"
                onClick={onSeeMore}
                className={actionClassName}
              >
                See more
              </button>
            </div>

            {showReorder && (
              <div className="flex items-center gap-2">
                <span
                  className="rounded px-2 py-1 text-xs font-medium leading-[22px] tracking-[-0.04em] text-white"
                  style={{ backgroundColor: dayLabelBg }}
                >
                  {dayLabel}
                </span>
                <button
                  type="button"
                  onClick={onMoveUp}
                  className={iconButtonClassName}
                  aria-label="Move activity up"
                >
                  <CaretCircleUpIcon
                    size={20}
                    weight="regular"
                    className="text-neutral-600"
                  />
                </button>
                <button
                  type="button"
                  onClick={onMoveDown}
                  className={iconButtonClassName}
                  aria-label="Move activity down"
                >
                  <CaretCircleDownIcon
                    size={20}
                    weight="regular"
                    className="text-neutral-600"
                  />
                </button>
              </div>
            )}
          </div>

          {showActions && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-400 pt-4">
              <div className="flex flex-wrap items-center gap-8">
                <button
                  type="button"
                  onClick={onActivityDetails}
                  className={actionClassName}
                >
                  Activity details
                </button>
                <button
                  type="button"
                  onClick={onPriceDetails}
                  className={actionClassName}
                >
                  Price details
                </button>
              </div>

              <button
                type="button"
                onClick={onEditDetails}
                className={actionClassName}
              >
                Edit details
              </button>
            </div>
          )}
        </div>
      </div>

      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex w-[46px] shrink-0 cursor-pointer items-center justify-center self-stretch bg-[#fbeae9] transition-colors hover:bg-[#f5d0ce]"
          aria-label="Remove activity"
        >
          <XIcon
            size={24}
            weight="regular"
            className="text-[#9e0a05] transition-transform hover:scale-110"
          />
        </button>
      )}
    </article>
  );
};

export default ActivityCard;
