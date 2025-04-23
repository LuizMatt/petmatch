# 🚀 API PetMatch

Este projeto é uma API construída com **Express**, **TypeScript**, **PostgreSQL**, **JWT** para autenticação, e **bcrypt** para criptografia de senhas.

## 🧑‍💻 Como Iniciar a API:

### Passo 1: 
Mude para o diretório do projeto principal:
```bash
cd petmatch
```

# Passo 2:
```bash:
cd api
```
# Passo 3:
```bash: 
npm install
```

# Passo 4:
```bash: 
npm run dev
```

# 🌍 Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as variáveis necessárias:

```bash
# .env
JWT_SECRET=seusegredoseguro
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/petmatch_db
```

# Explicação das variáveis:
JWT_SECRET: A chave secreta usada para assinar os tokens JWT.
PORT: A porta em que o servidor Express irá rodar. O padrão é 3000, mas você pode modificar.
DATABASE_URL: A URL de conexão com o PostgreSQL. O formato é:

```bash
postgres://username:password@host:port/database
```

```bash
postgres://postgres:senha@localhost:5432/petmatch_db
```
# Agora é só ser feliz 

