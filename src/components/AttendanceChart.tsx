"use client";
import Image from "next/image";
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
import CardHeader from "./UI/CardHeader";
import { getISOWeekNumber } from "@/lib/fetchDataAdminPage";

const data = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 90,
    absent: 75,
  },
  {
    name: "Fri",
    present: 65,
    absent: 55,
  },
];

type Tdata = {
  weeklyData: {
    week: string;
    days: {
      name: string;
      present: number;
      absent: number;
    }[];
  }[];
};

function AttendanceChart({ weeklyData }: Tdata) {
  const thisWeek = `Week ${getISOWeekNumber(new Date())}`;
  const [filterweeks] = weeklyData.filter((el) => el.week === thisWeek);

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <CardHeader name="Attendance" />
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={filterweeks ? filterweeks.days : data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <Tooltip />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "40px", paddingTop: "20px" }}
            />
            <Bar
              dataKey="present"
              fill="#FAE27C"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="absent"
              fill="#C3EBFA"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AttendanceChart;
