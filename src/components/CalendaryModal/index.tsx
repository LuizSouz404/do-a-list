import Calendar from 'react-calendar';  
import styles from './styles.module.scss';
import {CgChevronLeft, CgChevronRight} from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { ITodoCategory, useTodos } from '../../hooks/useToDo';

export function CalendaryModal() {
  const { todos } = useTodos();
  const [dayTodo, setDayTodo] = useState<ITodoCategory[]>([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const newArray = todos;

    const currentDateTodos = newArray.filter(todo => 
      `${new Date(todo.createdAt.getDate(), todo.createdAt.getMonth(), todo.createdAt.getFullYear())}`
      === 
      `${new Date(date.getDate(), date.getMonth(), date.getFullYear())}`
    );

    setDayTodo(currentDateTodos);
  }, [date])

  return (    
    <div className={styles.container}>
      <Calendar 
      tileContent={""}
        locale='pt-BR' 
        prevLabel={<CgChevronLeft /> }  
        nextLabel={<CgChevronRight /> }
        next2Label={""}  
        prev2Label={""}  
        tileClassName={styles.tile} 
        className={styles.reactCalendar}
        onClickDay={(value) => setDate(value)}
        value={date}
      />

      <div className={styles.content}>
        {dayTodo.map(list => (
          <div 
            className={styles.todo} 
            key={list.id} 
            style={list.color === '#fefeff' ? {color: "#000", fill: "#000", background: list.color} : {color: "#fff", fill: "#fff", background: list.color}}
          >
            <h2>{list.title}</h2>
            <span>{list.todos.filter(todo => todo.check).length}/{list.todos.length}</span>
          </div>
        ))}
      </div>
    </div>
  )
}