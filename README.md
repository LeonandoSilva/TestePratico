# 🚀 Rick and Morty Explorer

![Rick and Morty Banner](https://rickandmortyapi.com/api/character/avatar/1.jpeg)

## 📌 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Deploy](#-deploy)
- [Contribuição](#-contribuição)

## 🎯 Sobre o Projeto
Aplicação fullstack que permite explorar personagens do Rick and Morty com sistema de autenticação completo. Desenvolvida com React e Node.js.


## 💻 Tecnologias

### Backend
- `Node.js` - Ambiente de execução
- `Express` - Framework web
- `Prisma` - ORM
- `BCrypt` - Criptografia

### Frontend
- `React (Vite)` - Framework UI
- `React Router` - Navegação
- `Axios` - Requisições HTTP

## ⚡ Funcionalidades
- 🔐 **Autenticação Completa**
  - Cadastro de usuários
  - Login seguro
  - Alteração de senha
- 👥 **Personagens**
  - Listagem paginada
  - Detalhes completos
  - Tratamento de dados desconhecidos
- 📱 **Interface Responsiva**
  - Design adaptativo
  - UX otimizada

## 🚀 Instalação

- Acesse a pasta do backend
```bash
cd RaM-Backend
```
- Instale as dependências
```bash
npm install
```
-Execute as migrations
```bash
npx prisma migrate dev
```
- Inicie o servidor
```bash
npm start
```

- Acesse a pasta do frontend
```bash
cd RaM-Frontend/Rick-and-Morty-API
```
- Instale as dependências
```bash
npm install
```
- Inicie o servidor
```bash
npm run dev
```