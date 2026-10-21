import ProductCard from './components/ProductCard'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ModalProducto from './components/ModalProducto'
import Modificar from './components/Modificar'

function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modificarAbierto, setModificarAbierto] = useState(false)

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
      onCreado={nuevo => setProductos(prev => [nuevo, ...prev])}
      />}
      
 
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
        {!cargando && !error && productos.map(p => (
          <ProductCard key={p.id} product={p}  onModificar={() => setModificarAbierto(true)} />
        ))}
        {modificarAbierto && <Modificar 
        onClose={() => setModificarAbierto(false)} />}
      </div>
      </div>
    </div>
  )
}

export default App
