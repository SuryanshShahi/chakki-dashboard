import clsx from "clsx";
import { FC, PropsWithChildren, ReactNode } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
interface IToolTip {
  title: ReactNode;
  variant: "top" | "left" | "right" | "bottom";
  styleTitle?: string;
  className?: string;
  size?: "sm" | "md";
  styleContent?: string;
}
const Tooltip: FC<PropsWithChildren<IToolTip>> = ({
  children,
  title,
  variant,
  styleTitle,
  size = "md",
  className,
  styleContent,
}) => {
  return (
    <div
      className={clsx(
        "group relative cursor-pointer w-fit z-10",
        {
          "flex items-center": variant === "right" || variant === "left",
          "flex flex-col justify-center items-center":
            variant === "bottom" || variant === "top",
        },
        className
      )}
    >
      {children}
      {title && (
        <div
          className={clsx(
            "absolute w-max max-w-[310px] duration-500 group-hover:opacity-100 group-hover:visible opacity-0 invisible",
            {
              "flex items-center left-[100%]": variant === "right",
              "flex items-center right-[100%]": variant === "left",
              "flex flex-col items-center top-[100%]": variant === "bottom",
              "flex flex-col items-center order-first bottom-[100%]":
                variant === "top",
            },
            styleContent
          )}
        >
          <div
            className={clsx(
              "z-10 w-full break-words font-semibold text-white bg-primary-solid rounded-lg dark:bg-gray-700",
              {
                "px-[6px] py-[2px] text-[10px]": size === "sm",
                "p-3 text-xs": size === "md",
              },
              styleTitle
            )}
          >
            {title}
          </div>
          <BiSolidUpArrow
            size={size === "md" ? 20 : 16}
            className={clsx("text-gray-950 dark:text-gray-700", {
              "rotate-90 -ml-1": variant === "left",
              "order-first -mb-[6px]": variant === "bottom",
              "rotate-180 -mt-[6px]": variant === "top",
              "-rotate-90 order-first -mr-1": variant === "right",
            })}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
