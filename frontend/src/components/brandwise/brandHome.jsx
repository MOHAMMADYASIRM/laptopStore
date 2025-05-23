import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BrandHome() {
    const nav = useNavigate();
    const [brandName] = useState("NEOTEX Brand");

    const logout = () => {
        localStorage.removeItem("brandToken");
        localStorage.removeItem("brandId");
        nav("/");
    }

    return (
        <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <button
                    onClick={() => logout()}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                    Logout
                </button>
            </nav>

            <header className="flex flex-col justify-center items-center text-center py-32 px-4 bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider text-neon-blue drop-shadow-lg animate-pulse">
                        Welcome, {brandName}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
                        Manage your products, view orders, and more.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => nav("/brandProducts")}
                            className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-base hover:bg-blue-500 transition"
                        >
                            View Products
                        </button>
                        <button
                            onClick={() => nav("/brandBookings")}
                            className="px-6 md:px-8 py-3 bg-green-600 text-white rounded-xl font-semibold text-base hover:bg-green-500 transition"
                        >
                            View Orders
                        </button>
                        <button
                            onClick={() => nav("/brandProfile")}
                            className="px-6 md:px-8 py-3 bg-gray-600 text-white rounded-xl font-semibold text-base hover:bg-gray-500 transition"
                        >
                            Settings
                        </button>
                    </div>
                </div>
            </header>

            <footer className="text-center py-12 border-t border-gray-700 text-gray-400 px-4">
                <p>© 2025 Laptop Store. All rights reserved.</p>
            </footer>
        </div>
    );
}
