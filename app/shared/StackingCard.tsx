import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { getRandomHexColor } from '../utils/constants';
import Img from './Img';

interface IStackingCard {
  data: string[];
  size?: number;
  className?: string;
  styleImage?: string;
}

const StackingCard: FC<PropsWithChildren<IStackingCard>> = ({
  data,
  size = 24,
  className,
  children,
  styleImage,
}) => {
  return (
    <div className={clsx('flex items-center', className)}>
      {data?.map((item: string, idx: number) =>
        item?.length > 1 ? (
          <Img
            key={item}
            src={item}
            alt={item}
            height={size}
            width={size}
            isLocal
            className={clsx(
              'border-2 border-white h-6 w-6 rounded-full',
              idx > 0 && '-ml-2',
              styleImage
            )}
          />
        ) : (
          <div
            key={item}
            className={clsx(
              'border-2 text-sm border-white shadow-sm h-8 w-8 uppercase rounded-full flex items-center justify-center',
              idx > 0 && '-ml-2'
            )}
            style={{ backgroundColor: getRandomHexColor() + '30' }}
          >
            {item}
          </div>
        )
      )}
      {children}
    </div>
  );
};

export default StackingCard;
