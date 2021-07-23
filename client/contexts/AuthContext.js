import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logout = () => () => {
    Cookies.remove('user');
    setUser({});
  };

  useEffect(() => {
    const userCookie = Cookies.getJSON('user');

    if (userCookie) {
      setUser(userCookie);
    }
  }, []);

  return <UserContext.Provider value={{ user, logout }}>{children}</UserContext.Provider>;
};

const useAuth = () => {
  return useContext(UserContext);
};

export { AuthProvider, useAuth };
