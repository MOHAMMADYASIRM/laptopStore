import { useEffect, useState } from "react";
import { LogOut, User, Settings, Users, FileText, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../../redux/authSlice";

export default function AdminComplaintList() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        dispatch(getComplaints());
    }, [dispatch]);

    const { complaints = [] } = useSelector((state) => state.complaint || {});
    const toggleDropdown = () => setDropdownOpen((o) => !o);
    const toggleSidebar = () => setSidebarOpen((o) => !o);
    const handleLogout = () => nav("/");
    const truncateText = (text, max) =>
        typeof text === "string" && text.length > max ? text.slice(0, max) + "..." : text;
    const toggleExpand = (id) =>
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));

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
                        <h1 className="text-xl font-semibold md:text-2xl">Admin Dashboard</h1>
                    </div>
                    <div className="relative">
                        <button onClick={toggleDropdown} className="flex items-center space-x-2">
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
                            Admin Dashboard
                        </h2>
                        <p className="mt-2 text-sm md:text-lg text-gray-300">
                            Manage Users, Orders, and More.
                        </p>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 py-12 w-full">
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-300 table-fixed">
                                <thead className="bg-gray-700 text-xs uppercase font-semibold text-gray-400">
                                    <tr>
                                        <th className="w-10 px-4 py-3 border-b border-gray-700">#</th>
                                        <th className="w-40 px-4 py-3 border-b border-gray-700">User</th>
                                        <th className="w-64 px-4 py-3 border-b border-gray-700">Email</th>
                                        <th className="px-4 py-3 border-b border-gray-700">Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.length > 0 ? (
                                        complaints.map((c, i) => {
                                            const expanded = expandedRows[c._id] || false;
                                            return (
                                                <tr key={c._id} className="hover:bg-gray-700 transition">
                                                    <td className="px-4 py-3 border-b border-gray-700">{i + 1}</td>
                                                    <td className="px-4 py-3 border-b border-gray-700">{c.name}</td>
                                                    <td className="px-4 py-3 border-b border-gray-700">{c.email}</td>
                                                    <td className={`px-4 py-3 border-b border-gray-700 transition-all duration-300 ${expanded ? "max-h-full" : "max-h-[80px] overflow-hidden"}`}>
                                                        <div className="whitespace-pre-wrap">{expanded ? c.complaint : truncateText(c.complaint, 100)}</div>
                                                        {c.complaint.length > 100 && (
                                                            <button onClick={() => toggleExpand(c._id)} className="text-neon-green text-xs mt-2 hover:underline">
                                                                {expanded ? "Show less" : "Read more"}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-8 text-gray-500 italic">
                                                No complaints found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <footer className="mt-auto border-t border-gray-800 bg-gray-900 px-4 py-6 text-center text-sm text-gray-500">
                    © 2025 Laptop Store. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
