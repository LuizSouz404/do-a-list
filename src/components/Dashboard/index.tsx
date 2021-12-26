import { CgMathPlus } from 'react-icons/cg';
import { useAuth } from '../../context/auth';
import { Summary } from '../Summary';
import { TodosTable } from '../TodosTable';

import styles from './styles.module.scss';

interface IDashboardProps {
  onOpenNewTodoModal: () => void;
}

export function Dashboard({ onOpenNewTodoModal }: IDashboardProps) {
  const {user} = useAuth();
  return (
    <main className={styles.container}
      style={!user?
        {visibility: 'hidden', opacity: '0', transition: 'visibility .3s, opacity .3s ease-in-out'} :
        {visibility: 'visible', opacity: '1', transition: 'visibility .3s, opacity .3s ease-in-out'}}
    >
      <div className={styles.content}>
        <Summary />
        <TodosTable />

      </div>
      <button className={styles.btn} onClick={onOpenNewTodoModal}>
        <CgMathPlus size={24}/>
      </button>
    </main>
  )
}
