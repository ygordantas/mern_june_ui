import { createContext, useState } from "react";

interface UserContextType {
  userId?: string;
  token?: string;
  setUserId: (userId?: string) => void;
  setToken: (token?: string) => void;
}

export const UserContext = createContext<UserContextType>({
  userId: undefined,
  token: undefined,
  setUserId: () => {},
  setToken: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  return (
    <UserContext.Provider value={{ userId, token, setToken, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
