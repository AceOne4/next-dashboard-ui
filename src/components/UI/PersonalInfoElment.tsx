import Image from "next/image";
import React from "react";

export default function PersonalInfoElment({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
      <Image src={image} alt="" width={14} height={14} />
      <span>{title}</span>
    </div>
  );
}
