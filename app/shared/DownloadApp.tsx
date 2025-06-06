"use client";
import Img from "@/app/shared/Img";
import { colors } from "@/app/utils/colors";
import { localStorageKeys } from "@/app/utils/enum";
import { getLocalItem, setLocalItem } from "@/app/utils/localstorage";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import Text from "./Text";
import { SvgCross } from "../utils/svgs";

const DownloadApp = () => {
  const [isShown, setIShown] = useState(false);
  const data = getLocalItem(localStorageKeys.DOWNLOAD_APP);
  useEffect(() => {
    setIShown(Boolean(data));
  }, [data]);
  return (
    <div
      className={clsx(
        "bg-tertiary relative space-y-4 mx-2 rounded-lg max-w-[300px] animate-bottom",
        isShown ? "p-2" : "p-5"
      )}
    >
      {!isShown && (
        <>
          <div className="space-y-1">
            <div className="text-sm font-semibold">Download the App Now!</div>
            <Text size="xs" variant="tertiary">
              Enjoy Exclusive features, live notifications and a seamless
              workplace experience!
            </Text>
          </div>
          <SvgCross
            height={20}
            width={20}
            stroke={colors.gray["400"]}
            className="absolute right-5 top-0 cursor-pointer"
            onClick={() => {
              setIShown(true);
              setLocalItem(localStorageKeys.DOWNLOAD_APP, true);
            }}
          />
        </>
      )}
      <div className="sm:grid grid-cols-2 flex gap-x-3">
        <Link
          href="https://play.google.com/store/apps/details?id=world.aeria.employee&pcampaignid=web_share"
          target="_blank"
        >
          <Img
            src="/images/playStore.png"
            height={32}
            width={110}
            alt=""
            isLocal
            className="max-w-[150px] md:max-w-full w-full h-full"
          />
        </Link>
        <Img
          src="/images/appStore.png"
          height={32}
          width={110}
          alt=""
          isLocal
          className="max-w-[150px] md:max-w-full w-full h-full"
        />
      </div>
    </div>
  );
};

export default DownloadApp;
