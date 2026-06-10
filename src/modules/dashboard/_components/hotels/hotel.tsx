'use client';

import { WarehouseIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { usePersistedHotels } from '@/src/hooks/use-persisted-hotels';
import EmptyState from '@/src/modules/dashboard/_components/empty-state';
import AddHotelModal from '@/src/modules/dashboard/_components/hotels/add-hotel-modal';
import HotelCard from '@/src/modules/dashboard/_components/hotels/hotel-card';
import HotelInfoModal, {
  type HotelInfoModalView,
} from '@/src/modules/dashboard/_components/hotels/hotel-info-modal';
import type { HotelData } from '@/src/modules/dashboard/types';

type HotelProps = {
  hotels?: HotelData[];
  addModalOpen?: boolean;
  onAddModalOpenChange?: (open: boolean) => void;
  onRemoveHotel?: (id: string) => void;
  onShowMap?: (id: string) => void;
  onHotelDetails?: (id: string) => void;
  onPriceDetails?: (id: string) => void;
  onEditDetails?: (id: string) => void;
};

type ActiveModal = {
  hotelId: string;
  view: HotelInfoModalView;
};

const getHotelLabel = (hotel: HotelData) => hotel.name;

const Hotel = ({
  hotels: initialHotels,
  addModalOpen,
  onAddModalOpenChange,
  onRemoveHotel,
  onShowMap,
  onHotelDetails,
  onPriceDetails,
  onEditDetails,
}: HotelProps) => {
  const { hotels, setHotels, hydrated } = usePersistedHotels(initialHotels);
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const isModalOpen = onAddModalOpenChange
    ? (addModalOpen ?? false)
    : internalModalOpen;
  const setModalOpen = (open: boolean) => {
    if (onAddModalOpenChange) onAddModalOpenChange(open);
    else setInternalModalOpen(open);
  };
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const isEmpty = hotels.length === 0;

  const activeHotel = useMemo(
    () => hotels.find((hotel) => hotel.id === activeModal?.hotelId) ?? null,
    [activeModal, hotels],
  );

  const handleAddHotel = (hotel: HotelData) => {
    setHotels((current) => [...current, hotel]);
    toast.success('Hotel added', {
      description: `${getHotelLabel(hotel)} has been added to your trip.`,
    });
  };

  const handleRemoveHotel = (id: string) => {
    const hotel = hotels.find((item) => item.id === id);
    setHotels((current) => current.filter((item) => item.id !== id));
    onRemoveHotel?.(id);
    toast.success('Hotel removed', {
      description: hotel
        ? `${getHotelLabel(hotel)} has been removed from your trip.`
        : 'The hotel has been removed from your trip.',
    });
  };

  const openInfoModal = (hotelId: string, view: HotelInfoModalView) => {
    setActiveModal({ hotelId, view });
  };

  const handleHotelDetails = (id: string) => {
    openInfoModal(id, 'details');
    onHotelDetails?.(id);
  };

  const handlePriceDetails = (id: string) => {
    openInfoModal(id, 'price');
    onPriceDetails?.(id);
  };

  const handleEditDetails = (id: string) => {
    openInfoModal(id, 'edit');
    onEditDetails?.(id);
  };

  const handleShowMap = (id: string) => {
    const hotel = hotels.find((item) => item.id === id);
    if (hotel?.address) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
    onShowMap?.(id);
  };

  const handleSaveHotel = (updatedHotel: HotelData) => {
    setHotels((current) =>
      current.map((hotel) =>
        hotel.id === updatedHotel.id ? updatedHotel : hotel,
      ),
    );
    toast.success('Hotel updated', {
      description: `${getHotelLabel(updatedHotel)} has been saved.`,
    });
  };

  const openModal = () => setModalOpen(true);

  if (!hydrated) {
    return (
      <section className="rounded bg-neutral-900 p-6">
        <div className="flex h-[274px] items-center justify-center rounded bg-white">
          <p className="text-sm text-text-muted">Loading hotels...</p>
        </div>
      </section>
    );
  }

  return (
    <>
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
              onClick={openModal}
              className="flex h-[46px] w-[153px] shrink-0 cursor-pointer items-center justify-center rounded bg-white px-6 py-3 text-sm font-semibold leading-[22px] tracking-[-0.04em] text-text-primary transition-colors hover:bg-neutral-100"
            >
              Add Hotels
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="flex h-[274px] items-center justify-center rounded bg-white">
            <EmptyState type="hotels" onAction={openModal} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                {...hotel}
                onRemove={() => handleRemoveHotel(hotel.id)}
                onShowMap={() => handleShowMap(hotel.id)}
                onHotelDetails={() => handleHotelDetails(hotel.id)}
                onPriceDetails={() => handlePriceDetails(hotel.id)}
                onEditDetails={() => handleEditDetails(hotel.id)}
              />
            ))}
          </div>
        )}
      </section>

      <AddHotelModal
        open={isModalOpen}
        onOpenChange={setModalOpen}
        onAddHotel={handleAddHotel}
      />

      <HotelInfoModal
        open={activeModal !== null}
        onOpenChange={(open) => {
          if (!open) setActiveModal(null);
        }}
        hotel={activeHotel}
        view={activeModal?.view ?? 'details'}
        onSave={handleSaveHotel}
      />
    </>
  );
};

export default Hotel;
