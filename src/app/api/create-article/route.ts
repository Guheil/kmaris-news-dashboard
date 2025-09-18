import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const db = client.db("kmaris");
    const body = await request.json();

    // Validate required fields
    const { title, author, category, description, status, newsImage, newsVideo, videoUrl } = body;
    if (!title || !author || !category || !description || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const articleData = {
      title,
      author,
      category,
      description,
      newsImage,
      newsVideo,
      videoUrl, 
      status,
      date: new Date().toISOString(),
      views: 0,
    };

    const result = await db.collection("articles").insertOne(articleData);

    return NextResponse.json(
      { message: "Article created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/create-article POST error:", error);
    return NextResponse.json(
      { error: "Error creating article", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}