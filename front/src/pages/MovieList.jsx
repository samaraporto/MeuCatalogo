// src/components/MovieList.jsx
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ObraCard from './ObraCard';
import Carousel from './Carousel';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function MovieList() {
    const [movies, setMovies] = useState([]);
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
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${currentPage}`;
        } else {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${currentPage}`;
        }

        setLoading(true);
        setError(null);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let moviesToShow = data.results;

                if (query) {
                    moviesToShow = data.results.filter(movie => 
                        movie.poster_path && movie.overview
                    );
                }
                
                setMovies(moviesToShow);
                setTotalPages(data.total_pages); 
                setLoading(false);

            })
            .catch(error => {
                console.error('Houve um erro:', error);
                setError('Não foi possível buscar os filmes.');
                setLoading(false);
            });
    }, [query, currentPage]); 

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
                <h1 className="results-title">{query ? `Resultados para: "${query}"` : 'Filmes Populares'}</h1>
                
                {movies.length > 0 ? (
                    <div className="movie-grid">
                        {movies.map(movie => <ObraCard key={movie.id} obra={movie} categoria='movie'/>)}
                    </div>
                ) : (
                    <p style={{ color: 'white', textAlign: 'center' }}>Nenhum filme encontrado.</p>
                )}
            </div>
            
            <div className="pagination-buttons">
                <button onClick={handlePrevPage} disabled={currentPage === 1}><FaChevronLeft/></button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}><FaChevronRight/></button>
            </div>
            <Carousel title="Filmes de Terror" genreId={27} categoria={'movie'}/>
            <Carousel title="Animações para a Família" genreId={16} categoria={'movie'}/>
        </div>
    );
}