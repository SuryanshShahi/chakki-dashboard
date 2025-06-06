import Image, { ImageProps } from "next/image";
import { ReactElement } from "react";

interface IImg extends ImageProps {
  isLocal?: boolean;
}

const Img = ({
  alt,
  src,
  width,
  height,
  isLocal,
  ...props
}: IImg): ReactElement => {
  const sourcePrefix = process.env.NEXT_PUBLIC_BASE_URL;
  const source = !isLocal ? `${sourcePrefix}${src}` : src;
  if (!source) return <></>;
  return (
    <Image
      src={source || ""}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default Img;
