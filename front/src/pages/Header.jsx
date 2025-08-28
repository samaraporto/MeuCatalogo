// src/components/Header.jsx
import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { IoSearch, IoHelpCircleOutline } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); 
    //pega o estado de autenticação e a função de logout do nosso "cofre" (AuthContext)
    const { isAuthenticated, logoutAction } = useAuth(); 

    const toggleSearch = () => {
        setIsSearchVisible(prevState => !prevState);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // logica de busca inteligente que direciona para a página correta
            if (location.pathname.startsWith('/series')) {
                navigate(`/series?query=${searchTerm}`);
            } else {
                navigate(`/filmes?query=${searchTerm}`);
            }
            
            setSearchTerm('');
            setIsSearchVisible(false);
        }
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <div className='header-logo'>
                    <NavLink to="/filmes">
                        <img src="https://cdn-icons-png.flaticon.com/512/169/169855.png" alt="logo" />
                    </NavLink>
                </div>
            </div>

            <nav className="main-nav">
                <NavLink to="/filmes">Filmes</NavLink>
                <NavLink to="/series">Séries</NavLink>
                {/* O link para "Minha Lista" só aparece se o utilizador estiver autenticado */}
                {isAuthenticated && <NavLink to="/minha-lista">Minha Lista</NavLink>}
            </nav>

            <div className="header-actions">
                <div className="search-container">
                    {isSearchVisible && (
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </form>
                    )}
                    <button className="icon-button" onClick={toggleSearch}>
                        <IoSearch size={24} />
                    </button>
                </div>

                {/* BOTÃO DINÂMICO: Mostra "Sair" ou "Entrar" com base no estado de autenticação */}
                {isAuthenticated ? (
                    <button onClick={logoutAction} className="login-button">
                        Logout
                    </button>
                ) : (
                    <NavLink to="/login" className="login-button">
                        Login
                    </NavLink>
                )}
                
                <button className="icon-button">
                    <IoHelpCircleOutline size={26} />
                </button>
            </div>
        </header>
    )
}
