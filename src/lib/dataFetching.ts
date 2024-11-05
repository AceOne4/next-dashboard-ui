import { Model } from "mongoose";
import { PopulateOptions } from "mongoose";
type WithId<T> = Omit<T, "_id"> & { id: string };

export async function getAllData<T extends Document>(
  model: Model<T>,
  limit?: number, // Optional limit parameter
  skip?: number, // Optional skip parameter
  populateFields: Array<string | PopulateOptions> = []
) {
  try {
    // Build the query and populate the required fields
    let query = model.find();

    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        if (typeof field === "string") {
          query = query.populate(field);
        } else {
          query = query.populate(field);
        }
      });
    }
    // Apply limit if provided
    if (limit) {
      query = query.limit(limit);
    }

    // Apply skip if provided
    if (skip) {
      query = query.skip(skip);
    }

    const count = await model.countDocuments();
    // Fetch and transform the data
    const data = await query.exec();
    const transformedData = data.map((doc) => {
      const transformedDoc = doc.toObject(); // Convert Mongoose document to a plain object
      return {
        ...transformedDoc,
        id: transformedDoc._id.toString(),
      } as WithId<T>;
    });

    return { items: transformedData, count };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
