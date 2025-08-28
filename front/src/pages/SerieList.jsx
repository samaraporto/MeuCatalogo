// src/pages/SerieList.jsx
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ObraCard from './ObraCard';  
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from './Carousel'

export default function SerieList() {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const listSectionRef = useRef(null);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        let url;
        if (query === '') {
            url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR&page=${currentPage}`;
        } else {
            url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${currentPage}`;
        }

        setLoading(true);
        setError(null);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const filteredSeries = data.results.filter(serie => 
                    serie.poster_path && serie.overview && serie.overview.length > 10 && serie.vote_average
                );
                
                setSeries(filteredSeries);
                setTotalPages(data.total_pages); 
                setLoading(false);
            })
            .catch(error => {
                console.error('Houve um erro:', error);
                setError('Não foi possível buscar os dados.');
                setLoading(false);
            });
    }, [query, currentPage]); 

    useEffect(() => {
    }, [series]); 


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Carregando...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</p>;

    return (
        <div className="movie-list-container">
            <div ref={listSectionRef} className="scroll-anchor">
                <h1 className="results-title">{query ? `Resultados para: "${query}"` : 'Séries Populares'}</h1>
                
                {series.length > 0 ? (
                    <div className="movie-grid">
                        {series.map(serie => <ObraCard key={serie.id} obra={serie} categoria='serie' />)}
                    </div>
                ) : (
                    <p style={{ color: 'white', textAlign: 'center' }}>Nenhuma série encontrada.</p>
                )}
            </div>
            
            <div className="pagination-buttons">
                <button onClick={handlePrevPage} disabled={currentPage === 1}><FaChevronLeft/></button>
                <span>Página {currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages}><FaChevronRight/></button>
            </div>

            <Carousel title="Series de Fantasia e Sci-Fi" genreId={10765} categoria={'tv'}/>
            <Carousel title="Animações para a Família" genreId={16} categoria={'tv'}/>
        </div>
    );
}