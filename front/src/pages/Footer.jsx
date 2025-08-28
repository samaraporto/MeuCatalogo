import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const anoAtual = new Date().getFullYear(); 

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://github.com/samaraporto" target="_blank" rel="noopener noreferrer">
            <FaGithub size={28} />
          </a>
          <a href="https://www.instagram.com/sp.samaraporto" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={28} />
          </a>
          <a href="https://linkedin.com/in/spsamaraporto" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={28} />
          </a>
        </div>

        <nav className="footer-nav">
          <Link to="/filmes">Página Inicial</Link>
          <Link to="/minha-lista">Minha Lista</Link>
        </nav>

        <div className="footer-copyright">
          © {anoAtual} Meu Catálogo de Filmes. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}