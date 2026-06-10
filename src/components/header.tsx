'use client';

import { CaretDownIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    <Link href={route.href} className="flex w-max flex-col items-center gap-2">
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

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full shrink-0 bg-white">
      <div className="flex items-start justify-between gap-6 px-10 py-4 ">
        <div className="flex shrink-0 items-start gap-7 scale-[0.8] translate-x-[-50px]">
          <Link href="/" className="shrink-0">
            <Image src={logo} alt="Go Paddi" width={59} height={56} priority />
          </Link>

          <label className="flex w-[400px] items-center gap-2 rounded bg-neutral-300 p-3">
            <MagnifyingGlassIcon
              size={24}
              weight="regular"
              className="shrink-0 text-text-secondary"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-transparent text-base leading-8 tracking-[-0.01em] text-text-secondary placeholder:text-text-secondary focus:outline-none"
            />
          </label>
        </div>

        <div className="flex min-w-0 items-start gap-6 scale-[0.8]">
          <nav className="flex items-start gap-6">
            {headerRoutes.map((route) => (
              <HeaderNavItem
                key={route.href}
                route={route}
                isActive={isRouteActive(pathname, route.href)}
              />
            ))}
          </nav>

          <div className="mx-1 h-12 w-px shrink-0 self-center bg-neutral-600/30" />

          <button
            type="button"
            className="h-10 shrink-0 self-center rounded bg-primary-600 px-4 py-2 text-sm font-medium leading-[22px] tracking-[-0.01em] text-white"
          >
            Subscribe
          </button>

          <nav className="flex items-start gap-6">
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
            className="flex shrink-0 items-center gap-[15px] self-center"
            aria-label="Open profile menu"
          >
            <Image
              src="/assets/user-profile.svg"
              alt="Profile"
              width={52}
              height={52}
              className="rounded-full"
            />
            <CaretDownIcon
              size={24}
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
