import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../api/client";
import { toast } from "sonner";

interface User {
  id: number | null;
  name: string | null;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User>(null);
  const setUser = (newUser: User) => setUserState(newUser);
  const clearUser = () => setUserState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const res = await api.get("/users/me");
    if (res.data.success) {
      setUser(res.data.data);
    } else {
      toast.error(
        "You are not logged in. To use with full features please log in or sign up!"
      );
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside a UserProvider");
  return context;
};
