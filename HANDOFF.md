# Hotel Booking Backend — Handoff Doc

Quick-reference current state. Always keep updated — use this to resume work or brief someone (interviewer/collaborator).

## Project
Service-oriented hotel booking backend. 3 services (auth, catalog, order) + notification + API gateway. Demonstrates saga pattern, event-driven architecture, concurrency control (double-booking prevention).

## Stack
Node.js, TypeScript, Express, Prisma, PostgreSQL, Redis, RabbitMQ, Docker Compose

## Status: Phase 0 — Setup
- [x] Monorepo folder structure created
- [x] docker-compose.yml (postgres, redis, rabbitmq)
- [ ] postgres init script (multi-db)
- [ ] .env template
- [ ] shared logger/error lib

## Architecture