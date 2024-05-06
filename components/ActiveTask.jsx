import { useQuery } from "@tanstack/react-query"
import {getActiveTodo} from '@/app/lib/actions';
import { daysRemaining, formatTime } from "@/app/lib/utils";
import { Divider } from "@nextui-org/divider";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import clsx from "clsx";

const ActiveTask = () => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['activeTodo'],
    queryFn:  getActiveTodo
  })

  if(isLoading) return <h1 className="text-xl text-center my-12">Loading...</h1>

  if (isError) {
    return <div className="text-center my-12">{error.message}</div>;
  }

  const {title, details, complete, timeTaken, dueDate, } = data

  return (
    <section className="mt-6 max-w-sm bg-[rgba(0,0,0,0.3)] backdrop-blur-sm p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Active Task</h3>
        <Divider className="my-2" />

        {(data.isActive && !complete) ? <Card  id="card"  className="w-full shadow-none bg-transparent">
          <CardHeader className="flex gap-3 justify-between pb-3 px-0">
              <h3 className='text-lg '>{title}</h3>
          </CardHeader>

          <CardBody className="p-0 text-sm overflow-y-visible">
            <p className="pb-3">{details}</p>
          </CardBody>

          <CardFooter className="flex flex-col gap-2 pt-1 px-0">
            <div className="flex justify-between w-full">
              {!complete ? (
              <p className={clsx("text-sm",{[daysRemaining(dueDate) === 'Overdue'? "text-danger" : "text-teal-600"]: true})}> {daysRemaining(dueDate)} </p>
              ) 
              : (timeTaken > 0 && <div className="flex text-sm"><span>Time taken: </span> <span className="text-neutral-300 ml-1"> {formatTime(timeTaken)}</span></div> )}
            </div>
          </CardFooter>
        </Card> 
        :
        <p>No active task</p>}
      </section>
  )
}
export default ActiveTask