# API REST autenticada - Catalogo de videojuegos

Proyecto de Node.js + Express + PostgreSQL con autenticacion JWT, validacion con Zod y consultas SQL parametrizadas.

## Requisitos

- Node.js 18+
- PostgreSQL

## Instalacion

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo de entorno desde `.env.example`:

```bash
cp .env.example .env
```

3. Crear base de datos en PostgreSQL y ejecutar script:

```bash
psql -U postgres -d videojuegos_db -f sql/init.sql
```

4. Ejecutar servidor:

```bash
npm run dev
```

Servidor por defecto: `http://localhost:3000`

## Estructura

```text
src/
  controllers/
  routes/
  middleware/
  schemas/
  db/
sql/
```

## Endpoints

### Auth (publicos)

- `POST /api/auth/register`
- `POST /api/auth/login`

#### Registro

Body:

```json
{
  "username": "devstudio1",
  "email": "user@example.com",
  "password": "Password1"
}
```

Respuesta `201`:

```json
{
  "id": 1,
  "username": "devstudio1",
  "email": "user@example.com",
  "created_at": "2026-01-01T10:00:00.000Z"
}
```

#### Login

Body:

```json
{
  "email": "user@example.com",
  "password": "Password1"
}
```

Respuesta `200`:

```json
{
  "token": "eyJ..."
}
```

### Studios

- `GET /api/studios` (publico)
- `GET /api/studios/:id` (publico)
- `GET /api/studios/:id/games` (publico)
- `POST /api/studios` (auth)
- `PUT /api/studios/:id` (auth)
- `DELETE /api/studios/:id` (auth)

Body create/update:

```json
{
  "name": "Naughty Dog",
  "country": "USA",
  "founded_year": 1984
}
```

### Games

- `GET /api/games` (publico, incluye `studio_name`)
- `GET /api/games/:id` (publico, incluye `studio_name`)
- `POST /api/games` (auth)
- `PUT /api/games/:id` (auth)
- `DELETE /api/games/:id` (auth)

Body create/update:

```json
{
  "title": "The Last of Us",
  "genre": "Action-Adventure",
  "release_year": 2013,
  "studio_id": 1
}
```

## Autorizacion

Para endpoints protegidos, enviar:

```http
Authorization: Bearer <token>
```

## Codigos HTTP usados

- `200 OK`
- `201 Created`
- `400 Bad Request`
- `401 Unauthorized`
- `404 Not Found`
- `409 Conflict`
- `500 Internal Server Error`

## Decisiones tecnicas

- Se usa middleware `validate` para centralizar validacion con Zod.
- Se usa middleware `auth` para validar JWT Bearer en rutas protegidas.
- Se usa middleware `errorHandler` para control de errores no esperados.
- Todas las consultas SQL usan parametros (`$1`, `$2`, etc.).
- El endpoint `DELETE /api/studios/:id` devuelve `409` si hay videojuegos asociados.
