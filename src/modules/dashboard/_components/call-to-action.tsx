'use client';

import { defaultCtaItems } from '@/src/modules/dashboard/constants/call-to-action';
import type { CtaItem, CtaModalId } from '@/src/modules/dashboard/types';

import CtaCard from './cta-card';

type CallToActionProps = {
  items?: CtaItem[];
  onItemAction?: (id: CtaModalId) => void;
};

const CallToAction = ({
  items = defaultCtaItems,
  onItemAction,
}: CallToActionProps) => {
  return (
    <div className="flex w-[75%] flex-wrap gap-1">
      {items.map((item) => (
        <CtaCard
          key={item.id}
          item={item}
          onAction={onItemAction ? () => onItemAction(item.id) : undefined}
        />
      ))}
    </div>
  );
};

export default CallToAction;
