'use client';

import { CaretUpDownIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';

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
import type { AttractionLocation } from '@/src/hooks/use-attraction/attraction.types';
import { useAttractionLocationQuery } from '@/src/hooks/use-attraction/use-attraction';

type AttractionLocationPickerProps = {
  label: string;
  value: AttractionLocation | null;
  onChange: (location: AttractionLocation | null) => void;
  placeholder?: string;
};

function formatLocationLabel(location: AttractionLocation) {
  if (location.kind === 'product') {
    return `${location.title} — ${location.cityName}`;
  }

  return `${location.cityName}, ${location.country} (${location.productCount} activities)`;
}

const AttractionLocationPicker = ({
  label,
  value,
  onChange,
  placeholder = 'Search city or activity',
}: AttractionLocationPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 400);
  const { data, isFetching } = useAttractionLocationQuery(debouncedSearch, {
    enabled: open,
  });
  const isDebouncing =
    search.trim() !== debouncedSearch.trim() && search.trim().length >= 2;

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const locations = useMemo<AttractionLocation[]>(() => {
    const products =
      data?.data?.products?.map((product) => ({
        ...product,
        kind: 'product' as const,
      })) ?? [];
    const destinations =
      data?.data?.destinations?.map((destination) => ({
        ...destination,
        kind: 'destination' as const,
      })) ?? [];

    return [...destinations, ...products];
  }, [data]);

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

              {locations.some((item) => item.kind === 'destination') && (
                <CommandGroup heading="Destinations">
                  {locations
                    .filter((item) => item.kind === 'destination')
                    .map((destination) => (
                      <CommandItem
                        key={destination.id}
                        value={destination.id}
                        onSelect={() => {
                          onChange(destination);
                          setOpen(false);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-text-primary">
                            {destination.cityName}
                          </span>
                          <span className="text-xs text-text-muted">
                            {destination.country} · {destination.productCount}{' '}
                            activities
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}

              {locations.some((item) => item.kind === 'product') && (
                <CommandGroup heading="Activities">
                  {locations
                    .filter((item) => item.kind === 'product')
                    .map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.id}
                        onSelect={() => {
                          onChange(product);
                          setOpen(false);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-text-primary">
                            {product.title}
                          </span>
                          <span className="text-xs text-text-muted">
                            {product.cityName} · {product.taxonomySlug}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AttractionLocationPicker;
