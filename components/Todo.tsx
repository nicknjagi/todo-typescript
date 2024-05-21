import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import EditTodoModal from "./modals/EditTodoModal";
import { deleteTodo, getActiveTodo, updateTodo} from "@/app/lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { daysRemaining, formatDate, formatTime } from "@/app/lib/utils";
import { Todo as TodoAlias } from "@/types";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

interface TodoProps {
  todo: TodoAlias;
}

export default function Todo({ todo }: TodoProps) {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({queryKey:['activeTodo']})
    },
  });

  const setActiveTaskMutation = useMutation({
    mutationFn: (todo: TodoAlias) => setActiveTask(todo),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTodo"] });
    },
  });

  async function setActiveTask(todoObj: TodoAlias){
    const currentActiveTodo = await getActiveTodo()
    if (currentActiveTodo.isActive){
      currentActiveTodo['isActive'] = false
      const updatedTodo = await updateTodo(currentActiveTodo)
    }
    const todoToUpdate = {...todoObj, isActive:true}
    const activeTodo = await updateTodo(todoToUpdate)
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    queryClient.invalidateQueries({ queryKey: ["activeTodo"] });
}

  const priorityMap: { Low: string; Medium: string; High: string } = {
    Low: "success",
    Medium: "warning",
    High: "danger",
  };

  const {
    title,
    details,
    priority,
    complete,
    timeTaken,
    dueDate,
    isActive,
    createdAt,
  } = todo;

  return (
    <Card
      id="card"
      className="w-full shadow-none outline-1 outline-[#509185] rounded-md dark:bg-[rgb(1,49,50)]"
    >
      <CardHeader className="flex gap-3 justify-between pb-3">
        <h3 className={clsx(complete && "line-through text-neutral-500")}>
          {title}
        </h3>
      </CardHeader>

      <CardBody className="py-0 text-sm overflow-y-visible">
        {/* <p className="pb-3">{details}</p> */}
        <div className="flex flex-row justify-between w-full gap-2">
          <div className="flex items-center gap-4">
            <p className={clsx("text-sm", complete && "text-success")}>
              {" "}
              {complete ? "Complete" : isActive ? "Active" : "Dormant"}
            </p>
            {!complete && !isActive && (
              <Button
                color="primary"
                id="activate-btn"
                size="sm"
                variant="light"
                className=" font-bold"
                onClick={() => setActiveTaskMutation.mutate(todo)}
              >
                {setActiveTaskMutation.isPending ? 'please wait' :'Set active'}
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Chip
              color={priorityMap[priority] as "success" | "warning" | "danger"}
              className="bg-opacity-50 text-white mr-2"
              size="sm"
              radius="sm"
            >
              {priority}
            </Chip>
            <div className="flex gap-1 items-center">
              <EditTodoModal todo={todo} />
              <Button
                className="h-7"
                isIconOnly
                color="danger"
                size="sm"
                variant="flat"
                onClick={() => deleteTodoMutation.mutate(todo.id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>

      <CardFooter className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between w-full">
          {!complete ? (
            <p
              className={clsx("text-sm", {
                [daysRemaining(dueDate) === "Overdue"
                  ? "text-danger"
                  : "text-teal-600"]: true,
              })}
            >
              {" "}
              {daysRemaining(dueDate)}
            </p>
          ) : (
            timeTaken > 0 && (
              <div className="flex text-sm">
                <span>Time taken: </span>{" "}
                <span className="text-neutral-300 ml-1">
                  {" "}
                  {formatTime(timeTaken)}
                </span>
              </div>
            )
          )}
          <small className="text-neutral-400">{formatDate(createdAt)}</small>
        </div>
      </CardFooter>
    </Card>
  );
}
