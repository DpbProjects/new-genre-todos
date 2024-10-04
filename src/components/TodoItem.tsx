import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import type { Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, toggleComplete, deleteTodo }: TodoItemProps) => {
  return (
    <div
      key={todo.id}
      className={`flex border bg-base-gray-500 border-base-gray-400 items-center justify-between p-4 mb-3 rounded`}
    >
      <div className="flex items-center self-start mr-3 min-h-6">
        <Checkbox
          className="rounded-full border-product-blue hover:border-product-blur-dark data-[state=checked]:hover:border-none data-[state=checked]:bg-product-purple-dark data-[state=checked]:hover:bg-product-purple data-[state=checked]:text-base-gray-100"
          checked={todo.isComplete}
          onClick={() => toggleComplete(todo.id)}
        />
      </div>

      <span
        className={`flex-grow ${
          todo.isComplete
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
        onClick={() => deleteTodo(todo.id)}
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
