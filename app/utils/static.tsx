import { ReactNode } from "react";

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
      title: "Home",
      icon: () => <></>,
      slug: "home",
      disabled: false,
      isVisible: true,
    },
    {
      title: "Products",
      icon: () => <></>,
      slug: "products",
      disabled: false,
      isVisible: true,
    },
    {
      title: "Orders",
      icon: () => <></>,
      slug: "orders",
      disabled: false,
      isVisible: true,
    },
    {
      title: "Help & Support",
      icon: () => <></>,
      slug: "help-and-support",
      disabled: false,
      isVisible: true,
    },
    {
      title: "Settings",
      icon: () => <></>,
      slug: "settings",
      disabled: false,
      isVisible: true,
    },
  ];
};
