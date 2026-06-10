import Banner from './_components/banner';
import Activities from './_components/activities/activities';
import CallToAction from './_components/call-to-action';
import Flights from './_components/flights/flights';
import Hotel from './_components/hotels/hotel';
import TripInfo from './_components/trip-info';
import type { TripInfoData } from './types';

const defaultTrip: TripInfoData = {
  title: 'Bahamas Family Trip',
  startDate: '2024-03-21',
  endDate: '2024-04-21',
  location: 'New York, United States of America',
  tripType: 'Solo Trip',
  participants: [{ id: '1', name: 'Trip member' }],
};

const Dashboard = ({ trip = defaultTrip }: { trip?: TripInfoData }) => {
  return (
    <div className="flex flex-col gap-6">
      <Banner />
      <TripInfo {...trip} />
      <CallToAction />
      <div className="mt-[5.62rem]">
        <h2 className="text-xl font-semibold leading-7 tracking-[-0.02em] text-text-primary">
          Trip itineraries
        </h2>
        <p className="text-sm font-medium leading-6 tracking-[-0.04em] text-text-muted">
          Your trip itineraries are placed here.
        </p>
      </div>
      <Flights />
      <Hotel />
      <Activities />
    </div>
  );
};

export default Dashboard;
