import { useState } from 'react';
import { ITodoCategory } from '../../hooks/useToDo';
import { DetailsTodo } from '../DetailsTodo';
import { MenuConfig } from '../MenuConfig';

import {CgMoreAlt, CgArrowsExpandRight} from 'react-icons/cg';
import styles from './styles.module.scss';

export function TodoList({title, todos, color, id, createdAt}: ITodoCategory) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDetailsTodoOpen, setIsDetailsTodoOpen] = useState(false);

  const completed = todos.reduce((acc, todo) => {
    todo.check ? acc++ : acc;

    return acc;
  }, 0);

  const todoInformation = {id, title, color, todos, createdAt};

  function handleOpenDetailTodo() {
    setIsDetailsTodoOpen(true);
  }

  function handleCloseDetailTodo() {
    setIsDetailsTodoOpen(false);
  }

  return (
    <>
      <div className={styles.container} style={{background: color}} draggable="true">
        <header style={color === '#fefeff' ? {color: "#000", fill: "#000"} : {color: "#fff", fill: "#fff"}}>
          <div className={styles.title}>
            <strong>
              {title}
            </strong>
            <span>{completed}/{todos.length}</span>
          </div>
          <div className={styles.btnDetails} >
            <CgMoreAlt className={styles.btnDetails} size={30} style={color === '#fefeff' ? {color: "#000"} : {color: "#fff"}} onClick={() => setModalOpen(!modalOpen)}/>
            {modalOpen && (<MenuConfig idList={id} />)}
          </div>
        </header>

        <CgArrowsExpandRight className={styles.btnExpand} size={30} style={color === '#fefeff' ? {color: "#000"} : {color: "#fff"}} onClick={handleOpenDetailTodo}/>
      </div>

      <DetailsTodo isOpen={isDetailsTodoOpen} onRequestClose={handleCloseDetailTodo} todo={todoInformation}/>
    </>
  )
}
