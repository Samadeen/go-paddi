'use client';

import { CaretUpDownIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useDebouncedValue } from '@/src/hooks/use-debounced-value';
import type { FlightLocation } from '@/src/hooks/use-flight/flight.types';
import { useFlightLocationQuery } from '@/src/hooks/use-flight/use-flight';

type FlightLocationPickerProps = {
  label: string;
  value: FlightLocation | null;
  onChange: (location: FlightLocation | null) => void;
  placeholder?: string;
};

function formatLocationLabel(location: FlightLocation) {
  const city = location.cityName ?? location.city ?? location.name;
  const code = location.code ? ` (${location.code})` : '';

  return `${city}${code}, ${location.countryName}`;
}

const FlightLocationPicker = ({
  label,
  value,
  onChange,
  placeholder = 'Search airport or city',
}: FlightLocationPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 400);
  const { data, isFetching } = useFlightLocationQuery(debouncedSearch, {
    enabled: open,
  });
  const isDebouncing =
    search.trim() !== debouncedSearch.trim() && search.trim().length >= 2;

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const locations = data?.data ?? [];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium leading-[22px] tracking-[-0.01em] text-text-primary">
        {label}
      </span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'h-10 w-full justify-between rounded border-neutral-500 bg-white px-3 text-sm font-normal text-text-primary',
              !value && 'text-text-muted',
            )}
          >
            <span className="truncate">
              {value ? formatLocationLabel(value) : placeholder}
            </span>
            <CaretUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="z-[100] w-[var(--radix-popover-trigger-width)] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>
                {isFetching || isDebouncing
                  ? 'Searching...'
                  : search.length < 2
                    ? 'Type at least 2 characters'
                    : 'No locations found'}
              </CommandEmpty>
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => {
                      onChange(location);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary">
                        {location.name}
                        {location.code ? ` (${location.code})` : ''}
                      </span>
                      <span className="text-xs text-text-muted">
                        {location.countryName}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FlightLocationPicker;
