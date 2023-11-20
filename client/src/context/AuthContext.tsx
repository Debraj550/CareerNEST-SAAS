import React, { useState, createContext, ReactNode, useEffect } from "react";

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

  const fetchStorage = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const data = JSON.parse(storedUser);
      if (data.status === true) {
        setUser(data);
      }
    }
  };
  useEffect(() => {
    fetchStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
