import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ListaProdutos from './pages/ListaProdutos';
import CadastroProduto from './pages/CadastroProduto';
import EntradaEstoque from './pages/EntradaEstoque';
import EditarProduto from './pages/EditarProduto';


function App() {
  return (
    <BrowserRouter>
      {/* 1. A Navbar fica AQUI FORA (para poder esticar 100%) */}
      <Navbar />

      {/* 2. A div limita APENAS o conteúdo das páginas (Routes) */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listar" element={<ListaProdutos />} />
          <Route path="/cadastro" element={<CadastroProduto />} />
          <Route path="/entrada" element={<EntradaEstoque />} />
          <Route path="/editar/:id" element={<EditarProduto />} />

        </Routes>
      </div>
    </BrowserRouter>
  ); 
}


export default App;