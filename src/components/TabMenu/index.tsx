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
      <a href="#account">Account</a>
      <a href="#calendary">Calendary</a>
      <a onClick={handleLogOut}>Sair</a>
    </div>
  )
}