import {
  AirplaneTiltIcon,
  BuildingsIcon,
  FirstAidKitIcon,
  NewspaperClippingIcon,
  PackageIcon,
  RoadHorizonIcon,
  StudentIcon,
  SuitcaseRollingIcon,
} from '@phosphor-icons/react';

import type { SidebarRoute } from '@/src/modules/type';

const sidebarRoutes: SidebarRoute[] = [
  {
    label: 'Activities',
    href: '/activities',
    icon: RoadHorizonIcon,
  },
  {
    label: 'Hotels',
    href: '/hotels',
    icon: BuildingsIcon,
  },
  {
    label: 'Flights',
    href: '/flights',
    icon: AirplaneTiltIcon,
  },
  {
    label: 'Study',
    href: '/study',
    icon: StudentIcon,
  },
  {
    label: 'Visa',
    href: '/visa',
    icon: NewspaperClippingIcon,
  },
  {
    label: 'Immigration',
    href: '/immigration',
    icon: SuitcaseRollingIcon,
  },
  {
    label: 'Medical',
    href: '/medical',
    icon: FirstAidKitIcon,
  },
  {
    label: 'Vacation Packages',
    href: '/vacation-packages',
    icon: PackageIcon,
  },
];

export default sidebarRoutes;
