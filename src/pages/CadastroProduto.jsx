import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const navigate = useNavigate(); // Para voltar pra lista depois de salvar

  const salvar = async (e) => {
    e.preventDefault();
    const novoProduto = {
      nome: nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade)
    };

    try {
      await api.post('/produtos', novoProduto);
      alert('Produto cadastrado com sucesso!');
      navigate('/listar'); // Redireciona para a lista
    } catch (erro) {
      alert('Erro ao salvar. Verifique o console.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Novo Produto</h2>
      <form onSubmit={salvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <label>Nome do Produto:</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />

        <label>Preço (R$):</label>
        <input type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)} required />

        <label>Quantidade Inicial:</label>
        <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />

        <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', marginTop: '10px' }}>
          Salvar Produto
        </button>
      </form>
    </div>
  );
}

export default CadastroProduto;