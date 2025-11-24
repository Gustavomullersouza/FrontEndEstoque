import { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [total, setTotal] = useState(0);
  const [baixoEstoque, setBaixoEstoque] = useState(0);
  const [aviso, setAviso] = useState('Carregando dados...');

  useEffect(() => {
    // Busca os dados do Back-End para montar o dashboard
    api.get('/produtos')
      .then((response) => {
        const lista = response.data;
        setTotal(lista.length);
        // Conta quantos produtos tem menos de 5 unidades
        const criticos = lista.filter(p => p.quantidade < 5).length;
        setBaixoEstoque(criticos);
        setAviso(''); // Limpa aviso de carregando
      })
      .catch((erro) => {
        setAviso('Não foi possível conectar ao servidor Back-End.');
        console.error("Erro ao buscar produtos:", erro);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Painel de Controle</h2>
      
      {aviso && <p style={{ color: 'red' }}>{aviso}</p>}

      <div style={{ display: 'flex', gap: '30px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        
        {/* Card 1: Total de Produtos */}
        <div style={styles.card}>
          <h3>Total de Produtos</h3>
          <p style={styles.numero}>{total}</p>
        </div>

        {/* Card 2: Alerta de Estoque Baixo (Funcionalidade Extra) */}
        <div style={{ ...styles.card, borderLeft: '5px solid red' }}>
          <h3 style={{ color: 'red' }}>Estoque Baixo</h3>
          <p style={styles.numero}>{baixoEstoque}</p>
          <small>Produtos com menos de 5 unidades</small>
        </div>

        {/* Card 3: Atalho Rápido */}
        <div style={{ ...styles.card, borderLeft: '5px solid green' }}>
          <h3>Ações Rápidas</h3>
          <p>Precisa repor mercadoria?</p>
          <a href="/entrada" style={{ color: 'green', fontWeight: 'bold' }}>Ir para Entrada de Estoque →</a>
        </div>

      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    color: '#000',  // <--- ADICIONE ESTA LINHA (Texto Preto)
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '250px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  numero: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333' // <--- Pode adicionar aqui também para garantir o número cinza escuro
  }
};

export default Home;