import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MovieList from './pages/MovieList';
import Watchlist from './pages/Watchlist';
import Header from './pages/Header';
import Footer from './pages/Footer'; 
import SerieList from './pages/SerieList';
import ObraDetail from './pages/ObraDetail';
import Register from './pages/Register'; 
import Login from './pages/Login';     
import ProtectedRoute from './pages/ProtectedRoute'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <div className='App'>
          <Header/>
          <main>
            <Routes>
              <Route path='/' element={<MovieList />}/>
              <Route path='/filmes' element={<MovieList />}/>
              <Route path='/movie/:id' element={<ObraDetail categoria='movie' />}/>
              <Route path="/series" element={<SerieList />} />
              <Route path="/serie/:id" element={<ObraDetail categoria='tv'/>}/>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* ROTA PROTEGIDA: Só é possível acessar se estiver autenticado */}
              <Route 
                path='/minha-lista' 
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer/>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
