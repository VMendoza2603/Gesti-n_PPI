# Gestión y Despliegue Controlado - Landing Page

Proyecto integrador de Gestión de la Configuración de Software.

## Estructura del repositorio

```
proyecto/
├── frontend/          # Aplicación React + TypeScript + Vite
├── backend/           # API REST con Node.js + Express
├── docker-compose.yml # Orquestación de contenedores
└── README.md
```

## Tecnologías

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Node.js, Express
- **Contenedores:** Docker, Docker Compose
- **Control de versiones:** Git, GitHub

## Ejecución con Docker

```bash
docker compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:3000/api

## Ramas

- `main` — versión estable
- `develop` — integración de cambios
- `feature/*` — desarrollo de funcionalidades
