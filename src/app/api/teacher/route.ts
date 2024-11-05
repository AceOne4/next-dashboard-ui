import dbConnect from "@/lib/mongoDB";
import { Teacher } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = 5; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);

    const skip = (numberOfPage - 1) * limit;

    await dbConnect();

    // Populate fields inside the arrays
    const teachers = await Teacher.find()
      .populate("subjects")
      .populate("lessons")
      .populate("classes")
      .limit(limit)
      .skip(skip);

    const count = await Teacher.countDocuments();

    // Map through teachers and replace _id with id
    const transformedTeachers = teachers.map((teacher) => {
      const transformedTeacher = teacher.toObject(); // Convert Mongoose document to a plain object
      transformedTeacher.id = transformedTeacher._id; // Add 'id' field

      return transformedTeacher;
    });

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
