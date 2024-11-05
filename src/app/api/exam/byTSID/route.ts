import dbConnect from "@/lib/mongoDB";
import { Exam, Lesson, Student } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let exams;

    const page = searchParams.get("page");
    const limit = 10; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);
    const skip = (numberOfPage - 1) * limit;

    await dbConnect();

    if (Array.from(searchParams.keys()).includes("Texam")) {
      const teacherId = searchParams.get("Texam");
      const lessons = await Lesson.find({ teacher: teacherId });
      const lessonIds = lessons.map((lesson) => lesson._id);

      // Find exams related to those lessons
      exams = await Exam.find({ lesson: { $in: lessonIds } })
        .populate("lesson")
        .limit(limit)
        .skip(skip);
    } else {
      const studentId = searchParams.get("Sexam");
      // Find the student's class
      const student = await Student.findById(studentId).populate("class");

      // Fetch lessons for the student's class
      const lessons = await Lesson.find({ class: student.class._id });

      // Fetch exams related to those lessons
      exams = await Exam.find({
        lesson: { $in: lessons.map((lesson) => lesson._id) },
      })
        .populate("lesson")
        .limit(limit)
        .skip(skip);
    }
    const transformedExams = exams.map((teacher) => {
      const transformedExam = teacher.toObject(); // Convert Mongoose document to a plain object
      transformedExam.id = transformedExam._id; // Add 'id' field
      delete transformedExam._id; // Remove '_id' field
      return transformedExam;
    });

    const count = exams.length;
    return NextResponse.json(
      {
        items: transformedExams,
        count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Exams" },
      { status: 500 }
    );
  }
}
