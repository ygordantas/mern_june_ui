import { createContext, useState } from "react";

interface UserContextType {
  userId?: string;
  setUserId: (userId?: string) => void;
}

export const UserContext = createContext<UserContextType>({
  userId: undefined,
  setUserId: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
