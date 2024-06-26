import { Divider } from "@nextui-org/divider";
import AddTodoModal from "./modals/AddTodoModal";
import Todo from "./Todo";
import { fetchTodos } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";

interface TodoListProps {
  onClose: () => void;
}

const TodoList: React.FC<TodoListProps> = ({onClose}) => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['todos'],
    queryFn:  fetchTodos
  })

  if(isLoading) return <h1 className="text-xl text-center my-12">Loading...</h1>

  if (isError) {
    return <div className="text-center my-12">{error.message}</div>;
  }

	return (
		<section className="todo-list py-8 md:py-10 w-full max-w-xl mx-auto">
			<div>
        <div className="flex justify-between items-center w-full mx-auto mb-3">
          <h1 className="text-xl">To do List <small className="text-neutral-300 ml-2">{`${data?.filter(el => el.complete === true).length } / ${data?.length}`}</small></h1>
          <AddTodoModal />
        </div>
        <p>Note all your daily tasks and work on them one by one</p>
      </div>

			<Divider className="my-6" />
      
      <div className="flex flex-col items-center justify-center">
        {data?.map((todo, index: number)=> {
          return <Todo key={`${todo.title} ${index}`} todo={todo}/>
        })}
      </div>
		</section>
	);
}
export default TodoList