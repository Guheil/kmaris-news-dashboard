import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// Define the Article type to match your database schema, including videoUrl
type Article = {
  _id: ObjectId;
  title: string;
  author: string;
  category: string;
  description: string;
  status: "draft" | "published" | "archived";
  newsImage?: string | null; // Base64 string or URL
  newsVideo?: string | null; // Base64 string or URL
  videoUrl?: string; // Video URL (YouTube, Vimeo, Google Drive, or direct link)
  createdAt?: Date;
  updatedAt?: Date;
  date?: string;
  views?: number;
  readTime?: string;
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params to satisfy Next.js validation
    const { id: articleId } = await context.params;
    console.log("Fetching article with ID:", articleId);

    // Validate ObjectId format
    if (!ObjectId.isValid(articleId)) {
      console.error("Invalid ObjectId format:", articleId);
      return NextResponse.json({ error: "Invalid article ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kmaris");

    const article = (await db.collection("articles").findOne({
      _id: new ObjectId(articleId),
    })) as Article | null;

    if (!article) {
      console.error("Article not found for ID:", articleId);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Convert ObjectId to string for JSON serialization
    const safeArticle = {
      ...article,
      _id: article._id.toString(),
      videoUrl: article.videoUrl || "", // Ensure videoUrl is included, default to empty string
    };

    console.log("Article found:", article.title);
    return NextResponse.json(safeArticle);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params to satisfy Next.js validation
    const { id: articleId } = await context.params;
    console.log("Updating article with ID:", articleId);

    // Validate ObjectId format
    if (!ObjectId.isValid(articleId)) {
      console.error("Invalid ObjectId format:", articleId);
      return NextResponse.json({ error: "Invalid article ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kmaris");
    const body = await request.json();

    // Validate incoming data
    const { title, author, category, description, status, newsImage, newsVideo, videoUrl } = body;
    if (!title || !author || !category || !description || !status) {
      console.error("Missing required fields in update data:", body);
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate videoUrl (optional, but must be a string if provided)
    if (videoUrl !== undefined && typeof videoUrl !== "string") {
      console.error("Invalid videoUrl format:", videoUrl);
      return NextResponse.json({ error: "Invalid video URL format" }, { status: 400 });
    }

    const updateData = {
      title,
      author,
      category,
      description,
      status,
      newsImage: newsImage || null,
      newsVideo: newsVideo || null,
      videoUrl: videoUrl || "", // Include videoUrl, default to empty string
      updatedAt: new Date(),
    };

    console.log("Update data:", updateData);

    const updateResult = await db.collection("articles").updateOne(
      { _id: new ObjectId(articleId) },
      { $set: updateData }
    );

    if (updateResult.matchedCount === 0) {
      console.error("Article not found for update, ID:", articleId);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Fetch the updated article
    const updatedArticle = (await db.collection("articles").findOne({
      _id: new ObjectId(articleId),
    })) as Article | null;

    if (!updatedArticle) {
      console.error("Failed to fetch updated article, ID:", articleId);
      return NextResponse.json({ error: "Failed to fetch updated article" }, { status: 500 });
    }

    // Convert ObjectId to string for JSON serialization
    const safeArticle = {
      ...updatedArticle,
      _id: updatedArticle._id.toString(),
      videoUrl: updatedArticle.videoUrl || "", // Ensure videoUrl is included
    };

    console.log("Article updated successfully:", updatedArticle.title);
    return NextResponse.json(safeArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params to satisfy Next.js validation
    const { id: articleId } = await context.params;
    console.log("Deleting article with ID:", articleId);

    // Validate ObjectId format
    if (!ObjectId.isValid(articleId)) {
      console.error("Invalid ObjectId format:", articleId);
      return NextResponse.json({ error: "Invalid article ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kmaris");

    const deleteResult = await db.collection("articles").deleteOne({
      _id: new ObjectId(articleId),
    });

    if (deleteResult.deletedCount === 0) {
      console.error("Article not found for deletion, ID:", articleId);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    console.log("Article deleted successfully");
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}