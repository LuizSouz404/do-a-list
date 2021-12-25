import { useState } from 'react';
import { useTodos } from '../../hooks/useToDo';

import { CgBox, CgColorBucket, CgTrash } from 'react-icons/cg';
import colors from '../../utils/colors.module.scss';
import styles from './styles.module.scss';

interface IMenuTypes {
  idList: string
}

export function MenuConfig({idList}: IMenuTypes) {
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
