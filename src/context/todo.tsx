import { compareAsc } from "date-fns";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type ITodo = {
  id: string;
  title: string;
  check: boolean;
  createdAt: Date;
  deadline: Date;
}

export type IListTodo = {
  id: string;
  title: string;
  color: string;
  todos: ITodo[];
  createdAt: Date;
}

type IListTodoSummary = {
  id: string;
  title: string;
}

type IListCreate = {
  title: string;
  color: string;
}

type IListDelete = {
  id: string;
}

type IListUpdateColor =  {
  id: string;
  color: string;
}

type ITodoCreate = {
  id: string;
  title: string;
  deadline: Date;
}

type ITodoUpdateCheck = {
  listID: string;
  todoID: string;
}

type ITodoDelete = {
  listID: string;
  todoID: string;
}

type ITodoPriority = {
  list: IListTodoSummary;
  todo: ITodo;
}

type TodoContextData = {
  todos: IListTodo[];
  priority: ITodoPriority[];
  setData: (data: IListTodo[]) => void;

  listCreate: ({title, color}: IListCreate) => Promise<void>;
  listDelete: ({id}: IListDelete) => Promise<void>;
  listUpdateColor: ({id, color}: IListUpdateColor) => Promise<void>;

  todoCreate: ({id, title, deadline}: ITodoCreate) => Promise<void>;
  todoUpdateCheck: ({listID, todoID}: ITodoUpdateCheck) => Promise<void>;
  todoDelete: ({listID, todoID}: ITodoDelete) => Promise<void>;
}

type TodoProviderProps = {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

export function TodoProvider({children}: TodoProviderProps) {
  const [todos, setTodos] = useState<IListTodo[]>([]);
  const [priority, setPriority] = useState<ITodoPriority[]>([]);

  function setData(data: IListTodo[]) {
    console.log(data);
    setTodos(data)
  }

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

          new Date(priorityList.todo.createdAt)
            .setHours(0,0,0,0) === new Date()
            .setHours(0,0,0,0) && newPriorityArray.push(priorityList);
        }
      });
    });

    newPriorityArray.sort((a,b) => {
      return compareAsc(new Date(a.todo.deadline), new Date(b.todo.deadline));
    });

    setPriority(newPriorityArray);
  }, [todos]);

  const listCreate = useCallback(async ({title, color}: IListCreate) => {
    if(title === "") {
      return;
    }
    console.log(todos);

    api.post('list/create', {
      title,
      color
    }).then(response => {
      const newArrayList = todos;

      setTodos([...newArrayList, response.data]);
    })
  }, [todos]);

  async function listDelete({id}: IListDelete) {
    const newListArray = todos;

    const indexDelete = newListArray.findIndex(list => list.id === id);

    if(indexDelete !== -1) {
      newListArray.splice(indexDelete, 1);

      setTodos([...newListArray]);

      await api.delete(`list/delete/${id}`);
    }
  }

  async function listUpdateColor({id, color}: IListUpdateColor) {
    const newListArray = todos;

    const indexUpdatedList = newListArray.findIndex(list => list.id === id);

    if(newListArray[indexUpdatedList].color === color) {
      return;
    }

    if(indexUpdatedList !== -1) {
      newListArray[indexUpdatedList].color = color;

      setTodos([...newListArray]);

      await api.put(`list/edit/${id}`, {color});
    }
  }

  const todoCreate = useCallback(async({id, title, deadline}: ITodoCreate) => {
    if(title === "") {
      return;
    }

    const newListArray = todos;

    const indexUpdated = newListArray.findIndex(list => list.id === id);

    if(indexUpdated !== -1) {
      const {data} = await api.post(`todo/${id}/create`, {
        title,
        deadline
      });

      newListArray[indexUpdated].todos.push(data);

      setTodos([...newListArray]);
    }
  }, []);

 async function todoUpdateCheck({listID, todoID}: ITodoUpdateCheck) {
    const newListArray = todos;

    const indexList = newListArray.findIndex(list => list.id === listID);

    if(indexList !== -1) {
      const indexTodo = newListArray[indexList].todos.findIndex(todo => todo.id === todoID);

      if(indexTodo !== -1) {
        newListArray[indexList].todos[indexTodo].check = !newListArray[indexList].todos[indexTodo].check;

        setTodos([...newListArray]);

        await api.patch(`todo/check/${todoID}`);
      }
    }
 }

  async function todoDelete({listID, todoID}: ITodoDelete) {
    const newListArray = todos;

    const indexList = newListArray.findIndex(list => list.id === listID);

    if(indexList !== -1) {
      const indexTodo = newListArray[indexList].todos.findIndex(todo => todo.id === todoID);

      if(indexTodo !== -1) {
        newListArray[indexList].todos.splice(indexTodo, 1);

        setTodos([...newListArray]);

        await api.delete(`todo/delete/${todoID}`);
      }
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        priority,
        setData,

        listCreate,
        listDelete,
        listUpdateColor,

        todoCreate,
        todoUpdateCheck,
        todoDelete
      }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo(): TodoContextData {
  const context = useContext(TodoContext);

  if(!context) {
    throw new Error('useTodo must be used with in TodoProvider');
  }

  return context;
}
