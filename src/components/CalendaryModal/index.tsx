import Modal from 'react-modal';
import Calendar from 'react-calendar';  

export function CalendaryModal() {
  return (
    <Modal isOpen={true}>
      <Calendar className='react-calendar' />

    </Modal>
  )
}