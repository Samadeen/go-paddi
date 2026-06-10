'use client';

import { CaretUpDownIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  useCurrencyQuery,
  useLanguageQuery,
  useLocationQuery,
  type Currency,
  type Language,
} from '@/src/hooks/meta/use-meta.query';
import type {
  HotelDestination,
  HotelFilterCheckboxOption,
  HotelSearchContextParams,
  HotelSortOption,
  HotelTemperatureUnit,
  HotelUnits,
} from '@/src/hooks/use-hotel/hotel.types';
import {
  useHotelFilterQuery,
  useHotelSortByQuery,
  useSearchHotelsMutation,
} from '@/src/hooks/use-hotel/use-hotel';
import HotelDestinationPicker from '@/src/modules/dashboard/_components/hotels/hotel-destination-picker';
import HotelSearchResultsModal from '@/src/modules/dashboard/_components/hotels/hotel-search-results-modal';
import { mapHotelResultToHotelData } from '@/src/modules/dashboard/utils/map-hotel-result';
import type { HotelData } from '@/src/modules/dashboard/types';

type AddHotelModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddHotel: (hotel: HotelData) => void;
};

const unitsOptions: { value: HotelUnits; label: string }[] = [
  { value: 'metric', label: 'Metric' },
  { value: 'imperial', label: 'Imperial' },
];

const temperatureOptions: { value: HotelTemperatureUnit; label: string }[] = [
  { value: 'c', label: 'Celsius' },
  { value: 'f', label: 'Fahrenheit' },
];

function flattenFilterOptions(
  filters: {
    filterStyle: string;
    title: string;
    options: HotelFilterCheckboxOption[];
  }[]
) {
  return filters
    .filter(
      (group) => group.filterStyle === 'CHECKBOX' && group.options.length > 0
    )
    .flatMap((group) =>
      group.options.map((option) => ({
        ...option,
        groupTitle: group.title,
      }))
    );
}

