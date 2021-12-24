import styles from './styles.module.scss';
import { isEqual, getISODay } from 'date-fns'

import { ITodoCategory, useTodos } from '../../hooks/useToDo';
import { TodoList } from '../TodoList';
import { useEffect, useState } from 'react';

export function TodosTable() {
  const {todos} = useTodos();
  const [dayTodo, setDayTodo] = useState<ITodoCategory[]>([]);

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