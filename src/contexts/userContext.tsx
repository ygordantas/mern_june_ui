import { createContext, useState } from "react";

interface UserContextType {
  userId?: string;
  setUserId: (userId?: string) => void;
  token?: string;
  setToken: (token?: string) => void;
}

export const UserContext = createContext<UserContextType>({
  userId: undefined,
  setUserId: () => {},
  token: undefined,
  setToken: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  return (
    <UserContext.Provider value={{ userId, setUserId, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
