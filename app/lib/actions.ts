import { NewEvent, NewTodo, Todo } from "@/types";
import { revalidatePath } from 'next/cache';

export async function fetchTodos (): Promise<Todo[]>{
  try {
    const response =await fetch(`${process.env.NEXT_PUBLIC_URL}/todos`)
    if (!response.ok) {
      throw new Error('Error fetching todos');
    }
    return response.json(); 
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching todos')
  }
}

export async function createTodo(todo: NewTodo){
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`Error creating todo:}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw new Error(`Error creating todo: ${error}`)
  }
}

export async function updateTodo(todo:Todo){
  const {id} = todo
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`Error updating todo`);
    }

  } catch (error) {
    console.error('Error updating todo:', error);
    throw error; 
  }
}

export async function deleteTodo(id:string){
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/todos/${id}`, {   
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error deleting todo`);
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error; 
  }
}


export async function getActiveTodo(){
  const data = await fetchTodos()
  const activeTodo = data.filter(todo => todo.isActive === true)[0]
  return activeTodo || {}
}


export async function createEvent(event: NewEvent){
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/events`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(`Error creating event:}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error(`Error creating event: ${error}`)
  }
}
