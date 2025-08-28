import { useState, useEffect, useRef } from 'react';
import ObraCard from './ObraCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function Carousel({ title, genreId, categoria}) {
  const [obras, setObra] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const carouselRef = useRef(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/${categoria}?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&sort_by=popularity.desc`;

    setLoading(true);
    if(categoria === 'movie'){
      fetch(url)
      .then(response => response.json())
      .then(data => {
        const filteredMovies = data.results.filter(movie => 
                movie.poster_path && movie.overview && movie.vote_average
            );
            
            setObra(filteredMovies);
            setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar carrossel:", error);
        setLoading(false);
      });
    }else if(categoria === 'tv'){
      fetch(url)
      .then(response => response.json())
      .then(data => {
        const filteredSeries = data.results.filter(serie => 
                serie.poster_path && serie.overview 
            );
            
            setObra(filteredSeries);
            setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar carrossel:", error);
        setLoading(false);
      });
    }

  }, [genreId]); 

  if (loading) {
    return <div className="carousel-loading">Carregando...</div>;
  }

  const handleScroll = (scrollOffset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth', 
      });
    }
  };

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-wrapper">
        <button 
          className="scroll-button left" 
          onClick={() => handleScroll(-500)}
        >
          <FaChevronLeft size={24} />
        </button>

        <div className="carousel-container" ref={carouselRef}>
          {
            categoria === 'movie' ? (
                  obras.map(movie => (
                  <div key={movie.id} className="carousel-item">
                    <ObraCard obra={movie} categoria='movie'/>
                  </div>
              ))
            ) : (
                  obras.map(serie => (
                 <div key={serie.id} className="carousel-item">
                    <ObraCard obra={serie} categoria='serie'/>
                  </div>
          ))
            )
          }
        </div>

        <button 
          className="scroll-button right" 
          onClick={() => handleScroll(500)} // Rola 500px para a direita
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}