const AddHotelModal = ({
  open,
  onOpenChange,
  onAddHotel,
}: AddHotelModalProps) => {
  const [destination, setDestination] = useState<HotelDestination | null>(null);
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [roomQty, setRoomQty] = useState(1);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [units, setUnits] = useState<HotelUnits>('metric');
  const [temperatureUnit, setTemperatureUnit] =
    useState<HotelTemperatureUnit>('c');
  const [languageCode, setLanguageCode] = useState('en-gb');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [location, setLocation] = useState('');
  const [formError, setFormError] = useState('');
  const [resultsOpen, setResultsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: currencyData } = useCurrencyQuery(open);
  const { data: languageData } = useLanguageQuery(open);
  const { data: locationData } = useLocationQuery(open);
  const searchMutation = useSearchHotelsMutation();

  const childrenAgeParam =
    childrenCount > 0
      ? childrenAges.slice(0, childrenCount).join(',')
      : undefined;

  const searchContext = useMemo<HotelSearchContextParams | null>(() => {
    if (!destination || !arrivalDate || !departureDate) return null;

    return {
      dest_id: destination.dest_id,
      search_type: destination.search_type,
      arrival_date: arrivalDate,
      departure_date: departureDate,
      adults,
      children_age: childrenAgeParam,
      room_qty: roomQty,
      categories_filter: selectedFilters.length
        ? selectedFilters.join(',')
        : undefined,
      languagecode: languageCode || undefined,
    };
  }, [
    destination,
    arrivalDate,
    departureDate,
    adults,
    childrenAgeParam,
    roomQty,
    selectedFilters,
    languageCode,
  ]);

  const { data: sortByData } = useHotelSortByQuery(searchContext, {
    enabled: open,
  });
  const { data: filterData } = useHotelFilterQuery(searchContext, {
    enabled: open,
  });

  const currencies = useMemo(() => {
    const list: Currency[] = currencyData?.data ?? [];
    return list.filter((currency) => currency.code !== 'hotel_currency');
  }, [currencyData]);

  const languages: Language[] = languageData?.data ?? [];
  const locations: string[] = locationData?.data ?? [];

  const sortOptions: HotelSortOption[] = sortByData?.data ?? [];

  const filterOptions = useMemo(
    () => flattenFilterOptions(filterData?.data?.filters ?? []),
    [filterData]
  );

  const results = useMemo(() => {
    const hotels = searchMutation.data?.data?.hotels ?? [];
    return hotels.map((hotel, index) =>
      mapHotelResultToHotelData(
        hotel,
        index,
        arrivalDate,
        departureDate,
        roomQty
      )
    );
  }, [searchMutation.data, arrivalDate, departureDate, roomQty]);

  const destinationLabel = destination?.label;

  const resetForm = () => {
    setDestination(null);
    setArrivalDate('');
    setDepartureDate('');
    setAdults(1);
    setChildrenCount(0);
    setChildrenAges([]);
    setRoomQty(1);
    setPriceMin('');
    setPriceMax('');
    setSortBy('');
    setSelectedFilters([]);
    setUnits('metric');
    setTemperatureUnit('c');
    setLanguageCode('en-gb');
    setCurrencyCode('USD');
    setLocation('');
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

  const toggleFilter = (genericId: string) => {
    setSelectedFilters((current) =>
      current.includes(genericId)
        ? current.filter((id) => id !== genericId)
        : [...current, genericId]
    );
  };

  const handleSearch = async () => {
    if (!destination || !arrivalDate || !departureDate) {
      setFormError(
        'Please select a destination and fill in check-in and check-out dates.'
      );
      return;
    }

    setFormError('');

    const parsedPriceMin = priceMin ? Number(priceMin) : undefined;
    const parsedPriceMax = priceMax ? Number(priceMax) : undefined;

    try {
      await searchMutation.mutateAsync({
        dest_id: destination.dest_id,
        search_type: destination.search_type,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        adults,
        children_age: childrenAgeParam,
        room_qty: roomQty,
        price_min:
          parsedPriceMin !== undefined && !Number.isNaN(parsedPriceMin)
            ? parsedPriceMin
            : undefined,
        price_max:
          parsedPriceMax !== undefined && !Number.isNaN(parsedPriceMax)
            ? parsedPriceMax
            : undefined,
        sort_by: sortBy || undefined,
        categories_filter: selectedFilters.length
          ? selectedFilters.join(',')
          : undefined,
        units,
        temperature_unit: temperatureUnit,
        languagecode: languageCode || undefined,
        currency_code: currencyCode || undefined,
        location: location || undefined,
      });
      setResultsOpen(true);
    } catch {
      // Error state is handled by searchMutation.isError
    }
  };

  const handleSelectHotel = (hotel: HotelData) => {
    onAddHotel(hotel);
    setResultsOpen(false);
    handleOpenChange(false);
  };

  const filtersLabel =
    selectedFilters.length === 0
      ? 'Select filters (optional)'
      : `${selectedFilters.length} filter${selectedFilters.length === 1 ? '' : 's'} selected`;

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[93vh] overflow-hidden bg-white sm:max-w-2xl pb-10">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-text-primary">
              Add Hotel
            </DialogTitle>
            <DialogDescription>
              Search for hotels and add one to your trip itinerary.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
            <div className="flex flex-col gap-5">
              <HotelDestinationPicker
                label="Destination"
                value={destination}
                onChange={(nextDestination) => {
                  setDestination(nextDestination);
                  setSortBy('');
                  setSelectedFilters([]);
                }}
                placeholder="City, district, or airport"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Check-in date</Label>
                  <DatePicker
                    value={arrivalDate}
                    onChange={(date) => {
                      setArrivalDate(date);
                      if (departureDate && departureDate <= date) {
                        setDepartureDate('');
                      }
                      setSortBy('');
                      setSelectedFilters([]);
                    }}
                    placeholder="Select check-in date"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Check-out date</Label>
                  <DatePicker
                    value={departureDate}
                    onChange={(date) => {
                      setDepartureDate(date);
                      setSortBy('');
                      setSelectedFilters([]);
                    }}
                    minDate={arrivalDate || undefined}
                    placeholder="Select check-out date"
                    disabled={!arrivalDate}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Adults</Label>
                  <div className="flex h-10 items-center justify-between rounded border border-neutral-500 px-3">
                    <button
                      type="button"
                      onClick={() =>
                        setAdults((count) => Math.max(1, count - 1))
                      }
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
                  <Label>Rooms</Label>
                  <div className="flex h-10 items-center justify-between rounded border border-neutral-500 px-3">
                    <button
                      type="button"
                      onClick={() =>
                        setRoomQty((count) => Math.max(1, count - 1))
                      }
                      className="text-text-muted hover:text-text-primary"
                      aria-label="Decrease rooms"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <span className="text-sm font-medium">{roomQty}</span>
                    <button
                      type="button"
                      onClick={() => setRoomQty((count) => count + 1)}
                      className="text-text-muted hover:text-text-primary"
                      aria-label="Increase rooms"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
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

              {childrenCount > 0 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {childrenAges.slice(0, childrenCount).map((age, index) => (
                    <div key={index} className="flex flex-col gap-1.5">
                      <Label htmlFor={`hotel-child-age-${index}`}>
                        Child {index + 1} age
                      </Label>
                      <Input
                        id={`hotel-child-age-${index}`}
                        type="number"
                        min={0}
                        max={17}
                        value={age}
                        onChange={(event) => {
                          const nextAge = Number(event.target.value);
                          setChildrenAges((current) => {
                            const updated = [...current];
                            updated[index] = Number.isNaN(nextAge)
                              ? 0
                              : nextAge;
                            return updated;
                          });
                        }}
                        className="h-10 rounded border-neutral-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price-min">Min price</Label>
                  <Input
                    id="price-min"
                    type="number"
                    min={0}
                    value={priceMin}
                    onChange={(event) => setPriceMin(event.target.value)}
                    placeholder="Optional"
                    className="h-10 rounded border-neutral-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price-max">Max price</Label>
                  <Input
                    id="price-max"
                    type="number"
                    min={0}
                    value={priceMax}
                    onChange={(event) => setPriceMax(event.target.value)}
                    placeholder="Optional"
                    className="h-10 rounded border-neutral-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Sort by</Label>
                  <Select
                    value={sortBy || 'none'}
                    onValueChange={(value) =>
                      setSortBy(value === 'none' ? '' : value)
                    }
                    disabled={!searchContext || sortOptions.length === 0}
                  >
                    <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                      <SelectValue
                        placeholder={
                          searchContext
                            ? 'Select sort option'
                            : 'Select destination and dates first'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-[100]">
                      <SelectItem value="none">Default</SelectItem>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Categories filter</Label>
                  <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!searchContext || filterOptions.length === 0}
                        className={cn(
                          'h-10 w-full justify-between rounded border-neutral-500 bg-white px-3 text-sm font-normal',
                          selectedFilters.length === 0 && 'text-text-muted'
                        )}
                      >
                        <span className="truncate">{filtersLabel}</span>
                        <CaretUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="z-[100] w-[var(--radix-popover-trigger-width)] p-0"
                      align="start"
                    >
                      <ScrollArea className="max-h-60 p-2">
                        <div className="flex flex-col gap-1">
                          {filterOptions.map((option) => {
                            const checked = selectedFilters.includes(
                              option.genericId
                            );

                            return (
                              <label
                                key={option.genericId}
                                className="flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 hover:bg-neutral-100"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() =>
                                    toggleFilter(option.genericId)
                                  }
                                  className="mt-0.5"
                                />
                                <span className="text-sm text-text-primary">
                                  {option.title}
                                  <span className="block text-xs text-text-muted">
                                    {option.groupTitle}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Distance units</Label>
                  <Select
                    value={units}
                    onValueChange={(value) => setUnits(value as HotelUnits)}
                  >
                    <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-[100]">
                      {unitsOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Temperature</Label>
                  <Select
                    value={temperatureUnit}
                    onValueChange={(value) =>
                      setTemperatureUnit(value as HotelTemperatureUnit)
                    }
                  >
                    <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-[100]">
                      {temperatureOptions.map((option) => (
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
                  <Label>Language</Label>
                  <Select value={languageCode} onValueChange={setLanguageCode}>
                    <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="z-[100] max-h-60"
                    >
                      {languages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.name}
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
                    <SelectContent
                      position="popper"
                      className="z-[100] max-h-60"
                    >
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} — {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Location</Label>
                <Select
                  value={location || 'none'}
                  onValueChange={(value) =>
                    setLocation(value === 'none' ? '' : value)
                  }
                >
                  <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[100] max-h-60">
                    <SelectItem value="none">None</SelectItem>
                    {locations.map((code) => (
                      <SelectItem key={code} value={code}>
                        {code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formError && (
                <p className="text-sm text-destructive">{formError}</p>
              )}

              {searchMutation.isError && (
                <p className="text-sm text-destructive">
                  Failed to search hotels. Please try again.
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
              {searchMutation.isPending ? 'Searching...' : 'Search hotels'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <HotelSearchResultsModal
        open={resultsOpen}
        onOpenChange={setResultsOpen}
        hotels={results}
        destinationLabel={destinationLabel}
        isLoading={searchMutation.isPending}
        onSelectHotel={handleSelectHotel}
      />
    </>
  );
};

export default AddHotelModal;
