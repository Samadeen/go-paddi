'use client';

import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  Currency,
  FlightCabinClass,
  FlightLocation,
  FlightSortOption,
  FlightStopsFilter,
} from '@/src/hooks/use-flight/flight.types';
import {
  useCurrencyQuery,
  useSearchFlightsMutation,
} from '@/src/hooks/use-flight/use-flight';
import FlightLocationPicker from '@/src/modules/dashboard/_components/flights/flight-location-picker';
import FlightSearchResultsModal from '@/src/modules/dashboard/_components/flights/flight-search-results-modal';
import { mapFlightOfferToFlightData } from '@/src/modules/dashboard/utils/map-flight-offer';
import type { FlightData } from '@/src/modules/dashboard/types';

type AddFlightModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFlight: (flight: FlightData) => void;
};

const stopsOptions: { value: FlightStopsFilter; label: string }[] = [
  { value: 'none', label: 'Any stops' },
  { value: '0', label: 'Non-stop' },
  { value: '1', label: '1 stop' },
  { value: '2', label: '2 stops' },
];

const sortOptions: { value: FlightSortOption; label: string }[] = [
  { value: 'BEST', label: 'Best' },
  { value: 'CHEAPEST', label: 'Cheapest' },
  { value: 'FASTEST', label: 'Fastest' },
];

const cabinOptions: { value: FlightCabinClass; label: string }[] = [
  { value: 'ECONOMY', label: 'Economy' },
  { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'FIRST', label: 'First' },
];

