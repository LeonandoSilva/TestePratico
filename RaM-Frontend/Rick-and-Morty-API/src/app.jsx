import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Cadastro from './pages/cadastro/cadastro'
import Character from './pages/character/character'
import PrivateRoute from './components/PrivateRoute'

/**
 * Componente principal da aplicação
 * Configura as rotas e o sistema de navegação
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial - Página de login */}
        <Route path="/" element={<Home />} />
        
        {/* Rota de cadastro de novos usuários */}
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota protegida - Só acessível após autenticação */}
        <Route 
          path="/personagens" 
          element={
            <PrivateRoute>
              <Character />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App