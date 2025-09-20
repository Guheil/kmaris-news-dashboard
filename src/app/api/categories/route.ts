import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

// GET - Fetch all categories
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

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { categoryName } = body;

    // Validate input
    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim().length < 2) {
      return NextResponse.json(
        { error: "Category name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    const db = client.db("kmaris");

    // Check if category already exists (case-insensitive)
    const existingCategory = await db
      .collection("categories")
      .findOne({ categoryName: { $regex: new RegExp(`^${categoryName.trim()}$`, 'i') } });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 }
      );
    }

    // Create new category
    const newCategory = {
      categoryName: categoryName.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("categories").insertOne(newCategory);

    const createdCategory = {
      _id: result.insertedId.toString(),
      categoryName: newCategory.categoryName
    };

    return NextResponse.json(createdCategory, { status: 201 });
  } catch (error) {
    console.error("API /api/categories POST error:", error);
    
    // Handle MongoDB duplicate key error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "Error creating category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// PUT - Update existing category
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { _id, categoryName } = body;

    // Validate input
    if (!_id || !ObjectId.isValid(_id)) {
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
      .findOne({ _id: new ObjectId(_id) });

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
        _id: { $ne: new ObjectId(_id) }
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
        { _id: new ObjectId(_id) },
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
      _id: _id,
      categoryName: categoryName.trim()
    };

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("API /api/categories PUT error:", error);
    
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

// DELETE - Delete category
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const categoryId = url.searchParams.get('id');

    // Validate input
    if (!categoryId || !ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { error: "Valid category ID is required" },
        { status: 400 }
      );
    }

    const db = client.db("kmaris");

    // Check if category exists
    const existingCategory = await db
      .collection("categories")
      .findOne({ _id: new ObjectId(categoryId) });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Optional: Check if category is being used by any articles
    const articlesUsingCategory = await db
      .collection("articles") // Adjust collection name as needed
      .countDocuments({ category: categoryId });

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
      .deleteOne({ _id: new ObjectId(categoryId) });

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
    console.error("API /api/categories DELETE error:", error);
    return NextResponse.json(
      {
        error: "Error deleting category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}