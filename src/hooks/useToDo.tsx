import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from 'uuid';

export interface ITodo {
  id: string;
  title: string;
  check: boolean;
  createdAt: Date;
  deadline: Date;
}

export interface ITodoCategory {
  id: string;
  title: string;
  color: string;
  todos: ITodo[];
  createdAt: Date;
}

type IListTodoSummary = Pick<ITodoCategory, 'id' | 'title'>;

export interface ITodoPriority {
  list: IListTodoSummary;
  todo: ITodo;  
}

type ITodoCategoryInput = Pick<ITodoCategory, 'title' | 'color'>;
type ITodoCategorySelector = Pick<ITodoCategory, 'id'>;
type ITodoCategoryColor = Pick<ITodoCategory, 'id' | 'color'>;

type ITodoInput = Pick<ITodo, 'title' | 'deadline'>;
type IDeleteTodo = {idList: string; idTodo: string};
type ICheckedTodo = {idList: string; idTodo: string};
type ICreateTodo = {id:string; createTodo: ITodoInput};

interface ITodosContextData {
  todos: ITodoCategory[];
  priority: ITodoPriority[];
  name: string;
  login: (name: string) => void;
  logout: () => void;
  createList: ({title, color}: ITodoCategoryInput) => void;
  deleteList: ({id}: ITodoCategorySelector) => void;
  updateColorList: ({id, color}: ITodoCategoryColor) => void;
  createTodo: ({id, createTodo}: ICreateTodo) => void;
  checkedTodo: ({idList,  idTodo}: ICheckedTodo) => void;
  deleteTodo: ({idList,  idTodo}: IDeleteTodo) => void;
}

interface ITodosProviderProps {
  children: ReactNode;
}

const TodosContext = createContext<ITodosContextData>(
  {} as ITodosContextData
);

export function TodosProvider({children}: ITodosProviderProps) {
  const [todos, setTodos] = useState<ITodoCategory[]>([]);
  const [priority, setPriority] = useState<ITodoPriority[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const newTodo = todos;
    const newPriorityArray: ITodoPriority[] = [];
    
    newTodo.map(list => {
      list.todos.filter(todo => {
        if(!todo.check) {          
          const priorityList = {
            list: {
              id: list.id,
              title: list.title
            },
            todo
          }

          newPriorityArray.push(priorityList);
        }
      });
    });

    console.log(newPriorityArray);

    newPriorityArray.map(list => {
      list.todo
    })

    
    newPriorityArray.sort((a, b) => {
      return a.todo.deadline.getTime() - b.todo.deadline.getTime();
    });
    console.log(newPriorityArray)
    
    setPriority(newPriorityArray); 
  }, [todos])
    
  function login(name: string) {
    localStorage.setItem("@DoAList:name", name);
    setName(name);
  }

  function logout() {
    localStorage.removeItem("@DoAList:name");
    setName('');
  }

  useEffect(() => {
    const authName = localStorage.getItem('@DoAList:name');

    if(authName) {
      setName(authName);
    }
  }, [])

  function createList({title, color}: ITodoCategoryInput) {
    const todo: ITodoCategory = {
      id: uuidV4(),
      title: title,
      color: color,
      todos: [],
      createdAt: new Date()
    };
    
    if(todo.title !== "") {
      setTodos([...todos, todo]);
    }
  }

  function deleteList({id}: ITodoCategorySelector) {
    const newTodos = todos;

    const indexDelete = newTodos.findIndex(todo => todo.id === id);

    if (indexDelete !== -1) {
      newTodos.splice(indexDelete, 1);
  
      setTodos([...newTodos]);
    }

  }

  function updateColorList({id, color}: ITodoCategoryColor) {
    const newTodos = todos;

    const indexUpdated = newTodos.findIndex(todo => todo.id === id);

    if(indexUpdated !== -1) {
      newTodos[indexUpdated].color = color;

      setTodos([...newTodos]);
    }
  }

  function createTodo({id, createTodo:{title, deadline}}: ICreateTodo) {
    const newTodos = todos;

    const indexUpdated = newTodos.findIndex(todo => todo.id === id);

    
    if(title !== "") {
      if(indexUpdated !== -1) {
        const newList : ITodo = {
          id: uuidV4(),
          title,
          deadline: deadline || new Date(), 
          check: false,
          createdAt: new Date()
        }
  
        newTodos[indexUpdated].todos.push(newList);
  
        setTodos([...newTodos]);
      }
    }
  }

  function checkedTodo({ idList, idTodo }: ICheckedTodo) {
    const newTodos = todos;

    const indexCheckedList = newTodos.findIndex(todo => todo.id === idList);

    if(indexCheckedList !== -1) {
      const indexCheckedTodo = newTodos[indexCheckedList].todos.findIndex(todo => todo.id === idTodo);

      if(indexCheckedTodo !== -1) {
        newTodos[indexCheckedList].todos[indexCheckedTodo].check=!newTodos[indexCheckedList].todos[indexCheckedTodo].check
        
  
        setTodos([...newTodos]);
      }
    }
  }

  function deleteTodo({idList,  idTodo}: IDeleteTodo) {
    const newTodos = todos;

    const indexUpdated = newTodos.findIndex(todo => todo.id === idList);
    
    if (indexUpdated !== -1) {
      const indexListDelete = newTodos[indexUpdated].todos.findIndex(list => list.id === idTodo);

      newTodos[indexUpdated].todos.splice(indexListDelete, 1);
  
      setTodos([...newTodos]);
    }

  }
  
  return (
    <TodosContext.Provider value={{
      todos, 
      priority,
      name, 
      login, 
      logout, 
      createList, 
      deleteList,
      updateColorList, 
      createTodo, 
      deleteTodo, 
      checkedTodo, 
    }}>
      {children}
    </TodosContext.Provider>
  )
}

export function useTodos() {
  const context = useContext(TodosContext);

  return context;
}