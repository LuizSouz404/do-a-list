import { FormEvent, useState } from 'react';
import { IListTodo, useTodo } from '../../context/todo';
import Modal from 'react-modal';
import { MenuConfig } from '../MenuConfig';

import styles from './styles.module.scss';
import { CgArrowsExpandRight, CgMoreAlt } from 'react-icons/cg';
import { BsPencilFill } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti'

interface IDetailsTodo {
  isOpen: boolean;
  onRequestClose: () => void;
  todo: IListTodo;
}

export function DetailsTodo({isOpen, onRequestClose, todo}: IDetailsTodo) {
  const {todoCreate, todoDelete, todoUpdateCheck} = useTodo();
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const completed = todo.todos.reduce((acc, todo) => {
    todo.check ? acc++ : acc;

    return acc;
  }, 0);

  async function handleCheckedTodo(listID: string, todoID: string) {
    await todoUpdateCheck({listID, todoID});
  }

  async function handleCreateNewList(event: FormEvent) {
    event.preventDefault();

    let deadlineString = deadline;

    if(deadlineString === '') {
      deadlineString = '23:59';
    }

    const [hour, minute] = deadlineString.split(':');

    const today = Date.now();

    const dateTodo = new Date(today).setHours(parseInt(hour), parseInt(minute));

    await todoCreate({id: todo.id, title, deadline: new Date(dateTodo)});

    setTitle('');
    setDeadline('');
  }

  async function handleDeleteList(listID: string, todoID: string) {
    await todoDelete({listID, todoID});
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className={styles.container} style={{background: todo.color}}>
        <header style={todo.color === '#fefeff' ? {color: "#000", fill: "#000", background: todo.color} : {color: "#fff", fill: "#fff", background: todo.color}}>
          <div className={styles.title}>
            <strong>
              {todo.title}
            </strong>
            <span>{completed}/{todo.todos.length}</span>
          </div>
          <div className={styles.btnDetails} >
            <CgMoreAlt className={styles.btnDetails} size={24} style={todo.color === '#fefeff' ? {color: "#000"} : {color: "#fff"}} onClick={() => setModalOpen(!modalOpen)}/>
            {modalOpen ? (
              <MenuConfig listID={todo.id} />
            ) : ""}
          </div>
        </header>

        <form className={styles.inputList} onSubmit={handleCreateNewList}>
          <input
            type="text"
            placeholder="new list"
            style={todo.color === '#fefeff' ? {color: "#000", borderBottom: '1px solid #000'} : {color: "#fff", borderBottom: '1px solid #fff'}}
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <input
            type="time"
            style={todo.color === '#fefeff' ? {color: "#000", borderBottom: '1px solid #000'} : {color: "#fff", borderBottom: '1px solid #fff'}}
            value={deadline}
            onChange={event => setDeadline(event.target.value)}
          />
          <button type='submit'>
            <BsPencilFill style={todo.color === '#fefeff' ? {color: "#000"} : {color: "#fff"}}/>
          </button>
        </form>

        <div className={styles.content}>

          <ul style={todo.color === '#fefeff' ? {color: "#000"} : {color: "#fff"}}>
            {todo.todos.map(list => (
              <li key={list.id} style={list.check ? {textDecoration: 'line-through'} : {}} >
                <span onClick={() => handleCheckedTodo(todo.id, list.id)}>{list.title}</span>
                <TiDelete size={24} onClick={() => handleDeleteList(todo.id, list.id)} style={todo.color === '#fefeff' ? {color: "#000"} : {color: "#fff"}}/>
              </li>
            ))}
          </ul>
        </div>

        <CgArrowsExpandRight className={styles.btnExpand} size={24} style={todo.color === '#fefeff' ? {color: "#000"} : {color: "#fff"}} onClick={onRequestClose}/>
      </div>
    </Modal>
  )
}
