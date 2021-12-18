import { FormEvent, useState } from 'react';
import { CgArrowsExpandRight, CgMoreAlt } from 'react-icons/cg';
import { BsPencilFill } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti'
import Modal from 'react-modal';
import { ITodoCategory, useTodos } from '../../hooks/useToDo';
import colors from '../../utils/colors.module.scss';

import styles from './styles.module.scss';

interface IDetailsTodo {
  isOpen: boolean;
  onRequestClose: () => void;
  todo: ITodoCategory;
}

export function DetailsTodo({isOpen, onRequestClose, todo}: IDetailsTodo) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const { checkedTodo, createTodo, deleteTodo } = useTodos();
  const [modalOpen, setModalOpen] = useState(false);

  const completed = todo.todos.reduce((acc, todo) => {
    todo.check ? acc++ : acc;

    return acc;
  }, 0);

  function handleCheckedTodo(idList: string, idTodo: string) {
    checkedTodo({idList, idTodo});
  }

  function handleCreateNewList(event: FormEvent) {
    event.preventDefault();

    let deadlineString = deadline;

    if(deadlineString === '') {
      deadlineString = '23:59';
    }

    const [hour, minute] = deadlineString.split(':');

    const today = Date.now();

    const dateTodo = new Date(today).setHours(parseInt(hour), parseInt(minute));

    console.log(dateTodo)

    createTodo({id: todo.id, createTodo: {title, deadline: new Date(dateTodo)}});

    setTitle('');
    setDeadline('');
  }

  function handleDeleteList(idList: string, idTodo: string) {
    deleteTodo({idList, idTodo});
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
              <MenuConfig idList={todo.id} />
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


interface IMenuTypes {
  idList: string
}

function MenuConfig({idList}: IMenuTypes) {
  const [chooseColor, setChooseColor] = useState(false);
  const { deleteList, updateColorList } = useTodos();

  function handleDeleteTodo(id: string) {
    deleteList({id});
  }

  function handleChangeColorTodo(id: string, color: string) {
    updateColorList({ id, color }); 
  }
  
  return (
    <div className={styles.tabConfig}>
      <a onClick={() => handleDeleteTodo(idList)}>
        <img src="/images/remove.svg" alt="Remove list" />  
        Delete list
      </a>
      <a>
        <img src="/images/archive.svg" alt="Archive List" />
        Send to archive
      </a>
      <div>
        <a onClick={() => setChooseColor(!chooseColor)}>
          <img src="/images/color.svg" alt="Choose Color" />
          Choose color
        </a>
        {chooseColor ? (
          <div className={styles.todoColorContainer}>
          <div className={styles.todoColorContent}>
            <button 
              type="button"
              style={{background: colors.colorBlue}}
              onClick={() => handleChangeColorTodo(idList, colors.colorBlue)}
            /> 
            <button 
              type="button" 
              style={{background: colors.colorRed}}
              onClick={() => handleChangeColorTodo(idList, colors.colorRed)}
            />
            <button 
              type="button" 
              style={{background: colors.colorOrange}}
              onClick={() => handleChangeColorTodo(idList, colors.colorOrange)}
            />
            <button 
              type="button" 
              style={{background: colors.colorGreen}}
              onClick={() => handleChangeColorTodo(idList, colors.colorGreen)}
            /> 
            <button 
              type="button" 
              style={{background: colors.colorBlack}}
              onClick={() => handleChangeColorTodo(idList, colors.colorBlack)}
            /> 
            <button 
              type="button" 
              style={{background: colors.colorDefault}}
              onClick={() => handleChangeColorTodo(idList, colors.colorDefault)}
            /> 
          </div>
        </div>
        ): ""}
        
      </div>
        
    </div>
  )
}