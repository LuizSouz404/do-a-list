import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { LoginPage } from "../components/SignInPage";

export default function SignIn() {
  return(
    <LoginPage />
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {['DoAList.token']: token } = parseCookies(ctx);

  if(!!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {}
  }
}