import { useEffect, useState } from 'react';
import api from '../services/api';

// Componente principal da página inicial (Dashboard)
function Home() {

  // Armazena o total de produtos cadastrados
  const [total, setTotal] = useState(0);

  // Armazena quantos produtos estão com estoque crítico (menos de 5 unidades)
  const [baixoEstoque, setBaixoEstoque] = useState(0);

  // Mensagem exibida enquanto carrega dados ou em caso de erro
  const [aviso, setAviso] = useState('Carregando dados...');

  // Executa apenas uma vez ao carregar a página
  useEffect(() => {

    // Busca lista de produtos no backend
    api.get('/produtos')
      .then((response) => {
        const lista = response.data;

        // Total de produtos retornados
        setTotal(lista.length);

        // Conta produtos com quantidade menor que 5
        const criticos = lista.filter(p => p.quantidade < 5).length;
        setBaixoEstoque(criticos);

        // Remove mensagem de "carregando"
        setAviso('');
      })
      .catch((erro) => {
        // Mensagem caso o backend não responda
        setAviso('Não foi possível conectar ao servidor Back-End.');
        console.error("Erro ao buscar produtos:", erro);
      });

  }, []); // [] = executa uma vez ao montar o componente

  return (
    <div style={{ padding: '20px' }}>
      <h2>Painel de Controle</h2>
      
      {/* Exibe mensagem de aviso (erro ou carregando) */}
      {aviso && <p style={{ color: 'red' }}>{aviso}</p>}

      {/* Container dos cards do dashboard */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '30px', 
          marginTop: '30px', 
          flexWrap: 'wrap', 
          justifyContent: 'flex-start' 
        }}
      >
        
        {/* --- CARD 1: Total de Produtos --- */}
        <div style={styles.card}>
          <h3>Total de Produtos</h3>
          <p style={styles.numero}>{total}</p>
        </div>

        {/* --- CARD 2: Produtos com estoque baixo --- */}
        <div style={{ ...styles.card, borderLeft: '5px solid red' }}>
          <h3 style={{ color: 'red' }}>Estoque Baixo</h3>
          <p style={styles.numero}>{baixoEstoque}</p>
          <small>Produtos com menos de 5 unidades</small>
        </div>

        {/* --- CARD 3: Atalho para entrada de mercadoria --- */}
        <div style={{ ...styles.card, borderLeft: '5px solid green' }}>
          <h3>Ações Rápidas</h3>
          <p>Precisa repor mercadoria?</p>

          {/* Link para página de entrada de estoque */}
          <a 
            href="/entrada" 
            style={{ color: 'green', fontWeight: 'bold' }}
          >
            Ir para Entrada de Estoque →
          </a>
        </div>

      </div>
    </div>
  );
}

// Estilos dos cartões e textos do dashboard
const styles = {

  // Estilo base dos cards
  card: {
    background: '#fff',
    color: '#000',  // Cor padrão do texto
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '250px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)' // sombra leve
  },

  // Estilo para o número grande no card
  numero: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333' // texto escuro
  }
};

export default Home;
