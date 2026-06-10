'use client';

import { WarehouseIcon } from '@phosphor-icons/react';

import EmptyState from '@/src/modules/dashboard/_components/empty-state';
import HotelCard from '@/src/modules/dashboard/_components/hotels/hotel-card';
import type { HotelData } from '@/src/modules/dashboard/types';

type HotelProps = {
  hotels?: HotelData[];
  onAddHotel?: () => void;
  onRemoveHotel?: (id: string) => void;
  onShowMap?: (id: string) => void;
  onHotelDetails?: (id: string) => void;
  onPriceDetails?: (id: string) => void;
  onEditDetails?: (id: string) => void;
};

const Hotel = ({
  hotels = [],
  onAddHotel,
  onRemoveHotel,
  onShowMap,
  onHotelDetails,
  onPriceDetails,
  onEditDetails,
}: HotelProps) => {
  const isEmpty = hotels.length === 0;

  return (
    <section className="rounded bg-neutral-900 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <WarehouseIcon
            size={24}
            weight="regular"
            className="shrink-0 text-white"
            aria-hidden
          />
          <h2 className="text-lg font-semibold leading-[26px] tracking-[-0.04em] text-white">
            Hotels
          </h2>
        </div>

        {!isEmpty && (
          <button
            type="button"
            onClick={onAddHotel}
            className="flex h-[46px] w-[153px] shrink-0 items-center justify-center rounded bg-white px-6 py-3 text-sm font-semibold leading-[22px] tracking-[-0.04em] text-text-primary"
          >
            Add Hotels
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex h-[274px] items-center justify-center rounded bg-white">
          <EmptyState type="hotels" onAction={onAddHotel} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              {...hotel}
              onRemove={() => onRemoveHotel?.(hotel.id)}
              onShowMap={() => onShowMap?.(hotel.id)}
              onHotelDetails={() => onHotelDetails?.(hotel.id)}
              onPriceDetails={() => onPriceDetails?.(hotel.id)}
              onEditDetails={() => onEditDetails?.(hotel.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hotel;
