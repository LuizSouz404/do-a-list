import { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTodos } from '../../hooks/useToDo';

import styles from './styles.module.scss';
import { FaFacebookF, FaGithub, FaGoogle, FaLock, FaSignInAlt, FaTwitter, FaUser } from 'react-icons/fa'
import { CgMail } from 'react-icons/cg'

export function SignUpPage() {
  const {register, user} = useTodos();
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Username input
  const inputRefUsername = useRef<HTMLInputElement>(null);
  const [isActiveUsername, setIsActiveUsername] = useState(false);
  const [isFilledUsername, setIsFilledUsername] = useState(false);

  // Email input
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isFilledEmail, setIsFilledEmail] = useState(false);

  // Password input
  const inputRefPassword = useRef<HTMLInputElement>(null);
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [isFilledPassword, setIsFilledPassword] = useState(false);

  async function handleName(event: FormEvent) {
    event.preventDefault();

    await register({username: usernameInput, email: emailInput, password: passwordInput})

    setPasswordInput('');
    setEmailInput('');
  }

  function toggleInputUsername() {
    setIsActiveUsername(!isActiveUsername);
    setIsFilledUsername(!!inputRefUsername.current?.value)
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
        <form onSubmit={handleName}>

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

          <div style={isActiveUsername || isFilledUsername ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>
            <label htmlFor="Username">
              <FaUser />
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              ref={inputRefUsername}
              onFocus={toggleInputUsername}
              onBlur={toggleInputUsername}
              value={usernameInput}
              onChange={event => setUsernameInput(event.target.value)}
            >
            </input>
          </div>

          <div style={isActiveEmail || isFilledEmail ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>
            <label htmlFor="email">
              <CgMail size={23} />
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
            >
            </input>
          </div>

          <div style={isActivePassword || isFilledPassword ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>
            <FaLock />
            <input
              type="password"
              placeholder="Sua senha"
              name="password"
              ref={inputRefPassword}
              onFocus={toggleInputPassword}
              onBlur={toggleInputPassword}
              value={passwordInput}
              onChange={event => setPasswordInput(event.target.value)}
            >
            </input>
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
