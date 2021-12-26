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
  user: IUser;
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
  user: IUser,
  signUp: (credentials: SignUpCredentials) => Promise<void>,
  signIn: (credentials: SignInCredentials) => Promise<void>,
  signOut: () => void,
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const {['DoAList.token']: token } = parseCookies();
    const {['DoAList.user']: user } = parseCookies();

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

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

    const { token, user } = response.data;

    setCookie(undefined, 'DoAList.token', token, {
      maxAge: 60 * 60 * 24 //24Hour
    });

    setCookie(undefined, 'DoAList.user', JSON.stringify(user), {
      maxAge: 60 * 60 * 24 //24Hour
    });

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    destroyCookie(undefined, 'DoAList.token');
    destroyCookie(undefined, 'DoAList.user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{signUp, signIn, signOut, user: data.user}}>
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
