import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../context/auth";

import { Header } from "../components/Header";
import { Dashboard } from "../components/Dashboard";
import { NewTodoModal } from "../components/NewTodoModal";
import { Loading } from "../components/Loading";
import { useTodo } from "../context/todo";
import { api } from "../services/api";

export default function Home() {
  const { user, setSession } = useAuth();
  const { setData } = useTodo();
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);

  useEffect(() => {
    if(!user) {
      api.get('profile/me').then(response => {
        setData(response.data.lists);
        setSession(response.data);
      });
      }
    }, [])

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
