'use client';

import { CalendarBlankIcon } from '@phosphor-icons/react';
import { format, isValid, parse } from 'date-fns';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: string;
  disabled?: boolean;
  className?: string;
};

function parseDate(value?: string) {
  if (!value) return undefined;

  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsed) ? parsed : undefined;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Pick a date',
  minDate,
  disabled,
  className,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => parseDate(value), [value]);
  const min = useMemo(() => parseDate(minDate), [minDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'h-10 w-full justify-between rounded border-neutral-500 bg-white px-3 text-sm font-normal',
            !value && 'text-text-muted',
            className,
          )}
        >
          <span>
            {selected ? format(selected, 'EEE, d MMM yyyy') : placeholder}
          </span>
          <CalendarBlankIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="z-[100] w-auto bg-white p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (date) {
              onChange(format(date, 'yyyy-MM-dd'));
              setOpen(false);
            }
          }}
          disabled={min ? { before: min } : undefined}
          defaultMonth={selected ?? min}
          className="bg-white"
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
