import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [error, setError] = useState(false);

  const logout = () => {
    if (isLogoutLoading) {
      return;
    }

    Cookies.remove('user');

    setIsLogoutLoading(true);

    axios
      .post('/api/sessions/logout')
      .then((res) => {
        setIsLogoutLoading(false);
        if (res.status !== 204) {
          setError(res);
        }
      })
      .catch((err) => {
        setIsLogoutLoading(false);
        setError(err);
      });

    setUser(null);
  };

  useEffect(() => {
    setError(false);
    setIsLogoutLoading(false);
    try {
      const userCookie = Cookies.getJSON('user');
      if (userCookie) {
        setUser(userCookie);
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLogoutLoading,
        error,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => {
  return useContext(UserContext);
};

export { AuthProvider, useAuth };
