# EventHandler Project

## Overview

EventHandler is an event ticket booking system with user authentication and authorization. It uses JWT tokens for secure access, which are set as HTTP-only cookies upon login. The system includes features for creating, confirming, and canceling bookings, with ticket availability management.

## Features

- User signup and login with JWT authentication.
- JWT token stored as HTTP-only cookie for secure authorization.
- Middleware to protect routes by verifying JWT token from cookie or Authorization header.
- Event management with ticket availability tracking.
- Booking service with create, confirm, cancel, and list user bookings.
- Error handling with meaningful HTTP status codes and messages.

## Environment Variables

The project uses the following environment variables (see `.env.example`):

```
PORT=3000
DB_URL=mongodb://localhost:27017/event_ticket
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

## Setup and Running

1. Install dependencies:

```bash
npm install
```

2. Set up MongoDB:

- Ensure MongoDB is running locally at the URL specified in `DB_URL`.
- Note: Transactions require MongoDB replica set configuration. If using a standalone MongoDB, some booking operations using transactions may fail.

3. Run the server:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Register a new user.
- `POST /api/v1/auth/login` - Login user, returns JWT token as HTTP-only cookie.

### Booking

- `POST /api/v1/bookings` - Create a new booking (protected).
- `POST /api/v1/bookings/:id/confirm` - Confirm a booking (protected).
- `DELETE /api/v1/bookings/:id` - Cancel a booking (protected).
- `GET /api/v1/bookings` - Get user bookings (protected).

## Notes

- The JWT token is set as an HTTP-only cookie named `token` during login.
- Authorization middleware checks for the token in the cookie or Authorization header.
- Booking service uses MongoDB transactions; ensure your MongoDB supports transactions (replica set).
- If using standalone MongoDB, consider refactoring booking service to avoid transactions or configure MongoDB as a replica set.

## Testing

- Test authentication by signing up and logging in.
- Verify the `token` cookie is set on login.
- Test protected routes with the token cookie.
- Test booking creation, confirmation, cancellation, and retrieval.
- Handle error cases such as invalid tokens, insufficient tickets, and non-existent bookings.

