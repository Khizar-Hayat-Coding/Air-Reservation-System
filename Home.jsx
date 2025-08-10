import React from 'react';
import FormFlights from '../components/FormFlights';
import ScheduleTable from '../components/ScheduleTable';
import ChooseUs from '../components/ChooseUs';
import PopularRoutes from '../components/PopularRoutes';
import PromoVideo from '../components/PromoVideo';

function Home() {
  return (
    <div>
      <FormFlights />
      <ScheduleTable />
      <ChooseUs />
      <PopularRoutes />
      <PromoVideo />
    </div>
  );
}

export default Home;
