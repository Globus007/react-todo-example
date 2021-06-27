import React, { useRef, useState, useEffect } from 'react';
import { ITodo } from '../../interfaces';
import { TodoDeleteSVG } from './TodoDeleteSVG';
import { TodoEditSVG } from './TodoEditSVG';
import { TodoSaveSVG } from './TodoSaveSVG';

interface TodoItemProps {
  todo: ITodo;
  onDelete(todoId: string): void;
  onChange(todoId: string, checked?: boolean, message?: string): void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onChange }) => {
  const inputMsg = useRef<HTMLInputElement>(null);
  const btnEdit = useRef<HTMLButtonElement>(null);
  const btnSave = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState(todo.message);

  useEffect(() => {
    if (todo.completed) {
      inputMsg.current!.classList.add('completed');
    } else {
      inputMsg.current!.classList.remove('completed');
    }
  }, [todo.completed]);

  const clickBtnEditHandler = () => {
    inputMsg.current!.disabled = false;
    inputMsg.current!.focus();
    btnEdit.current!.classList.add('hidden');
    btnSave.current!.classList.remove('hidden');
  };

  const changeInputHandler = () => {
    setMessage(inputMsg.current!.value);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveMessage();
    }
  };

  const saveMessage = () => {
    if (message.length === 0) {
      window.alert('Your message is empty! Please write something');
      return;
    }

    inputMsg.current!.disabled = true;
    btnEdit.current!.classList.remove('hidden');
    btnSave.current!.classList.add('hidden');

    onChange(todo._id, todo.completed, inputMsg.current!.value);
  };

  const checkHandler = () => {
    onChange(todo._id, !todo.completed);
  };

  return (
    <li className='todo__li'>
      <input
        onChange={checkHandler}
        className='todo__checkbox'
        type='checkbox'
        checked={todo.completed}
      />
      <input
        ref={inputMsg}
        type='text'
        value={message}
        className='todo__text'
        onChange={changeInputHandler}
        onKeyPress={keyPressHandler}
        disabled
      />
      <button ref={btnSave} className='todo__btn todo__btn--save hidden' onClick={saveMessage}>
        <TodoSaveSVG />
      </button>
      <button ref={btnEdit} className='todo__btn' onClick={clickBtnEditHandler}>
        <TodoEditSVG />
      </button>
      <button className='todo__btn' onClick={() => onDelete(todo._id)}>
        <TodoDeleteSVG />
      </button>
    </li>
  );
};
