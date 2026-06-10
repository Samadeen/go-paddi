'use client';

import { RoadHorizonIcon } from '@phosphor-icons/react';

import ActivityCard from '@/src/modules/dashboard/_components/activities/activity-card';
import EmptyState from '@/src/modules/dashboard/_components/empty-state';
import type { ActivityData } from '@/src/modules/dashboard/types';

type ActivitiesProps = {
  activities?: ActivityData[];
  onAddActivity?: () => void;
  onRemoveActivity?: (id: string) => void;
  onDirections?: (id: string) => void;
  onSeeMore?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  onActivityDetails?: (id: string) => void;
  onPriceDetails?: (id: string) => void;
  onEditDetails?: (id: string) => void;
};

const Activities = ({
  activities = [],
  onAddActivity,
  onRemoveActivity,
  onDirections,
  onSeeMore,
  onMoveUp,
  onMoveDown,
  onActivityDetails,
  onPriceDetails,
  onEditDetails,
}: ActivitiesProps) => {
  const isEmpty = activities.length === 0;

  return (
    <section className="rounded bg-primary-700 p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <RoadHorizonIcon
            size={24}
            weight="regular"
            className="shrink-0 text-white"
            aria-hidden
          />
          <h2 className="text-lg font-semibold leading-[26px] tracking-[-0.04em] text-white">
            Activities
          </h2>
        </div>

        {!isEmpty && (
          <button
            type="button"
            onClick={onAddActivity}
            className="flex h-[46px] w-[153px] shrink-0 items-center justify-center rounded bg-white px-6 py-3 text-sm font-semibold leading-[22px] tracking-[-0.04em] text-primary-600"
          >
            Add Activities
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex h-[274px] items-center justify-center rounded bg-white">
          <EmptyState type="activities" onAction={onAddActivity} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              {...activity}
              onRemove={() => onRemoveActivity?.(activity.id)}
              onDirections={() => onDirections?.(activity.id)}
              onSeeMore={() => onSeeMore?.(activity.id)}
              onMoveUp={() => onMoveUp?.(activity.id)}
              onMoveDown={() => onMoveDown?.(activity.id)}
              onActivityDetails={() => onActivityDetails?.(activity.id)}
              onPriceDetails={() => onPriceDetails?.(activity.id)}
              onEditDetails={() => onEditDetails?.(activity.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Activities;
