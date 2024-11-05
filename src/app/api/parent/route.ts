import { getAllData } from "@/lib/dataFetching";
import dbConnect from "@/lib/mongoDB";
import { Parent } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = 5; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);

    const skip = (numberOfPage - 1) * limit;
    await dbConnect();
    const Parents = await getAllData(Parent, limit, skip, ["students"]);

    return NextResponse.json(Parents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Parents" },
      { status: 500 }
    );
  }
}
