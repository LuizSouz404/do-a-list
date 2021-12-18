import Modal from 'react-modal';
import Calendar from 'react-calendar';  
import styles from './styles.module.scss';
import {CgChevronLeft, CgChevronRight} from 'react-icons/cg';

export function CalendaryModal() {
  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content-calendar" 
      isOpen={true}
    >
      <div className={styles.container}>
        <Calendar 
        tileContent={""}
          locale='pt-BR' 
          prevLabel={<CgChevronLeft /> }  
          nextLabel={<CgChevronRight /> }
          next2Label={""}  
          prev2Label={""}  
          tileClassName={styles.tile} 
          className='react-calendar' 
        />

        <div className={styles.content}>
          <div className={styles.todo}>
            <h2>hello world</h2>
            <span>5/5</span>
          </div>
          <div className={styles.todo}>
            <h2>hello world</h2>
            <span>2/5</span>
          </div>  
        </div>
      </div>

    </Modal>
  )
}