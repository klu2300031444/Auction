# Auction Backend (Spring Boot)

This is a minimal Spring Boot backend for the AuctionHub frontend. It uses H2 in-memory database for demo/development.

Run

1. Install JDK 17 and Maven.
2. From this folder run:

```bash
cd backend
mvn spring-boot:run
```

API

- GET /api/auctions - list auctions
- GET /api/auctions/{id} - get auction
- POST /api/auctions - create auction (JSON body)

CORS

The controller is configured to allow requests from `http://localhost:5173` (Vite dev server). Adjust if needed.
