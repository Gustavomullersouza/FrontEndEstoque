import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ListaProdutos from './pages/ListaProdutos';
import CadastroProduto from './pages/CadastroProduto';
import EntradaEstoque from './pages/EntradaEstoque';
import EditarProduto from './pages/EditarProduto';

// Componente principal da aplicação
function App() {
  return (
    // Envolve toda a aplicação e habilita o uso de rotas
    <BrowserRouter>

      {/* 
        A Navbar fica FORA das rotas porque:
        - Ela aparece em TODAS as páginas
        - Precisa ter largura total (100% da tela)
      */}
      <Navbar />

      {/* 
        Container principal das páginas.
        Este container limita o conteúdo para não ficar muito largo.
        A Navbar continua ocupando a tela inteira.
      */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* Conjunto de rotas definidas para cada página */}
        <Routes>

          {/* Página inicial (Dashboard) */}
          <Route path="/" element={<Home />} />

          {/* Lista de produtos */}
          <Route path="/listar" element={<ListaProdutos />} />

          {/* Cadastro de novo produto */}
          <Route path="/cadastro" element={<CadastroProduto />} />

          {/* Entrada de estoque (adição de quantidade) */}
          <Route path="/entrada" element={<EntradaEstoque />} />

          {/* Edição de produto, recebendo ID pela URL */}
          <Route path="/editar/:id" element={<EditarProduto />} />

        </Routes>
      </div>

    </BrowserRouter>
  ); 
}

export default App;
