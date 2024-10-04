import TodoItem from "./TodoItem";

import type { Todo } from "@/lib/types";

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList = ({ todos, toggleComplete, deleteTodo }: TodoListProps) => {
  return (
    <div>
      {todos.length ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))
      ) : (
        <div className="border-t-[1px] border-base-gray-400">
          <p className="p-4 text-center text-base-gray-400">No tasks found.</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
