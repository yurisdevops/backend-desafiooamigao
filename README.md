# Desafio FullStack O Amigão

Descrição breve do projeto.

## Tecnologias Utilizadas

- Node.js
- Express
- SQLite 

## Instalação

Para rodar este projeto localmente, siga os seguintes passos:

1. Clone o repositório:

```bash
git clone https://github.com/yurisdevops/backend-desafiooamigao.git
```

2. Instale as dependências:

```bash
cd backend-desafiooamigao
npm install
```

3. Configure o arquivo `.env` com as variáveis de ambiente necessárias (por exemplo, URL do banco de dados, porta do servidor, etc).

4. Inicie o servidor:

```bash
npm start
```

## Endpoints da API

### Usuários

- `POST /check-email` - Verifica se o e-mail está disponível.
  - Body: `{ "email": "email@example.com" }`
  - Response: `{ "message": "Email disponível" }`

- `POST /users` - Cria um novo usuário.
  - Body: `{ "name": "Nome", "email": "email@example.com", "password": "senha123" }`
  - Response: `{ "message": "Usuário criado com sucesso", "id": 1 }`

- `POST /login` - Realiza login de um usuário.
  - Body: `{ "email": "email@example.com", "password": "senha123" }`
  - Response: `{ "message": "Login bem-sucedido", "user": { ...dados do usuário... } }`

- `GET /users` - Retorna todos os usuários.
  - Response: `[ { ...dados do usuário... }, ... ]`

### Telefones

- `POST /phones` - Cria um novo telefone.
  - Body: `{ "name": "Nome", "phone": "123456789", "clientId": 1 }`
  - Response: `{ "id": 1 }`

- `GET /phones` - Retorna todos os telefones de um cliente.
  - Query Params: `?clientId=1`
  - Response: `[ { ...dados do telefone... }, ... ]`

- `DELETE /phones/:id` - Deleta um telefone pelo ID.
  - Params: `:id`
  - Response: `{ "message": "Telefone deletado" }`

### Membros

- `POST /members` - Cria um novo membro.
  - Body: `{ "name": "Nome", "email": "email@example.com", "password": "senha123", "clientId": 1 }`
  - Response: `{ "id": 1 }`

- `GET /members` - Retorna todos os membros de um cliente.
  - Query Params: `?clientId=1`
  - Response: `[ { ...dados do membro... }, ... ]`

- `DELETE /members/:id` - Deleta um membro pelo ID.
  - Params: `:id`
  - Response: `{ "message": "Membro deletado" }`

## Contribuição

Para contribuir com este projeto, por favor, siga as instruções abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
