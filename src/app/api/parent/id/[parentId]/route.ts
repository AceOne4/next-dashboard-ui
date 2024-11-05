import dbConnect from "@/lib/mongoDB";
import { Parent } from "@/models";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    parentId: string;
  };
}
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { parentId } = params;

    await dbConnect();

    const parent = await Parent.findById(parentId).populate({
      path: "students",
      populate: {
        path: "class", // Ensure this matches your Result model
        model: "Class",
        populate: {
          path: "lessons",
          model: "Lesson",
          populate: {
            path: "subject",
            model: "Subject",
          },
        },
      },
    });

    return NextResponse.json(parent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch The teacher" },
      { status: 500 }
    );
  }
}
