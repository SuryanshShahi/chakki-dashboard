import clsx from "clsx";
import { ComponentProps, FC, PropsWithChildren } from "react";
interface ICardWrapper extends ComponentProps<"div"> {
  className?: string;
  onClick?: () => void;
  style?: any;
}
const CardWrapper: FC<PropsWithChildren<ICardWrapper>> = ({
  children,
  className,
  onClick,
  style,
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-white p-4 border border-tertiary",
        onClick && "cursor-pointer",
        className
      )}
      style={style}
      role={onClick ? "button" : ""}
      onClick={onClick}
      onKeyDown={() => {}}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
