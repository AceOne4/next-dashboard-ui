import Image from "next/image";
import React from "react";

function ProfessionalInfoElment({
  image,
  score,
  name,
}: {
  image: string;
  score: string;
  name: string;
}) {
  return (
    <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[45%] xl:w-[43%] 2xl:w-[45%]">
      <Image src={image} alt="" width={24} height={24} className="w-6 h-6" />
      <div>
        <h1 className="text-xl font-semibold">{score}</h1>
        <span className="text-sm text-gray-400">{name}</span>
      </div>
    </div>
  );
}

export default ProfessionalInfoElment;
