# Hotel Booking Backend — Learning Log

Detailed log of concepts, decisions, and reasoning as project builds. Add entries chronologically.

---

## Day 1 — Setup

### What we did
- Created monorepo structure: services/{auth,catalog,order,notification}, gateway, infra
- docker-compose.yml with postgres, redis, rabbitmq

### Concepts learned
- **PowerShell vs bash mkdir**: `-p` flag doesn't exist in PowerShell; use comma-separated paths instead. PowerShell auto-creates parent dirs by default.
- **Why service-per-domain, not layer**: each service owns its business capability (auth, catalog, order) not a technical layer (controllers, services, models). Enables independent deploy/scale.
- **Why separate DB per service**: no shared DB = no tight coupling, services can't accidentally depend on each other's schema. Core SOA/microservices principle.

### Decisions & why
- Chose hotel booking over ecommerce: domain experience (Pruthatek) + cleaner saga narrative (reserve → pay → confirm vs cart/inventory complexity)
- RabbitMQ over Redis Streams: more standard in interviews, better tooling/UI (management console) to demo

---

## Day 2 — (next entry)