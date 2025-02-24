import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'

/**
 * Ponto de entrada da aplicação
 * Renderiza o componente principal (App) no elemento root
 * Utiliza StrictMode para identificar possíveis problemas
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
