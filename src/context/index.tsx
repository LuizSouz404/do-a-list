import { ReactNode } from 'react';
import {AuthProvider} from './auth';
import { TodoProvider } from './todo';

type AppProviderProps = {
  children: ReactNode;
}

export default function AppProvider({children}: AppProviderProps) {
  return (
    <AuthProvider>
      <TodoProvider>
        {children}
      </TodoProvider>
    </AuthProvider>
  )
}
