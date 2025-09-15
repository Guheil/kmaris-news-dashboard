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

    const collections = await db.listCollections().toArray();
    const hasArticlesCollection = collections.some(col => col.name === "articles");

    if (!hasArticlesCollection) {
      await db.createCollection("articles");
      await db.collection("articles").createIndex({ title: 1 }, { unique: true });
    }

    const articles = await db
      .collection("articles")
      .find({ status: { $ne: "archived" } })
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectId safely
    const safeArticles = articles.map(a => ({
      ...a,
      _id: a._id?.toString(),
    }));

    return NextResponse.json(safeArticles, { status: 200 });
  } catch (error) {
    console.error("API /api/articles GET error:", error);

    // Always return JSON, never fall back to HTML
    return NextResponse.json(
      {
        error: "Error fetching articles",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}