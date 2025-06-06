import { useSearchParams } from "next/navigation";
import { getLocalItem } from "../localstorage";
import { localStorageKeys } from "../enum";

export default function useSharedVariables() {
  const searchParams = useSearchParams();
  const deviceId =
    getLocalItem<string>(localStorageKeys.REGISTERED_DEVICE_ID) || "";
  const queryParams = Object.fromEntries(searchParams.entries());

  return {
    queryParams,
    deviceId,
  };
}
