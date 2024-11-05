"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import CardHeader from "./UI/CardHeader";

function CountChart({
  boys,
  girls,
  total,
}: {
  boys: number;
  girls: number;
  total: number;
}) {
  const data = [
    {
      name: "Total",
      count: total,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,

      fill: "#C3EBFA",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* title */}
      <CardHeader name="Student" />

      {/* chart */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="maleFemale"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* bottompart */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamasky rounded-full"></div>
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">
            Boys ({Math.ceil((boys / total) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full"></div>
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">
            Girls ({Math.ceil((girls / total) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CountChart;
