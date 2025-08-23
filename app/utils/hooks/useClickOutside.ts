import { useEffect, useRef, useState } from "react";

export const useClickOutside = (initialValue: boolean | string) => {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef<HTMLDivElement | null | any>(null);

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsActive(typeof initialValue === "string" ? "" : false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isActive, setIsActive };
};
