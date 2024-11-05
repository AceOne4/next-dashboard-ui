import dbConnect from "@/lib/mongoDB";
import { Assignment, Lesson, Student } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let assignments;

    const page = searchParams.get("page");
    const limit = 10; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);
    const skip = (numberOfPage - 1) * limit;

    await dbConnect();

    if (Array.from(searchParams.keys()).includes("Tassignment")) {
      const teacherId = searchParams.get("Tassignment");
      // Find all lessons for this teacher
      const lessons = await Lesson.find({ teacher: teacherId });
      const lessonIds = lessons.map((lesson) => lesson._id);

      // Find assignments related to those lessons
      assignments = await Assignment.find({ lesson: { $in: lessonIds } })
        .populate("lesson")
        .limit(limit)
        .skip(skip);
    } else {
      const studentId = searchParams.get("Sassignment");
      // Find the student's class
      const student = await Student.findById(studentId).populate("class");

      // Fetch lessons for the student's class
      const lessons = await Lesson.find({ class: student.class._id });

      // Fetch assignments related to those lessons
      assignments = await Assignment.find({
        lesson: { $in: lessons.map((lesson) => lesson._id) },
      })
        .populate("lesson")
        .limit(limit)
        .skip(skip);
    }
    const transformedAssignments = assignments.map((teacher) => {
      const transformedAssignment = teacher.toObject(); // Convert Mongoose document to a plain object
      transformedAssignment.id = transformedAssignment._id; // Add 'id' field
      delete transformedAssignment._id; // Remove '_id' field
      return transformedAssignment;
    });

    const count = assignments.length;
    return NextResponse.json(
      {
        items: transformedAssignments,
        count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}
