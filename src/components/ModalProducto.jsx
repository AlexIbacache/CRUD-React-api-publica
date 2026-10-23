import { useState } from "react"

function validar(datos) {
    const errores = {};
    if (!datos.title.trim()) {
        errores.title = 'El título es obligatorio';
    } else if (datos.title.trim().length < 3) {
        errores.title = 'El título debe tener al menos 3 caracteres';
    }
    if (!datos.price){errores.price = 'El precio es obligatorio';
    } else if (Number.isNaN(Number(datos.price))){
        errores.price = 'El precio debe ser un número valido';
    } else if (Number(datos.price) <= 0) {
        errores.price = "El precio debe ser mayor a 0";
    }
    if (!datos.category) errores.category = 'La categoría es obligatoria';
    if (!datos.description.trim()) errores.description = 'La descripción es obligatoria';
    if (!datos.image.trim()){ errores.image = 'La URL de la imagen es obligatoria';
    }else if (!datos.image.trim().startsWith('http')) { errores.image = 'La URL debe empezar con http'}
    return errores;
}

export default function ModalProducto({onClose, onCreado}) {
    const[guardando, setGuardando] = useState(false)
    const [errorEnvio, setErrorEnvio] = useState(null)
    const [errores, setErrores] = useState({})
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
        setErrores(prev => ({ ...prev, [name]: undefined }))
    }
    async function handleSubmit(e) {
        e.preventDefault()

        const erroresValidacion = validar(formulario)
        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion)
            return
        }
        setErrores({})

        setGuardando(true)
        setErrorEnvio(null)

        const producto = {
            title: formulario.title.trim(),
            price: Number(formulario.price),
            description: formulario.description.trim(),
            category: formulario.category,
            image: formulario.image.trim(),
        }
        

        try {
            const respuesta = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto),
            })

            if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)

            onCreado(producto)
            onClose()
        } catch (error) {
            setErrorEnvio('No pudimos crear el producto. Revisá tu conexión e intentá de nuevo.')
            console.error(error)
        } finally {
            setGuardando(false)
        }
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4 px-6 py-5">

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
                {errores.title && (
                    <p className="mt-1 text-xs text-red-600">{errores.title}</p>
                )}
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
                    {errores.price && (
                        <p className="mt-1 text-xs text-red-600">{errores.price}</p>
                    )}
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
                    {errores.category && (
                        <p className="mt-1 text-xs text-red-600">{errores.category}</p>
                    )}
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
                {errores.description && (
                    <p className="mt-1 text-xs text-red-600">{errores.description}</p>
                )}
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
                {errores.image && (
                    <p className="mt-1 text-xs text-red-600">{errores.image}</p>
                )}
            </div>
            {errorEnvio && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {errorEnvio}
                </p>
            )}

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
                    disabled={guardando}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    {guardando ? 'Creando...' : 'Crear producto'}
                </button>
            </div>

            </form>
            </div>
        </div>
    )
}   