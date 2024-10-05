import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

interface TodoFormProps {
  todoContent: string;
  setTodoContent: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
}

const TodoForm = ({
  todoContent,
  setTodoContent,
  addTodo,
}: TodoFormProps) => {
  return (
    <div className="flex items-center  mb-16">
      <Input
        className="border-0 h-[52px] p-4 mr-2 bg-base-gray-500 text-base-gray-100"
        type="text"
        value={todoContent}
        onChange={(e) => setTodoContent(e.target.value)}
        placeholder="Add a new task"
      />
      <Button variant="default" onClick={addTodo} size="default">
        Create
        <PlusCircle size={16} className="ml-1" />
      </Button>
    </div>
  );
}

export default TodoForm;
