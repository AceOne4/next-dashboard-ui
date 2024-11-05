import { getAllData } from "@/lib/dataFetching";
import dbConnect from "@/lib/mongoDB";
import { Event } from "@/models";
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
    const events = await getAllData(Event, limit, skip);

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
