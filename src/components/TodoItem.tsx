import { useFade } from "@/lib/hooks/useFade";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import type { Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string, isComplete: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoItem = ({ todo, toggleComplete, deleteTodo }: TodoItemProps) => {
  const { isVisible, fadeOut } = useFade();

  // convert todo id to string
  const todoId = todo.id.toString();

  return (
    <div
      className={`flex border bg-base-gray-500 border-base-gray-400 items-center justify-between p-4 mb-3 rounded transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center self-start mr-3 min-h-6">
        <Checkbox
          className="rounded-full border-product-blue hover:border-product-blue-dark hover:bg-product-blue-dark/15 data-[state=checked]:border-none data-[state=checked]:hover:border-none  data-[state=checked]:bg-product-purple-dark data-[state=checked]:hover:bg-product-purple data-[state=checked]:text-base-gray-100"
          checked={todo.is_complete}
          onClick={() => toggleComplete(todoId, todo.is_complete)}
        />
      </div>

      <span
        className={`flex-grow ${
          todo.is_complete
            ? "line-through text-base-gray-300"
            : "text-base-gray-100"
        }`}
      >
        {todo.content}
      </span>

      <Button
        variant="ghost"
        className="self-start"
        size="icon"
        onClick={() => {
          fadeOut();
          setTimeout(() => deleteTodo(todoId), 500); // Wait for fade-out duration
        }}
      >
        <Trash2
          size={16}
          className="text-base-gray-300 hover:text-base-danger hover:bg-base-gray-400"
        />
      </Button>
    </div>
  );
};

export default TodoItem;
