import { Link } from 'react-router-dom';
// Importa o componente Link, usado para navegação interna sem recarregar a página.


function Navbar() {
  return (
    // -----------------------------
    // CAMADA 1: NAVBAR (fundo azul)
    // -----------------------------
    // O <nav> é o contêiner principal do menu
    <nav style={styles.fundoAzul}>
      
      {/* 
        CAMADA 2: CONTEÚDO CENTRAL  
        Esta div limita a largura do conteúdo e deixa tudo centralizado.
      */}
      <div style={styles.conteudoCentral}>
        
        {/* LOGO / TÍTULO DO SISTEMA */}
        <h1 style={styles.logo}>Sistema Estoque</h1>

        {/* GRUPO DE LINKS DE NAVEGAÇÃO */}
        <div style={styles.links}>

          {/* Cada Link redireciona para uma rota do React Router */}
          <Link to="/" style={styles.link}>🏠 Início</Link>
          <Link to="/listar" style={styles.link}>📋 Produtos</Link>
          <Link to="/cadastro" style={styles.link}>➕ Novo</Link>

          {/* Link especial com destaque visual */}
          <Link to="/entrada" style={styles.linkDestaque}>📦 Entrada</Link>
        </div>

      </div>
    </nav>
  );
}


// ----------------------------------------
// OBJETO "styles" COM ESTILOS CSS EM JS
// ----------------------------------------
const styles = {

  // FUNDO AZUL DO MENU
  fundoAzul: {
    width: '100%',             // Ocupa toda a largura da tela
    backgroundColor: '#144e88ff', // Cor do fundo
    display: 'flex',           // Permite centralizar o conteúdo
    justifyContent: 'center',  // Centraliza o conteúdo interno
    padding: '1rem 0',         // Espaçamento vertical do menu
    marginBottom: '30px',      // Espaço entre o menu e o conteúdo abaixo
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)' // Sombras para dar profundidade
  },

  // ÁREA INTERNA (centralizada e limitada em largura)
  conteudoCentral: {
    width: '100%',
    maxWidth: '1200px',        // Limite máximo da largura
    display: 'flex',           // Deixa logo e links lado a lado
    justifyContent: 'space-between', // Logo à esquerda, links à direita
    alignItems: 'center',      // Centraliza verticalmente
    padding: '0 20px'          // Margem interna lateral
  },

  // ESTILO DO TÍTULO/LOGO
  logo: {
    color: 'white',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },

  // CONTÊINER DOS LINKS
  links: {
    display: 'flex', // Exibe os links lado a lado
    gap: '20px'      // Espaçamento entre os links
  },

  // ESTILO PADRÃO DOS LINKS
  link: {
    color: '#bdc3c7',      // Cor cinza clara
    textDecoration: 'none', // Remove o sublinhado
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s' // Animação suave ao mudar de cor
  },

  // ESTILO DO LINK DESTAQUE (Entrada)
  linkDestaque: {
    color: '#f1c40f',          // Amarelo
    textDecoration: 'none',    
    fontWeight: 'bold',
    border: '1px solid #f1c40f', // Borda amarela
    padding: '8px 15px',         // Espaçamento interno
    borderRadius: '4px'          // Bordas arredondadas
  }
};

export default Navbar;
// Exporta o componente para uso em outras páginas.
