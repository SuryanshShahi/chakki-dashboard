'use client';

import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import { UUID } from 'crypto';
import PageLoader from 'next/dist/client/page-loader';
import { useHook } from './useHook';
import Loader from '@/app/shared/Loader';

export const ChakkiDetails = ({ id }: { id: UUID }) => {
  const { chakkiDetails, isLoadingChakkis } = useHook({ chakkiId: id });
  console.log({ chakkiDetails });

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
      Chakki
    </PageWrapper>
  );
};
