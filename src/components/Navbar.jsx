import { Link } from 'react-router-dom';

function Navbar() {
  return (
    // CAMADA 1: O fundo azul que ocupa 100% da tela
    <nav style={styles.fundoAzul}>
      
      {/* CAMADA 2: O conteúdo que fica centralizado (max 1200px) */}
      <div style={styles.conteudoCentral}>
        
        <h1 style={styles.logo}>Sistema Estoque</h1>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>🏠 Início</Link>
          <Link to="/listar" style={styles.link}>📋 Produtos</Link>
          <Link to="/cadastro" style={styles.link}>➕ Novo</Link>
          <Link to="/entrada" style={styles.linkDestaque}>📦 Entrada</Link>
        </div>

      </div>
    </nav>
  );
}

const styles = {
  fundoAzul: {
    width: '100%',             // Garante que o azul vá de ponta a ponta
    backgroundColor: '#2c3e50',
    display: 'flex',           // Permite centralizar o filho
    justifyContent: 'center',  // Centraliza a div 'conteudoCentral'
    padding: '1rem 0',
    marginBottom: '30px',      // Mais espaço embaixo do menu
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  },
  conteudoCentral: {
    width: '100%',
    maxWidth: '1200px',        // AUMENTAMOS PARA 1200px (Cabe os 3 cards)
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'          // Margem de segurança para telas pequenas
  },
  logo: {
    color: 'white',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    color: '#bdc3c7',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s'
  },
  linkDestaque: {
    color: '#f1c40f',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: '1px solid #f1c40f',
    padding: '8px 15px',
    borderRadius: '4px'
  }
};

export default Navbar;