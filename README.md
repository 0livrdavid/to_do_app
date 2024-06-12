# Sistema de Gerenciamento de Tarefas

## Visão Geral

Este software é um Sistema de Gerenciamento de Tarefas projetado para ajudar os usuários a gerenciar suas tarefas de forma eficiente. Ele oferece funcionalidades para criar, atualizar e deletar tarefas, além de categorizá-las. O sistema é construído utilizando tecnologias web modernas e segue as melhores práticas para uma experiência de usuário perfeita.

## Funcionalidades

- **Criar Tarefas**: Os usuários podem criar novas tarefas com detalhes como título, descrição, prazo, prioridade e status de conclusão.
- **Atualizar Tarefas**: Os usuários podem atualizar tarefas existentes para modificar seus detalhes.
- **Deletar Tarefas**: Os usuários podem deletar tarefas que não são mais necessárias.
- **Categorias de Tarefas**: As tarefas podem ser categorizadas para melhor organização.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript
- **Backend**: Axios para chamadas de API

## Primeiros Passos

### Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior) ou yarn (v1.22 ou superior)

### Instalação

1. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn install
   ```

2. **Crie uma cópia do arquivo de configuração:**
   ```sh
   cp .env.default .env
   ```

### Executando a Aplicação

1. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

2. **Abra seu navegador e navegue para:**
   ```
   http://localhost:3000
   ```

### Construindo para Produção

1. **Construa a aplicação:**
   ```sh
   npm run build
   # ou
   yarn build
   ```

2. **Inicie o servidor de produção:**
   ```sh
   npm start
   # ou
   yarn start
   ```

## Contribuindo

Contribuições são bem-vindas! Por favor, faça um fork do repositório e submeta um pull request para qualquer melhoria ou correção de bugs.

## Licença

Este projeto está licenciado sob a Licença MIT.