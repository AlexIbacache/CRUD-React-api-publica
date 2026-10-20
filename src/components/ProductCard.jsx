

export default function ProductCard({product}) {
        return (


            
<article className="mx-3 my-3 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg md:mx-10 lg:mx-1 ">

  <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 p-3">
    <img
      src={product.image}
      alt={product.title}
      className="h-full w-full object-contain"
    />
  </div>

  <h2 className="mt-4 line-clamp-1 text-lg font-bold text-gray-900">
    {product.title}
  </h2>

  <span className="mt-1 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
    {product.category}
  </span>

  <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-600">
    {product.description}
  </p>

  <div className="mt-4 border-t border-gray-100 pt-3">
    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
      Precio
    </p>
    <p className="mt-1 text-2xl font-bold text-gray-900">
      ${product.price}
    </p>
  </div>

</article>

        )
}
