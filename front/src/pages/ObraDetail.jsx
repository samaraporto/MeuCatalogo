import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaCheck } from "react-icons/fa";
import api from '../utils/api';

// Este componente recebe 'categoria' ('movie' ou 'tv') como uma prop
export default function ObraDetail({ categoria }) {
    const [obra, setObra] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchDetailsAndCheckStatus = async () => {
            setLoading(true);
            try {
                const url = `https://api.themoviedb.org/3/${categoria}/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos,credits`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error("Conteúdo não encontrado.");
                
                const data = await response.json();
                setObra(data);

                try {
                    const watchlistData = await api('/watchlist');
                    setIsSaved(watchlistData.some(item => item.id === data.id));
                } catch (watchlistError) {
                    setIsSaved(false);
                }

            } catch (error) {
                console.error("Houve um erro:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailsAndCheckStatus();
    }, [id, categoria]);

    const handleToggleWatchlist = async () => {
        if (!obra) return;
        
        try {
            if (isSaved) {
                // se ja está salvo, a ação é remover
                await api(`/watchlist/${obra.id}`, 'DELETE');
                setIsSaved(false); 
            } else {
                // se não está salvo, a ação é add
                const obraToSave = {
                    id: obra.id,
                    title: obra.title || obra.name, 
                    poster_path: obra.poster_path,
                    media_type: categoria === 'movie' ? 'movie' : 'tv'
                };
                await api('/watchlist', 'POST', obraToSave);
                setIsSaved(true); 
            }
        } catch (error) {
            console.error("Falha ao atualizar a watchlist:", error);
            alert("Você precisa fazer login para interagir com a sua lista.");
            navigate('/login')
        }
    };

    if (loading || !obra) {
        return <p style={{ color: 'white', textAlign: 'center' }}>Carregando...</p>;
    }

    const title = obra.title || obra.name;
    const releaseDate = obra.release_date || obra.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const trailer = obra.videos?.results.find(video => video.type === 'Trailer');
    const backdropUrl = `https://image.tmdb.org/t/p/original${obra.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${obra.poster_path}`;

    return (
        <div className="movie-detail-page">
            <div className="detail-backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
                <div className="backdrop-overlay"></div>
            </div>

            <div className="detail-content">
                <div className="detail-poster">
                    <img src={posterUrl} alt={title} />
                </div>
                <div className="detail-info">
                    <h1>{title} ({year})</h1>
                    
                    <div className="genres">
                        {obra.genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>)}
                    </div>

                    {categoria === 'tv' && (
                        <div className="serie-specific-info">
                            <h3>Temporadas </h3><span>{obra.number_of_seasons}</span>
                            <h3>Episódios </h3><span>{obra.number_of_episodes}</span>
                            <h3>Status </h3><span>{obra.status}</span>
                        </div>
                    )}

                    <p className="tagline">{obra.tagline}</p>
                    <h3>Sinopse</h3>
                    <p>{obra.overview || "Sinopse não disponível."}</p>
                    <h3>Elenco Principal</h3>
                    <div className="cast">
                        {obra.credits?.cast.slice(0, 5).map(actor => (
                            <div key={actor.credit_id} className="cast-member">
                                <p>{actor.name}</p>
                                <p className="character-name">{actor.character}</p>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleToggleWatchlist} className="save-button">
                        {isSaved ? <><FaCheck /></> : <><FaPlus /></>}
                    </button>
                </div>
            </div>
            
            {trailer && (
                <div className="trailer-section">
                    <h2>Trailer Oficial</h2>
                    <div className="trailer-container">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
