import dbConnect from "@/lib/mongoDB";
import { Student } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userEmail = new URL(req.url).searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    const existingUser = await Student.findOne({
      email: userEmail.toLowerCase(),
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}