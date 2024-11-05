import Image from "next/image";
import React from "react";

export default function CardHeader({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h1 className="text-lg font-semibold">{name}</h1>
      <Image src="/moreDark.png" alt="more" width={20} height={20} />
    </div>
  );
}
