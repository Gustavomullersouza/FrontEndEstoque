import { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

// Componente responsável por editar um produto existente
function EditarProduto() {

  // Obtém o ID do produto a partir da URL (ex: /editar/3)
  const { id } = useParams();

  // Hook para redirecionar o usuário após salvar
  const navigate = useNavigate();

  // Estados que armazenam os valores do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  // Executa ao carregar a página ou quando o ID mudar
  useEffect(() => {
    // Busca os dados do produto no backend
    api.get(`/produtos/${id}`).then(res => {
      // Preenche os estados com os dados recebidos
      setNome(res.data.nome);
      setPreco(res.data.preco);
      setQuantidade(res.data.quantidade);
    });
  }, [id]); // depende do ID

  // Função chamada ao clicar em "Salvar Alterações"
  const salvar = async (e) => {
    e.preventDefault(); // evita reload da página

    // Objeto com os dados editados (convertendo número/float)
    const produtoAtualizado = {
      nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade)
    };

    // Envia requisição PUT para atualizar o produto no backend
    await api.put(`/produtos/${id}`, produtoAtualizado);

    alert("Produto atualizado!");

    // Redireciona para a página de listagem
    navigate("/listar");
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      
      <h2>Editar Produto</h2>

      {/* Formulário de edição */}
      <form 
        onSubmit={salvar} 
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        
        {/* Campo Nome */}
        <label>Nome:</label>
        <input 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required 
        />

        {/* Campo Preço */}
        <label>Preço:</label>
        <input 
          value={preco} 
          onChange={e => setPreco(e.target.value)} 
          required 
        />

        {/* Campo Quantidade */}
        <label>Quantidade:</label>
        <input 
          value={quantidade} 
          onChange={e => setQuantidade(e.target.value)} 
          required 
        />

        {/* Botão de envio */}
        <button 
          type="submit" 
          style={{ padding: '10px', background: 'blue', color: 'white' }}
        >
          Salvar Alterações
        </button>

      </form>
    </div>
  );
}

export default EditarProduto;
