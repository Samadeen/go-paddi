import { ArrowLeftIcon, HouseIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type NotFoundContentProps = {
  compact?: boolean;
};

const NotFoundContent = ({ compact = false }: NotFoundContentProps) => {
  return (
    <div
      className={
        compact
          ? 'flex flex-col items-center px-6 py-20 text-center'
          : 'flex max-w-lg flex-col items-center text-center'
      }
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
        404
      </p>
      <h1
        className={
          compact
            ? 'mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-text-primary'
            : 'mt-3 text-4xl font-semibold leading-tight tracking-[-0.03em] text-text-primary'
        }
      >
        This page wandered off the map
      </h1>
      <p className="mt-4 text-base leading-7 text-text-muted">
        The route you&apos;re looking for doesn&apos;t exist or may have been
        moved. Head back to your dashboard to keep planning your trip.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          asChild
          className="bg-primary-600 text-white hover:bg-primary-600/90"
        >
          <Link href="/">
            <HouseIcon size={18} weight="regular" aria-hidden />
            Back to dashboard
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeftIcon size={18} weight="regular" aria-hidden />
            Go to trip planner
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundContent;
