# EmployeeApp

Mobile client for the Employee Management platform. This app allows you to browse, search, create, and delete employees using either REST or GraphQL APIs.

## Highlights

- REST and GraphQL toggle built into the UI
- Employee search by ID or name, with pull-to-refresh
- Create and delete employee flows
- React Navigation bottom tabs

## Tech Stack

- React Native
- React Navigation
- TypeScript
- Fetch API for network calls

## Requirements

- Node.js and npm
- Android Studio or Xcode
- CocoaPods (iOS)

## API Configuration

The API base URL is defined in `src/services/employeeApi.ts`.

```ts
const API_BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:5433' : 'http://localhost:5433';
```

Update the port or host to match your backend server. For Android emulators, `10.0.2.2` maps to your local machine.

## Run Locally

```bash
npm install
npm start
```

In another terminal:

```bash
npm run android
# or
npm run ios
```

### iOS setup

```bash
bundle install
bundle exec pod install
npm run ios
```

## Scripts

- `npm start`: start Metro
- `npm run android`: build and run Android
- `npm run ios`: build and run iOS
- `npm run lint`: lint codebase
- `npm test`: run tests

## Project Structure

- `App.tsx`: navigation and tab setup
- `component/`: screen components
- `src/components`: shared UI components
- `src/context`: app context (API mode)
- `src/services`: API clients

## Notes

- The app expects the backend to expose both REST and GraphQL endpoints.
- Search accepts a numeric ID or a name fragment.
