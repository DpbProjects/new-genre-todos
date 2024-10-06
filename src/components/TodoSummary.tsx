import type { Todo } from "@/lib/types";

interface TodoSummaryProps {
  todos: Todo[] | undefined;
  completedTodosCount: number | undefined;
}

const TodoSummary = ({ todos, completedTodosCount }: TodoSummaryProps) => {
  return (
    <div className="flex justify-between mb-6">
      <div className="text-product-blue font-bold text-sm">
        Tasks created
        <span className="ml-1 px-2 font-bold bg-base-gray-400 rounded-xl text-gray-50">
          {todos?.length}
        </span>
      </div>
      <div className="text-product-purple font-bold text-sm">
        Completed
        <span className="ml-1 px-2 font-bold bg-base-gray-400 rounded-xl text-gray-50">
          {completedTodosCount && completedTodosCount > 0
            ? `${completedTodosCount} of ${todos?.length}`
            : `${completedTodosCount}`}
        </span>
      </div>
    </div>
  );
};

export default TodoSummary;
