"use client";
import Footer from "@/app/components/footer";
import Header, { IBreadCrumbs } from "@/app/components/header";
import useScrollHeight from "@/app/utils/hooks/useScrollHeight";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface IPageWraps {
  wrapperClass?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  breadCrumbs?: IBreadCrumbs[];
}

const PageWrapper: FC<PropsWithChildren<IPageWraps>> = ({
  children,
  wrapperClass,
  hideHeader,
  hideFooter,
  breadCrumbs,
}) => {
  const scroll = useScrollHeight();

  return (
    <main className="h-full">
      {!hideHeader && <Header breadCrumbs={breadCrumbs} />}
      <ToastContainer stacked />
      <div
        ref={scroll?.ref}
        className={clsx(
          "animate-bottom overflow-scroll relative h-full max-[1024px]:p-5 pb-5",
          hideHeader
            ? "max-h-[calc(100vh-32px)]"
            : "lg:max-h-[calc(100vh-93px)] max-h-[calc(100vh-64px)]",
          wrapperClass
        )}
      >
        {children}
      </div>
      {!hideFooter && <Footer />}
    </main>
  );
};

export default PageWrapper;
