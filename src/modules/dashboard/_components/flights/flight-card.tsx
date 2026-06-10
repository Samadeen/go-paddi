'use client';

import {
  AirplaneLandingIcon,
  AirplaneTakeoffIcon,
  CurrencyNgnIcon,
  FilmSlateIcon,
  ForkKnifeIcon,
  SuitcaseRollingIcon,
  UsbIcon,
  XIcon,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import Image from 'next/image';

import { formatFlightPrice } from '@/src/modules/dashboard/constants/flights';
import type {
  FlightData,
  FlightFacility,
  FlightFacilityType,
} from '@/src/modules/dashboard/types';
import americanAirlinesLogo from '@/public/assets/american_airlines.svg';

const facilityIcons: Record<FlightFacilityType, Icon> = {
  baggage: SuitcaseRollingIcon,
  entertainment: FilmSlateIcon,
  meal: ForkKnifeIcon,
  usb: UsbIcon,
};

type FlightCardProps = FlightData & {
  showRemove?: boolean;
  showActions?: boolean;
  onRemove?: () => void;
  onFlightDetails?: () => void;
  onPriceDetails?: () => void;
  onEditDetails?: () => void;
};

const actionClassName =
  'cursor-pointer text-sm font-medium leading-[26px] tracking-[-0.01em] text-primary-600 transition-colors hover:text-primary-700 hover:underline';

function FacilityItem({ facility }: { facility: FlightFacility }) {
  const IconComponent = facilityIcons[facility.type];

  return (
    <div className="flex items-center gap-1.5">
      <IconComponent
        size={20}
        weight="regular"
        className="shrink-0 text-text-secondary"
        aria-hidden
      />
      <span className="text-sm font-medium leading-[26px] tracking-[-0.01em] text-text-secondary">
        {facility.label}
      </span>
    </div>
  );
}

function FlightRoute({
  duration,
  stopType,
  originCode,
  destinationCode,
}: Pick<
  FlightData,
  'duration' | 'stopType' | 'originCode' | 'destinationCode'
>) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="relative flex items-center justify-center px-5">
        <AirplaneTakeoffIcon
          size={20}
          weight="regular"
          className="absolute left-0 text-neutral-800"
          aria-hidden
        />
        <span className="text-base font-medium leading-6 tracking-[-0.04em] text-text-muted">
          Duration: {duration}
        </span>
        <AirplaneLandingIcon
          size={20}
          weight="regular"
          className="absolute right-0 text-neutral-800"
          aria-hidden
        />
      </div>

      <div className="relative h-2 w-full rounded-lg bg-primary-100">
        <div className="absolute left-[33%] h-2 w-1/3 rounded-lg bg-primary-600" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold leading-6 tracking-[-0.04em] text-text-primary">
          {originCode}
        </span>
        <span className="text-base font-medium leading-6 tracking-[-0.04em] text-text-muted">
          {stopType}
        </span>
        <span className="text-base font-semibold leading-6 tracking-[-0.04em] text-text-primary">
          {destinationCode}
        </span>
      </div>
    </div>
  );
}

const FlightCard = ({
  airlineName,
  airlineLogo,
  flightNumber,
  cabinClass,
  cabinClassBg = '#0a369d',
  departureTime,
  departureDate,
  arrivalTime,
  arrivalDate,
  duration,
  stopType,
  originCode,
  destinationCode,
  price,
  facilities,
  showRemove = true,
  showActions = true,
  onRemove,
  onFlightDetails,
  onPriceDetails,
  onEditDetails,
}: FlightCardProps) => {
  return (
    <article className="relative flex overflow-hidden rounded bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-col gap-6 border-b border-neutral-400 p-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={airlineLogo ?? americanAirlinesLogo}
              alt={airlineName}
              width={24}
              height={24}
              className="shrink-0"
            />

            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold leading-7 tracking-[-0.02em] text-text-primary">
                {airlineName}
              </h3>

              <div className="flex items-center gap-1">
                <span className="text-base font-medium leading-6 tracking-[-0.04em] text-text-muted">
                  {flightNumber}
                </span>
                <span
                  className="mx-1 size-1 shrink-0 rounded-full bg-neutral-700"
                  aria-hidden
                />
                <span
                  className="rounded px-2 py-1 text-xs font-medium leading-[22px] tracking-[-0.04em] text-white"
                  style={{ backgroundColor: cabinClassBg }}
                >
                  {cabinClass}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-6 lg:flex-row lg:justify-center">
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-text-primary">
                {departureTime}
              </span>
              <span className="text-sm font-medium leading-[22px] tracking-[-0.04em] text-text-muted">
                {departureDate}
              </span>
            </div>

            <FlightRoute
              duration={duration}
              stopType={stopType}
              originCode={originCode}
              destinationCode={destinationCode}
            />

            <div className="flex flex-col items-start gap-0.5">
              <span className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-text-primary">
                {arrivalTime}
              </span>
              <span className="text-sm font-medium leading-[22px] tracking-[-0.04em] text-text-muted">
                {arrivalDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <CurrencyNgnIcon
              size={28}
              weight="regular"
              className="shrink-0 text-text-primary"
              aria-hidden
            />
            <span className="text-[28px] font-semibold leading-9 tracking-[-0.02em] text-text-primary">
              {formatFlightPrice(price)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-neutral-400 px-6 py-4">
          <span className="text-sm font-medium leading-[26px] tracking-[-0.01em] text-text-secondary">
            Facilities:
          </span>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {facilities.map((facility) => (
              <FacilityItem key={facility.id} facility={facility} />
            ))}
          </div>
        </div>

        {showActions && (
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="flex flex-wrap items-center gap-8">
              <button
                type="button"
                onClick={onFlightDetails}
                className={actionClassName}
              >
                Flight details
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

      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex w-[46px] shrink-0 cursor-pointer items-center justify-center self-stretch bg-[#fbeae9] transition-colors hover:bg-[#f5d0ce]"
          aria-label="Remove flight"
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

export default FlightCard;
