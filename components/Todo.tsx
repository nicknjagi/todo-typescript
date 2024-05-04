import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import {Button} from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import EditTodoModal from "./EditTodoModal";
import { deleteTodo } from "@/api/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate, formatTime } from "@/utils/utils";
import { Todo as TodoAlias } from "@/types";
import { DeleteIcon } from "./icons";
import clsx from "clsx";

interface TodoProps {
  todo: TodoAlias;
}

export default function Todo({todo}:TodoProps) {
  const queryClient = useQueryClient()
  const deleteTodoMutation = useMutation({
    mutationFn: (id:string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos']})
    }
  });

  const priorityMap:{Low:string,Medium:string,High:string} = {
    Low: "success",
    Medium: "warning",
    High: "danger",
  }

  const {title, details, priority, complete, timeTaken, dueDate, createdAt} = todo

  return (
    <Card className="w-full shadow-none outline-1 outline-[#509185] rounded-md dark:bg-[#013132]">
      <CardHeader className="flex gap-3 justify-between pb-2">
          <h3 className={clsx(complete && 'line-through text-neutral-500')}>{title}</h3>
          {/* <Chip color={priorityMap[priority] as "success" | "warning" | "danger"} className="bg-opacity-60 text-white" size="sm" radius="sm">{priority}</Chip> */}
      </CardHeader>

      <CardBody className="pt-0 text-sm overflow-y-visible">
        {/* <p className="pb-3">{details}</p> */}
        <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
          <Checkbox defaultSelected isSelected={complete} size="sm" color="success" className="pointer-events-none">Complete</Checkbox>

          {timeTaken > 0 && <div className="flex "><span>Time taken: </span> <span className="text-neutral-300 ml-1"> {formatTime(timeTaken)}</span></div>}

          <div className="flex items-center justify-between gap-2">
            <Chip color={priorityMap[priority] as "success" | "warning" | "danger"} className="bg-opacity-60 text-white mr-2" size="sm" radius="sm">{priority}</Chip>

            <div className="flex gap-1">
              <EditTodoModal todo={todo}/>
              <Button className="h-7" isIconOnly color="danger" size="sm" variant="flat" onClick={()=> deleteTodoMutation.mutate(todo.id)}>
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>

    {/* 
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <small className="text-neutral-400">{formatDate(createdAt)}</small>
          <small>Due: <span className="text-teal-600">{dueDate}</span></small>
        </div>
        <div className="flex justify-end w-full">
          <EditTodoModal todo={todo}/>
          <Button color="danger" size="sm" variant="light" onClick={()=> deleteTodoMutation.mutate(todo.id)}>Delete</Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}
