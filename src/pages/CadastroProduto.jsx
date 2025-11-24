import { useState } from 'react';
// useState → permite criar variáveis que reagem às mudanças do usuário (estado do componente)

import api from '../services/api';
// Importa a instância do Axios configurada para acessar a API backend

import { useNavigate } from 'react-router-dom';
// useNavigate → permite redirecionar o usuário para outra página após salvar



function CadastroProduto() {

  // -------------------------------
  // ESTADOS (armazenam os dados do formulário)
  // -------------------------------
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const navigate = useNavigate(); 
  // Instância para redirecionamento após salvar o produto


  // -------------------------------
  // FUNÇÃO QUE SALVA O PRODUTO
  // -------------------------------
  const salvar = async (e) => {
    e.preventDefault(); 
    // Evita o recarregamento da página ao enviar o formulário

    // Monta o objeto que será enviado para o backend
    const novoProduto = {
      nome: nome,
      preco: parseFloat(preco),        // Converte texto → número decimal
      quantidade: parseInt(quantidade) // Converte texto → número inteiro
    };

    try {
      // Envia requisição POST para o backend
      await api.post('/produtos', novoProduto);

      alert('Produto cadastrado com sucesso!');

      // Redireciona o usuário para a lista de produtos
      navigate('/listar');

    } catch (erro) {
      alert('Erro ao salvar. Verifique o console.');
      console.error("Erro ao salvar produto:", erro);
    }
  };


  // -------------------------------
  // INTERFACE DO FORMULÁRIO
  // -------------------------------
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      {/* TÍTULO DA PÁGINA */}
      <h2>Novo Produto</h2>

      {/* FORMULÁRIO */}
      <form 
        onSubmit={salvar} 
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        
        {/* CAMPO: Nome */}
        <label>Nome do Produto:</label>
        <input 
          type="text" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required 
        />

        {/* CAMPO: Preço */}
        <label>Preço (R$):</label>
        <input 
          type="number" 
          step="0.01" 
          value={preco} 
          onChange={e => setPreco(e.target.value)} 
          required 
        />

        {/* CAMPO: Quantidade */}
        <label>Quantidade Inicial:</label>
        <input 
          type="number" 
          value={quantidade} 
          onChange={e => setQuantidade(e.target.value)} 
          required 
        />

        {/* BOTÃO DE SALVAR */}
        <button 
          type="submit" 
          style={{ padding: '10px', background: 'green', color: 'white', marginTop: '10px' }}
        >
          Salvar Produto
        </button>
      </form>
    </div>
  );
}

export default CadastroProduto;
// Exporta o componente para uso em outras rotas
