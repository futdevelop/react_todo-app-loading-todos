import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  lengthOfUncompletedTodos: number;
  handleChangeFilter: (filter: string) => void;
  selectedFilter: string;
  completedTodos: Todo[]
};

const Footer: React.FC<Props> = ({
  lengthOfUncompletedTodos,
  handleChangeFilter,
  selectedFilter,
  completedTodos
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${lengthOfUncompletedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${selectedFilter === 'all' && 'selected'}`}
          data-cy="FilterLinkAll"
          onClick={() => handleChangeFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${selectedFilter === 'active' && 'selected'}`}
          data-cy="FilterLinkActive"
          onClick={() => handleChangeFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${selectedFilter === 'completed' && 'selected'}`}
          data-cy="FilterLinkCompleted"
          onClick={() => handleChangeFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
