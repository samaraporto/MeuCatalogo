import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  //efeito que corre sempre que o token muda
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const loginAction = (newToken) => {
    setToken(newToken);
    navigate('/filmes'); //redireciona para a página de filmes após o login
  };

  const logoutAction = () => {
    setToken(null);
    navigate('/login'); //redireciona para a página de login após o logout
  };

  //os valores que todos os componentes dentro deste provider terão acesso
  const value = {
    token,
    loginAction,
    logoutAction,
    isAuthenticated: !!token //converte o token (string ou null) para um booleano (true ou false)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// hook personalizado para facilitar o uso do contexto
export const useAuth = () => {
  return React.useContext(AuthContext);
};
