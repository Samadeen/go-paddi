'use client';

import { useState } from 'react';

import Banner from './_components/banner';
import Activities from './_components/activities/activities';
import CallToAction from './_components/call-to-action';
import Flights from './_components/flights/flights';
import Hotel from './_components/hotels/hotel';
import TripInfo from './_components/trip-info';
import type { CtaModalId, TripInfoData } from './types';
import { defaultTrip } from './constants/call-to-action';

const Dashboard = ({ trip = defaultTrip }: { trip?: TripInfoData }) => {
  const [openAddModal, setOpenAddModal] = useState<CtaModalId | null>(null);

  const createModalHandlers = (id: CtaModalId) => ({
    addModalOpen: openAddModal === id,
    onAddModalOpenChange: (open: boolean) => {
      setOpenAddModal(open ? id : null);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Banner />
      <TripInfo {...trip} />
      <CallToAction onItemAction={setOpenAddModal} />
      <div className="mt-[5.62rem]">
        <h2 className="text-xl font-semibold leading-7 tracking-[-0.02em] text-text-primary">
          Trip itineraries
        </h2>
        <p className="text-sm font-medium leading-6 tracking-[-0.04em] text-text-muted">
          Your trip itineraries are placed here.
        </p>
      </div>
      <Flights {...createModalHandlers('flights')} />
      <Hotel {...createModalHandlers('hotels')} />
      <Activities {...createModalHandlers('activities')} />
    </div>
  );
};

export default Dashboard;
