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
      { _id: new ObjectId(id) },
      { $set: { status: "archived" } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Article already archived or no changes made" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Article archived successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/articles/[id]/archive POST error:", error);
    return NextResponse.json(
      {
        error: "Error archiving article",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}