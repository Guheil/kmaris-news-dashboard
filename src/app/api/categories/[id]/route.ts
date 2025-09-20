import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

// PUT - Update specific category by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { categoryName } = body;

    // Validate input
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Valid category ID is required" },
        { status: 400 }
      );
    }

    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim().length < 2) {
      return NextResponse.json(
        { error: "Category name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    const db = client.db("kmaris");

    // Check if category exists
    const existingCategory = await db
      .collection("categories")
      .findOne({ _id: new ObjectId(id) });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if another category with the same name exists (case-insensitive, excluding current category)
    const duplicateCategory = await db
      .collection("categories")
      .findOne({ 
        categoryName: { $regex: new RegExp(`^${categoryName.trim()}$`, 'i') },
        _id: { $ne: new ObjectId(id) }
      });

    if (duplicateCategory) {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 }
      );
    }

    // Update category
    const result = await db
      .collection("categories")
      .updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            categoryName: categoryName.trim(),
            updatedAt: new Date()
          } 
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const updatedCategory = {
      _id: id,
      categoryName: categoryName.trim()
    };

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("API /api/categories/[id] PUT error:", error);
    
    // Handle MongoDB duplicate key error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "Error updating category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete specific category by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const { id } = params;

    // Validate input
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Valid category ID is required" },
        { status: 400 }
      );
    }

    const db = client.db("kmaris");

    // Check if category exists
    const existingCategory = await db
      .collection("categories")
      .findOne({ _id: new ObjectId(id) });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Optional: Check if category is being used by any articles
    const articlesUsingCategory = await db
      .collection("articles") // Adjust collection name as needed
      .countDocuments({ category: id });

    if (articlesUsingCategory > 0) {
      return NextResponse.json(
        { 
          error: "Cannot delete category", 
          message: `This category is being used by ${articlesUsingCategory} article(s). Please reassign those articles to another category first.` 
        },
        { status: 409 }
      );
    }

    // Delete category
    const result = await db
      .collection("categories")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/categories/[id] DELETE error:", error);
    return NextResponse.json(
      {
        error: "Error deleting category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}