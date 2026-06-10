'use client';

import { CaretUpDownIcon } from '@phosphor-icons/react';
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
  type Currency,
  type Language,
} from '@/src/hooks/meta/use-meta.query';
import type {
  AttractionFilterOption,
  AttractionLocation,
  AttractionSearchParams,
  AttractionSortBy,
} from '@/src/hooks/use-attraction/attraction.types';
import {
  useAttractionFilterOptionsQuery,
  useSearchAttractionsMutation,
} from '@/src/hooks/use-attraction/use-attraction';
import ActivitySearchResultsModal from '@/src/modules/dashboard/_components/activities/activity-search-results-modal';
import AttractionLocationPicker from '@/src/modules/dashboard/_components/activities/attraction-location-picker';
import { mapAttractionProductToActivityData } from '@/src/modules/dashboard/utils/map-activity-result';
import type { ActivityData } from '@/src/modules/dashboard/types';

type AddActivitiesModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddActivity: (activity: ActivityData) => void;
};

const sortOptions: { value: AttractionSortBy; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'attr_book_score', label: 'Best rated' },
  { value: 'lowest_price', label: 'Lowest price' },
];

type FilterMultiSelectProps = {
  label: string;
  options: AttractionFilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
};

function FilterMultiSelect({
  label,
  options,
  selected,
  onChange,
  disabled,
}: FilterMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const displayLabel =
    selected.length === 0
      ? 'None selected'
      : `${selected.length} selected`;

  const toggle = (tagname: string) => {
    onChange(
      selected.includes(tagname)
        ? selected.filter((value) => value !== tagname)
        : [...selected, tagname],
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled || options.length === 0}
            className={cn(
              'h-10 w-full justify-between rounded border-neutral-500 bg-white px-3 text-sm font-normal',
              selected.length === 0 && 'text-text-muted',
            )}
          >
            <span className="truncate">{displayLabel}</span>
            <CaretUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[100] w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <ScrollArea className="max-h-48 p-2">
            <div className="flex flex-col gap-1">
              {options.map((option) => (
                <label
                  key={option.tagname}
                  className="flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 hover:bg-neutral-100"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.tagname)}
                    onChange={() => toggle(option.tagname)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-text-primary">
                    {option.name}
                    {option.productCount !== undefined && (
                      <span className="ml-1 text-xs text-text-muted">
                        ({option.productCount})
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function formatLocationLabel(location: AttractionLocation | null) {
  if (!location) return undefined;
  if (location.kind === 'product') return location.title;
  return `${location.cityName}, ${location.country}`;
}

const AddActivitiesModal = ({
  open,
  onOpenChange,
  onAddActivity,
}: AddActivitiesModalProps) => {
  const [location, setLocation] = useState<AttractionLocation | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState<AttractionSortBy | ''>('');
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [ufiFilters, setUfiFilters] = useState<string[]>([]);
  const [labelFilters, setLabelFilters] = useState<string[]>([]);
  const [languageCode, setLanguageCode] = useState('en-gb');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [formError, setFormError] = useState('');
  const [resultsOpen, setResultsOpen] = useState(false);

  const { data: currencyData } = useCurrencyQuery(open);
  const { data: languageData } = useLanguageQuery(open);
  const searchMutation = useSearchAttractionsMutation();

  const filterContext = useMemo<AttractionSearchParams | null>(() => {
    if (!location) return null;

    return {
      id: location.id,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      currency_code: currencyCode || undefined,
      languagecode: languageCode || undefined,
    };
  }, [location, startDate, endDate, currencyCode, languageCode]);

  const { data: filterOptions } = useAttractionFilterOptionsQuery(
    filterContext,
    { enabled: open },
  );

  const currencies = useMemo(() => {
    const list: Currency[] = currencyData?.data ?? [];
    return list.filter((currency) => currency.code !== 'hotel_currency');
  }, [currencyData]);

  const languages: Language[] = languageData?.data ?? [];

  const typeFilterOptions = filterOptions?.typeFilters ?? [];
  const priceFilterOptions = filterOptions?.priceFilters ?? [];
  const ufiFilterOptions = filterOptions?.ufiFilters ?? [];
  const labelFilterOptions = filterOptions?.labelFilters ?? [];

  const results = useMemo(() => {
    const products = searchMutation.data?.data?.products ?? [];
    return products.map((product, index) =>
      mapAttractionProductToActivityData(product, index),
    );
  }, [searchMutation.data]);

  const locationLabel = formatLocationLabel(location);

  const resetForm = () => {
    setLocation(null);
    setStartDate('');
    setEndDate('');
    setSortBy('');
    setTypeFilters([]);
    setPriceFilters([]);
    setUfiFilters([]);
    setLabelFilters([]);
    setLanguageCode('en-gb');
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

  const handleLocationChange = (nextLocation: AttractionLocation | null) => {
    setLocation(nextLocation);
    setTypeFilters([]);
    setPriceFilters([]);
    setUfiFilters([]);
    setLabelFilters([]);
  };

  const joinFilters = (values: string[]) =>
    values.length > 0 ? values.join(',') : undefined;

  const handleSearch = async () => {
    if (!location) {
      setFormError('Please select a destination or activity.');
      return;
    }

    setFormError('');

    try {
      await searchMutation.mutateAsync({
        id: location.id,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sortBy: sortBy || undefined,
        currency_code: currencyCode || undefined,
        languagecode: languageCode || undefined,
        typeFilters: joinFilters(typeFilters),
        priceFilters: joinFilters(priceFilters),
        ufiFilters: joinFilters(ufiFilters),
        labelFilters: joinFilters(labelFilters),
      });
      setResultsOpen(true);
    } catch {
      // Error state is handled by searchMutation.isError
    }
  };

  const handleSelectActivity = (activity: ActivityData) => {
    onAddActivity(activity);
    setResultsOpen(false);
    handleOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-hidden bg-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-text-primary">
              Add Activity
            </DialogTitle>
            <DialogDescription>
              Search for activities and add one to your trip itinerary.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
            <div className="flex flex-col gap-5">
              <AttractionLocationPicker
                label="Destination or activity"
                value={location}
                onChange={handleLocationChange}
                placeholder="City or activity name"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Start date</Label>
                  <DatePicker
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (endDate && endDate < date) {
                        setEndDate('');
                      }
                    }}
                    placeholder="Optional"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>End date</Label>
                  <DatePicker
                    value={endDate}
                    onChange={setEndDate}
                    minDate={startDate || undefined}
                    placeholder="Optional"
                    disabled={!startDate}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Sort by</Label>
                  <Select
                    value={sortBy || 'none'}
                    onValueChange={(value) =>
                      setSortBy(value === 'none' ? '' : (value as AttractionSortBy))
                    }
                  >
                    <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-[100]">
                      <SelectItem value="none">Default</SelectItem>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Language</Label>
                  <Select value={languageCode} onValueChange={setLanguageCode}>
                    <SelectTrigger className="h-10 w-full rounded border-neutral-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-[100] max-h-60">
                      {languages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="grid gap-4 sm:grid-cols-2">
                <FilterMultiSelect
                  label="Type filters"
                  options={typeFilterOptions}
                  selected={typeFilters}
                  onChange={setTypeFilters}
                  disabled={!location}
                />
                <FilterMultiSelect
                  label="Price filters"
                  options={priceFilterOptions}
                  selected={priceFilters}
                  onChange={setPriceFilters}
                  disabled={!location || priceFilterOptions.length === 0}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FilterMultiSelect
                  label="Area filters"
                  options={ufiFilterOptions}
                  selected={ufiFilters}
                  onChange={setUfiFilters}
                  disabled={!location}
                />
                <FilterMultiSelect
                  label="Label filters"
                  options={labelFilterOptions}
                  selected={labelFilters}
                  onChange={setLabelFilters}
                  disabled={!location}
                />
              </div>

              {formError && (
                <p className="text-sm text-destructive">{formError}</p>
              )}

              {searchMutation.isError && (
                <p className="text-sm text-destructive">
                  Failed to search activities. Please try again.
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
              {searchMutation.isPending ? 'Searching...' : 'Search activities'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ActivitySearchResultsModal
        open={resultsOpen}
        onOpenChange={setResultsOpen}
        activities={results}
        locationLabel={locationLabel}
        isLoading={searchMutation.isPending}
        onSelectActivity={handleSelectActivity}
      />
    </>
  );
};

export default AddActivitiesModal;
