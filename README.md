# Employee Management Platform (Backend + Mobile)

Monorepo containing the Employee Management API and the EmployeeApp mobile client. The backend exposes REST and GraphQL endpoints backed by PostgreSQL, and the mobile app consumes either API mode from a single UI.

## Projects

- `employee-management`: Node.js/Express API with REST + GraphQL and PostgreSQL
- `EmployeeApp`: React Native mobile client for browsing and managing employees

## Prerequisites

- Node.js and npm
- PostgreSQL
- Android Studio or Xcode (for mobile builds)
- CocoaPods (for iOS)

## Quick Start

### 1) Backend API

```bash
cd employee-management
npm install
```

Create `employee-management/.env` with your database settings:

```bash
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=employee_db
```

Initialize the database (choose one):

```bash
createdb employee_db
npm run migrate
# or
psql -d employee_db -f sql/create_employees.sql
```

Start the server:

```bash
npm run dev
```

API defaults to `http://localhost:4000` unless overridden by `PORT`.

### 2) Mobile App

```bash
cd EmployeeApp
npm install
npm start
```

In another terminal:

```bash
npm run android
# or
npm run ios
```

iOS setup (first run):

```bash
bundle install
bundle exec pod install
```

## API Configuration

The mobile app base URL is set in `EmployeeApp/src/services/employeeApi.ts`. Make sure it matches the backend host and port you configured in `employee-management/.env`.

Example (from the app):

```ts
const API_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:5433' : 'http://localhost:5433';
```

For Android emulators, `10.0.2.2` maps to your local machine.

## API Overview

REST base path: `/employees`

- `GET /employees?limit=10&page=1&search=alex`
- `GET /employees/:id`
- `POST /employees`
- `PUT /employees/:id`
- `DELETE /employees`
- `DELETE /employees/:id`

GraphQL endpoint: `POST /graphql`

## Repo Structure

- `employee-management/`: backend API
- `EmployeeApp/`: mobile app

## More Details

- `employee-management/README.md` contains API setup, migrations, and examples
- `EmployeeApp/README.md` contains mobile build instructions and scripts
