import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { useTodos } from '../../hooks/useToDo';
import styles from './styles.module.scss';

interface ITabMenu {
  modalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function TabMenu({modalIsOpen}: ITabMenu) {
  const {logout} = useTodos();

  function handleLogOut() {
    logout();

    modalIsOpen(false);
  }

  return (
    <div className={styles.container}>
      <Link href="/"  passHref>Home</Link>
      <Link href="/calendar">Calendary</Link>
      <a onClick={handleLogOut}>Sair</a>
    </div>
  )
}