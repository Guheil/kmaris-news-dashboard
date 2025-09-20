import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const db = client.db("kmaris");

    // Check if the categories collection exists
    const collections = await db.listCollections().toArray();
    const hasCategoriesCollection = collections.some(col => col.name === "categories");

    // Create the categories collection if it doesn't exist
    if (!hasCategoriesCollection) {
      await db.createCollection("categories");
      // Optionally, create an index on categoryName for uniqueness
      await db.collection("categories").createIndex({ categoryName: 1 }, { unique: true });
    }

    // Fetch all categories
    const categories = await db
      .collection("categories")
      .find({})
      .sort({ categoryName: 1 }) // Sort alphabetically by categoryName
      .toArray();

    // Convert ObjectId safely
    const safeCategories = categories.map(category => ({
      ...category,
      _id: category._id?.toString(),
      categoryName: category.categoryName || ""
    }));

    return NextResponse.json(safeCategories, { status: 200 });
  } catch (error) {
    console.error("API /api/categories GET error:", error);
    return NextResponse.json(
      {
        error: "Error fetching categories",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}