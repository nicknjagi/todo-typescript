import { createTodo } from "@/api/actions";
import {Checkbox} from '@nextui-org/checkbox'
import {Input, Textarea} from '@nextui-org/input'
import {Select,SelectItem} from '@nextui-org/select'
import {DatePicker} from '@nextui-org/date-picker'
import {Button} from '@nextui-org/button'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { NewTodo } from "@/types";

interface AddFormProps {
  onClose: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ onClose}) => {
  const [todo, setTodo] = useState<NewTodo>({
    title: "",
    details: "",
    priority: "Low",
    complete: false,
    timeTaken:0,
    dueDate: "",
    createdAt: new Date()
  });

  const queryClient = useQueryClient()

  const newTodoMutation = useMutation({
    mutationFn: async (newTodo: NewTodo): Promise<void>  => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos']})
      onClose()
    }
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const priorities = ["Low", "Medium", "High"];

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todoObj = Object.fromEntries(formData);
    if(Object.values(todoObj).includes('')){
      // console.log();
    }
    newTodoMutation.mutate(todo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        autoFocus
        size="sm"
        type="text"
        label="Title"
        name="title"
        isRequired
        onChange={handleChange}
        variant="bordered"
      />
      <Textarea
        variant="bordered"
        label="Details"
        name="details"
        onChange={handleChange}
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
      />
      <div className="flex gap-4">
        <Input
          size="sm"
          type="date"
          label="Due date"
          name="dueDate"
          isRequired
          onChange={handleChange}
          variant="bordered"
        />
        <Select
          size="sm"
          variant="bordered"
          label="Priority"
          className="max-w-xs"
          name="priority"
          onChange={handleChange}
        >
          {priorities.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Checkbox
        size="sm"
        onValueChange={(e: any) => setTodo({ ...todo, complete: e })}
      >
        Complete
      </Checkbox>
      <Button
        type="submit"
        disabled={newTodoMutation.isPending}
        color="primary"
        className="mb-2"
      >
        Create
      </Button>
    </form>
  );
};
export default AddForm;
