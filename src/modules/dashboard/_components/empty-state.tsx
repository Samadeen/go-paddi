'use client';

import Image from 'next/image';

import {
  emptyStateConfig,
  type EmptyStateType,
} from '@/src/modules/dashboard/constants/empty-state';

type EmptyStateProps = {
  type: EmptyStateType;
  message?: string;
  onAction?: () => void;
};

const EmptyState = ({
  type,
  message = 'No Request yet',
  onAction,
}: EmptyStateProps) => {
  const { icon, actionLabel } = emptyStateConfig[type];

  return (
    <div className="flex flex-col items-center gap-2">
      <Image src={icon} alt="" width={100} height={58} aria-hidden />

      <p className="text-sm font-medium leading-[22px] tracking-[-0.01em] text-text-primary">
        {message}
      </p>

      <button
        type="button"
        onClick={onAction}
        className="flex h-[46px] w-[171px] cursor-pointer items-center justify-center rounded bg-primary-600 px-6 py-3 text-sm font-medium leading-[22px] tracking-[-0.01em] text-white hover:bg-primary-600/80 transition-colors duration-300"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyState;
