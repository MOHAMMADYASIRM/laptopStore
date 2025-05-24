import { useEffect, useState } from "react";
import { LogOut, User, Settings, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countThunk } from "../../redux/authSlice";

export default function AdminHome() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        nav('/');
    };

    const linkManagement = (value) => {
        if (value === "1") {
            nav('/adminusermgmt');
        } else if (value === "2") {
            nav('/brandManagement');
        } else if (value === "3") {
            nav('/adminsettings');
        } else if (value === "4") {
            nav('/admincomplaints');
        }
    };

    useEffect(() => {
        dispatch(countThunk());
    }, [dispatch]);

    const { count, loading, error } = useSelector((state) => state.count);

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            <div className="w-64 bg-black h-full fixed top-0 left-0 p-6 space-y-8 hidden md:block">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <ul className="space-y-4">
                    <li><a href="#" onClick={() => linkManagement("1")} className="flex items-center text-lg text-gray-100 hover:text-white transition"><Users size={20} className="mr-3" /> Users</a></li>
                    <li><a href="#" onClick={() => linkManagement("2")} className="flex items-center text-lg text-gray-100 hover:text-white transition"><FileText size={20} className="mr-3" /> BrandList</a></li>
                    <li><a href="#" className="flex items-center text-lg text-gray-100 hover:text-white transition"><Settings size={20} className="mr-3" /> Settings</a></li>
                    <li><a href="#" onClick={() => linkManagement("4")} className="flex items-center text-lg text-gray-100 hover:text-white transition"><FileText size={20} className="mr-3" /> Reports</a></li>
                </ul>
            </div>

            <div className="md:ml-64 flex flex-col min-h-screen">
                <nav className="flex justify-between items-center w-full px-6 py-4 border-b border-gray-800">
                    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-200"><User size={18} className="mr-2" /> Profile</a>
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-200"><Settings size={18} className="mr-2" /> Settings</a>
                                <hr className="border-gray-300" />
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-200"><LogOut size={18} className="mr-2" /> Logout</button>
                            </div>
                        )}
                    </div>
                </nav>

                <header className="relative flex flex-col justify-center items-center text-center py-32 px-4 bg-cover bg-center">
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider text-neon-blue drop-shadow-lg animate-pulse">Admin Dashboard</h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">Manage Users, Orders, and More.</p>
                        <a href="#" className="mt-6 inline-block px-6 md:px-8 py-3 md:py-4 bg-neon-green text-white rounded-xl font-semibold text-base md:text-lg uppercase shadow-md hover:scale-105 transition transform">Manage Now</a>
                    </div>
                </header>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
                    <h2 className="text-3xl font-bold text-center">Dashboard Stats</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold">Total Users</h3>
                            <p className="text-gray-400 mt-2">{count.users}</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold">Total Brands</h3>
                            <p className="text-gray-400 mt-2">{count.brands}</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold">Total Products</h3>
                            <p className="text-gray-400 mt-2">{count.products}</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold">Total Bookings</h3>
                            <p className="text-gray-400 mt-2">{count.booking}</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold">Total Reports</h3>
                            <p className="text-gray-400 mt-2">{count.complaint}</p>
                        </div>
                    </div>
                </section>

                <footer className="text-center py-10 border-t border-gray-800 text-gray-400 px-4">
                    <p className="text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
