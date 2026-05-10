# Strata Management Portal / 分层物业管理平台

A full-stack strata management portal for apartment residents and committee members. The app centralizes building information, insurance records, maintenance contacts, resident records, and maintenance requests in one authenticated dashboard.

这是一个面向公寓住户和业主委员会的全栈分层物业管理平台。项目将楼宇信息、保险记录、维修联系方式、住户资料和维修请求集中到一个带登录权限控制的后台中。

## Features / 功能

- Supabase Auth sign in and sign up  
  Supabase Auth 登录与注册
- Protected resident records page  
  受保护的住户资料页面
- Admin allowlist using Supabase Row Level Security  
  基于 Supabase RLS 的管理员白名单
- Admin CRUD dashboard for residents, insurance, maintenance, and contact requests  
  后台 CRUD 管理住户、保险、维修和联系请求
- Public contact request form with Supabase storage  
  公开维修请求表单，并写入 Supabase 数据库
- Building, insurance, maintenance, and committee information pages  
  楼宇、保险、维修和委员会信息页面
- Vercel configuration with a scheduled reminder endpoint  
  Vercel 配置和定时提醒 API

## Tech Stack / 技术栈

- Next.js App Router
- React
- Supabase Auth and Database
- Supabase Row Level Security
- Vercel
- CSS utility layer in `app/globals.css`

## Getting Started / 本地运行

Install dependencies:

安装依赖：

```bash
npm install
```

Create `.env.local`:

创建 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
Website_Name=Strata Management
```

Run the local development server:

启动本地开发服务器：

```bash
npm run dev
```

Open:

打开：

```text
http://127.0.0.1:3001
```

## Supabase Setup / Supabase 配置

Create a new Supabase project, then run the SQL in:

创建一个新的 Supabase 项目，然后运行以下文件中的 SQL：

```text
supabase-schema.sql
```

The schema creates the required tables:

该 SQL 会创建以下数据表：

- `Residents`
- `Insurance`
- `Maintenance`
- `building`
- `contact_requests`
- `admin_users`

It also enables Row Level Security and creates policies for public reads, authenticated resident access, contact request submissions, and admin-only management.

它还会开启 Row Level Security，并创建公开读取、登录用户访问、联系请求提交和管理员管理所需的安全策略。

## Admin Access / 管理员权限

1. Register or sign in at `/login`.  
   在 `/login` 注册或登录。
2. Copy your Supabase Auth user id from `Authentication -> Users`.  
   在 Supabase 的 `Authentication -> Users` 中复制你的用户 ID。
3. Add yourself to the admin allowlist:  
   将自己加入管理员白名单：

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_ID');
```

4. Open `/admin`.  
   打开 `/admin`。

## Main Routes / 主要页面

- `/` - Home / 首页
- `/aboutus` - About the portal / 项目介绍
- `/buildinginfo` - Building and manager details / 楼宇和物业经理信息
- `/insuranceinfo` - Insurance register / 保险信息
- `/maintenanceinfo` - Maintenance provider details / 维修服务信息
- `/residents` - Protected resident records / 受保护的住户资料
- `/contact` - Maintenance request form / 维修请求表单
- `/login` - Supabase Auth / 登录注册
- `/admin` - Protected management dashboard / 受保护的管理后台

## Screenshots / 项目截图

Screenshots can be stored in:

项目截图可以放在：

```text
docs/screenshots/
```

Recommended screenshots:

建议补充这些截图：

- `home.png` - Home page / 首页
- `login.png` - Supabase Auth page / 登录注册页
- `admin-dashboard.png` - Protected CRUD dashboard / 后台管理面板
- `contact-request.png` - Contact request form / 维修请求表单
- `contact-requests-table.png` - Stored contact requests / 联系请求记录

Example:

示例：

```md
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
```

## Scripts / 命令

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment / 部署

Deploy on Vercel and add the same environment variables:

部署到 Vercel，并添加相同的环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Website_Name
```

The project includes `vercel.json` with a scheduled reminder endpoint at `/api/Alarm_Clock`.

项目包含 `vercel.json`，其中配置了 `/api/Alarm_Clock` 定时提醒接口。

## Resume Summary / 简历描述

Built a full-stack strata management portal using Next.js, Supabase Auth, Row Level Security, and Vercel, featuring protected admin routes, CRUD dashboards, resident records, insurance and maintenance management, and contact request storage.

使用 Next.js、Supabase Auth、Row Level Security 和 Vercel 构建了一个全栈分层物业管理平台，实现了受保护的后台路由、CRUD 管理面板、住户资料管理、保险和维修信息管理，以及联系请求存储功能。
