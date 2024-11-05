import dbConnect from "@/lib/mongoDB";
import { Student } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

interface Params {
  params: {
    studentId: string;
  };
}
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { studentId } = params;
    await dbConnect();
    const student = await Student.findById(studentId)
      .populate({
        path: "class", // Primary path to populate in your Result model
        populate: [
          {
            path: "lessons", // Populate the lessons under class
            model: "Lesson",
            populate: {
              path: "subject", // Populate the subject within each lesson
              model: "Subject",
            },
          },
          {
            path: "students", // Populate the students under class
            model: "Student",
          },
        ],
      })
      .populate("grade");

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch The teacher" },
      { status: 500 }
    );
  }
}
