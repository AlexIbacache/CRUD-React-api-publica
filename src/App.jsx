import TarjetaProducto from './components/TarjetaProducto'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ModalProducto from './components/ModalProducto'
import Modificar from './components/Modificar'
import AlertaEliminar from './components/AlertaEliminar';

function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modificarAbierto, setModificarAbierto] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [productoAEliminar, setProductoAEliminar] = useState(null)
  const [siguienteId, setSiguienteId] = useState(1000)

  const abrirModalModificar = (producto) => {
    setProductoSeleccionado(producto)
    setModificarAbierto(true)
  }

  const actualizarProducto = (productoModificado) => {
    setProductos(prev => prev.map(p => p.id === productoModificado.id ? { ...p, ...productoModificado } : p))
    setModificarAbierto(false)
  }

  useEffect(()=>{
    async function cargarProductos() {
      try {
        const respuesta= await fetch("https://fakestoreapi.com/products")
      if(respuesta.ok){
        const datos = await respuesta.json()
        setProductos(datos)
      }
      else{
        throw new Error("error al cargar los productos");
      }
      } catch (error) {
        setError("no pudimos cargar los productos. intente mas tarde")
        console.error(error)
      }finally{
        setCargando(false)
      }

    }
    cargarProductos()
    },[])

  return (
    
    <div className=''>
      <Navbar onNuevo={() => setModalAbierto(true)} />
      {modalAbierto && <ModalProducto
      onClose={() => setModalAbierto(false)}
      onCreado={datos => {
        setProductos(prev => [{ ...datos, id: siguienteId }, ...prev])
        setSiguienteId(n => n + 1)
      }}/>}
      
 
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cargando && (
          <p className="col-span-full py-20 text-center text-gray-500">
            Cargando productos...
          </p>
        )}
        {error && (
          <p className="col-span-full py-20 text-center text-red-600">{error}</p>
        )}
        {!cargando && !error && productos.map(producto => (
          <TarjetaProducto key={producto.id} producto={producto}  onModificar={abrirModalModificar} onEliminar={setProductoAEliminar} />
        ))}
        {productoAEliminar && (
        <AlertaEliminar
          producto={productoAEliminar}
          onClose={() => setProductoAEliminar(null)}
          onEliminado={id => {
            setProductos(prev => prev.filter(p => p.id !== id))
            setProductoAEliminar(null)
          }}
        />
        )}
        {modificarAbierto && <Modificar 
        product={productoSeleccionado}
        onClose={() => setModificarAbierto(false)} 
        onActualizado={actualizarProducto}
        />}
      </div>
      </div>
    </div>
  )
}

export default App
