import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { SignUpPage } from "../components/SignUpPage";

export default function SignUp() {
  return(
    <SignUpPage />
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
