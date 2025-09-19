import { ITableHeading } from "@/app/utils/types";
import clsx from "clsx";
import Chip from "../../Chip";
import Tags, { ITags } from "../../Tags";
import Tooltip from "../../Tooltip";

export const renderTagsCell = (
  data: any,
  idx: number,
  headings: ITableHeading[]
) => {
  return data?.length ? (
    <div className="flex items-center gap-x-1">
      {data
        ?.slice(0, headings?.[idx]?.maxLimit || 3)
        ?.map((tag: ITags) => (
          <Tags
            {...tag}
            size={tag?.size || "sm"}
            className={clsx("rounded-full", tag?.className)}
            key={tag?.title}
          />
        ))}
      {data?.length > (headings?.[idx]?.maxLimit || 3) && (
        <Tooltip
          title={data
            ?.slice(1)
            .map((r: { title: string }) => r?.title)
            .join(", ")}
          variant="bottom"
          className="!z-0"
        >
          <Chip
            title={`+${data?.length - (headings?.[idx]?.maxLimit || 3)}`}
            size={data?.[0]?.size || "xs"}
            className={clsx(
              "rounded-full",
              data?.[0]?.size !== "xs" && "!px-3 !py-1"
            )}
            variant="blue"
          />
        </Tooltip>
      )}
    </div>
  ) : (
    <div className="text-tertiary">-</div>
  );
};
