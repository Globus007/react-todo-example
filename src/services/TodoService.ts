import { ITodo, Pages } from '../interfaces';

const BASE_URL = 'https://todo-app-express-ts.herokuapp.com/todos/';
const HEADERS = { 'Content-Type': 'application/json' };

export async function getTodos(): Promise<ITodo[]> {
  const responce = await fetch(BASE_URL);
  return await responce.json();
}

export async function getTodosPageable(page: number, limit: number): Promise<Pages> {
  const responce = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
  return await responce.json();
}

export async function addTodo(message: string): Promise<ITodo> {
  const responce = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ message: message }),
    headers: HEADERS,
  });
  return await responce.json();
}

export async function updateTodo(todoId: string, todo: ITodo): Promise<void> {
  await fetch(`${BASE_URL}${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify(todo),
    headers: HEADERS,
  });
}

export async function deleteTodo(todoId: string): Promise<void> {
  await fetch(`${BASE_URL}${todoId}`, { method: 'DELETE' });
}
