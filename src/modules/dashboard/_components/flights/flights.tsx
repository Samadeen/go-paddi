'use client';

import { AirplaneInFlightIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';

import { usePersistedFlights } from '@/src/hooks/use-persisted-flights';
import EmptyState from '@/src/modules/dashboard/_components/empty-state';
import AddFlightModal from '@/src/modules/dashboard/_components/flights/add-flight-modal';
import FlightCard from '@/src/modules/dashboard/_components/flights/flight-card';
import FlightInfoModal, {
  type FlightInfoModalView,
} from '@/src/modules/dashboard/_components/flights/flight-info-modal';
import type { FlightData } from '@/src/modules/dashboard/types';

type FlightsProps = {
  flights?: FlightData[];
  onRemoveFlight?: (id: string) => void;
  onFlightDetails?: (id: string) => void;
  onPriceDetails?: (id: string) => void;
  onEditDetails?: (id: string) => void;
};

type ActiveModal = {
  flightId: string;
  view: FlightInfoModalView;
};

const Flights = ({
  flights: initialFlights,
  onRemoveFlight,
  onFlightDetails,
  onPriceDetails,
  onEditDetails,
}: FlightsProps) => {
  const { flights, setFlights, hydrated } = usePersistedFlights(initialFlights);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const isEmpty = flights.length === 0;

  const activeFlight = useMemo(
    () => flights.find((flight) => flight.id === activeModal?.flightId) ?? null,
    [activeModal, flights],
  );

  const handleAddFlight = (flight: FlightData) => {
    setFlights((current) => [...current, flight]);
  };

  const handleRemoveFlight = (id: string) => {
    setFlights((current) => current.filter((flight) => flight.id !== id));
    onRemoveFlight?.(id);
  };

  const openInfoModal = (flightId: string, view: FlightInfoModalView) => {
    setActiveModal({ flightId, view });
  };

  const handleFlightDetails = (id: string) => {
    openInfoModal(id, 'details');
    onFlightDetails?.(id);
  };

  const handlePriceDetails = (id: string) => {
    openInfoModal(id, 'price');
    onPriceDetails?.(id);
  };

  const handleEditDetails = (id: string) => {
    openInfoModal(id, 'edit');
    onEditDetails?.(id);
  };

  const handleSaveFlight = (updatedFlight: FlightData) => {
    setFlights((current) =>
      current.map((flight) =>
        flight.id === updatedFlight.id ? updatedFlight : flight,
      ),
    );
  };

  const openModal = () => setIsModalOpen(true);

  if (!hydrated) {
    return (
      <section className="rounded bg-neutral-300 p-6">
        <div className="flex h-[274px] items-center justify-center rounded bg-white">
          <p className="text-sm text-text-muted">Loading flights...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="rounded bg-neutral-300 p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <AirplaneInFlightIcon
              size={24}
              weight="regular"
              className="shrink-0 text-neutral-900"
              aria-hidden
            />
            <h2 className="text-lg font-semibold leading-[26px] tracking-[-0.04em] text-text-primary">
              Flights
            </h2>
          </div>

          {!isEmpty && (
            <button
              type="button"
              onClick={openModal}
              className="flex h-[46px] w-[153px] shrink-0 cursor-pointer items-center justify-center rounded bg-white px-6 py-3 text-sm font-semibold leading-[22px] tracking-[-0.04em] text-primary-600 transition-colors hover:bg-primary-50"
            >
              Add Flights
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="flex h-[274px] items-center justify-center rounded bg-white">
            <EmptyState type="flights" onAction={openModal} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                {...flight}
                onRemove={() => handleRemoveFlight(flight.id)}
                onFlightDetails={() => handleFlightDetails(flight.id)}
                onPriceDetails={() => handlePriceDetails(flight.id)}
                onEditDetails={() => handleEditDetails(flight.id)}
              />
            ))}
          </div>
        )}
      </section>

      <AddFlightModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddFlight={handleAddFlight}
      />

      <FlightInfoModal
        open={activeModal !== null}
        onOpenChange={(open) => {
          if (!open) setActiveModal(null);
        }}
        flight={activeFlight}
        view={activeModal?.view ?? 'details'}
        onSave={handleSaveFlight}
      />
    </>
  );
};

export default Flights;
