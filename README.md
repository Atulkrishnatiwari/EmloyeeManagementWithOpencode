# Employee Management Platform (Backend + Mobile)

Monorepo containing the Employee Management API and the EmployeeApp mobile client. The backend exposes REST and GraphQL endpoints backed by PostgreSQL, and the mobile app consumes either API mode from a single UI.

## Projects

- `employee-management`: Node.js/Express API with REST + GraphQL and PostgreSQL
- `EmployeeApp`: React Native mobile client for browsing and managing employees

## What You Can Do

- Create, update, list, and delete employee records
- Search and paginate employees via REST
- Query and mutate employee data via GraphQL
- Run the mobile app against REST or GraphQL from the same UI

## Tech Stack

- Backend: Node.js, Express, PostgreSQL, REST + GraphQL
- Mobile: React Native (Android + iOS)
- Tooling: npm scripts

## Getting Started

These are high-level steps. For full setup and exact commands, use:

- `employee-management/README.md` for the backend API
- `EmployeeApp/README.md` for the mobile app

### Prerequisites

- Node.js and npm
- PostgreSQL (local or container)
- Android Studio or Xcode (for mobile builds)
- CocoaPods (for iOS)

### Quick Start (Summary)

Backend:

```bash
cd employee-management
npm install
npm run dev
```

Mobile:

```bash
cd EmployeeApp
npm install
npm start
```

In a second terminal:

```bash
npm run android
# or
npm run ios
```

### Example Environment File (Safe Sample)

Create `employee-management/.env` with values that match your setup. Example only:

```bash
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=demo_user
DB_PASSWORD=demo_password
DB_NAME=employee_demo_db
```

### Example Database Setup (Safe Sample)

```bash
createdb employee_demo_db
npm run migrate
```

## API Overview (Examples)

REST base path: `/employees`

- `GET /employees?limit=10&page=1&search=alex`
- `GET /employees/:id`
- `POST /employees`
- `PUT /employees/:id`
- `DELETE /employees/:id`

GraphQL endpoint: `POST /graphql`

Example GraphQL query:

```graphql
query Employees($limit: Int, $page: Int) {
  employees(limit: $limit, page: $page) {
    id
    name
    role
    department
  }
}
```

## Mobile API Configuration

The mobile app base URL is set in `EmployeeApp/src/services/employeeApi.ts`. Example only:

```ts
const API_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
```

For Android emulators, `10.0.2.2` maps to your local machine.

## Scripts (Common)

Backend:

- `npm run dev` start API in dev mode
- `npm run migrate` apply database migrations

Mobile:

- `npm start` start Metro bundler
- `npm run android` run Android app
- `npm run ios` run iOS app

## Repo Structure

- `employee-management/`: backend API
- `EmployeeApp/`: mobile app

## Notes

- This README uses example values only. Replace with your own local settings.
- Do not commit real credentials or private infrastructure details.
