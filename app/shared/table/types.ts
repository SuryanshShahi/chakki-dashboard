import { ReactNode } from "react";

export interface IAction {
  btn?: string;
  onClick?: () => void;
  menuItems?: IMenuItem[];
}
export interface IMenuItem {
  icon: ReactNode;
  text: string;
  id?: string;
  onClick?: (id: string) => void;
}
export interface ISelected {
  label: string;
  value: string;
}
