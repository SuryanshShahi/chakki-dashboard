import { requestOtp } from "@/app/apis/apis";
import { showToast } from "@/app/shared/ToastMessage";
import useSharedVariables from "@/app/utils/hooks/useSharedVariables";
import { getLocalItem } from "@/app/utils/localstorage";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";

const useHook = () => {
  const { registeredDeviceId } = useSharedVariables();
  const formProps = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      sendOtp({
        mode: "email",
        identifier: values.email,
        registeredDeviceId: registeredDeviceId,
        type: "admin",
      });
    },
  });
  const { mutate: sendOtp, isPending } = useMutation({
    mutationFn: requestOtp,
    onSuccess: (data) => {
      showToast({
        title: "OTP sent successfully",
        type: "success",
      });
    },
    onError: (error) => {
      showToast({
        title: "Something went wrong",
        type: "error",
      });
    },
  });
  return {
    sendOtp,
    isPending,
    ...formProps,
  };
};

export default useHook;
