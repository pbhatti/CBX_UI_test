# Architecture Overview
This document serves as a critical, living template designed to equip agents with a rapid and comprehensive understanding of the codebase's architecture. Update it as the codebase evolves.

---

## 1. Project Structure (Initiative Prototype)

This is a **Next.js 14** app (App Router). No separate backend or frontend repo; UI and routing live in this repo.

```
[Project Root]/
├── app/                    # Routes and page composition only
│   ├── layout.tsx         # Root layout (font, metadata)
│   ├── page.tsx           # Home = Initiatives screen
│   ├── campaigns/page.tsx
│   ├── step-configuration/page.tsx
│   ├── globals.css
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/            # Layout primitives and composed views
│   │   ├── AppLayout.tsx  # Root: optional LeftNav + main column
│   │   ├── MainColumn.tsx
│   │   ├── views/         # InitiativesView, CampaignsView
│   │   └── layout-types.ts
│   ├── left-nav/          # LeftNav component + index
│   ├── site-header/       # SiteHeader, CampaignHeader
│   ├── chat-sidebar/      # ChatSidebar (comments panel)
│   ├── content-panels/    # ContentPanel wrapper
│   ├── ui/                # Primitives: Button, Input, Select, AppIcon, etc.
│   ├── background-gradient.tsx
│   ├── campaign-header.tsx # Legacy re-export
│   ├── create-initiative-form.tsx
│   ├── filter-bar.tsx
│   ├── header.tsx         # Legacy wrapper around SiteHeader
│   ├── initiatives-table.tsx
│   ├── journey-canvas.tsx
│   ├── landing-page-preview.tsx
│   ├── navigation-sidebar.tsx # Legacy re-export of LeftNav
│   ├── pagination.tsx
│   └── publish-settings-modal.tsx
├── lib/
│   └── utils.ts
├── public/
│   ├── assets/            # Organized by component/global
│   │   ├── global/        # Logos, shared icons
│   │   ├── left-nav/
│   │   ├── site-header/
│   │   ├── chat-sidebar/
│   │   └── content-panels/
│   └── images/            # Legacy; prefer public/assets/*
├── docs/
│   ├── architecture.md    # This file
│   ├── terminology.md    # Copy, labels, date/time standards
│   └── behaviors.md      # Hover, animation, dropdown standards
├── .cursor/skills/icons/  # Icons skill (SKILL.md) for fixed icon containers
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 1b. Layout Model & UI Component Map (Prototype)

**Layout (auto-layout mental model):**

- **Height:** One column. Top = site header (fixed height). Remainder = main content (flex-1, scrollable).
- **Width:** Optional left nav (240px expanded / 64px collapsed). Main area takes remaining width. Optional right-side panels (e.g. chat, content view) at 320–340px.

**Component map:**

| Component       | Role                 | Location / notes                    |
|----------------|----------------------|-------------------------------------|
| **LeftNav**    | App-level navigation | Fixed left, full height             |
| **SiteHeader** | Page title + CTA     | Top of main column                  |
| **ChatSidebar**| Comments / messages  | Right, 340px                        |
| **ContentPanel**| Content wrapper     | Main area or side panel             |

**Screen → components:**

- **Initiatives (home):** LeftNav + (SiteHeader + ContentPanel with FilterBar, InitiativesTable, Pagination).
- **Campaigns:** LeftNav + CampaignHeader + JourneyCanvas.
- **Background Gradient flow:** Can hide LeftNav; top bar + gradient/content + optional Content view, ChatSidebar, Edit setup panels.

**Key dimensions:** Left nav 240 / 64px. Site header ~64px. Chat/Edit panels 340px. Content view 320px (expand) / 160px (collapsed).

**Making contained changes:** Change layout/structure → update this section and `components/layout`. New screen → new page under `app/` + row here. New global component → add to table and correct `components/` folder. Behaviors → document in `docs/behaviors.md`. Copy → `docs/terminology.md`. Icons → use `AppIcon` and `.cursor/skills/icons` (icons skill).



## 2. High-Level System Diagram

Single Next.js app; no backend or external services in this prototype.

```
[User] <--> [Next.js App (Initiative Prototype)]
                 │
                 ├── app/* (routes) compose layout + views
                 ├── components/layout (AppLayout, MainColumn, *View)
                 └── components/{left-nav, site-header, chat-sidebar, content-panels, ui, ...}
```                           

## 3. Core Components

### 3.1. Frontend (only)

**Name:** Initiative Prototype (Different – Web App)

**Description:** Prototype UI for initiatives, campaigns, and an ad/journey flow (Background Gradient). Users see a left nav, site header, and content panels (tables, journey canvas, modals). Screens are composed from `AppLayout` + view components (e.g. `InitiativesView`, `CampaignsView`).

**Technologies:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Radix UI primitives, Lucide icons.

**Deployment:** Local (`npm run dev`); optional Vercel (see `deploy-to-vercel.sh`).

### 3.2. Backend Services

None in this repo. Prototype is front-end only; data is mock/local state.

## 4. Data Stores

(List and describe the databases and other persistent storage solutions used.)

### 4.1. [Data Store Type 1]

Name: [e.g., Primary User Database, Analytics Data Warehouse]

Type: [e.g., PostgreSQL, MongoDB, Redis, S3, Firestore]

Purpose: [Briefly describe what data it stores and why.]

Key Schemas/Collections: [List important tables/collections, e.g., users, products, orders (no need for full schema, just names)]

### 4.2. [Data Store Type 2]

Name: [e.g., Cache, Message Queue]

Type: [e.g., Redis, Kafka, RabbitMQ]

Purpose: [Briefly describe its purpose, e.g., "Used for caching frequently accessed data" or "Inter-service communication."]

## 5. External Integrations / APIs

(List any third-party services or external APIs the system interacts with.)

Service Name 1: [e.g., Stripe, SendGrid, Google Maps API]

Purpose: [Briefly describe its function, e.g., "Payment processing."]

Integration Method: [e.g., REST API, SDK]

## 6. Deployment & Infrastructure

Cloud Provider: [e.g., AWS, GCP, Azure, On-premise]

Key Services Used: [e.g., EC2, Lambda, S3, RDS, Kubernetes, Cloud Functions, App Engine]

CI/CD Pipeline: [e.g., GitHub Actions, GitLab CI, Jenkins, CircleCI]

Monitoring & Logging: [e.g., Prometheus, Grafana, CloudWatch, Stackdriver, ELK Stack]

## 7. Security Considerations

(Highlight any critical security aspects, authentication mechanisms, or data encryption practices.)

Authentication: [e.g., OAuth2, JWT, API Keys]

Authorization: [e.g., RBAC, ACLs]

Data Encryption: [e.g., TLS in transit, AES-256 at rest]

Key Security Tools/Practices: [e.g., WAF, regular security audits]

## 8. Development & Testing Environment

Local Setup Instructions: [Link to CONTRIBUTING.md or brief steps]

Testing Frameworks: [e.g., Jest, Pytest, JUnit]

Code Quality Tools: [e.g., ESLint, Black, SonarQube]

## 9. Future Considerations / Roadmap

(Briefly note any known architectural debts, planned major changes, or significant future features that might impact the architecture.)

[e.g., "Migrate from monolith to microservices."]

[e.g., "Implement event-driven architecture for real-time updates."]

## 10. Project Identification

Project Name: Initiative Prototype (Different)

Repository URL: (Insert repository URL if applicable)

Primary Contact/Team: (Insert lead/team)

Date of Last Update: 2025-02-05

## 11. Glossary / Acronyms

Define any project-specific terms or acronyms.)

[Acronym]: [Full Definition]

[Term]: [Explanation]