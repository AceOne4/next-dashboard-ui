import dbConnect from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { Class, Result } from "@/models";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const limit = 10; // Set your desired number of items per page
    const numberOfPage = parseInt(page as string, 10);
    const skip = (numberOfPage - 1) * limit;

    await dbConnect();

    const studentId = searchParams.get("Sresult");
    const results = await Result.find({ student: studentId })
      .populate({
        path: "student", // Ensure this matches your Result model
        populate: {
          path: "class", // Make sure this matches the reference in the Student model
          model: "Class", // Ensure the model name is correct
        },
      })
      .limit(limit)
      .skip(skip);

    const transformedResults = results.map((teacher) => {
      const transformedResult = teacher.toObject(); // Convert Mongoose document to a plain object
      transformedResult.id = transformedResult._id; // Add 'id' field
      delete transformedResult._id; // Remove '_id' field
      return transformedResult;
    });

    const count = results.length;
    return NextResponse.json(
      {
        items: transformedResults,
        count,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
