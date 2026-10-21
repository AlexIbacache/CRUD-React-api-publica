# CRUD de Productos

Aplicación web para administrar productos consumiendo la API pública de [FakeStoreAPI](https://fakestoreapi.com/docs). Permite listar los productos existentes y crear nuevos. La edición y la eliminación están en desarrollo.

## Stack

- [Vite](https://vite.dev/) como bundler y servidor de desarrollo.
- [React 19](https://react.dev/) con JavaScript (sin TypeScript).
- [Tailwind CSS 4](https://tailwindcss.com/) para los estilos.
- `Fetch API` para el consumo de la API REST.
- [pnpm](https://pnpm.io/) como gestor de paquetes.

## Requisitos

- Node.js 20 o superior.
- pnpm instalado (`npm install -g pnpm`).

## Instalación y ejecución

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo con recarga en caliente. |
| `pnpm build` | Genera la versión de producción en `dist/`. |
| `pnpm preview` | Sirve localmente la build de producción. |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto. |

## Funcionalidades

- Listado de productos obtenidos desde `GET /products`.
- Estados de carga y de error en la carga inicial.
- Creación de productos mediante un formulario controlado y `POST /products`.
- Diseño responsive (mobile, tablet y desktop).

## Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx          Barra de navegación y acceso al alta
│   ├── ProductCard.jsx     Presentación de un producto
│   └── ModalProducto.jsx   Formulario de alta en un modal
├── App.jsx                 Estado principal y carga de datos
├── index.css               Importación de Tailwind
└── main.jsx                Punto de entrada
```

## Decisiones técnicas

**El estado de la sesión vive en React, no en la API.**
FakeStoreAPI simula las operaciones de escritura pero no las persiste. Por eso el listado se obtiene una sola vez al montar y cada operación de escritura actualiza el estado local. Volver a pedir `GET /products` después de crear un producto lo haría desaparecer de la interfaz.

**Los productos creados usan un identificador local.**
La API devuelve siempre el mismo `id` en las respuestas de creación, por lo que no sirve como identificador único. Para los productos creados en la sesión se genera un `crypto.randomUUID()`.

**El precio se guarda como número y se formatea al mostrarlo.**
El estado almacena el valor numérico y la tarjeta lo presenta con `toLocaleString`. Un string formateado no podría ordenarse ni compararse.

## Limitaciones de la API

- **Las operaciones de escritura no persisten.** `POST`, `PUT` y `DELETE` devuelven una respuesta satisfactoria, pero no modifican los datos del servidor. Un `GET` posterior devuelve siempre el catálogo original de 20 productos.
- **Los cambios se pierden al recargar la página**, porque el estado de la sesión vive en memoria.
- **El `POST` devuelve siempre el mismo `id`** (21), calculado como máximo del catálogo estático más uno. No es un identificador utilizable.
- **Las categorías tienen valores fijos y una escritura particular**: `electronics`, `jewelery` (así, sin la segunda `e`), `men's clothing` y `women's clothing`. Se usan tal cual para que los filtros coincidan.
- **No hay autenticación** ni paginación del lado del servidor. Cualquier paginación futura será del lado del cliente.
- **No valida los datos recibidos**: acepta cuerpos incompletos o inconsistentes.

## Pendientes

- Edición de productos existentes (`PUT`).
- Eliminación con confirmación (`DELETE`).
- Validación propia del formulario y mensajes por campo.
- Notificaciones de éxito y error.
- Búsqueda y filtro por categoría.
- Aplicación desplegada para revisión.
