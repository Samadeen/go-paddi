import Link from 'next/link';

import { ctaCardStyles } from '@/src/modules/dashboard/constants/call-to-action';
import type { CtaItem } from '@/src/modules/dashboard/types';

type CtaCardProps = {
  item: CtaItem;
};

const CtaCard = ({ item }: CtaCardProps) => {
  const styles = ctaCardStyles[item.variant];
  const buttonClassName = `flex w-full items-center justify-center rounded px-6 py-3 text-sm font-medium leading-[22px] tracking-[-0.04em] ${styles.button}`;

  return (
    <article
      className={`flex h-[193px] min-w-0 flex-1 flex-col rounded px-3.5 pt-3.5 pb-3.5 ${styles.card}`}
    >
      <h3
        className={`text-base font-semibold leading-6 tracking-[-0.04em] ${styles.title}`}
      >
        {item.title}
      </h3>

      <p
        className={`mt-1 flex-1 text-sm leading-[22px] tracking-[-0.04em] ${styles.description}`}
      >
        {item.description}
      </p>

      {item.href ? (
        <Link href={item.href} className={buttonClassName}>
          {item.buttonLabel}
        </Link>
      ) : (
        <button type="button" className={buttonClassName}>
          {item.buttonLabel}
        </button>
      )}
    </article>
  );
};

export default CtaCard;
