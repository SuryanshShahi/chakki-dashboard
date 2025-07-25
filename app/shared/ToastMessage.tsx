import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { toast, ToastContentProps } from "react-toastify";
import { colors } from "../utils/colors";

const getIconByTypeForNewToast = (type: "success" | "error" | "warning") => {
  const ICON_TO_COMP = {
    success: FiCheckCircle,
    error: IoClose,
    warning: FiInfo,
  };
  const Icon = ICON_TO_COMP[type];
  const color = colors[type];
  return (
    <div
      className={`h-[34px] aspect-square bg-gradient-to-b rounded-full flex justify-center items-center`}
      style={{
        background: `linear-gradient(to bottom,${color[800]},${color[800]}20 )`,
      }}
    >
      <div
        className={`h-8 aspect-square bg-gradient-to-b rounded-full flex justify-center items-center`}
        style={{
          background: `linear-gradient(to bottom,${color[950]},${color[950]}10 )`,
        }}
      >
        <Icon
          size={24}
          className={`text-white`}
          style={{
            background: color[600],
            borderRadius: "50%",
            padding: "4px",
          }}
        />
      </div>
    </div>
  );
};
const ToastMessage = ({
  data: { title, subtitle, hideIcon = false, type },
  closeToast,
}: ToastContentProps<{
  title: string;
  subtitle?: string;
  hideIcon?: boolean;
  type?: "success" | "error" | "warning";
}>) => {
  return (
    <div className="flex items-center !w-[clamp(330px,88vw,460px)] gap-x-3">
      {!hideIcon && getIconByTypeForNewToast(type ?? "warning")}
      <div className="text-white gap-y-1">
        <div className="font-semibold">{title}</div>
        <div className="text-xs">{subtitle}</div>
      </div>
      <IoMdClose
        size={24}
        onClick={closeToast}
        className="text-white min-w-6 cursor-pointer fill-gray-dark-500 ml-auto"
      />
    </div>
  );
};
export const showToast = ({
  type,
  title,
  subtitle,
  hideIcon,
  autoClose,
  isLoading = false,
}: {
  type: "success" | "error" | "warning";
  title: string;
  subtitle?: string;
  hideIcon?: boolean;
  autoClose?: number;
  isLoading?: boolean;
}) => {
  toast(ToastMessage, {
    data: {
      type,
      title,
      subtitle,
      hideIcon,
      isLoading,
    },
    autoClose,
    className: "!bg-[#13161B] !w-[clamp(350px,90vw,480px)] !h-[40px]",
    closeButton: false,
    hideProgressBar: true,
    position: "top-center",
    isLoading,
  });
};
