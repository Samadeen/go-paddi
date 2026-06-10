'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { SidebarRoute } from '@/src/modules/type';
import sidebarRoutes from '@/src/routes/sidebar.route';

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNavItem({
  route,
  isActive,
}: {
  route: SidebarRoute;
  isActive: boolean;
}) {
  const Icon = route.icon;

  return (
    <Link
      href={route.href}
      className={`flex w-full items-center gap-2 rounded px-[14px] py-3 ${
        isActive ? 'bg-neutral-300' : 'bg-white'
      }`}
    >
      <Icon
        size={32}
        weight="regular"
        className={isActive ? 'text-text-primary' : 'text-text-secondary'}
      />
      <span
        className={`text-base leading-6 tracking-[-0.01em] ${
          isActive
            ? 'font-medium text-text-primary'
            : 'font-medium text-text-secondary'
        }`}
      >
        {route.label}
      </span>
    </Link>
  );
}

const MenuLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-col gap-3">
      {sidebarRoutes.map((route) => (
        <SidebarNavItem
          key={route.href}
          route={route}
          isActive={isRouteActive(pathname, route.href)}
        />
      ))}
    </nav>
  );
};

export default MenuLinks;
