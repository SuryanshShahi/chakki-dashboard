'use client';
import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import Loader from '@/app/shared/Loader';
import CardWrapper from '@/app/shared/cards/CardWrapper';
import { ReactNode } from 'react';
import useHook from './useHook';

const Home = () => {
  const { data, isLoading } = useHook();
  if (isLoading) return <Loader />;
  return (
    <PageWrapper hideFooter wrapperClass='!px-0'>
      <div className='grid grid-cols-4 gap-x-4'>
        <StatsCard heading='Active Chakkis' subheading={data?.activeChakkis} />
        <StatsCard
          heading='Active Merchants'
          subheading={data?.activeMerchants}
        />
        <StatsCard
          heading='Active Products'
          subheading={data?.activeProducts}
        />
        <StatsCard
          heading='Average Ratings'
          subheading={data?.averageRatings || '-'}
        />
      </div>
    </PageWrapper>
  );
};

const StatsCard = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading?: string | number;
  color?: string;
  icon?: ReactNode;
}) => {
  return (
    <CardWrapper className='flex items-center justify-between'>
      <div>
        <p>{heading}</p>
        <p>{subheading}</p>
      </div>
      <div></div>
    </CardWrapper>
  );
};

export default Home;
