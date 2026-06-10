'use client';

import {
  ArrowRightIcon,
  CalendarBlankIcon,
  DotsThreeIcon,
  GearSixIcon,
  UserPlusIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';

import type { TripInfoData, TripParticipant } from '@/src/modules/dashboard/types';
import userAvatar from '@/public/assets/user.svg';

type TripInfoProps = TripInfoData & {
  onInvite?: () => void;
  onMore?: () => void;
  onSettings?: () => void;
};

function formatTripDate(date: Date | string) {
  const value = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(value);
}

function ParticipantAvatar({ participant }: { participant: TripParticipant }) {
  return (
    <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
      <Image
        src={participant.avatarUrl ?? userAvatar}
        alt={participant.name}
        fill
        className="object-cover"
      />
    </div>
  );
}

function ConnectorLine() {
  return (
    <div
      className="-mr-0.5 h-0.5 w-[31px] shrink-0 rounded-lg bg-primary-100"
      aria-hidden
    />
  );
}

const TripInfo = ({
  title,
  startDate,
  endDate,
  location,
  tripType,
  participants,
  onInvite,
  onMore,
  onSettings,
}: TripInfoProps) => {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex min-w-0 items-end gap-1">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex w-max items-center gap-1 bg-secondary-100 px-2 py-1">
            <CalendarBlankIcon
              size={16}
              weight="regular"
              className="shrink-0 text-secondary-900"
              aria-hidden
            />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium leading-[22px] tracking-[-0.04em] text-secondary-900">
                {formatTripDate(startDate)}
              </span>
              <ArrowRightIcon
                size={16}
                weight="regular"
                className="shrink-0 text-secondary-900"
                aria-hidden
              />
              <span className="text-sm font-medium leading-[22px] tracking-[-0.04em] text-secondary-900">
                {formatTripDate(endDate)}
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold leading-8 tracking-[-0.02em] text-black">
            {title}
          </h1>

          <p className="text-base font-medium leading-6 tracking-[-0.04em] text-text-muted">
            {location}
          </p>
        </div>

        <span
          className="shrink-0 pb-0.5 text-base font-medium leading-6 tracking-[-0.04em] text-neutral-500"
          aria-hidden
        >
          |
        </span>

        <p className="shrink-0 pb-0.5 text-base font-medium leading-6 tracking-[-0.04em] text-text-muted">
          {tripType}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onInvite}
            className="flex h-[46px] w-40 items-center justify-center rounded bg-primary-100"
            aria-label="Invite participant"
          >
            <UserPlusIcon
              size={20}
              weight="regular"
              className="text-primary-600"
            />
          </button>

          <button
            type="button"
            onClick={onMore}
            className="flex size-8 items-center justify-center rounded"
            aria-label="More options"
          >
            <DotsThreeIcon
              size={32}
              weight="bold"
              className="text-neutral-900"
            />
          </button>
        </div>

        <div className="flex items-center">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center">
              <ParticipantAvatar participant={participant} />
              <ConnectorLine />
            </div>
          ))}

          <button
            type="button"
            onClick={onSettings}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary-100 bg-white"
            aria-label="Trip settings"
          >
            <GearSixIcon
              size={16}
              weight="regular"
              className="text-neutral-900"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
