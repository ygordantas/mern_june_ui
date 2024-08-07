import { createContext, useState } from "react";
import User from "../models/User";

interface UserContextType {
  user?: User;
  setUser: (user?: User) => void;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
