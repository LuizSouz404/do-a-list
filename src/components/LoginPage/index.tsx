import { FormEvent, useState } from 'react';
import { useTodos } from '../../hooks/useToDo';
import styles from './styles.module.scss';

export function LoginPage() {
  const {login, name} = useTodos();
  const [nameInput, setNameInput] = useState('');

  function handleName(event: FormEvent) {
    event.preventDefault();

    login(nameInput);

    setNameInput('');
  }
  
  return (
    <div 
      className={styles.container} 
      style={name? 
      {visibility: 'hidden', opacity: '0', transition: 'visibility .3s, opacity .3s ease-in-out'} : 
      {visibility: 'visible', opacity: '1', transition: 'visibility .3s, opacity .3s ease-in-out'}}
    >
      <img src="/images/question.svg" alt="https://storyset.com/people by Storyset" />
      <form className={styles.content} onSubmit={handleName}>
        <h1>Como devemos te chamar?</h1>
        <input 
          type="text" 
          placeholder="Seu nome" 
          value={nameInput}
          onChange={event => setNameInput(event.target.value)}
        />
        <button type="submit">Confirmar</button>
      </form>
    </div>
  )
}