const AddFlightModal = ({
  open,
  onOpenChange,
  onAddFlight,
}: AddFlightModalProps) => {
  const [from, setFrom] = useState<FlightLocation | null>(null);
  const [to, setTo] = useState<FlightLocation | null>(null);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [stops, setStops] = useState<FlightStopsFilter>('none');
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [sort, setSort] = useState<FlightSortOption>('BEST');
  const [cabinClass, setCabinClass] = useState<FlightCabinClass>('ECONOMY');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [formError, setFormError] = useState('');
  const [resultsOpen, setResultsOpen] = useState(false);

  const { data: currencyData } = useCurrencyQuery(open);
  const searchMutation = useSearchFlightsMutation();

  const currencies = useMemo(() => {
    const list: Currency[] = currencyData?.data ?? [];
    return list.filter((currency) => currency.code !== 'hotel_currency');
  }, [currencyData]);

  const results = useMemo(() => {
    const offers = searchMutation.data?.data?.flightOffers ?? [];
    return offers.map((offer, index) => mapFlightOfferToFlightData(offer, index));
  }, [searchMutation.data]);

  const totalCount = searchMutation.data?.data?.aggregation?.totalCount;

  const routeLabel = useMemo(() => {
    if (!from || !to) return undefined;
    const fromLabel = from.code ?? from.name;
    const toLabel = to.code ?? to.name;
    return `${fromLabel} → ${toLabel}`;
  }, [from, to]);

  const resetForm = () => {
    setFrom(null);
    setTo(null);
    setDepartDate('');
    setReturnDate('');
    setStops('none');
    setAdults(1);
    setChildrenCount(0);
    setChildrenAges([]);
    setSort('BEST');
    setCabinClass('ECONOMY');
    setCurrencyCode('USD');
    setFormError('');
    setResultsOpen(false);
    searchMutation.reset();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const updateChildrenCount = (count: number) => {
    const nextCount = Math.max(0, count);
    setChildrenCount(nextCount);
    setChildrenAges((current) => {
      if (nextCount > current.length) {
        return [...current, ...Array(nextCount - current.length).fill(0)];
      }
      return current.slice(0, nextCount);
    });
  };

  const handleSearch = async () => {
    if (!from || !to || !departDate || !returnDate) {
      setFormError('Please fill in departure, destination, and travel dates.');
      return;
    }

    setFormError('');

    const children =
      childrenCount > 0 ? childrenAges.slice(0, childrenCount).join(',') : undefined;

    try {
      await searchMutation.mutateAsync({
        fromId: from.id,
        toId: to.id,
        departDate,
        returnDate,
        stops: stops === 'none' ? undefined : stops,
        adults,
        children,
        sort,
        cabinClass,
        currency_code: currencyCode,
      });
      setResultsOpen(true);
    } catch {
      // Error state is handled by searchMutation.isError
    }
  };

  const handleSelectFlight = (flight: FlightData) => {
    onAddFlight(flight);
    setResultsOpen(false);
    handleOpenChange(false);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-text-primary">
            Add Flight
          </DialogTitle>
          <DialogDescription>
            Search for flights and add one to your trip itinerary.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
          <div className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <FlightLocationPicker
                label="From"
                value={from}
                onChange={setFrom}
                placeholder="Departure city or airport"
              />
              <FlightLocationPicker
                label="To"
                value={to}
                onChange={setTo}
                placeholder="Arrival city or airport"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Departure date</Label>
                <DatePicker
                  value={departDate}
                  onChange={(date) => {
                    setDepartDate(date);
                    if (returnDate && returnDate < date) {
                      setReturnDate('');
                    }
                  }}
                  placeholder="Select departure date"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Return date</Label>
                <DatePicker
                  value={returnDate}
                  onChange={setReturnDate}
                  minDate={departDate || undefined}
                  placeholder="Select return date"
                  disabled={!departDate}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Stops</Label>
                <Select
                  value={stops}
                  onValueChange={(value) => setStops(value as FlightStopsFilter)}
                >
                  <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[100]">
                    {stopsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Sort by</Label>
                <Select
                  value={sort}
                  onValueChange={(value) => setSort(value as FlightSortOption)}
                >
                  <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[100]">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Cabin class</Label>
                <Select
                  value={cabinClass}
                  onValueChange={(value) =>
                    setCabinClass(value as FlightCabinClass)
                  }
                >
                  <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[100]">
                    {cabinOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Currency</Label>
                <Select value={currencyCode} onValueChange={setCurrencyCode}>
                  <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[100] max-h-60">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} — {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Adults</Label>
                <div className="flex h-10 items-center justify-between rounded border border-neutral-500 px-3">
                  <button
                    type="button"
                    onClick={() => setAdults((count) => Math.max(1, count - 1))}
                    className="text-text-muted hover:text-text-primary"
                    aria-label="Decrease adults"
                  >
                    <MinusIcon size={16} />
                  </button>
                  <span className="text-sm font-medium">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults((count) => count + 1)}
                    className="text-text-muted hover:text-text-primary"
                    aria-label="Increase adults"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Children</Label>
                <div className="flex h-10 items-center justify-between rounded border border-neutral-500 px-3">
                  <button
                    type="button"
                    onClick={() => updateChildrenCount(childrenCount - 1)}
                    className="text-text-muted hover:text-text-primary"
                    aria-label="Decrease children"
                  >
                    <MinusIcon size={16} />
                  </button>
                  <span className="text-sm font-medium">{childrenCount}</span>
                  <button
                    type="button"
                    onClick={() => updateChildrenCount(childrenCount + 1)}
                    className="text-text-muted hover:text-text-primary"
                    aria-label="Increase children"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>
            </div>

            {childrenCount > 0 && (
              <div className="grid gap-3 sm:grid-cols-3">
                {childrenAges.slice(0, childrenCount).map((age, index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    <Label htmlFor={`child-age-${index}`}>
                      Child {index + 1} age
                    </Label>
                    <Input
                      id={`child-age-${index}`}
                      type="number"
                      min={0}
                      max={17}
                      value={age}
                      onChange={(event) => {
                        const nextAge = Number(event.target.value);
                        setChildrenAges((current) => {
                          const updated = [...current];
                          updated[index] = Number.isNaN(nextAge) ? 0 : nextAge;
                          return updated;
                        });
                      }}
                      className="h-10 rounded border-neutral-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            {searchMutation.isError && (
              <p className="text-sm text-destructive">
                Failed to search flights. Please try again.
              </p>
            )}

          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSearch}
            disabled={searchMutation.isPending}
            className="bg-primary-600 text-white hover:bg-primary-600/90"
          >
            {searchMutation.isPending ? 'Searching...' : 'Search flights'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <FlightSearchResultsModal
      open={resultsOpen}
      onOpenChange={setResultsOpen}
      flights={results}
      totalCount={totalCount}
      routeLabel={routeLabel}
      isLoading={searchMutation.isPending}
      onSelectFlight={handleSelectFlight}
    />
    </>
  );
};

export default AddFlightModal;
