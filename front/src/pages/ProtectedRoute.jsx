import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    //se o utilizador não estiver autenticado, redireciona para a pagina de login
    return <Navigate to="/login" />;
  }

  return children; //se estiver autenticado, mostra a página solicitada
}