import { useEffect, useState } from 'react'
import axios from 'axios'
import './character.css'

/**
 * Componente da página de personagens
 * Exibe informações dos personagens de Rick and Morty e gerencia alteração de senha
 */
function Character() {
    // Estados para gerenciamento dos dados
    const [characters, setCharacters] = useState([])              // Lista de personagens
    const [userData, setUserData] = useState(null)               // Dados do usuário logado
    const [showPasswordModal, setShowPasswordModal] = useState(false) // Controle do modal
    const [passwordData, setPasswordData] = useState({           // Dados de alteração de senha
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [pageInfo, setPageInfo] = useState({
        count: 0,
        pages: 0,
        next: null,
        prev: null
    })
    const [currentPage, setCurrentPage] = useState(1)            // Página atual

    /**
     * Efeito para carregar dados iniciais
     * Busca dados do usuário no localStorage e personagens da API
     */
    useEffect(() => {
        // Recupera dados do usuário do localStorage
        const storedUserData = localStorage.getItem('userData')
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData))
        }

        // Busca personagens da API
        axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
            .then(response => {
                setCharacters(response.data.results)
                setPageInfo(response.data.info)
            })
            .catch(error => {
                console.error('Erro ao buscar personagens:', error)
            })
    }, [currentPage])

    /**
     * Função auxiliar para formatar localização
     * Converte "unknown" para "Desconhecido"
     */
    const formatLocation = (location) => {
        return location === "unknown" ? "Desconhecido" : location;
    }

    /**
     * Gerencia a alteração de senha do usuário
     */
    const handlePasswordChange = async (e) => {
        e.preventDefault()
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('As senhas não coincidem')
            return
        }

        try {
            const response = await axios.put('http://localhost:3000/user/password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            setShowPasswordModal(false)
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
            alert('Senha alterada com sucesso!')
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao alterar senha')
        }
    }

    /**
     * Funções de navegação entre páginas
     */
    const handleNextPage = () => {
        if (pageInfo.next) {
            setCurrentPage(prev => prev + 1)
        } else {
            alert('Você já está na última página!')
        }
    }

    const handlePrevPage = () => {
        if (pageInfo.prev) {
            setCurrentPage(prev => prev - 1)
        } else {
            alert('Você já está na primeira página!')
        }
    }

    return (
        <div className="character-page">
            {/* Cabeçalho com nome do usuário e botão de alteração de senha */}
            <header className="character-header">
                <div className="header-content">
                    <h1>Bem-vindo, {userData?.name}</h1>
                    <button
                        className="change-password-btn"
                        onClick={() => setShowPasswordModal(true)}
                    >
                        Alterar Senha
                    </button>
                </div>
            </header>

            {/* Modal de alteração de senha */}
            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Alterar Senha</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group">
                                <label>Senha Atual:</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({
                                        ...passwordData,
                                        currentPassword: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Nova Senha:</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({
                                        ...passwordData,
                                        newPassword: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirmar Nova Senha:</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({
                                        ...passwordData,
                                        confirmPassword: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit">Salvar</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false)
                                        setError('')
                                        setPasswordData({
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: ''
                                        })
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Grid de personagens */}
            <div className="characters-grid">
                {characters.map(character => (
                    <div key={character.id} className="character-card">
                        <img src={character.image} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p>Status: {character.status === "unknown" ? "Desconhecido" : character.status}</p>
                        <p>Espécie: {character.species === "unknown" ? "Desconhecido" : character.species}</p>
                        <p>Localização: {character.location.name === "unknown" ? "Desconhecido" : character.location.name}</p>
                    </div>
                ))}
            </div>

            {/* Controles de paginação */}
            <div className="pagination-controls">
                <button 
                    onClick={handlePrevPage}
                    disabled={!pageInfo.prev}
                    className="pagination-button"
                >
                    Página Anterior
                </button>
                <span className="page-info">
                    Página {currentPage} de {pageInfo.pages}
                </span>
                <button 
                    onClick={handleNextPage}
                    disabled={!pageInfo.next}
                    className="pagination-button"
                >
                    Próxima Página
                </button>
            </div>
        </div>
    )
}

export default Character
