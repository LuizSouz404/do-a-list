import { Dashboard } from "../components/Dashboard";
import { Header } from "../components/Header";
import { useState } from "react";
import { NewTodoModal } from "../components/NewTodoModal";
import { LoginPage } from "../components/LoginPage";

export default function Home() {
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);

  function handleOpenNewTodoModal() {
    setIsNewTodoModalOpen(true);
  }
  
  function handleCloseNewTodoModal() {
    setIsNewTodoModalOpen(false);
  }

  return (
    <>
      <LoginPage />
      <Header/>
      <Dashboard onOpenNewTodoModal={handleOpenNewTodoModal} />
      <NewTodoModal 
        isOpen={isNewTodoModalOpen} 
        onRequestClose={handleCloseNewTodoModal}
      />
    </>
  )
}