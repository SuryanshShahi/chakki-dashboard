import clsx from "clsx";
import React, { ReactNode } from "react";
import Loader from "../Loader";

export interface IButton {
  variant?:
    | "primary"
    | "secondary"
    | "secondary-color"
    | "tertiary"
    | "tertiary-color"
    | "tertiary-link"
    | "tertiary-color-link"
    | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  iconFirst?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  btnName?: string;
  className?: string;
  onClick?: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
  icon?: ReactNode;
  secondaryIcon?: ReactNode;
  children?: ReactNode;
  type?: "button" | "submit";
  form?: string;
  styleBtnName?: string;
}

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  iconFirst,
  btnName,
  onClick,
  disabled,
  fullWidth,
  className,
  secondaryIcon,
  isLoading,
  type = "button",
  form,
  styleBtnName,
}: IButton) => {
  const variantClasses = {
    primary: disabled
      ? "bg-disabled text-disabled !cursor-not-allowed border border-disabled-subtle"
      : "bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-fg",
    secondary: disabled
      ? "bg-primary text-disabled !cursor-not-allowed border border-disabled-subtle"
      : "text-btn-secondary-fg border bg-btn-secondary hover:bg-btn-secondary-hover border-btn-secondary",
    "secondary-color": disabled
      ? "bg-primary text-disabled !cursor-not-allowed border border-disabled-subtle"
      : "text-btn-secondary-color-fg border bg-btn-secondary-color hover:bg-btn-secondary-color-hover",
    tertiary: disabled
      ? "text-disabled !cursor-not-allowed"
      : "text-btn-tertiary-fg hover:bg-btn-tertiary-hover",
    "tertiary-color": disabled
      ? "text-disabled !cursor-not-allowed"
      : "text-btn-tertiary-color-fg hover:bg-btn-tertiary-color-hover",
    "tertiary-link": disabled
      ? "text-disabled !cursor-not-allowed"
      : "text-btn-tertiary-fg",
    "tertiary-color-link": disabled
      ? "text-disabled !cursor-not-allowed"
      : "text-btn-tertiary-color-fg",
    error: disabled
      ? "bg-disabled text-disabled !cursor-not-allowed border border-disabled-subtle"
      : "bg-btn-primary-error hover:bg-btn-primary-error-hover text-btn-primary-error-fg",
  };

  const sizeClasses = {
    xs: "py-2 px-3 text-sm leading-[21px] gap-x-1",
    sm: "py-[10px] px-[14px] text-sm leading-[21px] gap-x-1",
    md: "py-[10px] px-4 gap-x-[6px]",
    lg: "py-3 px-[18px] gap-x-[6px]",
    xl: "py-4 px-[22px] text-lg gap-x-[10px] !text-2xl",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={clsx(
        "w-max h-max flex items-center prevent-select justify-center rounded-lg cursor-pointer duration-300 font-semibold relative",
        variantClasses[variant],
        sizeClasses[size],
        {
          "!w-full justify-center": fullWidth,
          "[&>*]:opacity-0": isLoading,
        },
        className
      )}
      form={form}
      type={type}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {isLoading && <Loader wrapperClass="!opacity-100 absolute" />}
      {btnName && (
        <div
          className={clsx(
            "text-nowrap",
            iconFirst && "order-last",
            styleBtnName
          )}
        >
          {btnName}
        </div>
      )}
      {icon && <div className="text-xl">{icon}</div>}
      {secondaryIcon}
    </button>
  );
};

export default Button;
