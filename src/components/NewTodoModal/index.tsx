import { useTodo } from '../../context/todo';
import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import styles from './styles.module.scss';
import colors from '../../utils/colors.module.scss';

interface INewTodoModal {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTodoModal({isOpen, onRequestClose}: INewTodoModal) {
  const { listCreate } = useTodo();
  const [color, setColor] = useState('#fefeff');
  const [title, setTitle] = useState('');

  async function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();

    await listCreate({
      title,
      color
    })

    setTitle('');
    setColor('#fefeff');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <form style={{background: color}} onSubmit={handleCreateNewTodo}>
        <header className={styles.headerModal} style={{background: color}}>
          <button
            type="button"
            onClick={onRequestClose}
            style={color !== '#fefeff' ? {color: '#fff'}: {color: "#959594"}}
          >
            cancel
          </button>

          <strong
            style={color !== '#fefeff' ? {color: '#fff'}: {color: "#464647"}}
          >
            new list
          </strong>

          <button
            type="submit"
            style={color !== '#fefeff' ? {color: '#fff'}: {color: "#959594"}}
          >
            save
          </button>
        </header>

        <div className={styles.container}>
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={event => setTitle(event.target.value)}
          style={color !== '#fefeff' ? {color: '#fff'}: {color: "#606061"}}
        />

          <div className={styles.todoColorContainer}>
            <strong
              style={color !== '#fefeff' ? {color: '#fff'}: {color: "#606061"}}
            >
              Choose Color
            </strong>
            <div className={styles.todoColorContent}>
              <button
                type="button"
                style={{background: colors.colorBlue}}
                onClick={() => setColor(colors.colorBlue)}
              />
              <button
                type="button"
                style={{background: colors.colorRed}}
                onClick={() => setColor(colors.colorRed)}
              />
              <button
                type="button"
                style={{background: colors.colorOrange}}
                onClick={() => setColor(colors.colorOrange)}
              />
              <button
                type="button"
                style={{background: colors.colorGreen}}
                onClick={() => setColor(colors.colorGreen)}
              />
              <button
                type="button"
                style={{background: colors.colorBlack}}
                onClick={() => setColor(colors.colorBlack)}
              />
              <button
                type="button"
                style={{background: colors.colorDefault}}
                onClick={() => setColor(colors.colorDefault)}
              />
            </div>
          </div>
        </div>

      </form>
    </Modal>
  )
}
