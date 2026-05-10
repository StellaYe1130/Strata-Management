# Strata Management Portal

<p>
  English |
  <a href="README.zh-CN.md">中文</a>
</p>

Live demo: https://strata-management-final-lime.vercel.app

GitHub: https://github.com/StellaYe1130/Strata-Management

A full-stack strata management web application for apartment residents and strata committee members. The project provides a resident-facing information portal and a protected management dashboard for handling resident records, building information, insurance details, maintenance contacts, and maintenance requests.

This project was built as a practical property-management system rather than a static website. It includes authentication, Row Level Security, CRUD workflows, database-backed contact requests, Vercel deployment, and a legacy Dockerized PHP microservice that demonstrates an earlier microservice-based architecture.

### Screenshots

#### Home Page

![Home Page](docs/screenshots/homepage1.png)

#### Portal Sections

![Portal Sections](docs/screenshots/homepage2.png)

### Core Features

- Resident and committee information portal
- Supabase Auth sign in and sign up
- Protected resident records page
- Admin allowlist controlled by Supabase Row Level Security
- Admin CRUD dashboard for residents, insurance, maintenance, and contact requests
- Search and status filtering in the admin dashboard
- Contact request workflow: `new -> in_progress -> resolved`
- Public maintenance request form stored in Supabase
- Building, insurance, maintenance, and committee information pages
- Vercel deployment with environment-based configuration
- Scheduled reminder endpoint configured through `vercel.json`
- Legacy PHP residents API containerized with Docker

### Tech Stack

- **Frontend:** Next.js App Router, React
- **Backend:** Next.js Route Handlers, Supabase Database
- **Auth:** Supabase Auth
- **Security:** Supabase Row Level Security
- **Deployment:** Vercel
- **Legacy Service:** PHP microservice with Docker
- **Styling:** Custom CSS utility layer in `app/globals.css`

### Architecture

Current production architecture:

```text
Browser
  -> Next.js App Router
  -> Next.js API Routes
  -> Supabase Auth
  -> Supabase Database with RLS
  -> Vercel Hosting
```

Legacy microservice architecture:

```text
Next.js app
  -> Dockerized PHP residents API
  -> JSON resident data
```

The PHP service is kept under `legacy/php-residents-service/` to demonstrate Docker and microservice experience. The current live application uses Supabase as the main data layer.

### AI Native Development Workflow

This project was developed with AI tools as part of the engineering workflow, not only for code generation. AI was used to:

- Break down product requirements into implementable tasks
- Debug local Next.js startup and environment issues
- Compare architecture options between a PHP microservice and a Supabase-backed full-stack app
- Draft and refine Supabase RLS policies
- Review Dockerfile and deployment configuration
- Improve bilingual documentation and resume-facing project descriptions

The final implementation was manually verified through login, protected-route access, admin CRUD operations, contact request submission, Supabase RLS behavior, Vercel deployment, and PHP service JSON output.

### Project Structure

```text
app/
  admin/                    Protected admin CRUD dashboard
  api/                      Next.js API routes
  components/               Shared header and footer
  contact/                  Maintenance request form
  login/                    Supabase Auth page
  residents/                Protected resident records
lib/
  supabaseClient.js         Browser Supabase client
  supabaseServer.js         Server-side Supabase helper
legacy/
  php-residents-service/    Dockerized PHP residents microservice
docs/
  screenshots/              Project screenshots
supabase-schema.sql         Supabase tables and RLS policies
vercel.json                 Vercel deployment and cron config
```

### Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/aboutus` | Portal overview |
| `/buildinginfo` | Building and manager information |
| `/insuranceinfo` | Insurance information |
| `/maintenanceinfo` | Maintenance provider information |
| `/residents` | Protected resident records |
| `/contact` | Public maintenance request form |
| `/login` | Supabase login and sign up |
| `/admin` | Protected admin dashboard |

### Business Workflow

The contact request flow models a lightweight operations workflow similar to ticket or order handling:

```text
Resident submits request
  -> Request stored in Supabase
  -> Admin reviews request
  -> Status changes from new to in_progress
  -> Admin marks request as resolved
```

This mirrors common back-office patterns used in e-commerce and operations systems, where staff need to search, filter, update, and resolve user-submitted records.

### Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
Website_Name=Strata Management
```

Run the local development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3001
```

### Supabase Setup

Create a Supabase project and run the SQL in:

```text
supabase-schema.sql
```

The schema creates:

- `Residents`
- `Insurance`
- `Maintenance`
- `building`
- `contact_requests`
- `admin_users`

It also enables Row Level Security and creates policies for public reads, authenticated resident access, contact request submissions, and admin-only management.

### Admin Access

After creating a Supabase Auth account, copy your user id from:

```text
Authentication -> Users
```

Then add yourself to the admin allowlist:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_ID');
```

After that, open:

```text
/admin
```

### Legacy PHP Docker Service

The project includes a legacy PHP residents API:

```text
legacy/php-residents-service/
```

Run with Docker:

```bash
cd legacy/php-residents-service
docker build -t strata-residents-php .
docker run --rm -p 8080:80 strata-residents-php
```

Open:

```text
http://localhost:8080/Residents.php
```

This service returns residents data as JSON and demonstrates how the project originally used a separate containerized microservice before migrating to Supabase.

### Deployment

The project is deployed on Vercel:

```text
https://strata-management-final-lime.vercel.app
```

Required Vercel environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Website_Name
```

### Resume Summary

Built and deployed a full-stack strata management portal using Next.js, Supabase Auth, Row Level Security, and Vercel. The system includes protected admin routes, CRUD dashboards, resident records, insurance and maintenance management, public contact request storage, and a legacy Dockerized PHP microservice showing earlier microservice architecture and containerization experience.

<p align="right"><a href="#strata-management-portal">Back to top</a></p>
