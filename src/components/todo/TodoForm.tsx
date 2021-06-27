import React, { useState } from 'react';

interface TodoFormProps {
  onAdd(message: string): void;
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {
  const [message, setMessage] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      props.onAdd(message);
      setMessage('');
    }
  };

  return (
    <div className='todo'>
      <input
        value={message}
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
        className='todo__input'
        id='todo'
        type='text'
        placeholder='Add a task ...'
      ></input>
    </div>
  );
};
