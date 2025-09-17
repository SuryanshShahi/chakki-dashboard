import Img from '@/app/shared/Img';
import CardWrapper from '@/app/shared/cards/CardWrapper';
import clsx from 'clsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import { IChakkiDetails } from '../../types';

export const ChakkiOverview = ({ data }: { data?: IChakkiDetails }) => {
  return (
    <div className='grid grid-cols-3 gap-x-2'>
      {Boolean(data?.photos?.length) && (
        <CardWrapper className='space-y-5 col-span-1 h-min lg:p-5 p-0 rounded-2xl lg:border border-tertiary sticky top-0 lg:bg-white bg-transparent'>
          <div className={clsx('space-y-6', data?.photos?.length && 'pb-2')}>
            <Slider
              {...settings}
              className='homeDeals'
              dots={Boolean(Number(data?.photos?.length) > 1)}
            >
              {data?.photos?.map((item) => (
                <Img
                  src={item.url}
                  key={item.id}
                  isLocal
                  alt='image'
                  className='mx-2'
                  height={14}
                  width={24}
                />
              ))}
            </Slider>
          </div>
        </CardWrapper>
      )}
      <CardWrapper className='col-span-2 space-y-2'>
        <KeyValue label='Name' value={data?.name} />
        <KeyValue label='Code' value={data?.code} />
        <KeyValue
          label='Delivery Range'
          value={data?.deliveryRangeInKms || 'NA'}
        />
        <KeyValue
          label='Minimum Order Value'
          value={data?.minOrderValue || 'NA'}
        />
        <KeyValue
          label='External Store Links'
          value={data?.externalStoreLinks?.join(', ') || 'NA'}
        />
        <KeyValue
          label='External Store Links'
          value={data?.externalStoreLinks?.join(', ') || 'NA'}
        />
      </CardWrapper>
    </div>
  );
};

const KeyValue = ({ label, value }: { label: string; value: string }) => (
  <>
    <div className='space-y-[2px]'>
      <div className='text-[12px]'>{label}</div>
      <div className=''>{value}</div>
    </div>
  </>
);

const ArrowLeft = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    onKeyDown={onClick}
    tabIndex={0}
    aria-label='Go left'
    role='button'
    className='border border-tertiary bg-primary absolute z-20 top-[60px] -left-3 duration-300 h-[26px] w-[26px] cursor-pointer rounded-full flex justify-center items-center'
  >
    <IoIosArrowBack size={18} className='text-black mr-[2px]' />
  </div>
);

const ArrowRight = ({ onClick }: { onClick?: () => void }) => (
  <div
    tabIndex={0}
    onKeyDown={onClick}
    aria-label='Go right'
    role='button'
    onClick={onClick}
    className='border border-tertiary bg-primary absolute z-20 top-[60px] -right-3 h-[26px] w-[26px] duration-300 cursor-pointer rounded-full flex justify-center items-center'
  >
    <IoIosArrowForward size={18} className='text-black ml-1' />
  </div>
);

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  waitForAnimate: false,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <ArrowRight />,
  prevArrow: <ArrowLeft />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1.8,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
};
