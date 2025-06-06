import { createContext, Dispatch, SetStateAction } from "react";
interface IGlobalContext {
  [key: string]: any;
}

export const GlobalContext = createContext<{
  data: IGlobalContext;
  setData: Dispatch<SetStateAction<IGlobalContext>>;
}>({
  data: {},
  setData: () => {},
});
