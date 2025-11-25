// Importa a configuração padrão do ESLint para JavaScript moderno
import js from '@eslint/js'

// Importa variáveis globais (como 'window', 'document', etc.)
import globals from 'globals'

// Plugin do ESLint para regras específicas do React Hooks
import reactHooks from 'eslint-plugin-react-hooks'

// Plugin usado para evitar erros durante o hot reload do Vite no React
import reactRefresh from 'eslint-plugin-react-refresh'

// Funções auxiliares do ESLint para usar o formato de configuração "flat"
import { defineConfig, globalIgnores } from 'eslint/config'

// Exporta a configuração principal do ESLint usando o formato "flat config"
export default defineConfig([

  // Ignora a pasta 'dist' (arquivos gerados pela build)
  globalIgnores(['dist']),

  {
    // Define quais arquivos serão validados pelo ESLint
    files: ['**/*.{js,jsx}'],

    // Extende configurações recomendadas
    extends: [
      js.configs.recommended,             // Regras padrões para JS
      reactHooks.configs.flat.recommended, // Regras obrigatórias dos React Hooks
      reactRefresh.configs.vite,           // Regras para evitar erros com React + Vite
    ],

    // Configura opções da linguagem analisada
    languageOptions: {
      ecmaVersion: 2020,                    // Suporte ao ES2020
      globals: globals.browser,             // Habilita variáveis globais do navegador

      // Configurações de sintaxe ECMAScript
      parserOptions: {
        ecmaVersion: 'latest',              // Permite sintaxe mais moderna
        ecmaFeatures: { jsx: true },        // Permite JSX
        sourceType: 'module',               // Permite import/export
      },
    },

    // Regras personalizadas
    rules: {
      // Erro ao deixar variáveis sem uso, mas ignora CONSTANTES MAIÚSCULAS
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
