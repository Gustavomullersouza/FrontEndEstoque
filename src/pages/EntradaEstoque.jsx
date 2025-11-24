import { useEffect, useState } from 'react';
import api from '../services/api';

function EntradaEstoque() {
  const [produtos, setProdutos] = useState([]);
  const [idSelecionado, setIdSelecionado] = useState('');
  const [qtdEntrada, setQtdEntrada] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' }); // Agora suporta tipos (sucesso/erro)

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    api.get('/produtos').then(res => setProdutos(res.data));
  }

  const realizarEntrada = async (e) => {
    e.preventDefault();
    if (!idSelecionado) return;

    try {
      await api.put(`/produtos/${idSelecionado}/entrada`, { 
        quantidade: parseInt(qtdEntrada) 
      });

      // Feedback visual verde e visível
      setMensagem({ texto: '✅ Estoque atualizado com sucesso!', tipo: 'sucesso' });
      setQtdEntrada(''); 
      
      // Atualiza a lista
      carregarProdutos();
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);

    } catch (erro) {
      setMensagem({ texto: '❌ Erro ao atualizar estoque.', tipo: 'erro' });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>📦 Entrada de Mercadoria</h2>
      
      {/* MENSAGEM DE FEEDBACK CORRIGIDA */}
      {mensagem.texto && (
        <div style={mensagem.tipo === 'erro' ? styles.msgErro : styles.msgSucesso}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={realizarEntrada} style={styles.form}>
        <div style={styles.grupoInput}>
          <label style={styles.label}>Selecione o Produto:</label>
          <select 
            value={idSelecionado} 
            onChange={e => setIdSelecionado(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">-- Selecione --</option>
            {produtos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome} (Atual: {p.quantidade})
              </option>
            ))}
          </select>
        </div>

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

        <button type="submit" style={styles.botao}>
          CONFIRMAR ENTRADA
        </button>
      </form>
    </div>
  );
}

// ESTILOS VISUAIS (CSS-in-JS)
const styles = {
  container: {
    maxWidth: '600px', 
    margin: '0 auto', 
    padding: '20px'
  },
  form: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px',
    border: '2px solid #f1c40f', // Borda amarela igual seu print
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#222' // Fundo levemente mais claro que a página
  },
  label: {
    color: '#fff', // Garante que o rótulo seja branco
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block'
  },
  input: {
    width: '100%', 
    padding: '10px', 
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff', // Fundo branco no input
    color: '#000',           // Texto PRETO no input (IMPORTANTE)
    fontSize: '1rem'
  },
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
  // Estilo da mensagem de SUCESSO (Verde com texto verde escuro)
  msgSucesso: {
    padding: '15px',
    background: '#d4edda', // Verde claro
    color: '#155724',      // Verde escuro (Legível!)
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  // Estilo da mensagem de ERRO (Vermelho)
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
  grupoInput: {
    marginBottom: '10px'
  }
};

export default EntradaEstoque;