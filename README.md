# API REST de videojuegos

API REST con Node.js, Express, PostgreSQL, JWT y validación con Zod.

## Requisitos

- Node.js 18 o superior
- PostgreSQL

## Instalación

```bash
npm install
cp .env.example .env
psql -U postgres -d videojuegos_db -f sql/init.sql
```

## Ejecución

```bash
npm run dev
```

Servidor: `http://localhost:3000`

## Rutas principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/studios`
- `GET /api/studios/:id`
- `GET /api/studios/:id/games`
- `POST /api/studios`
- `PUT /api/studios/:id`
- `DELETE /api/studios/:id`
- `GET /api/games`
- `GET /api/games/:id`
- `POST /api/games`
- `PUT /api/games/:id`
- `DELETE /api/games/:id`

## Autorización

Las rutas protegidas usan:

```http
Authorization: Bearer <token>
```

## Notas

- `POST /api/auth/register` crea usuarios.
- `POST /api/auth/login` devuelve el token JWT.
- Las rutas de `studios` y `games` permiten consultar, crear, editar y borrar según el token.
- Las consultas SQL usan parámetros.
