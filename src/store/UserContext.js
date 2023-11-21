import React, {useEffect, useState}  from "react";

const UserContext = React.createContext()

const UserProvider = ({ children, valueUser }) => {
    
  const [user, setUser] = useState(valueUser);

  useEffect(() => {
  });

  const login = (name) => {
    setUser((user) => ({
      isAuthed: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({
      isAuthed: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}


export { UserProvider }
export const UserConsumer = UserContext.Consumer;

export default UserContext;