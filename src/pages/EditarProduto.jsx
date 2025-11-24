import { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

function EditarProduto() {
  const { id } = useParams(); // pega o ID da URL
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  // Carrega dados do produto ao abrir a página
  useEffect(() => {
    api.get(`/produtos/${id}`).then(res => {
      setNome(res.data.nome);
      setPreco(res.data.preco);
      setQuantidade(res.data.quantidade);
    });
  }, [id]);

  // Envia alterações para o backend
  const salvar = async (e) => {
    e.preventDefault();

    const produtoAtualizado = {
      nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade)
    };

    await api.put(`/produtos/${id}`, produtoAtualizado);

    alert("Produto atualizado!");
    navigate("/listar");
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Editar Produto</h2>

      <form onSubmit={salvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <label>Nome:</label>
        <input value={nome} onChange={e => setNome(e.target.value)} required />

        <label>Preço:</label>
        <input value={preco} onChange={e => setPreco(e.target.value)} required />

        <label>Quantidade:</label>
        <input value={quantidade} onChange={e => setQuantidade(e.target.value)} required />

        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default EditarProduto;
