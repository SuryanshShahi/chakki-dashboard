import { tw } from '@/tailwind.config';
import { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { LuShare2 } from 'react-icons/lu';
import { TbDotsVertical } from 'react-icons/tb';
import Img from '../shared/Img';
import { SvgEdit, SvgTrash } from './svgs';

interface IDrawerItem {
  title: string;
  icon: (color: string) => ReactNode;
  slug: string;
  disabled: boolean;
  isVisible: boolean;
  menuItems?: { title: string; slug: string; isVisible: boolean }[];
}
export const drawerMenuItems = (modules?: string[]): IDrawerItem[] => {
  return [
    {
      title: 'Home',
      icon: () => <></>,
      slug: 'home',
      disabled: false,
      isVisible: true,
    },
    {
      title: 'Chakkis',
      icon: () => <></>,
      slug: 'chakkis',
      disabled: false,
      isVisible: true,
    },
    {
      title: 'Orders',
      icon: () => <></>,
      slug: 'orders',
      disabled: false,
      isVisible: true,
    },
    {
      title: 'Help & Support',
      icon: () => <></>,
      slug: 'help-and-support',
      disabled: false,
      isVisible: true,
    },
    {
      title: 'Settings',
      icon: () => <></>,
      slug: 'settings',
      disabled: false,
      isVisible: true,
    },
  ];
};

export const ErrorMessage = {
  REQUIRED: 'This field is mandatory',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PHONE: 'Please enter a valid number',
  NO_SPECIAL_CHARACTERS: 'Cannot have special characters',
  MAX_15_CHAR: 'Please enter at most 15 characters',
  MIN_2_CHAR: 'Please enter at least 2 characters',
};

export const Regex = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$|^$/,
  NAME: /^[a-zA-Z ]+$/,
  PHONE: /^[0-9]\d{9}$|^$/,
  AT_LEAST_EIGHT_CHAR: /^.{8,}$/,
  AT_LEAST_ONE_UPPER_CHAR: /.*[A-Z].*/,
  AT_LEAST_ONE_NUMBER: /^(?=.*\d)/,
  AT_LEAST_ONE_SPECIAL_CHAR: /^(?=.*[#?!@$%^&*-]).*$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};

export const getActionBtn = (action: 'delete' | 'edit' | 'menu' | 'share') => {
  switch (action) {
    case 'delete':
      return (
        <SvgTrash
          height={20}
          width={20}
          stroke={tw.textColor['error-primary']}
          className='cursor-pointer'
          role='button'
          tabIndex={0}
          onKeyDown={() => {}}
        />
      );
    case 'edit':
      return (
        <SvgEdit
          height={20}
          width={20}
          stroke={tw.textColor['brand-primary']}
          className='cursor-pointer'
          role='button'
          tabIndex={0}
          onKeyDown={() => {}}
        />
      );
    case 'share':
      return <LuShare2 size={20} className='text-brand-primary' />;
    case 'menu':
      return (
        <TbDotsVertical
          className='cursor-pointer text-quaternary'
          size={20}
          role='button'
          onKeyDown={() => {}}
          tabIndex={0}
        />
      );

    default:
      break;
  }
};

export const emptyState = {
  title: 'No Data found',
  subtitle:
    'Your search “Landing page design” did not match any projects. Please try again.',
  icon: (
    <Img
      height={118}
      width={152}
      alt=''
      isLocal
      src='/images/icons/emptyState.png'
    />
  ),
  btnProps: {
    btnName: 'Go Back',
    icon: <FaArrowLeft size={16} className='text-white' />,
  },
};
