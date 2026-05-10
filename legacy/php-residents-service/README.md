# PHP Residents Microservice / PHP 住户数据微服务

This is a legacy PHP microservice retained to demonstrate the original resident-data API and Docker deployment workflow.

这是一个保留下来的 PHP 微服务，用于展示项目早期的住户数据 API 和 Docker 容器化部署流程。

## Purpose / 作用

The main application now uses Next.js, Supabase Auth, Row Level Security, and Supabase Database. This PHP service represents an earlier microservice-based approach:

当前主项目已经迁移到 Next.js、Supabase Auth、Row Level Security 和 Supabase Database。这个 PHP 服务代表项目早期的微服务方案：

```text
Next.js app -> Dockerized PHP microservice -> residents JSON
```

It is kept for architecture comparison and to show containerization experience.

保留它的目的是展示架构演进过程，以及 Docker 容器化经验。

## Run Locally / 本地运行

```bash
php -S localhost:8080 Residents.php
```

Open:

打开：

```text
http://localhost:8080/Residents.php
```

## Run With Docker / 使用 Docker 运行

Build the image:

构建镜像：

```bash
docker build -t strata-residents-php .
```

Run the container:

运行容器：

```bash
docker run --rm -p 8080:80 strata-residents-php
```

Open:

打开：

```text
http://localhost:8080/Residents.php
```

## Example Response / 返回示例

```json
[
  {
    "id": 1,
    "name": "Stella",
    "unit": "807",
    "email": "stella@example.com",
    "phone": "0412345678"
  }
]
```

## Migration Note / 迁移说明

This service was replaced by the current Supabase-backed data model to support authentication, Row Level Security, admin CRUD, and centralized data management.

该服务后来被当前的 Supabase 数据模型替代，以支持用户认证、行级安全策略、后台 CRUD 和集中式数据管理。
