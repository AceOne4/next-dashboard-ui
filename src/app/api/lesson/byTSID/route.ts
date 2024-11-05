import { getAllData } from "@/lib/dataFetching";
import dbConnect from "@/lib/mongoDB";
import { Lesson, Student } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let lessons;

    const page = searchParams.get("page");
    const limit = 10; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);
    const skip = (numberOfPage - 1) * limit;

    await dbConnect();

    if (Array.from(searchParams.keys()).includes("Tlesson")) {
      const teacherId = searchParams.get("Tlesson");
      lessons = await Lesson.find({ teacher: teacherId })
        .populate("subject class teacher")
        .limit(limit)
        .skip(skip);
    } else {
      const studentId = searchParams.get("Slesson");
      const student = await Student.findById(studentId).populate("class");

      // Fetch lessons for the student's class
      lessons = await Lesson.find({ class: student.class._id })
        .populate("subject class teacher")
        .limit(limit)
        .skip(skip);
    }
    const transformedLesson = lessons.map((teacher) => {
      const transformedLesson = teacher.toObject(); // Convert Mongoose document to a plain object
      transformedLesson.id = transformedLesson._id; // Add 'id' field
      delete transformedLesson._id; // Remove '_id' field
      return transformedLesson;
    });

    const count = lessons.length;
    return NextResponse.json(
      {
        items: transformedLesson,
        count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
