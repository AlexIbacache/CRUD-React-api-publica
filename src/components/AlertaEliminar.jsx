
import { useState } from "react"
export default function AlertaEliminar({ producto, onClose, onEliminado }) {
  const [eliminando, setEliminando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(null)

  async function handleConfirmar() {
    // tu lógica acá
    setEliminando(true)
    setErrorEnvio(null)
    try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/${producto.id}`, {
        method: 'DELETE'
        })
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        onEliminado(producto.id)

        } catch (error) {
            console.error(error)
            setErrorEnvio('No se pudo eliminar el producto')
        }finally{
            setEliminando(false)
        }
    }
    

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-bold text-gray-900">Eliminar producto</h2>

        <p className="mt-2 text-sm text-gray-600">
          ¿Seguro que querés eliminar <span className="font-semibold text-gray-900">"{producto.title}"</span>?
          Esta acción no se puede deshacer.
        </p>

        {errorEnvio && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {errorEnvio}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={eliminando}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 sm:w-auto"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={eliminando}
            className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {eliminando ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}