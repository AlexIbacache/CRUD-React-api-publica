import ProductCard from './components/ProductCard'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

function App() {
  const [productos, setProductos] = useState([])

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
        console.error(error)
      }
      finally {
        // apagar el estado de "cargando"
      }
    }
    cargarProductos()
    },[])

  return (
    
    <div className=''>
      <Navbar></Navbar>
      <div className=" xl:grid-cols-5 xl:grid xl:mx-32 pt-20">
      {productos.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
    </div>
  )
}

export default App
