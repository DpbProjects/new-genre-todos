import TodoItem from "./TodoItem";
import ClipboardIcon from "./icons/ClipboardIcon";

import type { Todo } from "@/lib/types";

interface TodoListProps {
  todos: Todo[] | undefined;
  toggleComplete: (id: string, isComplete: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoList = ({ todos, toggleComplete, deleteTodo }: TodoListProps) => {
  return (
    <div>
      {todos?.length ? (
        todos?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center border-t-[1px] border-base-gray-300 text-base-gray-300 text-base animate-fadeIn">
          <ClipboardIcon className="mb-4 mt-16" />
          <p className="font-bold text-center">
            Você ainda não tem tarefas cadastradas
          </p>
          <p className="text-center">
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
