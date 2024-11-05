"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page G",

    P: 9,
  },
];

function BarCharts() {
  return (
    <div className=" rotate-90 max-h-20 flex justify-center items-center ">
      <BarChart
        width={400}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <Bar
          dataKey="P"
          fill="#C3EBFA"
          background={{ fill: "#FAE27C" }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  );
}

export default BarCharts;
