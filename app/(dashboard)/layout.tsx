"use client";
import SideBar from "@/app/components/sideBar";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { GlobalContext } from "../contexts";
import Heading from "../shared/Heading";
import Img from "../shared/Img";
import useWindowDimensions from "../utils/hooks/useWindowDimension";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: { scrollHeight },
  } = useContext(GlobalContext);

  return (
    <div className={clsx("bg-tertiary lg:px-8 h-screen")}>
      <div className="flex max-w-[1440px] mx-auto h-full">
        <SideBar
          className={clsx(
            Number(width) <= 1024 &&
              `fixed lg:static top-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } max-w-full !rounded-none`
          )}
          close={() => setIsOpen(false)}
        />
        <div
          className={clsx(
            "overflow-hidden w-full 2xl:pl-12 lg:pl-10 lg:pt-10",
            pathname === "/home" && "max-[768px]:pt-0"
          )}
        >
          <div
            className={clsx(
              "w-full top-0 px-4 h-16 flex lg:hidden items-center relative z-10",
              scrollHeight > 100 && "active bg-white shadow-bottom",
              pathname !== "/home" && "shadow-bottom bg-white"
            )}
            id="navbar"
          >
            <Link href="/home" className="flex items-center gap-x-2">
              <Img
                height={50}
                width={50}
                alt=""
                src="/images/appStore.png"
                className="h-8 w-12"
                isLocal
              />
              {scrollHeight > 100 && (
                <Heading type="semibold" className="text-xl" variant="primary">
                  ChakkiWaala
                </Heading>
              )}
            </Link>
            <HiOutlineMenuAlt1
              size={24}
              className={clsx(
                "cursor-pointer ml-auto",
                pathname === "/home" && scrollHeight < 100 && "text-white"
              )}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
