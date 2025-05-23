import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Index() {
    const nav = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800 relative z-50">
                <a href="#" className="text-3xl font-extrabold tracking-wide text-white">NEOTEX</a>

                <div className="hidden md:flex space-x-6 text-sm font-medium">
                    <a href="#" className="text-gray-300 hover:text-white transition">Home</a>
                    <a href="#" className="text-gray-300 hover:text-white transition">Shop</a>
                    <a href="#" className="text-gray-300 hover:text-white transition">About</a>
                    <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={() => nav('/login')}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 shadow"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => nav('/register')}
                        className="px-5 py-2.5 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 shadow"
                    >
                        Register
                    </button>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-gray-900 shadow-md md:hidden z-40">
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <a onClick={closeMenu} href="#" className="text-gray-200 hover:text-white">Home</a>
                            <a onClick={closeMenu} href="#" className="text-gray-200 hover:text-white">Shop</a>
                            <a onClick={closeMenu} href="#" className="text-gray-200 hover:text-white">About</a>
                            <a onClick={closeMenu} href="#" className="text-gray-200 hover:text-white">Contact</a>
                            <button
                                onClick={() => { closeMenu(); nav('/login'); }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { closeMenu(); nav('/register'); }}
                                className="px-4 py-2 border border-gray-500 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md font-semibold transition"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <header className="flex flex-col justify-center items-center text-center py-32 px-4 bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-neon-blue animate-pulse drop-shadow-lg">
                        Future Awaits
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium">
                        Power, Precision, Performance.
                    </p>
                    <button
                        onClick={() => nav('/login')}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold uppercase shadow-lg hover:scale-105 transition"
                    >
                        Explore Now
                    </button>
                </div>
            </header>

            {/* Featured Models */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-4xl font-bold text-center text-white mb-10 tracking-wide">Featured Models</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* You can map models here in future */}
                    <div className="col-span-full flex justify-center">
                        <button
                            onClick={() => nav('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
                        >
                            Login to Continue
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="text-white font-semibold">About Us</h3>
                        <p className="mt-2 text-gray-500">
                            We bring you the latest high-performance laptops with futuristic design and cutting-edge technology.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Shop</a></li>
                            <li><a href="#" className="hover:text-white transition">About</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Follow Us</h3>
                        <div className="mt-2 flex space-x-4 justify-center">
                            <a href="#" className="hover:text-white transition">Twitter</a>
                            <a href="#" className="hover:text-white transition">Facebook</a>
                            <a href="#" className="hover:text-white transition">Instagram</a>
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
            </footer>
        </div>
    );
}
