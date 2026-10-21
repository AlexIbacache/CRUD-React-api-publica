export default function Navbar({onNuevo}) {


    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md  lg:">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4 ">
            <h1 className="text-xl font-bold">Fake Store</h1>

            <div className="flex gap-4">
                <button onClick={onNuevo} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Nuevo producto
                </button>
            </div>
            </div>
        </nav>
    )
}