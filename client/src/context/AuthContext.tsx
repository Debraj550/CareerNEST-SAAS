import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserSignin {
  name: string;
  email: string;
  date_joined: string;
  status: boolean;
  isTenant: number;
}

interface AuthContextProps {
  user: UserSignin;
  setUser: React.Dispatch<React.SetStateAction<UserSignin>>;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSignin>({
    name: "",
    email: "",
    date_joined: "",
    status: false,
    isTenant: 0,
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
