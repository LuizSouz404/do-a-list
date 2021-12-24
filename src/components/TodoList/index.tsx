import { useState } from 'react';
import {CgMoreAlt, CgArrowsExpandRight} from 'react-icons/cg';
import { ITodoCategory, useTodos } from '../../hooks/useToDo';
import colors from '../../utils/colors.module.scss';
import { DetailsTodo } from '../DetailsTodo';

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
            <CgMoreAlt className={styles.btnDetails} size={24} style={color === '#fefeff' ? {color: "#000"} : {color: "#fff"}} onClick={() => setModalOpen(!modalOpen)}/>
            {modalOpen ? (
              <MenuConfig idList={id} />
            ) : ""}
          </div>
        </header>

        <CgArrowsExpandRight className={styles.btnExpand} size={24} style={color === '#fefeff' ? {color: "#000"} : {color: "#fff"}} onClick={handleOpenDetailTodo}/>
      </div>
      
      <DetailsTodo isOpen={isDetailsTodoOpen} onRequestClose={handleCloseDetailTodo} todo={todoInformation}/>
    </>
  )
}

interface IMenuTypes {
  idList: string
}

function MenuConfig({idList}: IMenuTypes) {
  const [chooseColor, setChooseColor] = useState(false);
  const { deleteList, updateColorList } = useTodos();

  async function handleDeleteTodo(id: string) {
    await deleteList({id});
  }

  async function handleChangeColorTodo(id: string, color: string) {
    await updateColorList({id, color}) 
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