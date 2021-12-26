import { useState } from 'react';
import Image from 'next/image'
import styles from './styles.module.scss';

import { MenuHeader } from '../MenuHeader';
import { CgDetailsMore } from 'react-icons/cg';
import { useAuth } from '../../context/auth';

export function Header() {
  const {user} = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className={styles.container}>
      <div className={styles.menu}>
        <CgDetailsMore size={34} onClick={() => setModalOpen(!modalOpen)}/>
        <span>Olá, {user?.name}.</span>
        {modalOpen && <MenuHeader modalIsOpen={setModalOpen}/>}
      </div>
      <div className={styles.logo}>
        <Image layout='fill' src="/logo.png" alt="Logo" />
      </div>
    </header>
  )
}
