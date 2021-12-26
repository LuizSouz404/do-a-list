import { useEffect, useState } from 'react';
import { IListTodo, useTodo } from '../../context/todo';
import { TodoList } from '../TodoList';
import { isEqual } from 'date-fns'

import styles from './styles.module.scss';

export function TodosTable() {
  const {todos} = useTodo();
  const [dayTodo, setDayTodo] = useState<IListTodo[]>([]);

  useEffect(() => {
    const newArray = todos;

    const currentDateTodos = newArray.filter(todo => isEqual(new Date(todo.createdAt).setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0)));

    setDayTodo(currentDateTodos);
  }, [todos])

  return (
    <>
      <div className={styles.container}>
        {dayTodo.map(todo => (
          <TodoList key={todo.id} {...todo}/>
        ))}
      </div>
    </>
  )
}
