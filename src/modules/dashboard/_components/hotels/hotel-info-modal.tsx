'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  formatHotelPrice,
  formatHotelTotalPrice,
} from '@/src/modules/dashboard/constants/hotels';
import type { HotelData } from '@/src/modules/dashboard/types';

export type HotelInfoModalView = 'details' | 'price' | 'edit';

type HotelInfoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: HotelData | null;
  view: HotelInfoModalView;
  onSave?: (hotel: HotelData) => void;
};

const titles: Record<HotelInfoModalView, string> = {
  details: 'Hotel details',
  price: 'Price details',
  edit: 'Edit hotel details',
};

const descriptions: Record<HotelInfoModalView, string> = {
  details: 'Review your hotel stay, room type, and facilities.',
  price: 'Review the pricing breakdown for this hotel.',
  edit: 'Update the details shown on your itinerary.',
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-neutral-300 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

const HotelInfoModal = ({
  open,
  onOpenChange,
  hotel,
  view,
  onSave,
}: HotelInfoModalProps) => {
  const [draft, setDraft] = useState<HotelData | null>(hotel);

  useEffect(() => {
    if (open && hotel) {
      setDraft(hotel);
    }
  }, [open, hotel]);

  if (!hotel || !draft) return null;

  const handleSave = () => {
    onSave?.(draft);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-text-primary">
            {titles[view]}
          </DialogTitle>
          <DialogDescription>{descriptions[view]}</DialogDescription>
        </DialogHeader>

        {view === 'details' && (
          <div className="flex flex-col">
            <DetailRow label="Hotel" value={hotel.name} />
            <DetailRow label="Address" value={hotel.address} />
            <DetailRow label="Room type" value={hotel.roomType} />
            <DetailRow
              label="Rating"
              value={`${hotel.rating} (${hotel.reviewCount} reviews)`}
            />
            <DetailRow label="Check in" value={hotel.checkIn} />
            <DetailRow label="Check out" value={hotel.checkOut} />
            <DetailRow label="Booking" value={hotel.bookingSummary} />
            {hotel.facilities.length > 0 && (
              <div className="flex flex-col gap-2 pt-3">
                <span className="text-sm font-medium text-text-muted">
                  Facilities
                </span>
                <ul className="flex flex-col gap-1.5">
                  {hotel.facilities.map((facility) => (
                    <li
                      key={facility.id}
                      className="text-sm font-medium text-text-primary"
                    >
                      {facility.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {view === 'price' && (
          <div className="flex flex-col gap-4">
            <div className="rounded border border-neutral-400 bg-neutral-100 p-4">
              <p className="text-sm font-medium text-text-muted">Nightly rate</p>
              <p className="mt-1 text-3xl font-semibold text-text-primary">
                {formatHotelPrice(hotel.price)}
              </p>
            </div>
            <div className="flex flex-col">
              <DetailRow
                label="Total price"
                value={formatHotelTotalPrice(hotel.totalPrice)}
              />
              <DetailRow label="Hotel" value={hotel.name} />
              <DetailRow label="Stay" value={hotel.bookingSummary} />
              <DetailRow
                label="Dates"
                value={`${hotel.checkIn} → ${hotel.checkOut}`}
              />
            </div>
            <p className="text-xs text-text-muted">
              Taxes and fees are included in the total shown unless stated
              otherwise.
            </p>
          </div>
        )}

        {view === 'edit' && (
          <div className="grid gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-hotel-name">Hotel name</Label>
              <Input
                id="edit-hotel-name"
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-hotel-address">Address</Label>
              <Input
                id="edit-hotel-address"
                value={draft.address}
                onChange={(event) =>
                  setDraft({ ...draft, address: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-room-type">Room type</Label>
              <Input
                id="edit-room-type"
                value={draft.roomType}
                onChange={(event) =>
                  setDraft({ ...draft, roomType: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-check-in">Check in</Label>
                <Input
                  id="edit-check-in"
                  value={draft.checkIn}
                  onChange={(event) =>
                    setDraft({ ...draft, checkIn: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-check-out">Check out</Label>
                <Input
                  id="edit-check-out"
                  value={draft.checkOut}
                  onChange={(event) =>
                    setDraft({ ...draft, checkOut: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-hotel-price">Nightly price</Label>
                <Input
                  id="edit-hotel-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.price}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      price: Number(event.target.value) || 0,
                    })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-total-price">Total price</Label>
                <Input
                  id="edit-total-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.totalPrice}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      totalPrice: Number(event.target.value) || 0,
                    })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-booking-summary">Booking summary</Label>
              <Input
                id="edit-booking-summary"
                value={draft.bookingSummary}
                onChange={(event) =>
                  setDraft({ ...draft, bookingSummary: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {view === 'edit' ? 'Cancel' : 'Close'}
          </Button>
          {view === 'edit' && (
            <Button
              type="button"
              onClick={handleSave}
              className="bg-primary-600 text-white hover:bg-primary-600/90"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HotelInfoModal;
