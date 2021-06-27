import React, { useEffect, useState } from 'react';
import { TodoForm } from './components/todo/TodoForm';
import { TodoList } from './components/todo/TodoList';
import { Loader } from './components/loader/Loader';
import { TodoPagination } from './components/todo/TodoPagination';
import { ITodo } from './interfaces';
import { addTodo, deleteTodo, updateTodo, getTodosPageable } from './services/TodoService';
import './components/todo/todo.scss';

const PAGE_LIMIT = 10;

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTodosPageable(currentPage);
  }, [currentPage]);

  const fetchTodosPageable = async (page: number = 0): Promise<void> => {
    setLoading(true);
    const pagesInfo = await getTodosPageable(page, PAGE_LIMIT);
    setLoading(false);

    setTodos(pagesInfo.todos);
    setTotalPages(pagesInfo.pageInfo?.totalPages);
  };

  const addTodoHandler = async (message: string) => {
    const savedTodo = await addTodo(message);
    fetchTodosPageable(currentPage);

    if (todos.length < PAGE_LIMIT) {
      setTodos((prev) => [savedTodo, ...prev]);
    }
  };

  const changeStatusTodoHandler = (todoId: string, checked: boolean, message: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo._id === todoId) {
          todo = { ...todo, completed: checked, message: message };
          updateTodo(todoId, todo);
          return todo;
        }
        return todo;
      })
    );
  };

  const deleteTodoHandler = async (todoId: string) => {
    const shoudRemove = window.confirm('Do you want to delete task?');
    if (shoudRemove) {
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
      await deleteTodo(todoId);

      if (todos.length === 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchTodosPageable(currentPage);
      }
    }
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='container'>
      <h1>Todo client</h1>
      <TodoForm onAdd={addTodoHandler} />
      {loading ? (
        <Loader />
      ) : (
        <TodoList todos={todos} onDelete={deleteTodoHandler} onChange={changeStatusTodoHandler} />
      )}
      <TodoPagination
        totalPages={totalPages}
        currentPage={currentPage}
        changePage={changePageHandler}
      />
    </div>
  );
};

export default App;
