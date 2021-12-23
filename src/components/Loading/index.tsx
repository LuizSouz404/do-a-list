import styles from './styles.module.scss';

export function Loading() {
  return (    
    <div className={styles.container}>
      <img src="/logo.svg" alt="Loading" />
      <strong>Carregando...</strong>
    </div>
  )
}