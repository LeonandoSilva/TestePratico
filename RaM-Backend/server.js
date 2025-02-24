import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://seu-usuario.github.io', // Adicione seu domínio do GitHub Pages
        process.env.FRONTEND_URL // URL do frontend em produção
    ],
    credentials: true
}))


app.post('/register', async (req, res) => {
    try {
        // Verificar se email já existe
        const existingUser = await prisma.user.findUnique({
            where: { email: req.body.email }
        })
        
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword
            }
        })
        
        res.status(201).json({ message: 'Usuário criado com sucesso' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário' })
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) {
        return res.status(401).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso', user });
});

app.put('/user/password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        })
        
        const senhaCorreta = await bcrypt.compare(currentPassword, user.password)
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha atual incorreta' })
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        
        await prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashedPassword }
        })
        
        res.status(200).json({ message: 'Senha atualizada com sucesso' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar senha' })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
