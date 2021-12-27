import { useCallback, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth';
import Router from 'next/router';
import Link from 'next/link';
import * as Yup from 'yup';
import Image from 'next/image';

import toast, { Toaster } from 'react-hot-toast';

import styles from './styles.module.scss';
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaLock,
  FaSignInAlt,
  FaTwitter } from 'react-icons/fa'
import { CgMail } from 'react-icons/cg'

type SignInData = {
  email: string,
  password: string
}

export function SignInPage() {
  const { register, watch, handleSubmit, formState: {errors} } = useForm<SignInData>();

  const formRef = useRef<HTMLFormElement | null>(null);
  const {user, signIn} = useAuth();

  // Focus or Blur
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);

  const onSubmit: SubmitHandler<SignInData> = useCallback(async(data: SignInData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido')
          .max(30),
        password: Yup.string()
          .required('Senha obrigatória')
          .min(5, 'Senha minimo 5 caracteres')
          .max(15, 'Senha máximo de 15 caracteres'),
      });

      await schema.validate(
        (data), {
          abortEarly: false
        }
      );

      const {email, password} = data;

      await signIn({
        email,
        password
      });

      toast.success('Tudo certo! ☺️');

      Router.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach(err => {
          toast.error(`${err}`)
        });

        return;
      }

      toast.error("Ocorreu um erro ao fazer login, cheque as credenciais.")
    }
  }, [signIn, toast]);


  function toggleInputEmail() {
    setIsActiveEmail(!isActiveEmail);
  }

  function toggleInputPassword() {
    setIsActivePassword(!isActivePassword);
  }

  return (
    <div
      className={styles.container}
      style={user?
      {visibility: 'hidden', opacity: '0', transition: 'visibility .3s, opacity .3s ease-in-out'} :
      {visibility: 'visible', opacity: '1', transition: 'visibility .3s, opacity .3s ease-in-out'}}
    >

      <Toaster position="bottom-center" reverseOrder={false} key='main'/>

      <div className={styles.imageLogo}>
        <Image priority={true} width={279} height={60} src="/imglog.png" alt="Do a List" />
      </div>

      <div className={styles.content}>

        <div className={styles.imageContent}>
          <Image width={500} height={500} src="/images/question.svg" alt="https://storyset.com/people by Storyset" />
        </div>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>

          <h1>Sign in</h1>

          <span>
            Don&apos;t have an account yet?
            <Link href='/signup' passHref>
              <a> Sign up</a>
            </Link>
          </span>

          <div className={styles.socialSignIn}>
            <div onClick={() => alert('In maintenance sorry')}>
              <FaFacebookF size={24}/>
            </div>
            <div onClick={() => alert('In maintenance sorry')}>
              <FaGoogle size={24}/>
            </div>
            <div onClick={() => alert('In maintenance sorry')}>
              <FaGithub size={24}/>
            </div>
            <div onClick={() => alert('In maintenance sorry')}>
              <FaTwitter size={24}/>
            </div>
          </div>

          <div className={styles.divisor}>
            <div/>
            <span>or</span>
            <div/>
          </div>

          <div style={isActiveEmail || watch('email') ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>

            <label htmlFor="email">
              <CgMail size={16}/>
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="Seu email"
              name="email"
              onFocus={toggleInputEmail}
              onBlur={toggleInputEmail}
            />

          </div>

          <div style={isActivePassword || watch('password') ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>

            <label htmlFor="password">
              <FaLock size={16}/>
            </label>

            <input
              {...register('password')}
              type="password"
              placeholder="Sua senha"
              name="password"
              onFocus={toggleInputPassword}
              onBlur={toggleInputPassword}
            />

          </div>

          <button type="submit">
            <FaSignInAlt />
            Sign in with email
          </button>

        </form>
      </div>
    </div>
  )
}
