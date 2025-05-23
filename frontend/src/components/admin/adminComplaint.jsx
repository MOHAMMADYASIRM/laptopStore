import { useEffect, useState } from "react";
import { LogOut, User, Settings, Users, FileText, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../../redux/authSlice";

export default function AdminComplaintList() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const truncateText = (text, maxLength) => {
        if (typeof text !== "string") return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const toggleExpand = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        dispatch(getComplaints());
    }, [dispatch]);

    const { complaints = [] } = useSelector((state) => state.complaint || {});

    const handleLogout = () => {
        nav('/');
    };

    const linkManagement = (value) => {
        if (value === "1") nav('/adminusermgmt');
        else if (value === "2") nav('/brandManagement');
        else if (value === "3") nav('/adminsettings');
        else if (value === "4") nav('/admincomplaints');
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            <div className="w-64 bg-black h-full fixed top-0 left-0 p-6 space-y-8">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <ul className="space-y-4">
                    <li><a href="#" onClick={() => linkManagement("1")} className="flex items-center text-lg text-gray-100 hover:text-white transition"><Users size={20} className="mr-3" /> Users</a></li>
                    <li><a href="#" onClick={() => linkManagement("2")} className="flex items-center text-lg text-gray-100 hover:text-white transition"><FileText size={20} className="mr-3" /> BrandList</a></li>
                    <li><a href="#" onClick={() => linkManagement("3")} className="flex items-center text-lg text-gray-100 hover:text-white transition"><Settings size={20} className="mr-3" /> Settings</a></li>
                    <li><a href="#" onClick={() => linkManagement("4")} className="flex items-center text-lg text-gray-100 hover:text-white transition"><FileText size={20} className="mr-3" /> Reports</a></li>
                    
                </ul>
            </div>

            <div className="ml-64 flex flex-col min-h-screen">
                <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4 z-10">
                        <div className="relative">
                            <button onClick={toggleDropdown} className="flex items-center space-x-2">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                                    alt="Admin Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-gray-500"
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
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
                    </div>
                </nav>

                <section className="max-w-6xl mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold text-center mb-10 text-white">User Complaints</h2>

                    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-300 table-fixed">
                                <thead className="bg-gray-800 text-xs uppercase font-semibold text-gray-400">
                                    <tr>
                                        <th className="w-10 px-4 py-3 border-b border-gray-700">#</th>
                                        <th className="w-40 px-4 py-3 border-b border-gray-700">User</th>
                                        <th className="w-64 px-4 py-3 border-b border-gray-700">Email</th>
                                        <th className="px-4 py-3 border-b border-gray-700">Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.length > 0 ? (
                                        complaints.map((complaint, index) => {
                                            const isExpanded = expandedRows[complaint._id] || false;
                                            return (
                                                <tr key={complaint._id} className="hover:bg-gray-800 transition duration-150">
                                                    <td className="px-4 py-3 border-b border-gray-700 align-top">{index + 1}</td>
                                                    <td className="px-4 py-3 border-b border-gray-700 align-top">{complaint.name}</td>
                                                    <td className="px-4 py-3 border-b border-gray-700 align-top">{complaint.email}</td>
                                                    <td
                                                        className={`px-4 py-3 border-b border-gray-700 align-top transition-all duration-300 ease-in-out ${isExpanded ? "w-[400px] h-auto" : "w-[250px] max-h-[100px] overflow-hidden"
                                                            }`}
                                                    >
                                                        <p className="whitespace-pre-wrap">
                                                            {isExpanded ? complaint.complaint : truncateText(complaint.complaint, 100)}
                                                        </p>
                                                        {complaint.complaint.length > 100 && (
                                                            <button
                                                                onClick={() => toggleExpand(complaint._id)}
                                                                className="text-neon-green text-xs mt-2 hover:underline focus:outline-none"
                                                            >
                                                                {isExpanded ? "Show less" : "Read more"}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center px-6 py-6 text-gray-500 italic">
                                                No complaints found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4 mt-auto">
                    <p className="text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
