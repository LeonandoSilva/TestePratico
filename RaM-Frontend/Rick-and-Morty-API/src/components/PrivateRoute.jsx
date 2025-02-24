import { Navigate } from 'react-router-dom';

/**
 * Componente de rota privada
 * Protege rotas que só devem ser acessíveis após autenticação
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados
 */
function PrivateRoute({ children }) {
    // Verifica se existem dados do usuário no localStorage
    const userData = localStorage.getItem('userData');
    
    // Redireciona para a página de login se não houver usuário autenticado
    if (!userData) {
        return <Navigate to="/" replace />;
    }

    // Renderiza o conteúdo protegido se houver autenticação
    return children;
}

export default PrivateRoute;