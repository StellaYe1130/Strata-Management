# Strata Management Portal

Live demo: https://strata-management-final-lime.vercel.app

GitHub: https://github.com/StellaYe1130/Strata-Management

A full-stack strata management web application for apartment residents and strata committee members. The project provides a resident-facing information portal and a protected management dashboard for handling resident records, building information, insurance details, maintenance contacts, and maintenance requests.

This project was built as a practical property-management system rather than a static website. It includes authentication, Row Level Security, CRUD workflows, database-backed contact requests, Vercel deployment, and a legacy Dockerized PHP microservice that demonstrates an earlier microservice-based architecture.

这是一个面向公寓住户和业主委员会的全栈物业管理平台。项目不仅是展示型网页，也包含登录认证、权限控制、后台 CRUD、数据库表单提交、Vercel 部署，以及一个用于展示 Docker/PHP 微服务经验的 legacy service。

## Screenshots

### Home Page

![Home Page](docs/screenshots/homepage1.png)

### Portal Sections

![Portal Sections](docs/screenshots/homepage2.png)

## Core Features

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

## 中文功能概览

- 面向住户和业主委员会的信息门户
- Supabase Auth 登录与注册
- 受保护的住户资料页面
- 基于 Supabase RLS 的管理员白名单
- 后台 CRUD 管理住户、保险、维修和联系请求
- 后台支持搜索、筛选和联系请求状态流转
- 联系请求工作流：`new -> in_progress -> resolved`
- 公开维修请求表单，并写入 Supabase 数据库
- 楼宇、保险、维修和委员会信息页面
- 使用 Vercel 部署
- 通过 `vercel.json` 配置定时提醒 API
- 保留 Dockerized PHP 住户数据微服务作为架构演进展示

## Tech Stack

- **Frontend:** Next.js App Router, React
- **Backend:** Next.js Route Handlers, Supabase Database
- **Auth:** Supabase Auth
- **Security:** Supabase Row Level Security
- **Deployment:** Vercel
- **Legacy Service:** PHP microservice with Docker
- **Styling:** Custom CSS utility layer in `app/globals.css`

## Architecture

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

当前线上版本使用 Supabase 作为主要数据层。PHP 服务保留在 `legacy/php-residents-service/` 中，用于展示项目早期的微服务方案和 Docker 容器化经验。

## AI Native Development Workflow

This project was developed with AI tools as part of the engineering workflow, not only for code generation. AI was used to:

- Break down product requirements into implementable tasks
- Debug local Next.js startup and environment issues
- Compare architecture options between a PHP microservice and a Supabase-backed full-stack app
- Draft and refine Supabase RLS policies
- Review Dockerfile and deployment configuration
- Improve bilingual documentation and resume-facing project descriptions

The final implementation was manually verified through login, protected-route access, admin CRUD operations, contact request submission, Supabase RLS behavior, Vercel deployment, and PHP service JSON output.

## AI Native 开发流程

本项目在开发过程中将 AI 工具作为工程工作流的一部分，而不仅仅用于生成代码。AI 主要用于：

- 将产品需求拆解为可实现的工程任务
- 辅助定位 Next.js 本地启动和环境配置问题
- 比较 PHP 微服务与 Supabase 全栈架构的取舍
- 设计和修正 Supabase RLS 权限策略
- 检查 Dockerfile 和部署配置
- 优化双语 README 与简历项目描述

最终功能通过登录、受保护路由、后台 CRUD、联系请求提交、Supabase RLS、Vercel 部署和 PHP JSON 服务输出进行了手动验证。

## Project Structure

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

## Main Routes

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

## Business Workflow

The contact request flow models a lightweight operations workflow similar to ticket or order handling:

```text
Resident submits request
  -> Request stored in Supabase
  -> Admin reviews request
  -> Status changes from new to in_progress
  -> Admin marks request as resolved
```

This mirrors common back-office patterns used in e-commerce and operations systems, where staff need to search, filter, update, and resolve user-submitted records.

## 业务流程

联系请求功能模拟了一个轻量级运营后台流程，类似电商系统中的售后工单或订单处理：

```text
住户提交请求
  -> 请求写入 Supabase
  -> 管理员查看请求
  -> 状态从 new 更新为 in_progress
  -> 管理员处理完成后标记为 resolved
```

该流程体现了后台系统中常见的搜索、筛选、状态更新和记录处理能力。

## Local Setup

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

## Supabase Setup

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

## Admin Access

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

## Legacy PHP Docker Service

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

## Deployment

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

## Resume Summary

Built and deployed a full-stack strata management portal using Next.js, Supabase Auth, Row Level Security, and Vercel. The system includes protected admin routes, CRUD dashboards, resident records, insurance and maintenance management, public contact request storage, and a legacy Dockerized PHP microservice showing earlier microservice architecture and containerization experience.

使用 Next.js、Supabase Auth、Row Level Security 和 Vercel 构建并部署了一个全栈分层物业管理平台，实现了受保护的后台路由、CRUD 管理面板、住户资料、保险和维修信息管理、公开联系请求存储，并保留 Dockerized PHP 微服务作为早期微服务架构和容器化经验展示。
