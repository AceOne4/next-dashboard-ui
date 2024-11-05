import dbConnect from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { Class, Student } from "@/models";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = 10; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);
    const skip = (numberOfPage - 1) * limit;

    await dbConnect();

    const teacherId = searchParams.get("Tstudnet");
    // Find classes the teacher is assigned to
    const classes = await Class.find({ teachers: teacherId });
    const classIds = classes.map((cls) => cls._id);

    // Find students in those classes
    const students = await Student.find({ class: { $in: classIds } })
      .populate("class")
      .limit(limit)
      .skip(skip);

    const transformedStudents = students.map((teacher) => {
      const transformedStudent = teacher.toObject(); // Convert Mongoose document to a plain object
      transformedStudent.id = transformedStudent._id; // Add 'id' field
      delete transformedStudent._id; // Remove '_id' field
      return transformedStudent;
    });

    const count = students.length;
    return NextResponse.json(
      {
        items: transformedStudents,
        count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
