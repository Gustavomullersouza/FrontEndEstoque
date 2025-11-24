import { useEffect, useState } from 'react';
import api from '../services/api';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const resposta = await api.get('/produtos');
      setProdutos(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar produtos.");
    }
  };

  const excluirProduto = async (id) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await api.delete(`/produtos/${id}`);
        carregarProdutos();
      } catch (erro) {
        alert('Erro ao excluir.');
      }
    }
  };

  // --- NOVA FUNÇÃO: GERAR CSV ---
  const exportarCSV = () => {
    // 1. Cabeçalho do arquivo (As colunas)
    const cabecalho = "ID,Nome,Preco,Quantidade\n";

    // 2. Transforma cada produto em uma linha de texto
    const linhas = produtos.map(p => {
      // Usamos aspas no nome para evitar erros se tiver vírgula no nome do produto
      return `${p.id},"${p.nome}",${p.preco},${p.quantidade}`;
    }).join("\n"); // Junta tudo com quebra de linha

    // 3. Junta cabeçalho + linhas
    const conteudoCSV = cabecalho + linhas;

    // 4. Cria o arquivo na memória do navegador
    // O "\uFEFF" é um truque para o Excel reconhecer os acentos (BOM)
    const blob = new Blob(["\uFEFF" + conteudoCSV], { type: 'text/csv;charset=utf-8;' });
    
    // 5. Cria um link falso e clica nele para baixar
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'estoque_produtos.csv'); // Nome do arquivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // -----------------------------

  return (
    <div style={{ padding: '20px' }}>
      
      {/* Cabeçalho com Título e Botão de Exportar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#fff', margin: 0 }}>Lista de Estoque</h2>
        
        <button onClick={exportarCSV} style={styles.btnCSV}>
          📥 Exportar CSV
        </button>
      </div>

      <div style={styles.tabelaContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Qtd. Estoque</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.tdVazio}>
                  Nenhum produto encontrado. Cadastre um novo!
                </td>
              </tr>
            ) : (
              produtos.map(p => (
                <tr key={p.id} style={styles.tr}>
                  <td style={styles.td}>{p.id}</td>
                  <td style={styles.td}>{p.nome}</td>
                  <td style={styles.td}>
                    {p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td style={{ ...styles.td, color: p.quantidade < 5 ? '#e74c3c' : '#000', fontWeight: 'bold' }}>
                    {p.quantidade} {p.quantidade < 5 && '(Baixo!)'}
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => excluirProduto(p.id)} style={styles.btnExcluir}>
                      🗑 Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  tabelaContainer: {
    overflowX: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  th: {
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    padding: '15px',
    textAlign: 'left',
    fontSize: '1rem'
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '12px 15px',
    color: '#333'
  },
  tdVazio: {
    padding: '20px',
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  btnExcluir: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  // Estilo do novo botão CSV
  btnCSV: {
    backgroundColor: '#27ae60', // Verde Excel
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  }
};

export default ListaProdutos;