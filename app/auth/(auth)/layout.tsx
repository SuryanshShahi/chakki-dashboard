import Loader from '@/app/shared/Loader';
import { ReactNode, Suspense } from 'react';
import { CiHeadphones } from 'react-icons/ci';
import Img from '../../shared/Img';
import Text from '../../shared/Text';
import Heading from '../../shared/heading/Heading';
import { SvgStar } from '../../svgs';

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <div className='grid lg:grid-cols-2 h-screen place-items-center'>
        <div className='flex flex-col gap-y-8 sm:p-8 p-5 h-full max-w-[70%] w-full'>
          <div className='flex flex-col items-center mt-auto w-full'>
            <Img
              src='/images/logo.png'
              height={40}
              width={70}
              alt='logo'
              isLocal
              className='h-[40px] object-contain mb-4'
            />
            {children}
          </div>
          <div className='flex justify-between items-center mt-auto'>
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
        <div
          className='lg:flex hidden flex-col justify-end space-y-8 relative px-16 pb-10 bg-cover bg-center h-screen w-full bg-blue-50 bg-no-repeat'
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
              Asia&apos;s first online platform for bringing your local chakkis
              at your doorstep
            </Text>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default RootLayout;
