import { useState } from 'react';
import { useTodos } from '../../hooks/useToDo';
import { TabMenu } from '../TabMenu';
import styles from './styles.module.scss';

export function Header() {
  const { name } = useTodos();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className={styles.container}>
      <div>
        <img src="/images/details.svg" alt="Details" onClick={() => setModalOpen(!modalOpen)}/>
        <span>Olá, {name}.</span>
        {modalOpen ? <TabMenu modalIsOpen={setModalOpen}/> : ""}        
      </div>
      <img src="/logo.svg" alt="Logo" />
    </header>
  )
}