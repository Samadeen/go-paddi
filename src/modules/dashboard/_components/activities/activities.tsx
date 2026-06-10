'use client';

import { RoadHorizonIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { usePersistedActivities } from '@/src/hooks/use-persisted-activities';
import ActivityCard from '@/src/modules/dashboard/_components/activities/activity-card';
import ActivityInfoModal, {
  type ActivityInfoModalView,
} from '@/src/modules/dashboard/_components/activities/activity-info-modal';
import AddActivitiesModal from '@/src/modules/dashboard/_components/activities/add-activities-modal';
import EmptyState from '@/src/modules/dashboard/_components/empty-state';
import type { ActivityData } from '@/src/modules/dashboard/types';

type ActivitiesProps = {
  activities?: ActivityData[];
  addModalOpen?: boolean;
  onAddModalOpenChange?: (open: boolean) => void;
  onRemoveActivity?: (id: string) => void;
  onDirections?: (id: string) => void;
  onSeeMore?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  onActivityDetails?: (id: string) => void;
  onPriceDetails?: (id: string) => void;
  onEditDetails?: (id: string) => void;
};

type ActiveModal = {
  activityId: string;
  view: ActivityInfoModalView;
};

const getActivityLabel = (activity: ActivityData) => activity.name;

const Activities = ({
  activities: initialActivities,
  addModalOpen,
  onAddModalOpenChange,
  onRemoveActivity,
  onDirections,
  onSeeMore,
  onMoveUp,
  onMoveDown,
  onActivityDetails,
  onPriceDetails,
  onEditDetails,
}: ActivitiesProps) => {
  const { activities, setActivities, hydrated } =
    usePersistedActivities(initialActivities);
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const isModalOpen = onAddModalOpenChange
    ? (addModalOpen ?? false)
    : internalModalOpen;
  const setModalOpen = (open: boolean) => {
    if (onAddModalOpenChange) onAddModalOpenChange(open);
    else setInternalModalOpen(open);
  };
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const isEmpty = activities.length === 0;

  const activeActivity = useMemo(
    () =>
      activities.find((activity) => activity.id === activeModal?.activityId) ??
      null,
    [activeModal, activities],
  );

  const handleAddActivity = (activity: ActivityData) => {
    setActivities((current) => [...current, activity]);
    toast.success('Activity added', {
      description: `${getActivityLabel(activity)} has been added to your trip.`,
    });
  };

  const handleRemoveActivity = (id: string) => {
    const activity = activities.find((item) => item.id === id);
    setActivities((current) => current.filter((item) => item.id !== id));
    onRemoveActivity?.(id);
    toast.success('Activity removed', {
      description: activity
        ? `${getActivityLabel(activity)} has been removed from your trip.`
        : 'The activity has been removed from your trip.',
    });
  };

  const openInfoModal = (activityId: string, view: ActivityInfoModalView) => {
    setActiveModal({ activityId, view });
  };

  const handleActivityDetails = (id: string) => {
    openInfoModal(id, 'details');
    onActivityDetails?.(id);
  };

  const handlePriceDetails = (id: string) => {
    openInfoModal(id, 'price');
    onPriceDetails?.(id);
  };

  const handleEditDetails = (id: string) => {
    openInfoModal(id, 'edit');
    onEditDetails?.(id);
  };

  const handleDirections = (id: string) => {
    const activity = activities.find((item) => item.id === id);
    if (activity?.name) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.name)}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
    onDirections?.(id);
  };

  const handleSeeMore = (id: string) => {
    openInfoModal(id, 'details');
    onSeeMore?.(id);
  };

  const handleMoveUp = (id: string) => {
    setActivities((current) => {
      const index = current.findIndex((activity) => activity.id === id);
      if (index <= 0) return current;

      const next = [...current];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
    onMoveUp?.(id);
  };

  const handleMoveDown = (id: string) => {
    setActivities((current) => {
      const index = current.findIndex((activity) => activity.id === id);
      if (index < 0 || index >= current.length - 1) return current;

      const next = [...current];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
    onMoveDown?.(id);
  };

  const handleSaveActivity = (updatedActivity: ActivityData) => {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity,
      ),
    );
    toast.success('Activity updated', {
      description: `${getActivityLabel(updatedActivity)} has been saved.`,
    });
  };

  const openModal = () => setModalOpen(true);

  if (!hydrated) {
    return (
      <section className="rounded bg-primary-700 p-6">
        <div className="flex h-[274px] items-center justify-center rounded bg-white">
          <p className="text-sm text-text-muted">Loading activities...</p>
        </div>
      </section>
    );
  }

  return (
    <>
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
              onClick={openModal}
              className="flex h-[46px] w-[153px] shrink-0 cursor-pointer items-center justify-center rounded bg-white px-6 py-3 text-sm font-semibold leading-[22px] tracking-[-0.04em] text-primary-600 transition-colors hover:bg-primary-50"
            >
              Add Activities
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="flex h-[274px] items-center justify-center rounded bg-white">
            <EmptyState type="activities" onAction={openModal} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onRemove={() => handleRemoveActivity(activity.id)}
                onDirections={() => handleDirections(activity.id)}
                onSeeMore={() => handleSeeMore(activity.id)}
                onMoveUp={() => handleMoveUp(activity.id)}
                onMoveDown={() => handleMoveDown(activity.id)}
                onActivityDetails={() => handleActivityDetails(activity.id)}
                onPriceDetails={() => handlePriceDetails(activity.id)}
                onEditDetails={() => handleEditDetails(activity.id)}
              />
            ))}
          </div>
        )}
      </section>

      <AddActivitiesModal
        open={isModalOpen}
        onOpenChange={setModalOpen}
        onAddActivity={handleAddActivity}
      />

      <ActivityInfoModal
        open={activeModal !== null}
        onOpenChange={(open) => {
          if (!open) setActiveModal(null);
        }}
        activity={activeActivity}
        view={activeModal?.view ?? 'details'}
        onSave={handleSaveActivity}
      />
    </>
  );
};

export default Activities;
