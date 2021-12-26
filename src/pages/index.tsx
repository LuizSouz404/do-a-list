import { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../context/auth";

import { Header } from "../components/Header";
import { Dashboard } from "../components/Dashboard";
import { NewTodoModal } from "../components/NewTodoModal";
import { Loading } from "../components/Loading";

export default function Home() {
  const { user } = useAuth();
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);

  function handleOpenNewTodoModal() {
    setIsNewTodoModalOpen(true);
  }

  function handleCloseNewTodoModal() {
    setIsNewTodoModalOpen(false);
  }

  if(!user) return(<Loading />)

  return (
    <>
      <Header/>
      <Dashboard onOpenNewTodoModal={handleOpenNewTodoModal} />
      <NewTodoModal
        isOpen={isNewTodoModalOpen}
        onRequestClose={handleCloseNewTodoModal}
      />
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
