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
import HotelCard from '@/src/modules/dashboard/_components/hotels/hotel-card';
import type { HotelData } from '@/src/modules/dashboard/types';

type HotelSearchResultsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotels: HotelData[];
  destinationLabel?: string;
  isLoading?: boolean;
  onSelectHotel: (hotel: HotelData) => void;
};

const HotelSearchResultsModal = ({
  open,
  onOpenChange,
  hotels,
  destinationLabel,
  isLoading,
  onSelectHotel,
}: HotelSearchResultsModalProps) => {
  const resultLabel = `${hotels.length} hotel${hotels.length === 1 ? '' : 's'} found`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden bg-white sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-text-primary">
            Hotel results
          </DialogTitle>
          <DialogDescription>
            {destinationLabel
              ? `${destinationLabel} · ${resultLabel}`
              : resultLabel}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-10rem)] pr-4">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-text-muted">
              Searching for hotels...
            </p>
          ) : hotels.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">
              No hotels found for your search.
            </p>
          ) : (
            <div className="flex flex-col gap-6 pb-2">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="flex flex-col gap-3">
                  <HotelCard
                    {...hotel}
                    showRemove={false}
                    showActions={false}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => onSelectHotel(hotel)}
                      className="bg-primary-600 text-white hover:bg-primary-600/90"
                    >
                      Add to hotel
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

export default HotelSearchResultsModal;
