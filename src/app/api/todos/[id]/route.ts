import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { todos } from "@/db/schema";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract the ID from the route params and convert to a number
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  try {
    // Delete the todo where the id and user_id match
    await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.user_id, userId)));

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract id from params and ensure it's a number
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  // Extract the body payload (is_complete field)
  const { is_complete } = await request.json();

  if (typeof is_complete !== "boolean") {
    return NextResponse.json(
      { error: "Invalid 'is_complete' value" },
      { status: 400 },
    );
  }

  try {
    // Update the is_complete field based on the passed value
    await db
      .update(todos)
      .set({ is_complete: is_complete }) // No need to toggle, use the provided value
      .where(and(eq(todos.id, id), eq(todos.user_id, userId)));

    return NextResponse.json(
      { message: "Todo status updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to update todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 },
    );
  }
}
