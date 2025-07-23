import { SVGProps } from 'react';

export const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='80'
    height='64'
    viewBox='0 0 80 64'
    fill='none'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16 40C31.2548 40 40 31.2548 40 16C40 31.2548 48.7452 40 64 40C48.7452 40 40 48.7452 40 64C40 48.7452 31.2548 40 16 40Z'
      fill='white'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0 12C7.62742 12 12 7.62742 12 0C12 7.62742 16.3726 12 24 12C16.3726 12 12 16.3726 12 24C12 16.3726 7.62742 12 0 12Z'
      fill='#FEC84B'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M64 24C69.0849 24 72 21.0849 72 16C72 21.0849 74.9151 24 80 24C74.9151 24 72 26.9151 72 32C72 26.9151 69.0849 24 64 24Z'
      fill='#FEC84B'
    />
  </svg>
);
