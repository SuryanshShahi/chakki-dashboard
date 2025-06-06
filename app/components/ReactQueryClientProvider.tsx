"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { GlobalContext } from "../contexts";

const queryClient = new QueryClient();
const ReactQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: any }>({});

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
