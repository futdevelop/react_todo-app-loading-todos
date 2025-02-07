import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import ErrorHandler from './components/ErrorHandler';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const completedTodos = todos.filter((todo: Todo) => todo.completed)

  useEffect(() => {
    setVisibleTodos(todos);
  }, [todos]);

  useEffect(() => {
    setVisibleTodos(
      todos.filter(todo => {
        switch (selectedFilter) {
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          case 'all':
          default:
            return true;
        }
      }),
    );
  }, [selectedFilter]);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then((res: Todo[]) => setTodos(res))
      .catch(() => handleError('Unable to load todos'));
  }, []);

  const handleChangeFilter = (filter: string) => setSelectedFilter(filter)

  const lengthOfUncompletedTodos = todos.length - completedTodos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList visibleTodos={visibleTodos} />
        {todos.length && (
          <Footer
            lengthOfUncompletedTodos={lengthOfUncompletedTodos}
            handleChangeFilter={handleChangeFilter}
            completedTodos={completedTodos}
            selectedFilter={selectedFilter}
          />
        )}
      </div>

      <ErrorHandler error={error} />
    </div>
  );
};
