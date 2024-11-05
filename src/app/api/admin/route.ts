import { getAllData } from "@/lib/dataFetching";
import dbConnect from "@/lib/mongoDB";
import { Admin } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const results = await getAllData(Admin);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
