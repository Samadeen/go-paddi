'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
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
      className={cn(
        'group flex w-full cursor-pointer items-center gap-2 rounded px-[14px] py-3 transition-colors',
        isActive
          ? 'bg-neutral-300'
          : 'bg-white hover:bg-neutral-200/70',
      )}
    >
      <Icon
        size={32}
        weight="regular"
        className={cn(
          'transition-colors',
          isActive
            ? 'text-text-primary'
            : 'text-text-secondary group-hover:text-primary-600',
        )}
      />
      <span
        className={cn(
          'text-base font-medium leading-6 tracking-[-0.01em] transition-colors',
          isActive
            ? 'text-text-primary'
            : 'text-text-secondary group-hover:text-primary-600',
        )}
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
