'use client';

import { CaretUpDownIcon } from '@phosphor-icons/react';

import MenuLinks from '@/src/modules/dashboard/sidebar/menu-links';

function AccountSwitcher() {
  return (
    <button
      type="button"
      className="flex h-[86px] w-full items-center justify-between rounded bg-neutral-300 px-[14px]"
      aria-label="Switch account"
    >
      <div className="flex items-center gap-2">
        <div className="flex size-[50px] shrink-0 items-center justify-center rounded bg-primary-600">
          <span className="text-base font-medium leading-6 text-white">Go</span>
        </div>
        <span className="text-sm font-medium leading-[22px] tracking-[-0.01em] text-text-secondary">
          Personal Account
        </span>
      </div>
      <CaretUpDownIcon
        size={24}
        weight="regular"
        className="shrink-0 text-text-secondary"
        aria-hidden
      />
    </button>
  );
}

const Sidebar = () => {
  return (
    <aside className="sticky top-20 ml-4 flex h-[calc(100vh-8remrem)] w-[300px] shrink-0 scale-[0.9] flex-col self-start rounded bg-white p-6">
      <MenuLinks />
      <div className="mt-auto pt-6">
        <AccountSwitcher />
      </div>
    </aside>
  );
};

export default Sidebar;
