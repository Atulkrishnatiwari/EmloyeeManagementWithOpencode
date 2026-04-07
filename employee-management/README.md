# Employee Management API

Production-ready backend for managing employees, offering both REST and GraphQL interfaces on top of PostgreSQL.

## Highlights

- REST and GraphQL APIs for the same data model
- PostgreSQL persistence with migrations
- Search, pagination, and input validation
- Clean error responses for client-friendly UX

## Tech Stack

- Node.js, Express
- PostgreSQL (pg)
- graphql-http
- Morgan logging

## Requirements

- Node.js and npm
- PostgreSQL

## Configuration

Create a `.env` file in the project root with the following variables:

```bash
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=employee_db
```

## Database Setup

You can initialize the database with either migrations or the SQL script:

```bash
# Create database
createdb employee_db

# Option A: Run migrations
npm run migrate

# Option B: Use SQL file
psql -d employee_db -f sql/create_employees.sql
```

## Run Locally

```bash
npm install
npm run dev
```

Server defaults to `http://localhost:4000`.

## REST API

Base path: `/employees`

- `GET /employees?limit=10&page=1&search=alex` (searches name or email)
- `GET /employees/:id`
- `POST /employees`
- `PUT /employees/:id`
- `DELETE /employees`
- `DELETE /employees/:id`

Example create:

```bash
curl -X POST http://localhost:4000/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex Doe","email":"alex@example.com","mobile":"+1-202-555-0111","image":"https://example.com/pic.jpg"}'
```

## GraphQL

Endpoint: `POST /graphql`

Example query:

```graphql
query {
  employees(page: 1, limit: 10, search: "alex") {
    id
    name
    email
    mobile
    image
  }
}
```

Example mutation:

```graphql
mutation {
  createEmployee(input: { name: "Alex", email: "alex@example.com", mobile: "+1-202-555-0111", image: null }) {
    id
    name
    email
    mobile
    image
  }
}
```

## Project Structure

- `src/app.js`: Express app and routes
- `src/controllers`: REST handlers
- `src/graphql`: schema and resolvers
- `src/models`: database access
- `src/migrations`: SQL migrations
- `sql/`: optional SQL bootstrap

## Notes

- Email is unique and validated on create and update.
- Validation errors return `400`, missing records return `404`.
- Image URL is optional and stored as `null` when empty.
