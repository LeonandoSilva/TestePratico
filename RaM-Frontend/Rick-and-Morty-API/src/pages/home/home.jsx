import './home.css'
import api from '../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Componente da página de login
 * Gerencia a autenticação do usuário e navegação para cadastro
 */
function Home(){
   // Referências para os campos do formulário
   const inputEmail = useRef()
   const inputPassword = useRef()
   const navigate = useNavigate()

   /**
    * Realiza a autenticação do usuário
    * Envia credenciais para a API e gerencia o redirecionamento
    */
   async function autenticarUsers() {
     try {
       const response = await api.post('/login', {
         email: inputEmail.current.value,
         password: inputPassword.current.value
       })
       if (response.status === 200) {
         // Armazena dados do usuário no localStorage após login bem-sucedido
         localStorage.setItem('userData', JSON.stringify(response.data.user))
         navigate('/personagens')
       }
     } catch (error) {
       console.error('Erro ao fazer login:', error)
       alert('Email ou senha incorretos')
     }
   }

   /**
    * Navega para a página de cadastro
    */
   const handleRegisterClick = () => {
     navigate('/cadastro')
   }

   return (
     <div className='login'>
       <form onSubmit={(e) => e.preventDefault()}>
         <h1>Login</h1>
         <input placeholder='Email' email="Email" type='email' ref={inputEmail}/>
         <input placeholder='Senha' secureTextEntry password="Senha" type='password' ref={inputPassword}/>
         <button type='button' onClick={autenticarUsers}>Entrar</button>
         <button className='link' type='button' onClick={handleRegisterClick}>Criar login</button>
       </form>
     </div>
   )
}

export default Home