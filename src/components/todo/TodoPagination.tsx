import React from 'react';

interface TodoPaginationProps {
  totalPages: number;
  currentPage: number;
  changePage(page: number): void;
}

export const TodoPagination: React.FC<TodoPaginationProps> = ({
  totalPages,
  currentPage,
  changePage,
}) => {
  return (
    <div className='todo__pages'>
      {Array.apply(0, Array(totalPages)).map((e, i) => {
        let className = 'todo__btn';
        if (i === currentPage) {
          className += ' active';
        }
        return (
          <button className={className} onClick={() => changePage(i)} key={i}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
};
