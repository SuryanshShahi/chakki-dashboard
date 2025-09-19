import clsx from "clsx";
import Chip from "../../Chip";
import { ITableHeading } from "@/app/utils/types";
import Tooltip from "../../Tooltip";

export const renderChipCell = (
  data: any,
  idx: number,
  headings: ITableHeading[]
) => {
  return (
    <div className="flex items-center gap-1">
      {Array.isArray(data) ? (
        (
          (headings?.[idx]?.maxLimit
            ? data?.slice(0, headings?.[idx]?.maxLimit)
            : data) || []
        ).map((e, index) => (
          <Chip
            {...e}
            size={e?.size || "sm"}
            key={index}
            className={clsx("rounded-full", e?.className)}
          />
        ))
      ) : data ? (
        <Chip {...data} size={data?.size || "xs"} />
      ) : (
        <div className="text-tertiary">-</div>
      )}
      {headings?.[idx]?.maxLimit &&
        data?.length > headings?.[idx]?.maxLimit && (
          <Tooltip
            title={data
              ?.slice(1)
              .map((r: { title: string }) => r?.title)
              .join(", ")}
            variant="bottom"
            styleTitle="capitalize"
          >
            <Chip
              title={`+${data?.length - (headings?.[idx]?.maxLimit || 3)}`}
              size={data?.[0]?.size || "sm"}
              className="rounded-full !px-[10px]"
              variant="blue"
            />
          </Tooltip>
        )}
    </div>
  );
};
