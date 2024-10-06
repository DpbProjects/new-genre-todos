"use client";

import { useTodos } from "@/lib/hooks/useTodos";

import TodoForm from "@/components/TodoForm";
import TodoSummary from "@/components/TodoSummary";
import TodoList from "@/components/TodoList";
import Spinner from "./icons/Spinner";

const TodoContainer = () => {
  const { todos, isLoading, mutate } = useTodos();

  const addTodo = async (newTodoContent: string) => {
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ content: newTodoContent }),
      headers: { "Content-Type": "application/json" },
    });

    mutate();
  };

  const toggleComplete = async (id: string, isComplete: boolean) => {
    const previousTodos = todos; // Capture the previous state
    try {
      // Optimistically update the todos in the local cache
      mutate(
        (todos) =>
          todos
            ?.map((todo) =>
              todo?.id.toString() === id
                ? { ...todo, is_complete: !todo.is_complete }
                : todo,
            )
            .sort((a, b) => {
              return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              );
            }),
        false,
      );

      // Send PATCH request to the API to update the todo's completion status
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_complete: !isComplete }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle todo completion");
      }

      // Optionally, revalidate the data
      mutate();
    } catch (error) {
      console.error("Error toggling todo completion:", error);

      // Revert to previous state on error
      mutate(previousTodos, false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      // Optimistically update the local cache by removing the todo
      mutate(
        (todos) => todos?.filter((todo) => todo?.id.toString() !== id),
        false, // Disable revalidation
      );

      // Send DELETE request to the API to delete the todo
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // Optionally, revalidate the data by calling mutate() again
      mutate();
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Revert the optimistic update in case of an error
      mutate();
    }
  };

  const completedTodosCount = todos?.filter(
    (todo) => todo.is_complete === true,
  ).length;

  return (
    <div className="relative flex justify-center items-center md:mx-auto max-w-[736px] w-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="absolute top-[-1.6rem] sm:w-full">
          <TodoForm addTodo={addTodo} />

          <TodoSummary
            todos={todos}
            completedTodosCount={completedTodosCount && completedTodosCount}
          />
          <TodoList
            todos={todos?.sort((a, b) => {
              // Convert created_at to a number (timestamp) for comparison
              return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              );
            })}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        </div>
      )}
    </div>
  );
};

export default TodoContainer;
