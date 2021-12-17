import styles from './styles.module.scss';

import { useTodos } from '../../hooks/useToDo';
import { TodoList } from '../TodoList';

export function TodosTable() {
  const {todos} = useTodos();

  return (
    <>
      <div className={styles.container}>
        {todos.map(todo => (
          <TodoList key={todo.id} {...todo}/>
        ))}
      </div>
    </>
    )
}