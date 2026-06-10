import { defaultCtaItems } from '@/src/modules/dashboard/constants/call-to-action';
import type { CtaItem } from '@/src/modules/dashboard/types';

import CtaCard from './cta-card';

type CallToActionProps = {
  items?: CtaItem[];
};

const CallToAction = ({ items = defaultCtaItems }: CallToActionProps) => {
  return (
    <div className="flex w-[75%] flex-wrap gap-1">
      {items.map((item) => (
        <CtaCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CallToAction;
