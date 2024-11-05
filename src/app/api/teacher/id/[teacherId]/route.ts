import dbConnect from "@/lib/mongoDB";
import { Teacher } from "@/models";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    teacherId: string;
  };
}
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { teacherId } = params;

    await dbConnect();
    const teacher = await Teacher.findById(teacherId)
      .populate({
        path: "lessons", // Ensure this matches your Result model
        populate: {
          path: "subject",
          model: "Subject",
        },
      })
      .populate({
        path: "classes", // Ensure this matches your Result model
        populate: {
          path: "students",
          model: "Student",
        },
      });
    const teacherResponse = {
      id: teacher._id.toString(), // Create a new id field
      ...teacher.toObject(), // Convert Mongoose document to plain object
    };

    return NextResponse.json(teacherResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch The teacher" },
      { status: 500 }
    );
  }
}
