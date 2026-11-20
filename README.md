# 🛍️ MAISON — Landing de tienda de moda

Proyecto integrador de **Gestión de la Configuración de Software** (UNEMI): una landing de tienda
con catálogo, colecciones, carrito y formulario de contacto, desarrollada con **React 19 +
TypeScript + Vite**, una API **Express** y orquestada con **Docker Compose**. El trabajo en equipo
siguió **Git Flow** (`main`, `develop`, `feature/*`) con pull requests.

> La misma landing también existe en **Vue 3**:
> [LandingPage_Vue](https://github.com/VMendoza2603/LandingPage_Vue).

## Funcionalidades

- Catálogo de productos y colecciones con animaciones de entrada.
- **Carrito** lateral con cantidades, envío gratis desde un monto mínimo y selección de método de pago
  (tienda de demostración: no se realizan cobros reales).
- **Formulario de contacto** con validación en vivo, accesible (ARIA) y protegido contra spam.
- Diseño responsive y semántico.

## Estructura

```
├── frontend/            # React + TypeScript + Vite (proyecto Vercel con Root Directory = frontend)
├── backend/             # API Express de contacto (proyecto Vercel con Root Directory = backend)
│   ├── app.js           # Rutas, seguridad y validación (entrada en Vercel)
│   ├── server.js        # Arranque local y Docker
│   ├── storage.js       # MongoDB Atlas en producción; archivo JSON en local/Docker
│   └── test/            # Pruebas (node:test + supertest)
└── docker-compose.yml   # Frontend (Nginx) + backend
```

## Seguridad

- **Datos personales protegidos:** el listado de mensajes (`GET /api/contacts`) exige un token de
  administración y la respuesta del formulario ya no devuelve los datos enviados.
- Validación en el servidor con lista blanca de campos (las mismas reglas que el formulario).
- Anti-spam: límite de 5 mensajes por IP cada 15 minutos y campo trampa (honeypot) para bots.
- Helmet, CORS restringido al dominio del frontend y CSP/HSTS en el frontend.
- Los mensajes de contacto nunca se suben al repositorio (`backend/data/*.json` en `.gitignore`).

## Ejecución

### Con Docker

```bash
docker compose up --build
```

- Frontend: http://localhost
- API: http://localhost:3000/api

### Sin Docker

```bash
cd backend && npm install && npm run dev      # http://localhost:3000
cd frontend && npm install && npm run dev     # http://localhost:5173
```

### Pruebas

```bash
cd backend && npm test
```

## Despliegue en Vercel

1. **Backend** — Root Directory: `backend`. Variables: `MONGODB_URI`, `FRONTEND_URL` y, si quieres
   consultar los mensajes, `ADMIN_TOKEN`.
2. **Frontend** — Root Directory: `frontend`. Variable: `VITE_API_URL` con la URL del backend.

## Ramas

- `main` — versión estable
- `develop` — integración de cambios
- `feature/*` — desarrollo de funcionalidades
