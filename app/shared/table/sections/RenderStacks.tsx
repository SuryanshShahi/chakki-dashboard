import { ITableHeading } from '@/app/utils/types';
import Chip from '../../Chip';
import StackingCard from '../../StackingCard';

export const renderStackCell = (
  data: any,
  idx: number,
  headings: ITableHeading[]
) => {
  return (
    <StackingCard data={data?.slice(0, headings?.[idx]?.maxLimit || 5)}>
      {data?.length > (headings?.[idx]?.maxLimit || 5) && (
        <Chip
          title={`+${data?.length - (headings?.[idx]?.maxLimit || 5)}`}
          className='rounded-full !text-sm !px-0 !py-0 shadow-sm -ml-2 !border-2 !border-white !text-tertiary !text-[10px] !h-8 !w-8 font-semibold justify-center'
          variant='gray'
        />
      )}
    </StackingCard>
  );
};
