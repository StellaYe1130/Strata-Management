# Strata Management Portal

<p>
  <a href="README.md">English</a> |
  中文
</p>

在线演示: https://strata-management-final-lime.vercel.app

GitHub: https://github.com/StellaYe1130/Strata-Management

这是一个面向公寓住户和业主委员会的全栈物业管理平台。项目提供住户端信息门户，以及受保护的后台管理系统，用于管理住户资料、楼宇信息、保险信息、维修联系人和维修请求。

这个项目不是静态展示页，而是一个更接近真实物业管理场景的 Web 应用。它包含登录认证、Row Level Security 权限控制、CRUD 工作流、数据库表单提交、Vercel 部署，以及一个用于展示早期微服务架构经验的 Dockerized PHP legacy service。

### 项目截图

#### 首页

![首页](docs/screenshots/homepage1.png)

#### 信息门户模块

![信息门户模块](docs/screenshots/homepage2.png)

### 核心功能

- 面向住户和业主委员会的信息门户
- Supabase Auth 登录与注册
- 受保护的住户资料页面
- 基于 Supabase Row Level Security 的管理员白名单
- 后台 CRUD 管理住户、保险、维修和联系请求
- 后台支持搜索、筛选和联系请求状态流转
- 联系请求工作流: `new -> in_progress -> resolved`
- 公开维修请求表单，并写入 Supabase 数据库
- 楼宇、保险、维修和委员会信息页面
- 使用 Vercel 部署，并通过环境变量配置
- 通过 `vercel.json` 配置定时提醒 API
- 保留 Dockerized PHP 住户数据微服务作为架构演进展示

### 技术栈

- **前端:** Next.js App Router, React
- **后端:** Next.js Route Handlers, Supabase Database
- **认证:** Supabase Auth
- **安全:** Supabase Row Level Security
- **部署:** Vercel
- **Legacy Service:** PHP microservice with Docker
- **样式:** `app/globals.css` 中的自定义 CSS utility layer

### 架构

当前线上架构:

```text
Browser
  -> Next.js App Router
  -> Next.js API Routes
  -> Supabase Auth
  -> Supabase Database with RLS
  -> Vercel Hosting
```

早期微服务架构:

```text
Next.js app
  -> Dockerized PHP residents API
  -> JSON resident data
```

当前线上版本使用 Supabase 作为主要数据层。PHP 服务保留在 `legacy/php-residents-service/` 中，用于展示项目早期的微服务方案和 Docker 容器化经验。

### AI Native 开发流程

本项目在开发过程中将 AI 工具作为工程工作流的一部分，而不仅仅用于生成代码。AI 主要用于:

- 将产品需求拆解为可实现的工程任务
- 辅助定位 Next.js 本地启动和环境配置问题
- 比较 PHP 微服务与 Supabase 全栈架构的取舍
- 设计和修正 Supabase RLS 权限策略
- 检查 Dockerfile 和部署配置
- 优化双语 README 与简历项目描述

最终功能通过登录、受保护路由、后台 CRUD、联系请求提交、Supabase RLS、Vercel 部署和 PHP JSON 服务输出进行了手动验证。

### 项目结构

```text
app/
  admin/                    受保护的后台 CRUD dashboard
  api/                      Next.js API routes
  components/               共享 Header 和 Footer
  contact/                  维修请求表单
  login/                    Supabase Auth 页面
  residents/                受保护的住户资料页面
lib/
  supabaseClient.js         浏览器端 Supabase client
  supabaseServer.js         服务端 Supabase helper
legacy/
  php-residents-service/    Dockerized PHP residents microservice
docs/
  screenshots/              项目截图
supabase-schema.sql         Supabase tables and RLS policies
vercel.json                 Vercel deployment and cron config
```

### 主要路由

| 路由 | 用途 |
| --- | --- |
| `/` | 首页 |
| `/aboutus` | 信息门户概览 |
| `/buildinginfo` | 楼宇和物业经理信息 |
| `/insuranceinfo` | 保险信息 |
| `/maintenanceinfo` | 维修服务商信息 |
| `/residents` | 受保护的住户资料 |
| `/contact` | 公开维修请求表单 |
| `/login` | Supabase 登录与注册 |
| `/admin` | 受保护的后台管理页面 |

### 业务流程

联系请求功能模拟了一个轻量级运营后台流程，类似电商系统中的售后工单或订单处理:

```text
住户提交请求
  -> 请求写入 Supabase
  -> 管理员查看请求
  -> 状态从 new 更新为 in_progress
  -> 管理员处理完成后标记为 resolved
```

该流程体现了后台系统中常见的搜索、筛选、状态更新和记录处理能力。

### 本地运行

安装依赖:

```bash
npm install
```

创建 `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
Website_Name=Strata Management
```

启动本地开发服务器:

```bash
npm run dev
```

打开:

```text
http://127.0.0.1:3001
```

### Supabase 配置

创建 Supabase project，并运行以下文件中的 SQL:

```text
supabase-schema.sql
```

该 schema 会创建:

- `Residents`
- `Insurance`
- `Maintenance`
- `building`
- `contact_requests`
- `admin_users`

同时会启用 Row Level Security，并创建公开读取、登录住户访问、联系请求提交和管理员管理相关的权限策略。

### 管理员权限

创建 Supabase Auth 账号后，从以下位置复制 user id:

```text
Authentication -> Users
```

然后把自己加入管理员白名单:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_ID');
```

之后打开:

```text
/admin
```

### Legacy PHP Docker Service

项目中包含一个 legacy PHP residents API:

```text
legacy/php-residents-service/
```

使用 Docker 运行:

```bash
cd legacy/php-residents-service
docker build -t strata-residents-php .
docker run --rm -p 8080:80 strata-residents-php
```

打开:

```text
http://localhost:8080/Residents.php
```

这个服务会返回 JSON 格式的住户数据，用于展示项目从独立容器化微服务迁移到 Supabase 数据层之前的架构演进。

### 部署

项目部署在 Vercel:

```text
https://strata-management-final-lime.vercel.app
```

Vercel 需要配置以下环境变量:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Website_Name
```

### 简历项目描述

使用 Next.js、Supabase Auth、Row Level Security 和 Vercel 构建并部署了一个全栈分层物业管理平台，实现了受保护的后台路由、CRUD 管理面板、住户资料、保险和维修信息管理、公开联系请求存储，并保留 Dockerized PHP 微服务作为早期微服务架构和容器化经验展示。

<p align="right"><a href="#strata-management-portal">回到顶部</a></p>
