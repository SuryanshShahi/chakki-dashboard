import Button from "@/app/shared/buttons/Button";
import Divider from "@/app/shared/Divider";
import { IModal, Modal } from "@/app/shared/modal";
import { tw } from "@/tailwind.config";
import clsx from "clsx";
import { FC, Fragment, PropsWithChildren, ReactNode } from "react";
import UserCard from "../UserCard";
import IconWithBg from "../IconWithBg";
import { SvgCross, SvgFlag } from "@/app/utils/svgs";

interface IModalTemplate {
  className?: string;
  headerDetails?: {
    title: string;
    subtitle: ReactNode;
    icon?: ReactNode;
  };
  // inputProps?: IInputProps;
  btnProps?: {
    leftBtnName?: string;
    rightBtnName?: string;
    btnWrapperClass?: string;
    isRightBtnLoading?: boolean;
    isLeftBtnLoading?: boolean;
    leftOnClick?: () => void;
    rightOnClick: () => void;
    disabled?: boolean;
  } | null;
  modalProps: IModal;
}

export const ModalTemplate: FC<PropsWithChildren<IModalTemplate>> = ({
  children,
  className,
  headerDetails,
  // inputProps,
  btnProps,
  modalProps,
}) => {
  return (
    <Modal {...modalProps}>
      {headerDetails && (
        <Fragment>
          <UserCard
            title={headerDetails?.title}
            subtitle={headerDetails?.subtitle}
            styleTitle="text-lg"
            styleSubtitle="!text-tertiary"
            className="gap-x-4 p-6 !items-start"
            image={
              <IconWithBg
                icon={headerDetails?.icon || <SvgFlag stroke="white" />}
              />
            }
          >
            <SvgCross
              height={24}
              width={24}
              stroke={tw.textColor["tertiary"]}
              className="ml-auto cursor-pointer"
              onClick={modalProps.close}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            />
          </UserCard>
          <Divider variant="secondary" />
        </Fragment>
      )}
      {/* {inputProps?.control && (
        <div className="px-6 pt-6 pb-5">
          <InputField name={inputProps?.name} inputProps={inputProps} />
        </div>
      )} */}
      <div className={clsx("overflow-y-scroll", className)}>{children}</div>
      {btnProps && (
        <div
          className={clsx(
            "flex p-6 shadow-top w-full gap-x-3 mt-auto",
            btnProps.btnWrapperClass
          )}
        >
          {btnProps?.leftBtnName && (
            <Button
              btnName={btnProps?.leftBtnName}
              variant="secondary"
              fullWidth
              onClick={btnProps?.leftOnClick || modalProps?.close}
              isLoading={btnProps?.isLeftBtnLoading}
            />
          )}
          <Button
            btnName={btnProps?.rightBtnName}
            fullWidth
            onClick={btnProps?.rightOnClick}
            disabled={btnProps?.disabled}
            isLoading={btnProps?.isRightBtnLoading}
          />
        </div>
      )}
    </Modal>
  );
};
