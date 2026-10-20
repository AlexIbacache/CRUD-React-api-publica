export default function Navbar() {


    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md ">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4 ">
            <h1 className="text-xl font-bold">Fake Store</h1>

            <div className="flex gap-4">
                <a href="#" className="hover:text-blue-600">Inicio</a>
            </div>
            </div>
        </nav>
    )
}