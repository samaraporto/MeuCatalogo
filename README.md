# 🎬 Meu Catálogo de Filmes e Séries!


## 📖 Visão Geral
**Meu Catálogo de Filmes e Séries** é uma aplicação web **full-stack** completa, inspirada em plataformas como IMDb e Letterboxd.  
Ela permite que os utilizadores explorem, pesquisem e descubram filmes e séries, além de poderem criar e gerir uma lista pessoal de obras para assistir.  

Este projeto foi construído utilizando o stack **MERN (MongoDB, Express, React, Node.js)** e está totalmente containerizado com **Docker**, garantindo um ambiente de desenvolvimento e implantação consistente e moderno.  

A aplicação consome a API pública do **The Movie Database (TMDb)** para obter os dados de filmes e séries.  

---

## ✨ Funcionalidades Principais

### 🔎 Exploração de Conteúdo
- Listagem de filmes e séries populares.  
- Carrosséis de obras por género (Terror, Animação, etc.).  
- Paginação para navegar por múltiplos resultados.  

### 🔍 Busca Inteligente
- Busca contextual no cabeçalho que pesquisa por filmes ou séries, dependendo da página em que o utilizador se encontra.  

### 📄 Página de Detalhes Imersiva
- Visualização de informações completas, incluindo sinopse, elenco principal, géneros e nota de avaliação.  
- Player de trailer do YouTube incorporado.  

### 🔐 Sistema de Autenticação Completo
- Registo de novos utilizadores com armazenamento seguro de senhas (hashing com **bcrypt**).  
- Login de utilizadores com autenticação baseada em **JSON Web Tokens (JWT)**.  

### 🎞️ "Minha Lista" Pessoal (Watchlist)
- Funcionalidade protegida, acessível apenas a utilizadores autenticados.  
- Adicionar e remover filmes ou séries da lista pessoal.  
- Marcar obras como **"assistidas"**.  
- Atribuir uma nota pessoal (de 1 a 5 estrelas) às obras assistidas.  

### ⚙️ Backend Robusto e Seguro
- API **RESTful** construída com Node.js e Express.  
- Persistência de dados com MongoDB Atlas.  
- Rotas protegidas que exigem um token JWT válido.  

### 🐳 Containerização com Docker
- Ambiente de desenvolvimento e produção totalmente containerizado com **Docker e Docker Compose**.  
- Serviços separados para o frontend (React + Nginx) e backend (Node.js).  

---

## 🛠️ Tecnologias Utilizadas

### 🎨 Frontend
- **React.js (com Vite)**  
- **React Router**  
- **React Icons**  
- **CSS** (interface moderna e responsiva)  

### ⚙️ Backend
- **Node.js**  
- **Express.js**  
- **MongoDB Atlas**  
- **Mongoose**  
- **JWT (JSON Web Token)**  
- **Bcrypt.js**  
- **Dotenv**  

### 🚀 DevOps
- **Docker & Docker Compose**  

---

## 🚀 Configuração e Instalação

Para rodar este projeto localmente, você precisará de ter o **Node.js (v20+)** e o **Docker Desktop** instalados.  

### 1. Clonar o Repositório
```bash
git clone https://github.com/samaraporto/meu-catalogo-filmes.git
cd meu-catalogo-filmes
```

2. Configurar as Variáveis de Ambiente

Crie um ficheiro chamado .env na raiz do projeto.

```bash
# .env

# Chave da API do The Movie Database (TMDb)
# O nome DEVE começar com VITE_ para ser acessível pelo frontend
VITE_TMDB_API_KEY=sua_chave_do_tmdb_aqui

# String de conexão do seu cluster no MongoDB Atlas
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/seuBanco?retryWrites=true&w=majority

# Segredo para a assinatura dos tokens JWT
JWT_SECRET=este-e-um-segredo-muito-seguro-para-o-meu-app
```

3. Construir e Rodar os Contêineres

Com o Docker Desktop em execução, rode no terminal:
```bash
docker-compose up --build
```

O comando --build é importante na primeira vez para construir as imagens do zero.

4. Aceder à Aplicação

Frontend: http://localhost

📝 Endpoints da API
🔐 Autenticação (/api/auth)

POST /register: Regista um novo utilizador.

POST /login: Autentica um utilizador e retorna um token JWT.

🎞️ Watchlist (/api/watchlist) - Rotas Protegidas

GET /: Retorna a lista de obras do utilizador autenticado.

POST /: Adiciona uma nova obra à lista do utilizador.

PUT /:id: Atualiza uma obra na lista (status de "assistido" ou nota).

DELETE /:id: Remove uma obra da lista.

🔮 Próximos Passos

📱 Responsividade: Melhorar o layout para dispositivos móveis.

♾️ Scroll Infinito: Carregar mais filmes automaticamente à medida que o utilizador rola a página.

🎬 Recomendações: Criar uma secção de "Filmes Similares" na página de detalhes.

👤 Perfis de Utilizador: Permitir que os utilizadores editem as suas informações de perfil.

✅ Testes: Adicionar testes unitários e de integração para garantir a robustez da aplicação.

Preview da Aplicação:

![](./assets/Captura%20de%20tela%202025-08-28%20203702.png)

![](./assets/Captura%20de%20tela%202025-08-28%20203726.png)

![](./assets/Captura%20de%20tela%202025-08-28%20203802.png)

![](./assets/Captura%20de%20tela%202025-08-28%20203843.png)

![](./assets/Captura%20de%20tela%202025-08-28%20203858.png)

![](./assets/Captura%20de%20tela%202025-08-28%20203926.png)