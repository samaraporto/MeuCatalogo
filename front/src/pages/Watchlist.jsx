// src/pages/Watchlist.jsx
import { useState, useEffect } from "react"; 
import ObraCard from '../pages/ObraCard';
import StarRating from "../pages/StarRating";
import { FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../utils/api';

export default function Watchlist(){
    const [watchlist, setWatchlist] = useState([]);

    const fetchWatchlist = async () => {
        try {
            const data = await api('/watchlist'); 
            setWatchlist(data);
        } catch (error) {
            console.error('Erro ao buscar a watchlist:', error);
            // poderia adicionar um estado de erro para mostrar uma mensagem ao utilizador
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const handleRatingChange = async (movieId, newRating) => {
        try {
            const updatedMovie = await api(`/watchlist/${movieId}`, 'PUT', { rating: newRating });
            setWatchlist(currentList => 
                currentList.map(movie => 
                    movie.id === movieId ? updatedMovie : movie
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar nota:', error);
        }
    };

    const handleRemove = async (movieId) => {
        try {
            await api(`/watchlist/${movieId}`, 'DELETE');
            //recarrega a lista do zero para garantir consistência
            fetchWatchlist(); 
        } catch (error) {
            console.error('Falha ao remover o filme:', error);
            alert('Falha ao remover o filme.');
        }
    };

    const handleToggleWatched = async (movieId, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            const updatedMovie = await api(`/watchlist/${movieId}`, 'PUT', { watched: newStatus });
            setWatchlist(currentList => 
                currentList.map(movie => 
                    movie.id === movieId ? updatedMovie : movie
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    };

    return(
        <div className="movie-list-container">
            <h1 className="results-title">Minha Lista</h1>
            {watchlist.length > 0 ? (
                <div className="movie-grid">
                    {watchlist.map(obra => (
                        <div key={obra._id} className="watchlist-item-container">
                           <ObraCard 
                                obra={obra} 
                                categoria={obra.media_type === 'tv' ? "serie" : "movie"} 
                            />
                            
                            {obra.watched && (
                                <StarRating 
                                    rating={obra.rating || 0} 
                                    onRating={(newRating) => handleRatingChange(obra.id, newRating)}
                                />
                            )}

                            <div className="card-actions">
                                <button 
                                    className="icon-action-button"
                                    title={obra.watched ? "Marcar como não assistido" : "Marcar como assistido"}
                                    onClick={() => handleToggleWatched(obra.id, obra.watched)}
                                >
                                    {obra.watched ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                <button 
                                    onClick={() => handleRemove(obra.id)} 
                                    className="icon-action-button remove"
                                    title="Remover da lista"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{color: 'white', textAlign: 'center'}}>A sua lista está vazia.</p>
            )}
        </div>
    );
}
