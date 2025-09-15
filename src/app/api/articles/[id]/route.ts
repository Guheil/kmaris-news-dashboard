// app/api/articles/[id]/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// Define the Article type to match your database schema
type Article = {
  _id: ObjectId;
  title: string;
  author: string;
  category: string;
  description: string;
  content: string;
  status: "draft" | "published" | "archived";
  newsImage?: string | null;
  newsVideo?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  date?: string;
  views?: number;
  readTime?: string;
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Fetching article with ID:", params.id);
    
    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      console.error("Invalid ObjectId format:", params.id);
      return NextResponse.json({ error: "Invalid article ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kmaris");
    
    const article = await db.collection("articles").findOne({ 
      _id: new ObjectId(params.id) 
    }) as Article | null;
    
    if (!article) {
      console.error("Article not found for ID:", params.id);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Convert ObjectId to string for JSON serialization
    const safeArticle = {
      ...article,
      _id: article._id.toString(),
    };

    console.log("Article found:", article.title);
    return NextResponse.json(safeArticle);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Updating article with ID:", params.id);
    
    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      console.error("Invalid ObjectId format:", params.id);
      return NextResponse.json({ error: "Invalid article ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kmaris");
    const body = await request.json();

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    console.log("Update data:", updateData);

    // Use updateOne instead of findOneAndUpdate for better compatibility
    const updateResult = await db.collection("articles").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );

    if (updateResult.matchedCount === 0) {
      console.error("Article not found for update, ID:", params.id);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Fetch the updated article
    const updatedArticle = await db.collection("articles").findOne({
      _id: new ObjectId(params.id)
    }) as Article | null;

    if (!updatedArticle) {
      return NextResponse.json({ error: "Failed to fetch updated article" }, { status: 500 });
    }

    // Convert ObjectId to string for JSON serialization
    const safeArticle = {
      ...updatedArticle,
      _id: updatedArticle._id.toString(),
    };

    console.log("Article updated successfully:", updatedArticle.title);
    return NextResponse.json(safeArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}

// Optional: Add DELETE method if needed
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Deleting article with ID:", params.id);
    
    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      console.error("Invalid ObjectId format:", params.id);
      return NextResponse.json({ error: "Invalid article ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kmaris");
    
    const deleteResult = await db.collection("articles").deleteOne({
      _id: new ObjectId(params.id)
    });

    if (deleteResult.deletedCount === 0) {
      console.error("Article not found for deletion, ID:", params.id);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    console.log("Article deleted successfully");
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}