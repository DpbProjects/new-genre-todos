import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface TodoFormProps {
  addTodo: (content: string) => Promise<void>;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [todoContent, setTodoContent] = useState("");

  const handleAddTodo = async () => {
    if (!todoContent.trim()) return;
    await addTodo(todoContent);
    setTodoContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodo();
    }
  };

  return (
    <div className="flex items-center mb-16">
      <Input
        className="border-0 h-[52px] p-4 mr-2 bg-base-gray-500 text-base-gray-100"
        type="text"
        value={todoContent}
        onChange={(e) => setTodoContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task"
      />
      <Button variant="default" onClick={handleAddTodo} size="default">
        Create
        <PlusCircle size={16} className="ml-1" />
      </Button>
    </div>
  );
};

export default TodoForm;
