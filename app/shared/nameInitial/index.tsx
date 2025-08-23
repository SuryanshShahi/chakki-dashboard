import { getInitials } from "@/app/utils/constants";

function NameInitial({ name, type }: { name: string; type: string }) {
  switch (type) {
    case "profile": {
      return (
        <span className="flex items-center text-[#667085] text-6xl leading-[75px] font-semibold justify-center p-2 h-full w-full bg-utility-gray-100 rounded-full">
          {getInitials(name)}
        </span>
      );
    }
    case "profile_upload": {
      return (
        <span className="flex items-center text-xl font-semibold justify-center p-2 h-full w-full bg-utility-gray-100 rounded-full">
          {getInitials(name)}
        </span>
      );
    }
    default: {
      return (
        <span className="flex items-center font-satoshi font-semibold justify-center p-2 h-7 w-7 bg-white-101 rounded-full">
          {getInitials(name)}
        </span>
      );
    }
  }
}

export default NameInitial;
