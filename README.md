# Payments API

<div align="center"></br>
  <img alt="Typescript badge" src="https://img.shields.io/badge/Typescript-00B1EA?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="NextJS badge" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="Prisma badge" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img alt="Planetscale badge" src="https://img.shields.io/badge/Planetscale-333331?style=for-the-badge" />
</div></br>

API simples, feita usando NextJS, ela consiste em uma aplicação que é possível criar uma conta, e dentro dessa conta fazer depósitos ou saques, além de poder ver o histórico de movimentação. A aplicação também possibilita fazer transferências para outros usuários e checar o histórico de transferências feitas e recebidas.

## Iniciando

### Váriaveis de ambiente
Primeiro crie um arquivo **`.env`** na pasta raiz do projeto, e preencha todos os dados de acordo com o arquivo **`.example.env`**, para criar as váriaveis de ambiente.

### Rodando a aplicação

```bash
npm run dev
# ou
yarn dev
```

A API estará rodando em: [http://localhost:3000/api/](http://localhost:3000/api/)

---

## Rotas

Para testar os endpoints importe o [arquivo de rotas](./Insomnia_routes_2022-07-06.json) no seu insomnia.

### Criar conta

| Rota           | Método     |
|----------------|------------|
| **`/account`** | **`POST`** |

**Parâmetros obrigatórios**

| Campo          | Tipo         | Local | Descrição              |
|----------------|--------------|-------|------------------------|
| **`name`**     | **`string`** | body  | Nome do usuário        |
| **`email`**    | **`string`** | body  | E-mail do usuário      |
| **`password`** | **`string`** | body  | Senha do usuário       |
| **`cash`**     | **`double`** | body  | Saldo inicial da conta |

**Exemplo de requisição**

**`POST`** **`/account`**

```json
{
    "name": "Thiago souza",
    "email": "user@email.com",
    "password": "123456",
    "cash": 100
}
```

**Resposta de sucesso**

**Código**: **`201 CREATED`**

```json
{
    "id": 4,
    "name": "Thiago souza",
    "email": "user@email.com",
    "cash": 100,
    "createdAt": "2022-07-07T02:07:39.533Z"
}
```
---

### Se autenticar

| Rota                  | Método     |
|-----------------------|------------|
| **`/account/signin`** | **`POST`** |

**Parâmetros obrigatórios**

| Campo          | Tipo         | Local | Descrição         |
|----------------|--------------|-------|-------------------|
| **`email`**    | **`string`** | body  | E-mail do usuário |
| **`password`** | **`string`** | body  | Senha do usuário  |

**Exemplo de requisição**

**`POST`** **`/account/signin`**

```json
{
    "email": "user@email.com",
    "password": "123456"
}
```

**Resposta de sucesso**

**Código**: **`200 OK`**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiYWNjb3VudElkIjo0LCJpYXQiOjE2NTcxNTk3ODMsImV4cCI6MTY1NzI0NjE4M30.hKBdCDkeMQHp1j9Zuhzwi54MBMz06vIDQCTiOoTEzSc"
}
```

O `token` recebido deve ser enviado no header de autorização de todas as requisições como um `Bearer token`, execeto nas rotas de `criação de conta` e `autenticação`.

---

### Depositar dinheiro na conta

| Rota                   | Método     |
|------------------------|------------|
| **`/account/deposit`** | **`POST`** |

**Parâmetros obrigatórios**

| Campo        | Tipo         | Local | Descrição                          |
|--------------|--------------|-------|------------------------------------|
| **`amount`** | **`double`** | body  | Valor que será depositado na conta |

**Exemplo de requisição**

**`POST`** **`/account/deposit`**

```json
{
    "amount": 100
}
```

**Resposta de sucesso**

**Código**: **`200 OK`**

Retorna o saldo da conta

```json
{
    "cash": 200
}
```

---

### Sacar dinheiro da conta

| Rota                          | Método     |
|-------------------------------|------------|
| **`/account/withdraw_money`** | **`POST`** |

**Parâmetros obrigatórios**

| Campo        | Tipo         | Local | Descrição                        |
|--------------|--------------|-------|----------------------------------|
| **`amount`** | **`double`** | body  | Valor que será debitado da conta |

**Exemplo de requisição**

**`POST`** **`/account/withdraw_money`**

```json
{
    "amount": 50
}
```

**Resposta de sucesso**

**Código**: **`200 OK`**

Retorna o saldo da conta

```json
{
    "cash": 150
}
```

---

### Consultar saldo

| Rota                   | Método    |
|------------------------|-----------|
| **`/account/balance`** | **`GET`** |

**Exemplo de requisição**

**`GET`** **`/account/balance`**

**Resposta de sucesso**

**Código**: **`200 OK`**

Retorna o saldo da conta

```json
{
    "accountId": 4,
    "cash": 150
}
```

---

### Ver histórico de movimentação

| Rota                     | Método    |
|--------------------------|-----------|
| **`/account/movements`** | **`GET`** |

**Parâmetros opcionais**

| Campo       | Tipo          | Local | default | Descrição                          |
|-------------|---------------|-------|---------|------------------------------------|
| **`page`**  | **`integer`** | query | 0       | Página dos dados                   |
| **`limit`** | **`integer`** | query | 50      | Quantidade de registros por página |

**Exemplo de requisição**

**`GET`** **`/account/movements`**


**Resposta de sucesso**

**Código**: **`200 OK`**

```json
{
    "data": [
        {
            "type": "deposit",
            "amount": 100,
            "createdAt": "2022-07-07T02:16:30.484Z"
        },
        {
            "type": "cashwithdrawal",
            "amount": 50,
            "createdAt": "2022-07-07T02:18:07.246Z"
        },
        {
            "type": "deposit",
            "amount": 34.5,
            "createdAt": "2022-07-07T12:40:55.947Z"
        },
        {
            "type": "cashwithdrawal",
            "amount": 25.4,
            "createdAt": "2022-07-07T12:41:16.532Z"
        }
    ],
    "count": 4
}
```

---

### Fazer transferências para outro usuário

| Rota             | Método     |
|------------------|------------|
| **`/transfers`** | **`POST`** |

**Parâmetros obrigatórios**

| Campo             | Tipo          | Local | Descrição                  |
|-------------------|---------------|-------|----------------------------|
| **`recipientId`** | **`integer`** | body  | ID do destinatário         |
| **`value`**       | **`integer`** | body  | Valor que será transferido |

**Exemplo de requisição**

**`POST`** **`/transfers`**

```json
{
    "recipientId": 2,
    "value": 100
}
```

**Resposta de sucesso**

**Código**: **`200 OK`**

```json
{
    "payer": {
        "name": "Thiago souza",
        "email": "user@email.com",
        "cash": 59.09999999999999
    },
    "recipient": {
        "name": "Felipe",
        "email": "felipe.email1@email.com"
    },
    "transferData": {
        "id": 8,
        "payerId": 4,
        "recipientId": 2,
        "value": 100,
        "createdAt": "2022-07-07T12:51:01.762Z"
    }
}
```
---

### Ver histórico de transferências

| Rota             | Método    |
|------------------|-----------|
| **`/transfers`** | **`GET`** |

**Parâmetros opcionais**

| Campo       | Tipo          | Local | default | Descrição                          |
|-------------|---------------|-------|---------|------------------------------------|
| **`page`**  | **`integer`** | query | 0       | Página dos dados                   |
| **`limit`** | **`integer`** | query | 50      | Quantidade de registros por página |

**Exemplo de requisição**

**`GET`** **`/transfers`**

**Resposta de sucesso**

**Código**: **`200 OK`**

```json
{    
    "data": [
        {
            "id": 8,
            "payerId": 4,
            "recipientId": 2,
            "value": 100,
            "createdAt": "2022-07-07T12:51:01.762Z",
            "payer": {
            	"name": "Thiago souza",
            	"email": "user@email.com"
            },
            "recipient": {
            	"name": "Felipe",
            	"email": "felipe.email1@email.com"
            }
        },
        {
            "id": 9,
            "payerId": 5,
            "recipientId": 4,
            "value": 56,
            "createdAt": "2022-07-07T13:00:59.841Z",
            "payer": {
            	"name": "Andersson sandin",
            	"email": "user_2@email.com"
            },
            "recipient": {
            	"name": "Thiago souza",
            	"email": "user@email.com"
            }
        },
        {
            "id": 10,
            "payerId": 2,
            "recipientId": 4,
            "value": 100,
            "createdAt": "2022-07-07T13:02:30.111Z",
            "payer": {
            	"name": "Felipe",
            	"email": "felipe.email1@email.com"
            },
            "recipient": {
            	"name": "Thiago souza",
            	"email": "user@email.com"
            }
        }
    ],
    "count": 3
}
```