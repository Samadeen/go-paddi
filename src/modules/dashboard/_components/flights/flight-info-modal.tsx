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
import { formatFlightPrice } from '@/src/modules/dashboard/constants/flights';
import type { FlightData } from '@/src/modules/dashboard/types';

export type FlightInfoModalView = 'details' | 'price' | 'edit';

type FlightInfoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flight: FlightData | null;
  view: FlightInfoModalView;
  onSave?: (flight: FlightData) => void;
};

const titles: Record<FlightInfoModalView, string> = {
  details: 'Flight details',
  price: 'Price details',
  edit: 'Edit flight details',
};

const descriptions: Record<FlightInfoModalView, string> = {
  details: 'Review your flight route, schedule, and included facilities.',
  price: 'Review the total fare for this flight.',
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

const FlightInfoModal = ({
  open,
  onOpenChange,
  flight,
  view,
  onSave,
}: FlightInfoModalProps) => {
  const [draft, setDraft] = useState<FlightData | null>(flight);

  useEffect(() => {
    if (open && flight) {
      setDraft(flight);
    }
  }, [open, flight]);

  if (!flight || !draft) return null;

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
            <DetailRow label="Airline" value={flight.airlineName} />
            <DetailRow label="Flight number" value={flight.flightNumber} />
            <DetailRow label="Cabin class" value={flight.cabinClass} />
            <DetailRow
              label="Route"
              value={`${flight.originCode} → ${flight.destinationCode}`}
            />
            <DetailRow
              label="Departure"
              value={`${flight.departureTime} · ${flight.departureDate}`}
            />
            <DetailRow
              label="Arrival"
              value={`${flight.arrivalTime} · ${flight.arrivalDate}`}
            />
            <DetailRow label="Duration" value={flight.duration} />
            <DetailRow label="Stops" value={flight.stopType} />
            {flight.facilities.length > 0 && (
              <div className="flex flex-col gap-2 pt-3">
                <span className="text-sm font-medium text-text-muted">
                  Facilities
                </span>
                <ul className="flex flex-col gap-1.5">
                  {flight.facilities.map((facility) => (
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
              <p className="text-sm font-medium text-text-muted">Total fare</p>
              <p className="mt-1 text-3xl font-semibold text-text-primary">
                {formatFlightPrice(flight.price)}
              </p>
            </div>
            <div className="flex flex-col">
              <DetailRow label="Airline" value={flight.airlineName} />
              <DetailRow label="Flight" value={flight.flightNumber} />
              <DetailRow label="Cabin" value={flight.cabinClass} />
              <DetailRow
                label="Route"
                value={`${flight.originCode} → ${flight.destinationCode}`}
              />
            </div>
            <p className="text-xs text-text-muted">
              Taxes and fees are included in the total shown unless stated
              otherwise by the airline.
            </p>
          </div>
        )}

        {view === 'edit' && (
          <div className="grid gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-flight-number">Flight number</Label>
              <Input
                id="edit-flight-number"
                value={draft.flightNumber}
                onChange={(event) =>
                  setDraft({ ...draft, flightNumber: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-cabin-class">Cabin class</Label>
              <Input
                id="edit-cabin-class"
                value={draft.cabinClass}
                onChange={(event) =>
                  setDraft({ ...draft, cabinClass: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-departure-time">Departure time</Label>
                <Input
                  id="edit-departure-time"
                  value={draft.departureTime}
                  onChange={(event) =>
                    setDraft({ ...draft, departureTime: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-arrival-time">Arrival time</Label>
                <Input
                  id="edit-arrival-time"
                  value={draft.arrivalTime}
                  onChange={(event) =>
                    setDraft({ ...draft, arrivalTime: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-departure-date">Departure date</Label>
                <Input
                  id="edit-departure-date"
                  value={draft.departureDate}
                  onChange={(event) =>
                    setDraft({ ...draft, departureDate: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-arrival-date">Arrival date</Label>
                <Input
                  id="edit-arrival-date"
                  value={draft.arrivalDate}
                  onChange={(event) =>
                    setDraft({ ...draft, arrivalDate: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
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

export default FlightInfoModal;
