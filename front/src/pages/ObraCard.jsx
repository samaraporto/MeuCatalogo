// src/components/ObraCard.jsx
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; 

export default function ObraCard({ obra, categoria }) {
  if (!obra.poster_path) {
    return null;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${obra.poster_path}`;
  
  const title = obra.title || obra.name;
  const linkPath = `/${categoria}/${obra.id}`;
  
  const starRating = Math.round(obra.vote_average / 2);

  return (
    <Link to={linkPath} className="movie-card"> 
      <img
        src={imageUrl}
        alt={title}
        className="movie-card-poster"
        loading="lazy" 
      />
      <div className="movie-card-overlay">
        <h3 className="movie-card-title">{title}</h3> 
        
        {starRating > 0 && (
          <div className="movie-card-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < starRating ? 'active-star' : 'inactive-star'}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
