import clsx from "clsx";
import React from "react";

const Divider = ({
  className,
  variant = "tertiary",
}: {
  className?: string;
  variant?: "secondary" | "tertiary" | "primary" | "brand";
}) => {
  return (
    <div
      className={clsx("h-[1px] w-full border-t", `border-${variant}`, className)}
    />
  );
};

export default Divider;
