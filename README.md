# Frontend da Aplicação Dotz

Este é o frontend da aplicação Dotz, construído com ReactJS e TypeScript.

## Tecnologias Utilizadas

*   ReactJS (v18.0+)
*   TypeScript
*   Styled-Components
*   React Router
*   Axios
*   React Hook Form
*   Yup

## Pré-requisitos

*   Node.js (v16+)
*   npm ou yarn

## Instalação

1.  Clone o repositório:

    ```bash
    git clone <seu_repositorio>
    cd frontend
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

## Execução

1.  Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```

    A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura de Pastas

*   `src/components`: Componentes reutilizáveis.
*   `src/pages`: Componentes de página.
*   `src/services`: Camada de serviços para chamadas à API.
*   `src/context`: Contexto para gerenciamento de estado global (autenticação).
*   `src/styles`: Estilos globais e temas.
*   `src/types`: Definições de tipo para a aplicação.

## Notas

*   O backend é simulado usando JSON Server. Certifique-se de que ele esteja rodando antes de iniciar o front-end.

**Backend README.md:**

```markdown
# Backend Simulado da Aplicação Dotz

Este é o backend simulado da aplicação Dotz, construído com JSON Server.

## Tecnologias Utilizadas

*   JSON Server

## Pré-requisitos

*   Node.js (v16+)
*   npm ou yarn

## Instalação

1.  Clone o repositório:

    ```bash
    git clone <seu_repositorio>
    cd backend
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

## Execução

1.  Inicie o servidor JSON Server:

    ```bash
    npm start
    ```

    O servidor estará disponível em [http://localhost:3001](http://localhost:3001).

## Banco de Dados

O banco de dados é definido no arquivo `db.json`. Ele contém dados de exemplo para usuários, produtos, categorias, subcategorias e transações.

## Notas

*   Este é um backend simulado para fins de desenvolvimento e teste.
*   Para um backend real, você precisaria de um banco de dados e uma API REST implementada com uma linguagem de programação como Node.js, Python, Java, etc.

# Aplicação Dotz - Programa de Fidelidade

Este projeto simula um sistema de fidelidade da Dotz, permitindo o cadastro de usuários, autenticação, consulta de saldo, listagem de produtos e resgate.

## Tecnologias Utilizadas

*   **Frontend:**
    *   ReactJS (v18.0+)
    *   TypeScript
    *   Styled-Components
    *   React Router
    *   Axios
    *   React Hook Form
    *   Yup
*   **Backend (Simulado):**
    *   JSON Server

## Estrutura do Projeto


## Instruções de Uso

1.  **Clone o Repositório:**

    ```bash
    git clone <seu_repositorio>
    ```

2.  **Execute o Backend Simulado:**

    ```bash
    cd backend
    npm install  # Se você ainda não instalou o json-server
    npm start
    ```

3.  **Execute o Frontend:**

    ```bash
    cd frontend
    npm install # Se você ainda não instalou as dependências
    npm start
    ```

    A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Funcionalidades

*   **Cadastro de Usuário:** Crie uma nova conta com nome, e-mail, senha e telefone.
*   **Login:** Acesse sua conta com e-mail e senha.
*   **Consulta de Saldo:** Verifique seu saldo de pontos Dotz.
*   **Listagem de Produtos:** Explore os produtos disponíveis para resgate.

## Notas

*   Este projeto é uma simulação e utiliza um backend simulado com JSON Server.
*   As credenciais e dados são armazenados no `db.json` do diretório `backend`.