import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // Await the params Promise
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const db = client.db("kmaris");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const result = await db.collection("articles").updateOne(
      { _id: new ObjectId(id), status: "archived" },
      { $set: { status: "published" } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Archived article not found" },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Article is not archived or no changes made" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Article restored successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/articles/[id]/restore POST error:", error);
    return NextResponse.json(
      {
        error: "Error restoring article",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}