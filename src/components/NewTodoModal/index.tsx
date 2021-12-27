import { useTodo } from '../../context/todo';
import { FormEvent, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Modal from 'react-modal';

import styles from './styles.module.scss';
import colors from '../../utils/colors.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface INewTodoModal {
  isOpen: boolean;
  onRequestClose: () => void;
}

type ListData = {
  title: string;
  color: string;
}

export function NewTodoModal({isOpen, onRequestClose}: INewTodoModal) {
  const { register, watch, setValue, handleSubmit, reset, formState: { errors,isSubmitted} } = useForm<ListData>({
    defaultValues: {
      color: '#fefeff'
    }
  })
  const formRef = useRef<HTMLFormElement | null>(null);

  const { listCreate } = useTodo();

  const onSubmit: SubmitHandler<ListData> = useCallback(async(data: ListData) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string()
          .required('Titulo obrigatório.')
          .max(30, "Máximo 30 caracteres"),
        color: Yup.string()
          .required('Selecione uma das cores')
      });

      await schema.validate(
        (data), {
          abortEarly: false
        }
      );

      const {title, color} = data;

      await listCreate({title, color});

      toast.success('Lista criada :)');

      onRequestClose();
      reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach(err => {
          toast.error(`${err}`)
        });

        return;
      }

      toast.error("Ocorreu um erro ao criar uma lista.")
    }
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <form ref={formRef} style={{background: watch('color')}} onSubmit={handleSubmit(onSubmit)}>
        <header className={styles.headerModal} style={{background: watch('color')}}>
          <button
            type="button"
            onClick={onRequestClose}
            style={watch('color') !== '#fefeff' ? {color: '#fff'}: {color: "#959594"}}
          >
            cancel
          </button>

          <strong
            style={watch('color') !== '#fefeff' ? {color: '#fff'}: {color: "#464647"}}
          >
            new list
          </strong>

          <button
            type="submit"
            style={watch('color') !== '#fefeff' ? {color: '#fff'}: {color: "#959594"}}
          >
            save
          </button>
        </header>

        <div className={styles.container}>
        <input
          {...register('title')}
          type="text"
          placeholder="Titulo"
          style={watch('color') !== '#fefeff' ? {color: '#fff'}: {color: "#606061"}}
        />

          <div className={styles.todoColorContainer}>
            <strong
              style={watch('color') !== '#fefeff' ? {color: '#fff'}: {color: "#606061"}}
            >
              Choose Color
            </strong>
            <div className={styles.todoColorContent}>
              <button
                type="button"
                style={{background: colors.colorBlue}}
                onClick={() => setValue('color', colors.colorBlue)}
              />
              <button
                type="button"
                style={{background: colors.colorRed}}
                onClick={() => setValue('color', colors.colorRed)}
              />
              <button
                type="button"
                style={{background: colors.colorOrange}}
                onClick={() => setValue('color', colors.colorOrange)}
              />
              <button
                type="button"
                style={{background: colors.colorGreen}}
                onClick={() => setValue('color', colors.colorGreen)}
              />
              <button
                type="button"
                style={{background: colors.colorBlack}}
                onClick={() => setValue('color', colors.colorBlack)}
              />
              <button
                type="button"
                style={{background: colors.colorDefault}}
                onClick={() => setValue('color', colors.colorDefault)}
              />
            </div>
          </div>
        </div>

      </form>
    </Modal>
  )
}
