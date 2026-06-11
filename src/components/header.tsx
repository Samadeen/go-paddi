'use client';

import { CaretDownIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import type { HeaderRoute } from '@/src/modules/type';
import { headerActionRoutes, headerRoutes } from '@/src/routes/header.route';
import logo from '@/public/assets/logo.svg';

function isRouteActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderNavItem({
  route,
  isActive,
}: {
  route: HeaderRoute;
  isActive: boolean;
}) {
  const Icon = route.icon;

  return (
    <Link
      href={route.href}
      className="group flex w-max cursor-pointer flex-col items-center gap-1 rounded-lg px-1.5 py-0.5 transition-colors hover:bg-neutral-200/60"
    >
      <Icon
        size={22}
        weight="regular"
        className={cn(
          'transition-colors',
          isActive
            ? 'text-text-primary'
            : 'text-text-secondary group-hover:text-primary-600'
        )}
      />
      <span
        className={cn(
          'text-xs font-medium leading-5 tracking-[-0.01em] transition-colors',
          isActive
            ? 'text-text-primary'
            : 'text-text-secondary group-hover:text-primary-600'
        )}
      >
        {route.label}
      </span>
    </Link>
  );
}

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full shrink-0 overflow-x-hidden bg-white">
      <div className="flex w-full min-w-0 items-center justify-between gap-4 px-6 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Link
            href="/"
            className="shrink-0 rounded-lg transition-opacity hover:opacity-80"
          >
            <Image src={logo} alt="Go Paddi" width={48} height={46} priority />
          </Link>

          <label className="flex min-w-0 max-w-sm flex-1 items-center gap-2 rounded bg-neutral-300 p-2.5">
            <MagnifyingGlassIcon
              size={20}
              weight="regular"
              className="shrink-0 text-text-secondary"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search"
              className="min-w-0 w-full bg-transparent text-sm leading-6 tracking-[-0.01em] text-text-secondary placeholder:text-text-secondary focus:outline-none"
            />
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <nav className="flex items-center gap-3">
            {headerRoutes.map((route) => (
              <HeaderNavItem
                key={route.href}
                route={route}
                isActive={isRouteActive(pathname, route.href)}
              />
            ))}
          </nav>

          <div className="mx-0.5 h-8 w-px shrink-0 bg-neutral-600/30" />

          <button
            type="button"
            className="h-8 shrink-0 cursor-pointer rounded bg-primary-600 px-3 py-1.5 text-xs font-medium leading-5 tracking-[-0.01em] text-white transition-colors hover:bg-primary-600/90"
          >
            Subscribe
          </button>

          <nav className="flex items-center gap-3">
            {headerActionRoutes.map((route) => (
              <HeaderNavItem
                key={route.href}
                route={route}
                isActive={isRouteActive(pathname, route.href)}
              />
            ))}
          </nav>

          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg p-1 transition-colors hover:bg-neutral-200/60"
            aria-label="Open profile menu"
          >
            <Image
              src="/assets/user-profile.svg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <CaretDownIcon
              size={20}
              weight="regular"
              className="text-text-secondary"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
