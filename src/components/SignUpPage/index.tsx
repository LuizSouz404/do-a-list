import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from 'yup';

import styles from './styles.module.scss';
import { FaFacebookF, FaGithub, FaGoogle, FaLock, FaSignInAlt, FaTwitter, FaUser } from 'react-icons/fa'
import { CgMail } from 'react-icons/cg'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Router from 'next/router';
import { useAuth } from '../../context/auth';

type SignUpData = {
  username: string,
  email: string,
  password: string
}

export function SignUpPage() {
  const { register, watch, handleSubmit, formState: {errors} } = useForm<SignUpData>();

  const formRef = useRef<HTMLFormElement | null>(null);
  const {signUp, user} = useAuth();

  //Focus or Blur
  const [isActiveUsername, setIsActiveUsername] = useState(false);
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);

  const onSubmit: SubmitHandler<SignUpData> = useCallback(async(data: SignUpData) => {
    try {
      const schema = Yup.object().shape({
        username: Yup.string()
          .required('Nome obrigatório')
          .min(3, 'Minimo 3 caracteres para o nome')
          .max(15, 'Máximo de 15 caracteres'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .max(30)
          .email('Digite um e-mail válido'),
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

      const {username, email, password} = data;

      await signUp({
        name: username,
        email,
        password
      });

      toast.success('Tudo certinho, conta criada com sucesso! ☺️');

      Router.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach(err => {
          toast.error(`${err}`)
        });

        return;
      }

      toast.error("Ocorreu um erro ao fazer registro, cheque as credenciais.")
    }
  }, [signUp, toast]);

  function toggleInputUsername() {
    setIsActiveUsername(!isActiveUsername);
  }

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
        <Image width={558} height={120} src="/logo.png" alt="Do a List" />
      </div>

      <div className={styles.content}>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>

          <h1>Sign in</h1>

          <span>
            Already have an account?{' '}
            <Link href='/signin' passHref>
              <a> Sign in</a>
            </Link>
          </span>

          <div className={styles.socialSignUp}>
            <div>
              <FaFacebookF size={24}/>
            </div>
            <div>
              <FaGoogle size={24}/>
            </div>
            <div>
              <FaGithub size={24}/>
            </div>
            <div>
              <FaTwitter size={24}/>
            </div>
          </div>

          <div className={styles.divisor}>
            <div/>
            <span>or</span>
            <div/>
          </div>

          <div style={isActiveUsername || watch('username') ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>

            <label htmlFor="Username">
              <FaUser />
            </label>

            <input
              {...register('username')}
              type="text"
              placeholder="Username"
              name="username"
              onFocus={toggleInputUsername}
              onBlur={toggleInputUsername}
            />

          </div>

          <div style={isActiveEmail || watch('email') ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>

            <label htmlFor="email">
              <CgMail size={23} />
            </label>

            <input
              {...register('email')}
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

        <div className={styles.imageContent}>
          <Image width={500} height={500} src="/images/question.svg" alt="https://storyset.com/people by Storyset" />
        </div>

      </div>
    </div>
  )
}
