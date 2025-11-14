# Sistema de Cotações

Aplicação full-stack para gerenciamento de cotações de moedas.

## Tecnologias

- **Backend:** Java 21 + Spring Boot 3.2
- **Frontend:** React 18
- **Banco de Dados:** H2 (desenvolvimento)

## Como rodar

### Backend (API Java)
```bash
cd backend
./mvnw spring-boot:run
# Roda em http://localhost:8081
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Roda em http://localhost:5177
```

## Endpoints da API

- `GET /api/cotacoes` - Lista todas as cotações
- `GET /api/cotacoes/{moeda}` - Busca cotação atual
- `GET /api/cotacoes/{moeda}/historico` - Busca histórico
- `POST /api/cotacoes` - Cria nova cotação

## Autor
Flavio Antunes
