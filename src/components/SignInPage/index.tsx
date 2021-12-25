import { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTodos } from '../../hooks/useToDo';

import styles from './styles.module.scss';
import { FaFacebookF, FaGithub, FaGoogle, FaLock, FaSignInAlt, FaTwitter } from 'react-icons/fa'
import { CgMail } from 'react-icons/cg'

export function SignInPage() {
  const {login, user} = useTodos();
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  // Email input
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isFilledEmail, setIsFilledEmail] = useState(false);

  // Passowrd input
  const inputRefPassword = useRef<HTMLInputElement>(null);
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [isFilledPassword, setIsFilledPassword] = useState(false);

  async function handleName(event: FormEvent) {
    event.preventDefault();

    await login({email: emailInput, password: passwordInput})

    setPasswordInput('');
    setEmailInput('');
  }

  function toggleInputEmail() {
    setIsActiveEmail(!isActiveEmail);
    setIsFilledEmail(!!inputRefEmail.current?.value)
  }

  function toggleInputPassword() {
    setIsActivePassword(!isActivePassword);
    setIsFilledPassword(!!inputRefPassword.current?.value)
  }

  return (
    <div
      className={styles.container}
      style={user?
      {visibility: 'hidden', opacity: '0', transition: 'visibility .3s, opacity .3s ease-in-out'} :
      {visibility: 'visible', opacity: '1', transition: 'visibility .3s, opacity .3s ease-in-out'}}
    >

      <div className={styles.imageLogo}>
        <Image width={558} height={120} src="/logo.png" alt="Do a List" />
      </div>

      <div className={styles.content}>

        <div className={styles.imageContent}>
          <Image width={500} height={500} src="/images/question.svg" alt="https://storyset.com/people by Storyset" />
        </div>

        <form onSubmit={handleName}>

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

          <div style={isActiveEmail || isFilledEmail ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>

            <label htmlFor="email">
              <CgMail size={16}/>
            </label>

            <input
              type="email"
              placeholder="Seu email"
              name="email"
              ref={inputRefEmail}
              onFocus={toggleInputEmail}
              onBlur={toggleInputEmail}
              value={emailInput}
              onChange={event => setEmailInput(event.target.value)}
            />

          </div>

          <div style={isActivePassword || isFilledPassword ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>

            <label htmlFor="password">
              <FaLock size={16}/>
            </label>

            <input
              type="password"
              placeholder="Sua senha"
              name="password"
              ref={inputRefPassword}
              onFocus={toggleInputPassword}
              onBlur={toggleInputPassword}
              value={passwordInput}
              onChange={event => setPasswordInput(event.target.value)}
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
