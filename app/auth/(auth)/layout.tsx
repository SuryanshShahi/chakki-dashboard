import { Fragment, ReactNode } from 'react';
import { CiHeadphones } from 'react-icons/ci';
import Heading from '../../shared/Heading';
import Img from '../../shared/Img';
import Text from '../../shared/Text';
import { SvgStar } from '../../svgs';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className='grid lg:grid-cols-2 h-screen max-[1024px]:place-items-center'>
      <div className='flex flex-col gap-y-8 justify-between sm:p-8 p-5 h-full w-full'>
        <Img
          src='/images/logo.png'
          height={40}
          width={70}
          alt='logo'
          isLocal
          className='h-[40px] object-contain'
        />
        {children}
        <div className='flex justify-between mt-auto items-center'>
          <Text variant='tertiary' size='sm'>
            © 2025 Chakkiwala
          </Text>
          <div className='flex items-center gap-x-2'>
            <CiHeadphones size={16} className='text-tertiary' />
            <Text variant='tertiary' size='sm'>
              Help & Support
            </Text>
          </div>
        </div>
      </div>
      <div className='lg:block'>
        <Fragment>
          <div
            className='gap-y-8 relative px-16 pb-10 flex flex-col bg-cover bg-center h-screen w-full bg-blue-50 bg-no-repeat'
            style={{
              backgroundImage: `url(${'/images/wheat-field.avif'})`,
            }}
          >
            <div className='bg-bannerOverlay h-screen w-full left-0 absolute top-0' />
            <div className='space-y-4 mt-auto z-10 mb-[88px]'>
              <SvgStar height={64} width={80} />
              <Heading
                variant='white'
                type='semibold'
                className='text-5xl leading-[60px]'
              >
                Welcome to Chakkiwala
              </Heading>
              <Text
                size='xl'
                variant='white'
                type='medium'
                className='leading-[30px]'
              >
                Asia's first online platform for representing your local chakkis
              </Text>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default RootLayout;
