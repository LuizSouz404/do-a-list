import { Header } from "../components/Header";
import { useState } from "react";
import { NewTodoModal } from "../components/NewTodoModal";
import { LoginPage } from "../components/LoginPage";
import { CalendaryModal } from "../components/CalendaryModal";

export default function Calendar() {
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
      <CalendaryModal />
      <NewTodoModal 
        isOpen={isNewTodoModalOpen} 
        onRequestClose={handleCloseNewTodoModal}
      />
    </>
  )
}