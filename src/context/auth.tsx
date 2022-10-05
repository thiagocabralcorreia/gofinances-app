import { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserSchema {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: UserSchema;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = { id: "id", name: "Thiago", email: "thiago@email.com" };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

//Context Hook
const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
