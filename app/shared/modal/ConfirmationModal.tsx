import { colors } from "@/app/utils/colors";
import { SvgCircle, SvgSave, SvgTrash } from "@/app/utils/svgs";
import clsx from "clsx";
import { GoCheckCircle } from "react-icons/go";
import Button from "../buttons/Button";
import { ModalTemplate } from "./ModalTemplate";

const ConfirmationModal = ({
  close,
  isOpen,
  leftBtnName = "Cancel",
  rightBtnName,
  onSubmit,
  title,
  description,
  type,
  size = "md",
  styleHeader,
  isLoading,
}: {
  isOpen: boolean;
  close: () => void;
  onSubmit: () => void;
  leftBtnName?: string;
  rightBtnName: string;
  title: string;
  description: string;
  type: "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  styleHeader?: string;
  isLoading?: boolean;
}) => {
  return (
    <ModalTemplate
      className="p-6 space-y-4"
      modalProps={{ close, isOpen, size }}
    >
      <div className={clsx("space-y-4", styleHeader)}>
        <div className="flex w-max justify-center items-center self-start relative">
          <SvgCircle
            height={48}
            width={48}
            stroke={
              type === "success"
                ? colors["utility-success"]?.[200]
                : type === "warning"
                ? colors["utility-warning"]?.[200]
                : colors["utility-error"]?.[200]
            }
            fill={
              type === "success"
                ? colors["utility-success"]?.[50]
                : type === "warning"
                ? colors["utility-warning"]?.[50]
                : colors["utility-error"]?.[50]
            }
          />
          <div
            className={clsx(
              "h-8 w-8 rounded-full absolute flex justify-center items-center",
              {
                "bg-success-solid": type === "success",
                "bg-warning-solid": type === "warning",
                "bg-error-solid": type === "danger",
              }
            )}
          >
            {type === "success" ? (
              <GoCheckCircle size={20} className="text-white" />
            ) : type === "warning" ? (
              <SvgSave
                height={20}
                width={20}
                className="text-white"
                stroke="#ffffff"
              />
            ) : (
              <SvgTrash
                height={20}
                width={20}
                className="text-white"
                stroke="#ffffff"
              />
            )}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-lg font-semibold text-primary">{title}</div>
          <div className="text-sm text-tertiary">{description}</div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-start sm:items-center gap-3 !mt-8">
        <div
          className={clsx(
            "flex sm:flex-row flex-col justify-end gap-3 w-full ml-auto",
            { "sm:w-max": size === "lg" || size === "md" }
          )}
        >
          <Button
            btnName={leftBtnName}
            onClick={close}
            variant="secondary"
            fullWidth
          />
          <Button
            btnName={rightBtnName}
            onClick={onSubmit}
            variant={type === "danger" ? "error" : "primary"}
            fullWidth
            isLoading={isLoading}
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

export default ConfirmationModal;
