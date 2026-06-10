'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatActivityPrice } from '@/src/modules/dashboard/constants/activities';
import type { ActivityData } from '@/src/modules/dashboard/types';

export type ActivityInfoModalView = 'details' | 'price' | 'edit';

type ActivityInfoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: ActivityData | null;
  view: ActivityInfoModalView;
  onSave?: (activity: ActivityData) => void;
};

const titles: Record<ActivityInfoModalView, string> = {
  details: 'Activity details',
  price: 'Price details',
  edit: 'Edit activity details',
};

const descriptions: Record<ActivityInfoModalView, string> = {
  details: 'Review your activity description, schedule, and inclusions.',
  price: 'Review the price for this activity.',
  edit: 'Update the details shown on your itinerary.',
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-neutral-300 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

const ActivityInfoModal = ({
  open,
  onOpenChange,
  activity,
  view,
  onSave,
}: ActivityInfoModalProps) => {
  const [draft, setDraft] = useState<ActivityData | null>(activity);

  useEffect(() => {
    if (open && activity) {
      setDraft(activity);
    }
  }, [open, activity]);

  if (!activity || !draft) return null;

  const handleSave = () => {
    onSave?.(draft);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-text-primary">
            {titles[view]}
          </DialogTitle>
          <DialogDescription>{descriptions[view]}</DialogDescription>
        </DialogHeader>

        {view === 'details' && (
          <div className="flex flex-col">
            <DetailRow label="Activity" value={activity.name} />
            <DetailRow label="Description" value={activity.description} />
            <DetailRow
              label="Rating"
              value={`${activity.rating} (${activity.reviewCount} reviews)`}
            />
            <DetailRow label="Duration" value={activity.duration} />
            <DetailRow label="Scheduled" value={activity.scheduledTime} />
            <DetailRow label="Day" value={activity.dayLabel} />
            <DetailRow label="What's included" value={activity.whatsIncluded} />
          </div>
        )}

        {view === 'price' && (
          <div className="flex flex-col gap-4">
            <div className="rounded border border-neutral-400 bg-neutral-100 p-4">
              <p className="text-sm font-medium text-text-muted">Activity price</p>
              <p className="mt-1 text-3xl font-semibold text-text-primary">
                {formatActivityPrice(activity.price)}
              </p>
            </div>
            <div className="flex flex-col">
              <DetailRow label="Activity" value={activity.name} />
              <DetailRow label="Duration" value={activity.duration} />
              <DetailRow label="Scheduled" value={activity.scheduledTime} />
            </div>
          </div>
        )}

        {view === 'edit' && (
          <div className="grid gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-activity-name">Activity name</Label>
              <Input
                id="edit-activity-name"
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-activity-description">Description</Label>
              <Input
                id="edit-activity-description"
                value={draft.description}
                onChange={(event) =>
                  setDraft({ ...draft, description: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={draft.duration}
                  onChange={(event) =>
                    setDraft({ ...draft, duration: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-scheduled-time">Scheduled time</Label>
                <Input
                  id="edit-scheduled-time"
                  value={draft.scheduledTime}
                  onChange={(event) =>
                    setDraft({ ...draft, scheduledTime: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-day-label">Day label</Label>
                <Input
                  id="edit-day-label"
                  value={draft.dayLabel}
                  onChange={(event) =>
                    setDraft({ ...draft, dayLabel: event.target.value })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-activity-price">Price</Label>
                <Input
                  id="edit-activity-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.price}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      price: Number(event.target.value) || 0,
                    })
                  }
                  className="h-10 rounded border-neutral-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-whats-included">What&apos;s included</Label>
              <Input
                id="edit-whats-included"
                value={draft.whatsIncluded}
                onChange={(event) =>
                  setDraft({ ...draft, whatsIncluded: event.target.value })
                }
                className="h-10 rounded border-neutral-500"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {view === 'edit' ? 'Cancel' : 'Close'}
          </Button>
          {view === 'edit' && (
            <Button
              type="button"
              onClick={handleSave}
              className="bg-primary-600 text-white hover:bg-primary-600/90"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityInfoModal;
