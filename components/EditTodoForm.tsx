import { updateTodo } from '@/app/lib/actions';
import {Checkbox} from '@nextui-org/checkbox'
import {Input, Textarea} from '@nextui-org/input'
import {Select,SelectItem} from '@nextui-org/select'
import {DatePicker} from '@nextui-org/date-picker'
import {Button} from '@nextui-org/button'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Todo } from "@/types";

interface EditTodoFormProps {
  todo: Todo;
  onClose: () => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo:todoToEdit, onClose }) => {
  const [todo, setTodo] = useState({...todoToEdit});
  const queryClient = useQueryClient()

  const editTodoMutation = useMutation({
    mutationFn: (updatedTodo: Todo) => updateTodo(updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos']})
      queryClient.invalidateQueries({queryKey:['activeTodo']})
      onClose()
    }
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const priorities = ["Low", "Medium", "High"];

  function handleSubmit(e:any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todoObj = Object.fromEntries(formData);
    const createdAtTimestamp = new Date(todo.createdAt).getTime();
    const nowTimestamp = new Date().getTime();
    
    if(!todoToEdit.complete && todoObj.complete === ''){
      todo['timeTaken'] = Math.floor((nowTimestamp - createdAtTimestamp) / 1000 / 60)
    }
    else if(todoToEdit.complete && todoObj.complete === ''){
      todo['timeTaken'] = Math.floor((nowTimestamp - createdAtTimestamp) / 1000 / 60)      
    }
    else{
      todo['timeTaken']= 0
    }

    if(Object.values(todoObj).includes('')){
      // console.log();
    }
    editTodoMutation.mutate(todo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        size="sm"
        type="text"
        label="Title"
        name="title"
        defaultValue={todo.title}
        onChange={handleChange}
        variant="bordered"
      />
      <Textarea
        variant="bordered"
        label="Details"
        name="details"
        onChange={handleChange}
        defaultValue={todo.details}
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
      />
      <div className="flex gap-4">
        <Input
          size="sm"
          type="date"
          label="Due date"
          name="dueDate"
          defaultValue={todo.dueDate}
          onChange={handleChange}
          variant="bordered"
        />
        <Select
          size="sm"
          variant="bordered"
          label="Priority"
          className="max-w-xs"
          name="priority"
          defaultSelectedKeys={[todo.priority]}
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
        defaultSelected={todo.complete}
        name="complete"
        onValueChange={(e:boolean) => setTodo({ ...todo, complete: e })}
      >
        Complete
      </Checkbox>
      <Button
        type="submit"
        disabled={editTodoMutation.isPending}
        color="primary"
        className="mb-2"
      >
        Save
      </Button>
    </form>
  );
};
export default EditTodoForm;
