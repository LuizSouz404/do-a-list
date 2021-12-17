import Head from 'next/head'
import type { AppProps } from 'next/app';
import { TodosProvider } from '../hooks/useToDo';
import '../styles/global.scss';
import Modal from 'react-modal';

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>      
        <title>Do a List | Your todo web app</title>
      </Head>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </>
  )
}

export default MyApp
