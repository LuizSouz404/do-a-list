import { useTodo } from '../../context/todo';

import styles from './styles.module.scss';

export function Summary() {
  const { todos, priority, todoUpdateCheck } = useTodo();

  async function handleCheckedTodo(listID: string, todoID: string) {
    await todoUpdateCheck({listID, todoID});
  }

  const qtdTodo = todos.reduce((acc, todo) => {
    if(new Date(todo.createdAt).setHours(0,0,0,0) !== new Date().setHours(0,0,0,0)) {
      return acc;
    }
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
          { priority.length !== 0 && <p>Priority</p> }
        </header>
        <strong onClick={priority.length !== 0 ? () => handleCheckedTodo(priority[0].list.id, priority[0].todo.id) : () => {} }>
          {priority.length !== 0 ? `${priority[0].list.title} - ${priority[0].todo.title}` : "N??o possui nenhuma tarefa."}
        </strong>
      </div>
    </div>
  )
}
