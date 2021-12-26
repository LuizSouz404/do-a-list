import { Header } from "../components/Header";
import { CalendaryModal } from "../components/CalendaryModal";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

export default function Calendar() {
  return (
    <>
      <Header/>
      <CalendaryModal />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {['DoAList.token']: token } = parseCookies(ctx);

  if(!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: {
      data: token
    }
  }
}
