import Image from "next/image";
import React from "react";

function UserCard({ type, number }: { type: string; number: number }) {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-2 flex-1 min-w-[130px] max-w-[190px] ">
      <div className=" flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          25/2024
        </span>
        <Image src="/more.png" alt="getmore" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{number}</h1>
      <h2 className="text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
}

export default UserCard;
