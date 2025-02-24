import './cadastro.css'
import api from '../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Componente da página de cadastro
 * Gerencia o registro de novos usuários no sistema
 */
function Cadastro() {
  // Referências para os campos do formulário
  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()
  const navigate = useNavigate()

  /**
   * Busca lista de usuários (função não utilizada atualmente)
   */
  async function getUsers() {
    await api.get('/user')
  }

  /**
   * Realiza o cadastro de um novo usuário
   * Envia dados para a API e gerencia o redirecionamento
   */
  async function cadastrarUsuario() {
    try {
      const response = await api.post('/register', {
        email: inputEmail.current.value,
        name: inputName.current.value,
        password: inputPassword.current.value
      })
      
      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso!')
        navigate('/') // Redireciona para a tela de login
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      alert('Erro ao cadastrar usuário || Email já cadastrado')
    }
  }

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder='Nome' name="Nome" type='text' ref={inputName}/>
        <input placeholder='Email' email="Email" type='email' ref={inputEmail}/>
        <input placeholder='Senha' secureTextEntry password="Senha" type='password' ref={inputPassword}/>
        <button type='button' onClick={cadastrarUsuario}>Cadastrar</button>
      </form>
    </div>
  )
}

export default Cadastro