import { useEffect, useState } from "react";
import { LogOut, User, Settings, Users, FileText, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrandsThunk, handleBrandVerificationThunk, handleBrandBanThunk ,handleBrandDeleteThunk } from "../../redux/authSlice";

export default function AdminBrandManagement() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        nav('/');
    };

    useEffect(() => {
        dispatch(getBrandsThunk());
    }, [dispatch]);

    const { allBrands, loading, error } = useSelector((state) => state.brand || {});

    const brandVerify = (brandId) => {
        dispatch(handleBrandVerificationThunk(brandId));
        window.location.reload();
    };

    const handleBan = (brandId) => {
        dispatch(handleBrandBanThunk(brandId));
        window.location.reload();
    };

    const handleDeleteBrand = (brandId) => {
        dispatch(handleBrandDeleteThunk(brandId));
        window.location.reload();
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            <div className="w-64 bg-black h-full fixed top-0 left-0 p-6 space-y-8">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <ul className="space-y-4">
                    <li><a href="/adminHome" className="flex items-center text-lg text-gray-100 hover:text-white transition"><Users size={20} className="mr-3" /> Dashboard</a></li>
                    <li><a href="/adminusermgmt" className="flex items-center text-lg text-gray-100 hover:text-white transition"><User size={20} className="mr-3" /> Users</a></li>
                    <li><a href="/admin" className="flex items-center text-lg text-gray-100 hover:text-white transition"><Layers size={20} className="mr-3" /> Brands</a></li>
                    <li><a href="#" className="flex items-center text-lg text-gray-100 hover:text-white transition"><Settings size={20} className="mr-3" /> Settings</a></li>
                </ul>
            </div>

            <div className="ml-64 flex flex-col min-h-screen">
                <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                    <h1 className="text-2xl font-semibold">Brand Management</h1>
                    {loading && <p className="text-center text-gray-400">Loading users...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="relative">
                        <button onClick={toggleDropdown} className="flex items-center space-x-2">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                                alt="Admin Avatar"
                                className="w-10 h-10 rounded-full border-2 border-gray-500"
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-200">
                                    <User size={18} className="mr-2" /> Profile
                                </a>
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-200">
                                    <Settings size={18} className="mr-2" /> Settings
                                </a>
                                <hr className="border-gray-300" />
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-200">
                                    <LogOut size={18} className="mr-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                <section className="max-w-7xl mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">All Brands</h2>

                    <div className="flex justify-end mb-4">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left bg-gray-700 text-white">
                                    <th className="px-6 py-3">#</th>
                                    <th className="px-6 py-3">Brand Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Verification</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                {allBrands.length > 0 ? allBrands
                                    .filter((brand) =>
                                        brand.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        brand.brandEmail.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((brand, index) => (
                                        <tr key={brand._id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{brand.brandName}</td>
                                            <td className="px-6 py-4">{brand.brandEmail}</td>
                                            <td className="px-6 py-4">
                                                <span className={brand.brandVerification === false ? "text-red-500 font-semibold" : "text-green-500 font-semibold"}>
                                                    {brand.brandVerification === false ? "Not Verified" : "Verified"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={brand.brandBan === false ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                                                    {brand.brandBan === false ? "Active" : "Not Active"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                {
                                                    brand.brandVerification === false && (
                                                        <button onClick={() => brandVerify(brand._id)} className="bg-green-500 px-3 py-1 rounded text-white">Verify</button>
                                                    )
                                                }
                                                <button
                                                    onClick={() => handleBan(brand._id)}
                                                    className={`px-3 py-1 rounded text-white font-semibold transition-all ${brand.brandBan === false ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                                                >
                                                    {brand.brandBan === false ? "Ban" : "Unban"}
                                                </button>

                                                <button onClick={() => handleDeleteBrand(brand._id)} className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700">Delete</button>
                                            </td>
                                        </tr>
                                    )) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-500">No brands found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                    <p className="text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
