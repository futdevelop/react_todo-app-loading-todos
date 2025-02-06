/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setCompletedTodos(todos.filter(todo => todo.completed));
    setFilteredTodos(todos)
  }, [todos]);

  useEffect(() => {
    if (selectedFilter === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.completed));
    }

    if (selectedFilter === 'active') {
      setFilteredTodos(todos.filter(todo => !todo.completed));
    }
    if (selectedFilter === 'all') {
      setFilteredTodos(todos);
    }
  }, [selectedFilter]);

  const handleError = () => {
    setError(true);

    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then((res: Todo[]) => setTodos(res))
      .catch(() => handleError());
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = () => {};

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos &&
            filteredTodos.map(todo => (
              <div
                data-cy="Todo"
                className={`todo ${todo.completed && 'completed'}`}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed ? true : false}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todos && todos.length - completedTodos.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${selectedFilter === 'all' && 'selected'}`}
                data-cy="FilterLinkAll"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${selectedFilter === 'active' && 'selected'}`}
                data-cy="FilterLinkActive"
                onClick={() => setSelectedFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${selectedFilter === 'completed' && 'selected'}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setSelectedFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodos ? false : true}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {error && <p>Unable to load todos</p>}
        {/* <div>
          // <br />
          // <p>Title should not be empty</p>
          // <br />
          //{' '}
        </div>
        // Unable to add a todo // <br />
        // Unable to delete a todo // <br />
        // Unable to update a todo */}
      </div>
    </div>
  );
};
