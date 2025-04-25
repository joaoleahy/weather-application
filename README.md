# Weather Application

Uma aplicação web moderna para consulta de condições climáticas, desenvolvida com TypeScript, React e Node.js.

## Visão Geral

O Weather Application permite aos usuários:
- Buscar informações climáticas por nome de cidade
- Obter dados meteorológicos baseados na localização atual
- Visualizar detalhes como temperatura, umidade, velocidade do vento e condições climáticas
- Alternar entre unidades métricas e imperiais

## Tecnologias Utilizadas

### Frontend
- React com TypeScript
- Vite como bundler
- Tailwind CSS e shadcn/ui para componentes de interface
- React Hook Form para gerenciamento de formulários
- Axios para requisições HTTP

### Backend
- Node.js com TypeScript
- Express para servidor HTTP
- Axios para consumo da API OpenWeatherMap
- Arquitetura modular com controllers, services e utils

## Estrutura do Projeto

```
weather-application/
├── frontend/             # Aplicação React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── services/     # Serviços para API
│   │   ├── types/        # Definições de tipos TypeScript
│   │   └── utils/        # Funções utilitárias
│   └── ...
└── backend/              # Servidor Node.js/Express
    ├── src/
    │   ├── controllers/  # Controladores de rotas
    │   ├── routes/       # Definições de rotas
    │   ├── services/     # Serviços de negócio
    │   ├── types/        # Definições de tipos TypeScript
    │   └── utils/        # Funções utilitárias
    └── ...
```

## Configuração e Execução Local

### Pré-requisitos
- Node.js 18+ instalado
- Chave de API do OpenWeatherMap (obtenha em [OpenWeatherMap](https://openweathermap.org/api))

### Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edite o arquivo `.env` e adicione sua chave de API do OpenWeatherMap:
   ```
   OPENWEATHERMAP_API_KEY=sua_chave_aqui
   PORT=5000
   ```

5. Execute o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:5000`.

### Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edite o arquivo `.env` para apontar para o backend:
   ```
   VITE_API_URL=http://localhost:5000/api/weather
   ```

5. Execute a aplicação em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`.

## Endpoints da API

### Backend

- `GET /api/weather/cities?query={cityName}` - Busca sugestões de cidades
- `GET /api/weather/city?city={cityName}` - Busca dados climáticos por nome de cidade
- `GET /api/weather/coords?lat={latitude}&lon={longitude}` - Busca dados climáticos por coordenadas