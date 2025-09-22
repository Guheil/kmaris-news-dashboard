import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    console.log("Increment views API hit"); // Debug log

    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const db = client.db("kmaris");
    const { id } = await context.params; // Await the Promise to get { id: string }

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    console.log("Incrementing views for ID:", id); // Debug log

    // Increment views by 1
    const result = await db
      .collection("articles")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { views: 1 } },
        { returnDocument: 'after' }
      );

    // Check if result or result.value is null/undefined
    if (!result || !result.value) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Convert ObjectId to string for response
    const updatedArticle = {
      ...result.value,
      _id: result.value._id.toString(),
      status: result.value.status || 'published'
    };

    console.log("Views incremented, new count:", updatedArticle.views); // Debug log
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error("API /api/articles/[id]/increment-views POST error:", error);
    return NextResponse.json(
      {
        error: "Error incrementing article views",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}