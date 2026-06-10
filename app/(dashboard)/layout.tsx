import { ReactNode } from 'react';

import Header from '@/src/components/header';
import Sidebar from '@/src/modules/dashboard/sidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-start bg-[#F0F2F5]">
        <Sidebar />
        <main className="mx-6 mt-9 min-w-0 flex-1 rounded-sm bg-white pt-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
