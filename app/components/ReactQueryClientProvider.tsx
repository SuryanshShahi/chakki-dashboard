"use client";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { registerDevice } from "../apis/apis";
import { GlobalContext } from "../contexts";
import { localStorageKeys } from "../utils/enum";
import { getLocalItem, setLocalItem } from "../utils/localstorage";

const queryClient = new QueryClient();
const ReactQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const register = async () => {
    const id = getLocalItem(localStorageKeys.REGISTERED_DEVICE_ID);
    if (!id) {
      const deviceId = (await (await FingerprintJS.load()).get()).visitorId;
      setLocalItem(localStorageKeys.DEVICE_ID, deviceId);
      const res = await registerDevice({
        identifier: deviceId,
      });
      setLocalItem(localStorageKeys.REGISTERED_DEVICE_ID, res?.id);
      setData((p) => ({ ...p, deviceId: res?.id }));
    } else {
      setData((p) => ({ ...p, deviceId: id as string }));
    }
  };
  useEffect(() => {
    register();
  }, []);
  const contextValue = useMemo(() => ({ data, setData }), [data, setData]);
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
