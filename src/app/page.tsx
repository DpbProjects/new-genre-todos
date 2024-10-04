"use client";

import { useState, useEffect } from "react";

import { uuid } from "uuidv4";

import TodoForm from "@/components/TodoForm";
import TodoSummary from "@/components/TodoSummary";
import TodoList from "@/components/TodoList";

import type { Todo } from "@/lib/types";

export default function Home() {
  const [todoContent, setTodoContent] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Check if the component is mounted on the client
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }
  }, []);

  // Save todos to localStorage when the todos state changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isClient]);

  const addTodo = () => {
    if (todoContent.trim() === "") return;

    const newTodo: Todo = {
      id: uuid(),
      content: todoContent,
      isComplete: false,
    };

    setTodos([...todos, newTodo]);
    setTodoContent("");
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completedTodosCount = todos.filter(
    (todo) => todo.isComplete === true,
  ).length;

  // Only render once the component is on the client side
  if (!isClient) return null;

  return (
    <div className="container mx-auto max-w-[736px] relative">
      <div className=" absolute top-[-1.6rem] w-full">
        <TodoForm
          todoContent={todoContent}
          setTodoContent={setTodoContent}
          addTodo={addTodo}
        />
        <TodoSummary todos={todos} completedTodosCount={completedTodosCount} />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
