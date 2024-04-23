import { createContext, useContext, useState } from "react";

const defaultUser = JSON.parse(localStorage.getItem("user"));
const defaultToken = JSON.parse(localStorage.getItem("token"));

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState(defaultToken);
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

///custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
