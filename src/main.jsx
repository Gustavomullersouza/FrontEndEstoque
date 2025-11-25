// Importa o StrictMode, que ajuda a identificar problemas no React durante o desenvolvimento
import { StrictMode } from 'react';

// Importa a função createRoot, necessária para inicializar a aplicação no React 18+
import { createRoot } from 'react-dom/client';

// Importa o CSS global da aplicação
import './index.css';

// Importa o componente principal da aplicação
import App from './App.jsx';

// Localiza o elemento HTML com id="root" e inicializa o React dentro dele
createRoot(document.getElementById('root')).render(
  
  /* 
    StrictMode verifica práticas inseguras e mostra avisos no console durante o desenvolvimento.
    NÃO afeta o comportamento no ambiente de produção.
  */
  <StrictMode>
    {/* Renderiza o componente principal da aplicação */}
    <App />
  </StrictMode>,
);
