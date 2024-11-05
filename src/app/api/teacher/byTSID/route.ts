import dbConnect from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { Student, Teacher } from "@/models";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = 10; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);
    const skip = (numberOfPage - 1) * limit;

    await dbConnect();

    const studentId = searchParams.get("Steacher");

    // Find the student and their class
    const student = await Student.findById(studentId).populate("class");

    // Find the teachers of the student's class
    const teachers = await Teacher.find({ classes: student.class._id })
      .limit(limit)
      .skip(skip);

    const transformedTeachers = teachers.map((teacher) => {
      const transformedTeacher = teacher.toObject(); // Convert Mongoose document to a plain object
      transformedTeacher.id = transformedTeacher._id; // Add 'id' field
      return transformedTeacher;
    });

    const count = teachers.length;
    return NextResponse.json(
      {
        items: transformedTeachers,
        count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}
