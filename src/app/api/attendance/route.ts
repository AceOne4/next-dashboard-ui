import { getAllData } from "@/lib/dataFetching";
import dbConnect from "@/lib/mongoDB";
import { Attendance } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let limit;
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    limit = 10; // Set your desired number of items per page
    if (!page) limit = 1000;
    const numberOfPage = parseInt(page as string, 10);

    const skip = (numberOfPage - 1) * limit;
    await dbConnect();
    const attendances = await getAllData(Attendance, limit, skip, ["student"]);

    return NextResponse.json(attendances, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attendances" },
      { status: 500 }
    );
  }
}
