import Link from 'next/link';
import Router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '../../context/auth';
import styles from './styles.module.scss';

interface ITabMenu {
  modalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function MenuHeader({modalIsOpen}: ITabMenu) {
  const {signOut} = useAuth();

  function handleLogOut() {
    signOut();

    modalIsOpen(false);

    Router.push('/signin')
  }

  return (
    <div className={styles.container}>
      <Link href="/"  passHref>
        <a>
          Home
        </a>
      </Link>
      <Link href="/calendar">
        <a>
          Calendary
        </a></Link>
      <a onClick={handleLogOut}>Sair</a>
    </div>
  )
}
