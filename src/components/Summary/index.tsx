import { useEffect, useState } from 'react';
import { ITodo, useTodos } from '../../hooks/useToDo';
import styles from './styles.module.scss';

export function Summary() {
  const {todos} = useTodos();
  const [priority, setPriority] = useState<ITodo[]>([]);

  useEffect(() => {
    todos.filter(list => {
      const index = list.todos.filter(todo => {
        if(!todo.check) {
          return todo;
        }
      });
      
      index.sort();

      setPriority(index);
      return index;
    });
    
  }, [todos])
  
  console.log(priority);

  const qtdTodo = todos.reduce((acc, todo) => {
    const completedTodo = todo.todos.reduce((acc, list) => {
      list.check ? acc++ : acc;

      return acc;
    },0);

    acc.completedTodo += completedTodo;

    todo.todos.length ? acc.totalTodo+=todo.todos.length : acc.totalTodo; 

    return acc;
  }, {
    completedTodo: 0,
    totalTodo: 0,
  })

  return (
    <div className={styles.container}>
      <div>
        <header>
          <p>Date</p>
        </header>
        <strong>
          {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: "numeric" }).format(new Date())}
        </strong>
      </div>
      <div 
        className={styles.percentageBorder} 
        style={
          qtdTodo.completedTodo > 0 ? 
            {background: `linear-gradient(90deg, #00bf7a ${qtdTodo.completedTodo /qtdTodo.totalTodo * 100}%, var(--gray) ${qtdTodo.completedTodo /qtdTodo.totalTodo * 100 + 3}%)`} :
            {background: 'var(--gray)'}
        }
      >
        <div>
          <header>
            <p>Percentage Completed</p>
          </header>
          <strong>
            ({qtdTodo.completedTodo}/{qtdTodo.totalTodo}) {qtdTodo.completedTodo /qtdTodo.totalTodo * 100 >= 0 ? Math.round(qtdTodo.completedTodo /qtdTodo.totalTodo * 100) : "0"}%
          </strong>
        </div>
      </div>
      <div>
        <header>
          <p>Priority</p>
        </header>
        <strong>
          work - Drink coffe to stay Awake
        </strong>
      </div>
    </div>
  )
}
//date percentage quantity