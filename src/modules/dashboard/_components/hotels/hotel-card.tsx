'use client';

import {
  BedIcon,
  CalendarBlankIcon,
  CaretCircleLeftIcon,
  CaretCircleRightIcon,
  CurrencyNgnIcon,
  MapPinIcon,
  StarIcon,
  SwimmingPoolIcon,
  WineIcon,
  XIcon,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';

import {
  formatHotelPrice,
  formatHotelTotalPrice,
} from '@/src/modules/dashboard/constants/hotels';
import type {
  HotelData,
  HotelFacility,
  HotelFacilityType,
} from '@/src/modules/dashboard/types';

const facilityIcons: Record<HotelFacilityType, Icon> = {
  pool: SwimmingPoolIcon,
  bar: WineIcon,
};

type HotelCardProps = HotelData & {
  onRemove?: () => void;
  onShowMap?: () => void;
  onHotelDetails?: () => void;
  onPriceDetails?: () => void;
  onEditDetails?: () => void;
};

function AmenityItem({ facility }: { facility: HotelFacility }) {
  const IconComponent = facilityIcons[facility.type];

  return (
    <div className="flex items-center gap-1.5">
      <IconComponent
        size={20}
        weight="regular"
        className="shrink-0 text-text-secondary"
        aria-hidden
      />
      <span className=" font-medium leading-[26px] tracking-[-0.01em] text-text-secondary">
        {facility.label}
      </span>
    </div>
  );
}

function DateItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <CalendarBlankIcon
        size={20}
        weight="regular"
        className="shrink-0 text-text-secondary"
        aria-hidden
      />
      <span className=" font-medium leading-[26px] tracking-[-0.01em] text-text-secondary">
        {label}
      </span>
    </div>
  );
}

const HotelCard = ({
  name,
  address,
  images,
  rating,
  reviewCount,
  roomType,
  price,
  totalPrice,
  bookingSummary,
  checkIn,
  checkOut,
  facilities,
  onRemove,
  onShowMap,
  onHotelDetails,
  onPriceDetails,
  onEditDetails,
}: HotelCardProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;
  const actionClassName =
    ' font-medium leading-[26px] tracking-[-0.01em] text-primary-600';

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <article className="relative flex overflow-hidden rounded bg-white">
      <div className="flex min-w-0 flex-1 gap-4 p-6">
        <div className="relative h-[224px] w-[232px] shrink-0 self-start overflow-hidden rounded">
          <Image
            src={images[activeImageIndex]}
            alt={name}
            fill
            className="object-cover"
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 -translate-y-1/2"
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
                className="absolute right-3 top-1/2 -translate-y-1/2"
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
                {address}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-2">
                <button
                  type="button"
                  onClick={onShowMap}
                  className="flex items-center gap-1 text-base font-medium leading-6 tracking-[-0.01em] text-primary-600"
                >
                  <MapPinIcon size={18} weight="regular" aria-hidden />
                  Show in map
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
                  <BedIcon
                    size={18}
                    weight="regular"
                    className="text-text-muted"
                    aria-hidden
                  />
                  <span className="text-base font-medium leading-6 tracking-[-0.01em] text-text-muted">
                    {roomType}
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
                  {formatHotelPrice(price)}
                </span>
              </div>
              <p className="mt-1 text-base font-medium leading-6 tracking-[-0.01em] text-text-primary">
                Total Price: {formatHotelTotalPrice(totalPrice)}
              </p>
              <p className="text-base font-medium leading-6 tracking-[-0.01em] text-text-primary">
                {bookingSummary}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-neutral-400 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className=" font-medium leading-[26px] tracking-[-0.01em] text-text-secondary">
                Facilities:
              </span>
              {facilities.map((facility) => (
                <AmenityItem key={facility.id} facility={facility} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <DateItem label={`Check In: ${checkIn}`} />
              <DateItem label={`Check Out: ${checkOut}`} />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-400 pt-4">
            <div className="flex flex-wrap items-center gap-8">
              <button
                type="button"
                onClick={onHotelDetails}
                className={actionClassName}
              >
                Hotel details
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
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="flex w-[46px] shrink-0 items-center justify-center self-stretch bg-[#fbeae9]"
        aria-label="Remove hotel"
      >
        <XIcon size={24} weight="regular" className="text-[#9e0a05]" />
      </button>
    </article>
  );
};

export default HotelCard;
