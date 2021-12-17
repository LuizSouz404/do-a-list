import { Summary } from '../Summary';
import { TodosTable } from '../TodosTable';
import styles from './styles.module.scss';

interface IDashboardProps {
  onOpenNewTodoModal: () => void;
}

export function Dashboard({ onOpenNewTodoModal }: IDashboardProps) {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Summary />
        <TodosTable />

      </div>
      <button className={styles.btn} onClick={onOpenNewTodoModal}>
        <img src="/images/plus.svg" alt="Adicionar todo" />
      </button>
    </main>
  )
}
