# Notify - Sistema de Notificação de Mensagens

Ferramenta para otimizar a comunicação entre serviços digitais e clientes por meio de uma API aberta, com gestão e configuração de notificações em múltiplos canais (Web Push, E-mail, SMS), seguindo políticas de segurança de APIs.

## Tecnologias Utilizadas

- Node.js
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT para autenticação
- Swagger para documentação da API

## Requisitos

- Node.js 16+
- PostgreSQL 13+
- Yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/notify.git
cd notify
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com os dados de conexão do banco de dados e outras configurações.

5. Execute as migrações:

```bash
yarn migration:run
```

6. Inicie o servidor de desenvolvimento:

```bash
yarn start:dev
```

## Principais Funcionalidades

### 1. Gerenciamento de Aplicativos

- Cadastro de aplicativo para integração
- Seleção de canais de notificação (Web Push, E-mail, SMS)
- Configuração personalizada para cada canal

### 2. Configuração de Canais

#### Web Push

- Configuração de permissão e mensagens de boas-vindas
- Personalização de textos e botões
- URLs de redirecionamento

#### E-mail

- Configuração de servidor SMTP
- Gerenciamento de templates de e-mail
- Personalização de remetente

#### SMS

- Integração com provedores de SMS
- Configuração de credenciais

### 3. Histórico de Notificações

- Visualização de todas as notificações enviadas
- Filtros por período, canal e origem
- Detalhes de entrega e leitura

### 4. Envio de Notificações

- Envio manual através da interface
- Envio programático via API
- Suporte a todos os canais configurados

## Estrutura do Projeto

O projeto segue uma arquitetura baseada em Domain-Driven Design (DDD):

- `src/applications`: Gerenciamento de aplicativos e templates de e-mail
- `src/auth`: Autenticação e autorização
- `src/database`: Migrações e configurações de banco de dados
- `src/notifications`: Envio e gerenciamento de notificações
- `src/users`: Gerenciamento de usuários

## API Endpoints

A API está documentada com Swagger e pode ser acessada em: `http://localhost:3000/api`

### Principais endpoints:

#### Aplicações

- `POST /applications` - Criar nova aplicação
- `GET /applications` - Listar aplicações
- `GET /applications/:id` - Buscar aplicação por ID
- `PUT /applications/:id` - Atualizar aplicação
- `DELETE /applications/:id` - Remover aplicação

#### Templates de E-mail

- `POST /applications/:applicationId/email-templates` - Criar template
- `GET /applications/:applicationId/email-templates` - Listar templates
- `GET /applications/:applicationId/email-templates/:id` - Buscar template por ID
- `PUT /applications/:applicationId/email-templates/:id` - Atualizar template
- `DELETE /applications/:applicationId/email-templates/:id` - Remover template

#### Notificações

- `POST /notifications/web-push` - Enviar notificação Web Push
- `POST /notifications/email` - Enviar notificação por E-mail
- `POST /notifications/sms` - Enviar notificação SMS
- `GET /notifications` - Listar notificações
- `GET /notifications/:id` - Buscar notificação por ID
- `PUT /notifications/:id/read` - Marcar notificação como lida

## Executando em Produção

Para ambientes de produção, recomenda-se:

```bash
yarn build
yarn start:prod
```

## Testes

Execute os testes automatizados com:

```bash
yarn test
yarn test:e2e
```

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
