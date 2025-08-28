// src/components/StarRating.jsx
import { FaStar } from 'react-icons/fa';

// Este componente recebe a nota atual (rating) e uma função (onRating)
// que será chamada quando o usuário clicar em uma estrela.
export default function StarRating({ rating, onRating }) {
  return (
    <div className="star-rating-container">
      {/* Cria um array de 5 posições para renderizar 5 estrelas */}
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={starValue}
            className="star"
            // A estrela fica "preenchida" (filled) se o seu valor for menor ou igual à nota atual
            color={starValue <= rating ? '#ffc107' : '#e4e5e9'}
            size={22}
            onClick={() => onRating(starValue)} // Chama a função passando a nova nota (1 a 5)
          />
        );
      })}
    </div>
  );
}