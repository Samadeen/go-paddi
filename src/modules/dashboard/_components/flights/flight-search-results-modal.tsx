'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import FlightCard from '@/src/modules/dashboard/_components/flights/flight-card';
import type { FlightData } from '@/src/modules/dashboard/types';

type FlightSearchResultsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flights: FlightData[];
  totalCount?: number;
  routeLabel?: string;
  isLoading?: boolean;
  onSelectFlight: (flight: FlightData) => void;
};

const FlightSearchResultsModal = ({
  open,
  onOpenChange,
  flights,
  totalCount,
  routeLabel,
  isLoading,
  onSelectFlight,
}: FlightSearchResultsModalProps) => {
  const resultLabel =
    totalCount !== undefined
      ? `Showing ${flights.length} of ${totalCount} flights`
      : `${flights.length} flight${flights.length === 1 ? '' : 's'} found`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden bg-white sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-text-primary">
            Flight results
          </DialogTitle>
          <DialogDescription>
            {routeLabel ? `${routeLabel} · ${resultLabel}` : resultLabel}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-10rem)] pr-4">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-text-muted">
              Searching for flights...
            </p>
          ) : flights.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">
              No flights found for your search.
            </p>
          ) : (
            <div className="flex flex-col gap-6 pb-2">
              {flights.map((flight) => (
                <div key={flight.id} className="flex flex-col gap-3">
                  <FlightCard
                    {...flight}
                    showRemove={false}
                    showActions={false}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => onSelectFlight(flight)}
                      className="bg-primary-600 text-white hover:bg-primary-600/90"
                    >
                      Add to trip
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlightSearchResultsModal;
