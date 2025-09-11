'use client';

import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import Loader from '@/app/shared/Loader';
import TabBar from '@/app/shared/tabs';
import DetailPage from '@/app/shared/templates/DetailPages';
import { UUID } from 'crypto';
import { useRouter } from 'next/navigation';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { ChakkiOverview } from './tabs/overview';
import { ChakkiProducts } from './tabs/products';
import { useHook } from './useHook';

export const ChakkiDetails = ({ id }: { id: UUID }) => {
  const { chakkiDetails, isLoadingChakkis } = useHook({ chakkiId: id });
  console.log({ chakkiDetails });

  const router = useRouter();

  const tabs = [
    {
      name: `Overview`,
      component: <ChakkiOverview data={chakkiDetails} />,
    },
    {
      name: 'Products',
      component: <ChakkiProducts data={chakkiDetails} />,
    },
  ];

  if (isLoadingChakkis) return <Loader />;
  return (
    <PageWrapper
      breadCrumbs={[
        {
          label: 'Chakkis',
          path: '/chakkis',
        },
        {
          label: chakkiDetails?.name || '',
        },
      ]}
    >
      <DetailPage
        className='space-y-5'
        data={{
          title: `Everything about ${chakkiDetails?.name}`,
          subtitle: `Chakki overview, their products, overall order and performance statistics and more...`,
        }}
        buttons={[
          {
            btnName: 'Add Products',
            size: 'sm',
            icon: <IoIosAddCircleOutline />,
            iconFirst: true,
            onClick: () =>
              router.push(`/chakkis/${chakkiDetails?.id}/products/add`),
          },
        ]}
      >
        <TabBar tabs={tabs} variant='link'></TabBar>
      </DetailPage>
    </PageWrapper>
  );
};
