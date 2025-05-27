import { useEffect, useState } from "react";
import { LogOut, User, Settings, Users, FileText, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getBrandsThunk,
    handleBrandVerificationThunk,
    handleBrandBanThunk,
    handleBrandDeleteThunk
} from "../../redux/authSlice";

export default function AdminBrandManagement() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(getBrandsThunk());
    }, [dispatch]);

    const { allBrands = [], loading, error } = useSelector((state) => state.brand || {});

    const toggleDropdown = () => setDropdownOpen((o) => !o);
    const toggleSidebar = () => setSidebarOpen((o) => !o);
    const handleLogout = () => nav("/");

    const brandVerify = (id) => dispatch(handleBrandVerificationThunk(id)).then(() => {
        window.location.reload();
    });
    const handleBan = (id) => dispatch(handleBrandBanThunk(id)).then(() => {
        window.location.reload();
    });
    const handleDeleteBrand = (id) => dispatch(handleBrandDeleteThunk(id)).then(() => {
        window.location.reload();
    });

    const filteredBrands = allBrands.filter(
        (brand) =>
            brand.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            brand.brandEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
            <aside
                className={`
          fixed inset-y-0 left-0 z-50
          transform bg-black p-6
          w-full max-w-xs
          md:static md:inset-auto md:transform-none md:w-64
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex items-center justify-between">
                    <a href="#" className="text-2xl font-bold">NEOTEX</a>
                    <button className="md:hidden" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>
                <nav className="mt-8 flex flex-col space-y-4 overflow-y-auto">
                    <button
                        onClick={() => nav("/adminHome")}
                        className="flex items-center space-x-3 text-lg hover:text-neon-green transition"
                    >
                        <Users size={20} /><span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => nav("/adminusermgmt")}
                        className="flex items-center space-x-3 text-lg hover:text-neon-green transition"
                    >
                        <User size={20} /><span>Users</span>
                    </button>
                    <button
                        onClick={() => nav("/brandManagement")}
                        className="flex items-center space-x-3 text-lg hover:text-neon-green transition"
                    >
                        <FileText size={20} /><span>Brands</span>
                    </button>
                    <button
                        onClick={() => nav("/admincomplaints")}
                        className="flex items-center space-x-3 text-lg hover:text-neon-green transition"
                    >
                        <Settings size={20} /><span>Complaints</span>
                    </button>
                </nav>
            </aside>

            <div className="flex flex-col w-full">
                <header className="flex items-center justify-between bg-gray-900 border-b border-gray-800 px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center space-x-4">
                        <button className="md:hidden" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-semibold md:text-2xl">
                            Brand Management
                        </h1>
                    </div>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2"
                        >
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                                alt="Admin Avatar"
                                className="h-8 w-8 rounded-full border border-gray-600"
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="z-50 absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                                
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center px-3 py-2 hover:bg-gray-200"
                                >
                                    <LogOut size={16} className="mr-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <section
                    className="relative flex flex-col items-center justify-center bg-cover bg-center px-4 py-12 md:py-24"
                >
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-extrabold leading-tight md:text-4xl">
                            Brand Management
                        </h2>
                        <p className="mt-2 text-sm md:text-lg text-gray-300">
                            Review and manage all registered brands.
                        </p>
                    </div>
                </section><br />

                <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4 px-4 md:px-6">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full sm:max-w-md px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading && (
                    <p className="text-center text-blue-400 font-semibold mb-4">
                        Loading brands...
                    </p>
                )}
                {error && (
                    <p className="text-center text-red-500 font-semibold mb-4">
                        {error}
                    </p>
                )}

                <div className="overflow-x-auto rounded-lg shadow border border-gray-700 bg-gray-800 mx-4 md:mx-6 mb-8">
                    <table className="min-w-full text-sm text-gray-300">
                        <thead className="bg-gray-700 text-xs uppercase tracking-wide">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Verification</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBrands.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-400">
                                        No brands found.
                                    </td>
                                </tr>
                            ) : (
                                filteredBrands.map((brand, idx) => (
                                    <tr
                                        key={brand._id}
                                        className="border-t border-gray-700 hover:bg-gray-700 transition"
                                    >
                                        <td className="px-4 py-3">{idx + 1}</td>
                                        <td className="px-4 py-3 font-medium">
                                            {brand.brandName}
                                        </td>
                                        <td className="px-4 py-3">{brand.brandEmail}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={
                                                    brand.brandVerification
                                                        ? "text-green-400 font-bold"
                                                        : "text-red-500 font-bold"
                                                }
                                            >
                                                {brand.brandVerification ? "Verified" : "Not Verified"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={
                                                    brand.brandBan
                                                        ? "text-red-500 font-bold"
                                                        : "text-green-400 font-bold"
                                                }
                                            >
                                                {brand.brandBan ? "Banned" : "Active"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 flex flex-wrap justify-center gap-2">
                                            {!brand.brandVerification && (
                                                <button
                                                    onClick={() => brandVerify(brand._id)}
                                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-sm rounded-md font-semibold"
                                                >
                                                    Verify
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleBan(brand._id)}
                                                className={`px-3 py-1 text-sm rounded-md font-semibold ${brand.brandBan
                                                    ? "bg-green-600 hover:bg-green-700"
                                                    : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                            >
                                                {brand.brandBan ? "Unban" : "Ban"}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBrand(brand._id)}
                                                className="px-3 py-1 bg-red-700 hover:bg-red-800 text-sm rounded-md font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <footer className="mt-auto border-t border-gray-800 bg-gray-900 px-4 py-6 text-center text-sm text-gray-500">
                    © 2025 Laptop Store. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
