export const renderProgressCell = (data: any) => {
  return (
    <div className="flex gap-x-3 items-center">
      <div className="bg-gray-50 h-2 w-full rounded-full">
        <div
          className="bg-brand-solid h-full rounded-full"
          style={{ width: data + "%" }}
        />
      </div>
      <div className="text-secondary text-sm">{data}%</div>
    </div>
  );
};
