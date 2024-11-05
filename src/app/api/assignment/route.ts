import { getAllData } from "@/lib/dataFetching";
import dbConnect from "@/lib/mongoDB";
import { Assignment } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = 10; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);

    const skip = (numberOfPage - 1) * limit;
    await dbConnect();
    const assigments = await getAllData(Assignment, limit, skip, ["lesson"]);

    return NextResponse.json(assigments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch assigments" },
      { status: 500 }
    );
  }
}
