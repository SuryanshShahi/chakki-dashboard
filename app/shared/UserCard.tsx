import Heading from "@/app/shared/heading/Heading";
import Img from "@/app/shared/Img";
import Text from "@/app/shared/Text";
import clsx from "clsx";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Status } from "../utils/enum";

export interface IUserCard {
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  image?: ReactNode;
  type?: "activity" | "info";
  status?: Status | null;
  styleTitle?: string;
  styleSubtitle?: string;
  styleImage?: string;
  imageWrapperClass?: string;
  onClick?: () => void;
  showInitials?: boolean;
  count?: number;
}

const UserCard: FC<PropsWithChildren<IUserCard>> = ({
  title,
  subtitle,
  image,
  className,
  children,
  type = "info",
  status,
  styleTitle,
  styleSubtitle,
  styleImage,
  onClick,
  imageWrapperClass,
  showInitials,
  count,
}) => {
  const renderStatusBadge = () => {
    if (!status) return null;
    return (
      <>
        <div className={clsx("absolute right-0", "top-0")}>
          {status === Status.DRAFT || status === Status.ACTIVE ? (
            <div
              className={clsx(
                "h-[14px] w-[14px] border-[1.5px] border-white rounded-full",
                status === Status.DRAFT ? "bg-warning-500" : "bg-green-500"
              )}
            />
          ) : (
            ""
          )}
        </div>
        {Boolean(count) && (
          <div className="absolute bottom-0 right-1 z-10 bg-white shadow h-[18px] w-[18px] text-[10px] rounded-full flex justify-center items-center">
            +{count}
          </div>
        )}
      </>
    );
  };

  const renderImage = () => {
    if (typeof image === "string") {
      return (
        <div
          className={clsx(
            "relative",
            type === "activity" &&
              "h-16 w-16 border-2 rounded-full flex justify-center items-center",
            status === Status.ACTIVE
              ? "border-green-500"
              : "border-utility-warning-500",
            imageWrapperClass
          )}
        >
          <Img
            src={image}
            height={160}
            width={160}
            className={clsx(
              "rounded-full self-center",
              type === "activity" ? "h-[56px] w-[56px]" : "h-10 w-10",
              styleImage
            )}
            alt={title as string}
            isLocal
          />
          {renderStatusBadge()}
        </div>
      );
    }

    if (image) return image;

    if (showInitials && typeof title === "string") {
      return (
        <div
          className={clsx(
            "relative",
            type === "activity" &&
              "h-16 w-16 border-2 border-brand rounded-full flex justify-center items-center",
            imageWrapperClass
          )}
        >
          <div
            className={clsx(
              "rounded-full self-center bg-brand-primary uppercase text-brand-tertiary flex justify-center items-center border border-brand-secondary",
              type === "activity" ? "h-[54px] w-[54px]" : "h-10 w-10",
              styleImage
            )}
          >
            {title.charAt(0)}
          </div>
          {renderStatusBadge()}
        </div>
      );
    }

    return null;
  };

  const renderTextContent = () => {
    if (!title && !subtitle) return null;

    return (
      <div className="space-y-1">
        {title && (
          <Heading
            variant="primary"
            className={clsx(
              type === "info" ? "text-base" : "text-sm",
              styleTitle
            )}
            type={type === "info" ? "semibold" : "medium"}
          >
            {title}
          </Heading>
        )}
        {subtitle &&
          (typeof subtitle === "string" ? (
            <Text
              size={type === "info" ? "sm" : "xs"}
              variant={type === "info" ? "secondary" : "tertiary"}
              className={styleSubtitle}
            >
              {subtitle}
            </Text>
          ) : (
            subtitle
          ))}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        "flex items-center",
        type === "activity" ? "flex-col gap-y-[6px]" : "gap-x-3",
        className,
        onClick && "cursor-pointer"
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={() => {}}
    >
      {renderImage()}
      {renderTextContent()}
      {children}
    </div>
  );
};

export default UserCard;
