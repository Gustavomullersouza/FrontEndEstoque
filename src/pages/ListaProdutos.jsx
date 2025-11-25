import { useEffect, useState } from 'react';
import api from '../services/api';

// Componente responsável por listar, excluir e exportar produtos
function ListaProdutos() {

  // Estado que guarda os produtos vindos do Back-End
  const [produtos, setProdutos] = useState([]);

  // Carrega produtos assim que a página abrir
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Busca produtos na API
  const carregarProdutos = async () => {
    try {
      const resposta = await api.get('/produtos');
      setProdutos(resposta.data); // Atualiza estado
    } catch (erro) {
      console.log("Erro ao buscar produtos.");
    }
  };

  // Função para excluir produto
  const excluirProduto = async (id) => {

    // Confirmação do usuário
    if (confirm('Tem certeza que deseja excluir este item?')) {

      try {
        // Envia DELETE para a API
        await api.delete(`/produtos/${id}`);

        // Atualiza lista após exclusão
        carregarProdutos();

      } catch (erro) {
        alert('Erro ao excluir.');
      }
    }
  };

  // -----------------------------------------------------
  // 🔥 NOVA FUNÇÃO: GERAR E BAIXAR ARQUIVO CSV
  // -----------------------------------------------------
  const exportarCSV = () => {

    // Cabeçalho do CSV
    const cabecalho = "ID,Nome,Preco,Quantidade\n";

    // Cada produto vira uma linha no CSV
    const linhas = produtos.map(p => {
      return `${p.id},"${p.nome}",${p.preco},${p.quantidade}`;
    }).join("\n");

    // Junta cabeçalho + linhas
    const conteudoCSV = cabecalho + linhas;

    // Blob garante compatibilidade para download
    const blob = new Blob(["\uFEFF" + conteudoCSV], { type: 'text/csv;charset=utf-8;' });

    // Cria uma URL temporária
    const url = URL.createObjectURL(blob);

    // Cria link oculto para baixar
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'estoque_produtos.csv');

    // Adiciona e dispara clique automático
    document.body.appendChild(link);
    link.click();

    // Remove o link temporário
    document.body.removeChild(link);
  };
  // -----------------------------------------------------


  return (
    <div style={{ padding: '20px' }}>

      {/* Cabeçalho da página */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}
      >

        <h2 style={{ color: '#fff', margin: 0 }}>Lista de Estoque</h2>

        {/* Botão para exportar CSV */}
        <button onClick={exportarCSV} style={styles.btnCSV}>
          📥 Exportar CSV
        </button>
      </div>

      {/* Tabela com scroll horizontal se necessário */}
      <div style={styles.tabelaContainer}>
        <table style={styles.table}>

          {/* Cabeçalho da tabela */}
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Qtd. Estoque</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>

          {/* Corpo da tabela */}
          <tbody>

            {/* Caso não haja produtos */}
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.tdVazio}>
                  Nenhum produto encontrado. Cadastre um novo!
                </td>
              </tr>
            ) : (

              // Renderiza linha por linha
              produtos.map(p => (
                <tr key={p.id} style={styles.tr}>
                  
                  <td style={styles.td}>{p.id}</td>
                  <td style={styles.td}>{p.nome}</td>

                  {/* Formata preço em R$ */}
                  <td style={styles.td}>
                    {p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>

                  {/* Destaque em vermelho se estoque baixo */}
                  <td 
                    style={{ 
                      ...styles.td, 
                      color: p.quantidade < 5 ? '#e74c3c' : '#000', 
                      fontWeight: 'bold' 
                    }}
                  >
                    {p.quantidade} {p.quantidade < 5 && '(Baixo!)'}
                  </td>

                  {/* Botões Editar e Excluir */}
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: '10px' }}>

                      {/* Botão Editar */}
                      <a
                        href={`/editar/${p.id}`}
                        style={{
                          backgroundColor: '#2980b9',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Editar
                      </a>

                      {/* Botão Excluir */}
                      <button 
                        onClick={() => excluirProduto(p.id)} 
                        style={styles.btnExcluir}
                      >
                        🗑 Excluir
                      </button>

                    </div>
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

// -----------------------------------------------------
// 🎨 Estilos da tabela e botões (CSS-in-JS)
// -----------------------------------------------------
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

  btnCSV: {
    backgroundColor: '#27ae60',
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
