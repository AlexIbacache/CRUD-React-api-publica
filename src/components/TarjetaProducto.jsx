

export default function TarjetaProducto({producto, onModificar, onEliminar}) {
        return (
            <article onClick={() => console.log(producto)}  className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg ">

            <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 p-3">
                <img
                src={producto.image}
                alt={producto.title}
                className="h-full w-full object-contain"
                />
            </div>
            <h2 className="mt-4 line-clamp-1 text-lg font-bold text-gray-900">
                {producto.title}
            </h2>
            <span className="mt-1 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                {producto.category}
            </span>
            <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-600">
                {producto.description}
            </p>
            <div className="mt-auto border-t border-gray-100 pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Precio
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                {producto.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
            </div>
            <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => onModificar(producto)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => onEliminar(producto)}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Eliminar
            </button>
            </div>
            </article>
            
        )
}
