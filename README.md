# 🛍️ API E-commerce

API REST desenvolvida em **Node.js** para uma plataforma de **E-commerce**, responsável pelo gerenciamento de usuários, autenticação, categorias e produtos.

A aplicação foi construída seguindo a arquitetura **MVC (Model-View-Controller)**, utilizando boas práticas de desenvolvimento para oferecer uma API organizada, escalável e de fácil manutenção. Além do gerenciamento dos recursos da plataforma, a API conta com autenticação baseada em JWT, envio de e-mails, upload de imagens para a AWS S3, cache com Redis e ambiente containerizado com Docker.

---

## 🚀 Funcionalidades

* 👤 Cadastro de usuários
* ✉️ Ativação de conta por e-mail
* 🔄 Reenvio de e-mail de ativação
* 🔐 Autenticação utilizando JWT
* 🏷️ Cadastro de categorias
* 📦 Cadastro de produtos
* 📋 Listagem de produtos
* ☁️ Upload de imagens para AWS S3
* 📧 Envio de e-mails transacionais
* ⚡ Cache utilizando Redis
* 🗄️ Persistência de dados em PostgreSQL
* 🐳 Execução da aplicação com Docker

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* JavaScript (ES6+)
* Express.js
* PostgreSQL
* Sequelize
* Redis
* AWS S3
* Docker
* Docker Compose
* JSON Web Token (JWT)
* Bcrypt
* Nodemailer
* Dotenv
* CORS

---

## 📂 Estrutura do Projeto

```text
.
├── src
│
├── config
│   ├── aws-s3.js
│   ├── database.js
│   ├── pg.js
│   └── redis.js
│
├── controllers
│   ├── auth.js
│   ├── categories.js
│   ├── products.js
│   └── users.js
│
├── helpers
│   ├── email-service.js
│   ├── encrypt-user-token.js
│   ├── product-images-upload.js
│   └── templateEmail.js
│
├── middlewares
│   ├── auth.js
│   ├── authToken.js
│   ├── categories.js
│   ├── products.js
│   └── users.js
│
├── models
│   ├── categories.js
│   ├── index.js
│   ├── products.js
│   ├── products_images.js
│   └── users.js
│
├── routes
│   ├── auth.js
│   ├── categories.js
│   ├── products.js
│   └── users.js
│
├── services
│   └── emailApi.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── index.js
```

---

## 🏛️ Arquitetura

A aplicação segue o padrão **MVC (Model-View-Controller)**.

### Models

Responsáveis pelo mapeamento das entidades e comunicação com o banco de dados através do Sequelize.

### Controllers

Contêm a lógica de negócio da aplicação e processam as requisições recebidas.

### Routes

Definem todos os endpoints da API e encaminham as requisições para seus respectivos controllers.

### Middlewares

Executam autenticação, validações e verificações antes da execução dos controllers.

### Helpers

Centralizam funções auxiliares como:

* Upload de imagens
* Criptografia de tokens
* Templates de e-mail
* Serviços de envio de e-mails

### Services

Responsáveis pela integração com serviços externos.

### Config

Centraliza as configurações da aplicação, banco de dados, Redis e AWS S3.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

* Node.js 18+
* PostgreSQL
* Redis
* Docker
* Docker Compose
* Git

---

## 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/api-ecommerce.git
```

Entre na pasta do projeto:

```bash
cd api-ecommerce
```

Instale as dependências:

```bash
npm install
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo **.env** na raiz do projeto.

Exemplo:

```env
PORT=3000

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ecommerce
DATABASE_USER=postgres
DATABASE_PASSWORD=senha

JWT_SECRET=sua_chave_secreta

REDIS_HOST=localhost
REDIS_PORT=6379

AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=nome_bucket

EMAIL_HOST=smtp.seudominio.com
EMAIL_PORT=587
EMAIL_USER=usuario
EMAIL_PASSWORD=senha
```

---

## 🐳 Executando com Docker

Construir os containers:

```bash
docker compose build
```

Iniciar os serviços:

```bash
docker compose up
```

Ou em segundo plano:

```bash
docker compose up -d
```

Parar os containers:

```bash
docker compose down
```

---

## ▶️ Executando Localmente

Modo de desenvolvimento:

```bash
npm run dev
```

Modo de produção:

```bash
npm start
```

A API estará disponível em:

```text
http://localhost:3000
```

---

## 🔐 Autenticação

A autenticação é realizada utilizando **JWT (JSON Web Token)**.

Após realizar o login, envie o token no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

---

## 📡 Endpoints da API

### 🔐 Autenticação

| Método   | Endpoint               | Descrição                     |
| -------- | ---------------------- | ----------------------------- |
| **POST** | `/login`               | Autentica um usuário.         |
| **POST** | `/active-user`         | Ativa a conta do usuário.     |
| **POST** | `/resend-active-email` | Reenvia o e-mail de ativação. |

---

### 👤 Usuários

| Método   | Endpoint | Descrição                 |
| -------- | -------- | ------------------------- |
| **POST** | `/users` | Cadastra um novo usuário. |

---

### 🏷️ Categorias

| Método   | Endpoint      | Descrição                    |
| -------- | ------------- | ---------------------------- |
| **POST** | `/categories` | Cadastra uma nova categoria. |

---

### 📦 Produtos

| Método   | Endpoint    | Descrição                 |
| -------- | ----------- | ------------------------- |
| **POST** | `/products` | Cadastra um novo produto. |
| **GET**  | `/products` | Lista todos os produtos.  |

---

## ☁️ Upload de Imagens

As imagens dos produtos são armazenadas na **Amazon AWS S3**, permitindo armazenamento seguro, escalável e de alta disponibilidade.

---

## 📧 Serviço de E-mails

A API possui integração com serviço de envio de e-mails para:

* Ativação de conta
* Reenvio de e-mail de ativação

Os templates são gerados dinamicamente antes do envio.

---

## ⚡ Cache

O projeto utiliza **Redis** para armazenamento temporário de dados, melhorando o desempenho e reduzindo consultas repetitivas ao banco de dados.

---

## 🔄 Fluxo da Aplicação

```text
Cliente

      │
      ▼

API REST (Express.js)

      │
      ▼

Controllers (MVC)

      │
      ▼

Models (Sequelize)

      │
      ├────────► PostgreSQL
      │
      ├────────► Redis
      │
      ├────────► AWS S3
      │
      └────────► Serviço de E-mail
```

---

## ✅ Boas Práticas Aplicadas

* Arquitetura MVC
* API REST
* Separação de responsabilidades
* Organização em camadas
* Upload de arquivos na AWS S3
* Cache com Redis
* Autenticação baseada em JWT
* Criptografia de senhas com Bcrypt
* Validação através de middlewares
* Integração com serviços de e-mail
* Containerização com Docker
* Código limpo e reutilizável

---

## 🚀 Melhorias Futuras

* Testes automatizados
* Paginação
* Filtros avançados
* Documentação OpenAPI/Swagger
* Pipeline de CI/CD
* Monitoramento da aplicação
* Logs estruturados
* Filas com BullMQ

---

## 👨‍💻 Desenvolvedor

**Bruno Moreira**

Full Stack Software Engineer

* GitHub: https://github.com/fbmcarmo
* LinkedIn: https://www.linkedin.com/in/fbmcarmo

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e demonstração de conhecimentos em desenvolvimento Full Stack.
