import React from 'react';
import { ITodo } from '../../interfaces';
import { TodoItem } from './TodoItem';

export interface TodoListProps {
  todos: ITodo[];
  onDelete(todoId: string): void;
  onChange(todoId: string, checked?: boolean, message?: string): void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onChange }) => {
  return (
    <ul className='todo__ul'>
      {todos.map((todo) => {
        return <TodoItem todo={todo} onChange={onChange} onDelete={onDelete} key={todo._id} />;
      })}
    </ul>
  );
};
