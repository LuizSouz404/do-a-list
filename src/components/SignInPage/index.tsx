import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';
import { useTodos } from '../../hooks/useToDo';
import styles from './styles.module.scss';
import { FaFacebookF, FaGithub, FaGoogle, FaLock, FaSignInAlt, FaTwitter, FaUser } from 'react-icons/fa'

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

  function toogleInputEmail() {
    setIsActiveEmail(!isActiveEmail);
    setIsFilledEmail(!!inputRefEmail.current?.value)
  }

  function toogleInputPassword() {
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
      <img src="/logo.png" alt="Do a List" />
      <div className={styles.content}>
        <img src="/images/question.svg" alt="https://storyset.com/people by Storyset" />
        <form onSubmit={handleName}>

          <h1>Sign in</h1>
          <span>
            Don't have an account yet?{' '}
            <Link href='/signup' passHref>
              <a>Sign up</a>
            </Link>
          </span>

          <div className={styles.socialSignin}>
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

          <div style={isActiveEmail || isFilledEmail ? {
            "border": "2px solid #Fb993f",
            "color": "#Fb993f"
          }: {}} className={styles.inputStyled}>
            <label htmlFor="email">
              <FaUser />
            </label>
            <input 
              type="email" 
              placeholder="Seu email" 
              name="email"
              ref={inputRefEmail}
              onFocus={toogleInputEmail}
              onBlur={toogleInputEmail}
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
              onFocus={toogleInputPassword}
              onBlur={toogleInputPassword}
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
      </div>
    </div>
  )
}
