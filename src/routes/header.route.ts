import {
  BasketIcon,
  BellIcon,
  ChartPieSliceIcon,
  HandCoinsIcon,
  HouseIcon,
  ListChecksIcon,
  PlusSquareIcon,
  WalletIcon,
} from '@phosphor-icons/react';

import type { HeaderRoute } from '@/src/modules/type';

export const headerRoutes: HeaderRoute[] = [
  {
    label: 'Home',
    href: '/',
    icon: HouseIcon,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: ChartPieSliceIcon,
  },
  {
    label: 'Wallet',
    href: '/wallet',
    icon: WalletIcon,
  },
  {
    label: 'Plan a trip',
    href: '/plan-a-trip',
    icon: ListChecksIcon,
  },
  {
    label: 'Commission for life',
    href: '/commission',
    icon: HandCoinsIcon,
  },
];

export const headerActionRoutes: HeaderRoute[] = [
  {
    label: 'Notification',
    href: '/notifications',
    icon: BellIcon,
  },
  {
    label: 'Carts',
    href: '/carts',
    icon: BasketIcon,
  },
  {
    label: 'Create',
    href: '/create',
    icon: PlusSquareIcon,
  },
];
