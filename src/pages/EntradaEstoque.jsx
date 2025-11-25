import { useEffect, useState } from 'react';
import api from '../services/api';

// Componente responsável por registrar entrada de mercadorias no estoque
function EntradaEstoque() {

  // Lista de produtos vinda do backend
  const [produtos, setProdutos] = useState([]);

  // Armazena o ID do produto selecionado no <select>
  const [idSelecionado, setIdSelecionado] = useState('');

  // Quantidade que será adicionada ao estoque
  const [qtdEntrada, setQtdEntrada] = useState('');

  // Objeto para mensagens visuais (texto + tipo)
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  // Executa ao carregar o componente
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Função que busca os produtos no backend
  const carregarProdutos = async () => {
    api.get('/produtos').then(res => setProdutos(res.data));
  }

  // Função executada quando o formulário é enviado
  const realizarEntrada = async (e) => {
    e.preventDefault(); // Evita reload da página

    // Evita ação sem um produto selecionado
    if (!idSelecionado) return;

    try {
      // Envia quantidade para atualizar no backend
      await api.put(`/produtos/${idSelecionado}/entrada`, { 
        quantidade: parseInt(qtdEntrada)
      });

      // Mostra mensagem de sucesso (em verde)
      setMensagem({ texto: '✅ Estoque atualizado com sucesso!', tipo: 'sucesso' });

      // Limpa o campo da quantidade
      setQtdEntrada('');

      // Atualiza lista exibida no select
      carregarProdutos();

      // Remove mensagem depois de 3 segundos
      setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);

    } catch (erro) {
      // Mostra mensagem de erro (vermelha)
      setMensagem({ texto: '❌ Erro ao atualizar estoque.', tipo: 'erro' });
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Título da página */}
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>📦 Entrada de Mercadoria</h2>
      
      {/* Exibindo mensagem de feedback (sucesso/erro) */}
      {mensagem.texto && (
        <div style={mensagem.tipo === 'erro' ? styles.msgErro : styles.msgSucesso}>
          {mensagem.texto}
        </div>
      )}

      {/* Formulário principal */}
      <form onSubmit={realizarEntrada} style={styles.form}>

        {/* Campo Select para escolher o produto */}
        <div style={styles.grupoInput}>
          <label style={styles.label}>Selecione o Produto:</label>

          <select 
            value={idSelecionado} 
            onChange={e => setIdSelecionado(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">-- Selecione --</option>

            {/* Preenche o select com produtos da API */}
            {produtos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome} (Atual: {p.quantidade})
              </option>
            ))}
          </select>
        </div>

        {/* Campo de entrada da quantidade */}
        <div style={styles.grupoInput}>
          <label style={styles.label}>Quantidade a Adicionar (+):</label>

          <input 
            type="number" 
            min="1"
            value={qtdEntrada} 
            onChange={e => setQtdEntrada(e.target.value)} 
            style={styles.input}
            placeholder="Ex: 10"
            required
          />
        </div>

        {/* Botão para confirmar a entrada */}
        <button type="submit" style={styles.botao}>
          CONFIRMAR ENTRADA
        </button>
      </form>
    </div>
  );
}

/* ====== ESTILOS CSS EM FORMATO JS ====== */
const styles = {

  // Container centralizado
  container: {
    maxWidth: '600px', 
    margin: '0 auto', 
    padding: '20px'
  },

  // Estilo do formulário
  form: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px',
    border: '2px solid #f1c40f',   // borda amarela
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#222'        // fundo escuro
  },

  // Rótulos brancos
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block'
  },

  // Input padrão do formulário
  input: {
    width: '100%', 
    padding: '10px', 
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff', // fundo branco
    color: '#000',           // texto preto
    fontSize: '1rem'
  },

  // Botão de envio
  botao: {
    padding: '15px', 
    background: '#2c3e50', 
    color: '#f1c40f',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: '0.3s'
  },

  // Mensagem de sucesso (verde)
  msgSucesso: {
    padding: '15px',
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  // Mensagem de erro (vermelha)
  msgErro: {
    padding: '15px',
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  // Espaço para cada grupo de input
  grupoInput: {
    marginBottom: '10px'
  }
};

export default EntradaEstoque;
