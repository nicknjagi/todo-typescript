import { NewTodo, Todo } from "@/types";

export async function fetchTodos (): Promise<Todo[]>{
  try {
    const response =await fetch('http://localhost:8000/todos')
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
    const response = await fetch('http://localhost:8000/todos', {
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
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`Error updating todo`);
    }

    return response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error; 
  }
}

export async function deleteTodo(id:string){
  try {
    const response = await fetch(`http://localHost:8000/todos/${id}`, {   
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