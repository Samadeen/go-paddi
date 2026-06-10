'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import ActivityCard from '@/src/modules/dashboard/_components/activities/activity-card';
import type { ActivityData } from '@/src/modules/dashboard/types';

type ActivitySearchResultsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activities: ActivityData[];
  locationLabel?: string;
  isLoading?: boolean;
  onSelectActivity: (activity: ActivityData) => void;
};

const ActivitySearchResultsModal = ({
  open,
  onOpenChange,
  activities,
  locationLabel,
  isLoading,
  onSelectActivity,
}: ActivitySearchResultsModalProps) => {
  const resultLabel = `${activities.length} activit${activities.length === 1 ? 'y' : 'ies'} found`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden bg-white sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-text-primary">
            Activity results
          </DialogTitle>
          <DialogDescription>
            {locationLabel
              ? `${locationLabel} · ${resultLabel}`
              : resultLabel}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-10rem)] pr-4">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-text-muted">
              Searching for activities...
            </p>
          ) : activities.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">
              No activities found for your search.
            </p>
          ) : (
            <div className="flex flex-col gap-6 pb-2">
              {activities.map((activity) => (
                <div key={activity.id} className="flex flex-col gap-3">
                  <ActivityCard
                    {...activity}
                    showRemove={false}
                    showActions={false}
                    showReorder={false}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => onSelectActivity(activity)}
                      className="bg-primary-600 text-white hover:bg-primary-600/90"
                    >
                      Add to trip
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivitySearchResultsModal;
