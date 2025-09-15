// app/api/articles/[id]/views/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Incrementing view count for article:", params.id);
    
    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      console.error("Invalid ObjectId format:", params.id);
      return NextResponse.json({ error: "Invalid article ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kmaris");
    
    // Increment view count
    const updateResult = await db.collection("articles").updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $inc: { views: 1 },
        $set: { updatedAt: new Date() }
      }
    );

    if (updateResult.matchedCount === 0) {
      console.error("Article not found for view increment, ID:", params.id);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Get updated view count
    const article = await db.collection("articles").findOne(
      { _id: new ObjectId(params.id) },
      { projection: { views: 1 } }
    );

    console.log("View count incremented successfully");
    return NextResponse.json({ 
      views: article?.views || 0,
      message: "View count incremented successfully" 
    });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}