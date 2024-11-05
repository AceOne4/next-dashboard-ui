import { convertToDayMonthYear, sortByDate } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Annocements({ announcemtnts }: { announcemtnts: TAnnouncement[] }) {
  const announcemtnt = sortByDate(announcemtnts).slice(-3);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Annocements</h1>
        <Link
          href="/list/announcements"
          className="text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-400 p-1 rounded-md mb-1"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {announcemtnt.map((ann, i) => (
          <div
            key={ann.id}
            className={`${i == 0 && "bg-lamaskyLight"} ${
              i === 1 && "bg-lamaPurpleLight"
            } ${i === 2 && "bg-lamaYellowLight"} rounded-md p-4 `}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{ann.title}</h1>
              <span className="text-gray-300 text-xs bg-white rounded-md p-1">
                {convertToDayMonthYear(ann.date)}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{ann.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Annocements;
