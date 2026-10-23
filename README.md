# CRUD de Productos

Aplicación web para administrar productos consumiendo la API pública de [FakeStoreAPI](https://fakestoreapi.com/docs).

## Instalación y ejecución

Requiere Node.js 20 o superior y pnpm.

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en `http://localhost:5173`.

Para generar y previsualizar la versión de producción:

```bash
pnpm build
pnpm preview
```

## Notas sobre la API

- Las operaciones de escritura (`POST`, `PUT`, `DELETE`) son simuladas y **no persisten** en el servidor.
- Por eso el estado de la sesión se mantiene en React y se pierde al recargar la página.
- El `POST` devuelve siempre el mismo `id`, por lo que no se utiliza como identificador.
- Los productos creados reciben un `id` numérico local, ya que `PUT` y `DELETE` rechazan los ids no numéricos con un error 400.
