import { useEffect, useState } from "react";
import { LogOut, User, Settings, Users, FileText, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk, handleBanThunk, handleUserDeleteThunk } from "../../redux/authSlice";

export default function AdminUserMgmt() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleLogout = () => nav("/");
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        dispatch(getUsersThunk());
    }, [dispatch]);

    const { allUsers, loading, error } = useSelector((state) => state.user || {});

    const handleBan = (userId) => {
        dispatch(handleBanThunk(userId));
        window.location.reload();
    };

    const confirmDelete = (userId) => {
        setSelectedUserId(userId);
        setDeletePopup(true);
    };

    const cancelDelete = () => {
        setDeletePopup(false);
        setSelectedUserId(null);
    };

    const handleDeleteConfirmed = () => {
        dispatch(handleUserDeleteThunk(selectedUserId));
        setDeletePopup(false);
        setSelectedUserId(null);
        window.location.reload();
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans flex">
            <div className={`lg:w-64 w-full bg-black h-full fixed top-0 left-0 p-6 space-y-8 transition-all duration-300 ease-in-out ${sidebarOpen ? "block" : "hidden"} lg:flex lg:flex-col lg:space-y-6`}>
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <ul className="space-y-4">
                    <li><a href="/adminHome" className="flex items-center text-lg text-gray-100 hover:text-white transition-all"><Users size={20} className="mr-3" /> Dashboard</a></li>
                    <li><a href="#" className="flex items-center text-lg text-gray-100 hover:text-white transition-all"><FileText size={20} className="mr-3" /> Orders</a></li>
                    <li><a href="#" className="flex items-center text-lg text-gray-100 hover:text-white transition-all"><Settings size={20} className="mr-3" /> Settings</a></li>
                    <li><a href="#" className="flex items-center text-lg text-gray-100 hover:text-white transition-all"><FileText size={20} className="mr-3" /> Reports</a></li>
                </ul>
            </div>

            <div className={`flex-1 lg:ml-64 ml-0 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0"}`}>
                <div className="lg:hidden p-4 flex justify-between items-center">
                    <button onClick={toggleSidebar} className="text-white z-50">
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                    <h1 className="text-2xl font-semibold">User Management</h1>
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
                    <h2 className="text-3xl font-bold text-center mb-8">All Registered Users</h2>
                    {loading && <p className="text-center text-gray-400">Loading users...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
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
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                {Array.isArray(allUsers) && allUsers.length > 0 ? (
                                    allUsers
                                        .filter((user) =>
                                            user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            user.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((user, index) => (
                                            <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700 transition-all">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{user.userName}</td>
                                                <td className="px-6 py-4">{user.userEmail}</td>
                                                <td className="px-6 py-4">
                                                    {user.userBan === true ? "Deactivated" : "Activated"}
                                                </td>
                                                <td className="px-6 py-4 space-x-2">
                                                    <button
                                                        onClick={() => handleBan(user._id)}
                                                        className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700 transition-all"
                                                    >
                                                        {user.userBan === true ? "Unban" : "Ban"}
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDelete(user._id)}
                                                        className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-500">No users found.</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                    {deletePopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm text-black shadow-xl">
                                <h3 className="text-lg text-white font-bold mb-4 text-center">Are you sure you want to delete this user?</h3>
                                <div className="flex justify-between">
                                    <button onClick={handleDeleteConfirmed} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Yes</button>
                                    <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">No</button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                    <p className="text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
