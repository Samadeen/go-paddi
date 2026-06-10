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
import type { HotelDestination } from '@/src/hooks/use-hotel/hotel.types';
import { useHotelDestinationQuery } from '@/src/hooks/use-hotel/use-hotel';

type HotelDestinationPickerProps = {
  label: string;
  value: HotelDestination | null;
  onChange: (destination: HotelDestination | null) => void;
  placeholder?: string;
};

const HotelDestinationPicker = ({
  label,
  value,
  onChange,
  placeholder = 'Search city, district, or airport',
}: HotelDestinationPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 400);
  const { data, isFetching } = useHotelDestinationQuery(debouncedSearch, {
    enabled: open,
  });
  const isDebouncing =
    search.trim() !== debouncedSearch.trim() && search.trim().length >= 2;

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const destinations = data?.data ?? [];

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
              {value ? value.label : placeholder}
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
                    : 'No destinations found'}
              </CommandEmpty>
              <CommandGroup>
                {destinations.map((destination) => (
                  <CommandItem
                    key={`${destination.dest_id}-${destination.search_type}`}
                    value={destination.dest_id}
                    onSelect={() => {
                      onChange(destination);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary">
                        {destination.name}
                        <span className="ml-1 text-xs font-normal text-text-muted">
                          ({destination.dest_type})
                        </span>
                      </span>
                      <span className="text-xs text-text-muted">
                        {destination.label}
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

export default HotelDestinationPicker;
