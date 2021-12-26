import { useState } from 'react';
import { useTodo } from '../../context/todo';

import styles from './styles.module.scss';
import colors from '../../utils/colors.module.scss';
import { CgBox, CgColorBucket, CgTrash } from 'react-icons/cg';

interface IMenuTypes {
  listID: string
}

export function MenuConfig({listID}: IMenuTypes) {
  const [chooseColor, setChooseColor] = useState(false);
  const { listDelete, listUpdateColor } = useTodo();

  async function handleDeleteTodo(id: string) {
    await listDelete({id});
  }

  async function handleChangeColorTodo(id: string, color: string) {
    await listUpdateColor({id, color})
  }

  return (
    <div className={styles.tabConfig}>
      <a onClick={() => handleDeleteTodo(listID)}>
        <CgTrash size={24} className={styles.iconMenu} />
        Delete list
      </a>
      <a>
        <CgBox size={24} className={styles.iconMenu} />
        Send to archive
      </a>
      <div>
        <a onClick={() => setChooseColor(!chooseColor)}>
          <CgColorBucket size={24} className={styles.iconMenu} />
          Choose color
        </a>
        {chooseColor ? (
          <div className={styles.todoColorContainer}>
          <div className={styles.todoColorContent}>
            <button
              type="button"
              style={{background: colors.colorBlue}}
              onClick={() => handleChangeColorTodo(listID, colors.colorBlue)}
            />
            <button
              type="button"
              style={{background: colors.colorRed}}
              onClick={() => handleChangeColorTodo(listID, colors.colorRed)}
            />
            <button
              type="button"
              style={{background: colors.colorOrange}}
              onClick={() => handleChangeColorTodo(listID, colors.colorOrange)}
            />
            <button
              type="button"
              style={{background: colors.colorGreen}}
              onClick={() => handleChangeColorTodo(listID, colors.colorGreen)}
            />
            <button
              type="button"
              style={{background: colors.colorBlack}}
              onClick={() => handleChangeColorTodo(listID, colors.colorBlack)}
            />
            <button
              type="button"
              style={{background: colors.colorDefault}}
              onClick={() => handleChangeColorTodo(listID, colors.colorDefault)}
            />
          </div>
        </div>
        ): ""}

      </div>

    </div>
  )
}
