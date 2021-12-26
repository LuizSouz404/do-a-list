import Head from 'next/head'
import type { AppProps } from 'next/app';
import '../styles/global.scss';
import Modal from 'react-modal';
import AppProvider from '../context';

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Do a List | Your todo web app</title>
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

export default MyApp
