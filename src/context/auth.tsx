import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { api } from "../services/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";

type IUser = {
  id: string,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: Date,
}

type AuthState = {
  token: string;
}

type SignInCredentials = {
  email: string,
  password: string,
}

type SignUpCredentials = {
  name: string,
  email: string,
  password: string
}

type AuthContextData = {
  user:IUser | undefined;
  setSession: (user: IUser) => void;
  signUp: (credentials: SignUpCredentials) => Promise<void>,
  signIn: (credentials: SignInCredentials) => Promise<void>,
  signOut: () => void,
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<IUser>();
  const [data, setData] = useState<AuthState>(() => {
    const {['DoAList.token']: token } = parseCookies();

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { token };
    }

    return {} as AuthState;
  });

  function setSession({id,name,email,createdAt,updatedAt}: IUser) {
    setUser({id,name,email,createdAt,updatedAt})
  }

  const signUp = useCallback(async({ name ,email,password }) => {
      await api.post('signup', {
        name, email, password
    });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('signin', {
      email,
      password
    });

    const { token } = response.data;

    setCookie(undefined, 'DoAList.token', token, {
      maxAge: 60 * 60 * 24 //24Hour
    });

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setData({ token });
  }, []);

  const signOut = useCallback(() => {
    destroyCookie(undefined, 'DoAList.token');

    setData({} as AuthState);
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider value={{ setSession, user, signUp, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
