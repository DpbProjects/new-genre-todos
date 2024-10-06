import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { todos, InsertTodos } from "@/db/schema";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await db.select().from(todos).where(eq(todos.user_id, userId));

    return NextResponse.json(data , { status: 200 });
  } catch (error) {
    console.error("Failed to fetch todos:", error);

    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await request.json();

    // Validate content
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }

    const newTodo: InsertTodos = {
      content,
      is_complete: false,
      user_id: userId,
    };

    const result = await db.insert(todos).values(newTodo).returning();

    if (result.length === 0) {
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
      }

    return NextResponse.json(
      { message: "Todo created successfully", todo: result },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 },
    );
  }
}
