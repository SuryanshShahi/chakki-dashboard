import { ReactNode } from 'react';

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
      title: 'Products',
      icon: () => <></>,
      slug: 'products',
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
