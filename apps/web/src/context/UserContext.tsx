import React from "react";

export interface User {
  id: string;
  email: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);
