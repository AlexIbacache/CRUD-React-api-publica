import { useState } from "react"

export default function ModalProducto({onClose, onCreado}) {
    const[guardando, setGuardando] = useState(false)
    const [errorEnvio, setErrorEnvio] = useState(null)
    const [formulario, setFormulario] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        image: ''
    })
    function handleChange(e) {
        const { name, value } = e.target
        setFormulario({ ...formulario, [name]: value })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setGuardando(true)
        setErrorEnvio(null)
        const nuevo = {
        ...formulario,
        id: crypto.randomUUID(),
        price: Number(formulario.price),
        }
        const product = { title: nuevo.title, price: nuevo.price, description: nuevo.description, category: nuevo.category, image: nuevo.image };
        fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
        
        onCreado(nuevo)
        onClose()
    }
    return (
        <div
        onClick={onClose}
        className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
        >
            <div
            role="dialog"
            aria-modal="true"
            onClick={e => e.stopPropagation()}
            className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:max-w-lg sm:rounded-2xl"
            >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
                <h2 className="text-lg font-bold text-gray-900">Nuevo producto</h2>
                <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">

                <div>
                <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                    Título <span className="text-red-500">*</span>
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    maxLength={120}
                    value={formulario.title}
                    onChange={handleChange}
                    placeholder="Ej: Mochila Fjallraven"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                    Precio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    $
                    </span>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        inputMode="decimal"
                        value={formulario.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full rounded-lg border border-gray-300 py-2 pl-7 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                    />
                </div>
                </div>

                <div>
                    <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
                        Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formulario.category}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                    >
                        <option value="">Elige una categoría</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="men's clothing">Men's clothing</option>
                        <option value="women's clothing">Women's clothing</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                    Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formulario.description}
                    onChange={handleChange}
                    placeholder="Contá brevemente de qué se trata"
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
            </div>

            <div>
                <label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">
                    URL de la imagen <span className="text-red-500">*</span>
                </label>
                <input
                    id="image"
                    name="image"
                    type="url"
                    value={formulario.image}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                />
                <p className="mt-1 text-xs text-gray-500">
                    Tiene que empezar con http:// o https://
                </p>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    Crear producto
                </button>
            </div>

            </form>
            </div>
        </div>
    )
}   