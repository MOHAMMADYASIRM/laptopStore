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

    useEffect(() => {
        dispatch(getUsersThunk());
    }, [dispatch]);

    const { allUsers = [], loading, error } = useSelector((state) => state.user || {});

    const toggleDropdown = () => setDropdownOpen((o) => !o);
    const toggleSidebar = () => setSidebarOpen((o) => !o);
    const handleLogout = () => nav("/");

    const handleBan = (userId) => {
        dispatch(handleBanThunk(userId));
        window.location.reload();
    };

    const confirmDelete = (userId) => {
        setSelectedUserId(userId);
        setDeletePopup(true);
    };
    const cancelDelete = () => {
        setSelectedUserId(null);
        setDeletePopup(false);
    };
    const handleDeleteConfirmed = () => {
        dispatch(handleUserDeleteThunk(selectedUserId));
        setDeletePopup(false);
        setSelectedUserId(null);
        window.location.reload();
    };

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
                        <h1 className="text-xl font-semibold md:text-2xl">User Management</h1>
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

                <section className="relative flex flex-col items-center justify-center bg-cover bg-center px-4 py-12 md:py-24">
                    <div className="absolute inset-0 bg-black opacity-60" />
                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-extrabold leading-tight md:text-4xl">
                            User Management
                        </h2>
                        <p className="mt-2 text-sm md:text-lg text-gray-300">
                            View, ban or delete registered users.
                        </p>
                    </div>
                </section><br />

                    <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4 px-4 md:px-6">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {loading && <p className="text-center text-blue-400 mb-6">Loading users...</p>}
                    {error && <p className="text-center text-red-500 mb-6">{error}</p>}

                    <div className="overflow-x-auto rounded-lg shadow border border-gray-700 bg-gray-800 mx-4 md:mx-6 mb-8">
                        <table className="min-w-full text-sm text-gray-300">
                            <thead className="bg-gray-700 text-xs uppercase tracking-wide">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 text-left">#</th>
                                    <th className="px-2 sm:px-4 py-2 text-left">Name</th>
                                    <th className="px-2 sm:px-4 py-2 text-left sm:table-cell">Email</th>
                                    <th className="px-2 sm:px-4 py-2 text-left">Status</th>
                                    <th className="px-2 sm:px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers
                                    .filter(user =>
                                        user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        user.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((user, idx) => (
                                        <tr
                                            key={user._id}
                                            className="border-t border-gray-700 hover:bg-gray-700 transition"
                                        >
                                            <td className="px-2 sm:px-4 py-2">{idx + 1}</td>
                                            <td className="px-2 sm:px-4 py-2">{user.userName}</td>
                                            <td className="px-2 sm:px-4 py-2 sm:table-cell text-[12px] sm:text-sm">
                                                {user.userEmail}
                                            </td>
                                            <td className="px-2 sm:px-4 py-2">
                                                <span className={user.userBan
                                                    ? "text-red-500 font-bold"
                                                    : "text-green-400 font-bold"
                                                }>
                                                    {user.userBan ? "Deactivated" : "Activated"}
                                                </span>
                                            </td>
                                            <td className="px-2 sm:px-4 py-2 flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleBan(user._id)}
                                                    className="px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm rounded font-semibold"
                                                >
                                                    {user.userBan ? "Unban" : "Ban"}
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(user._id)}
                                                    className="px-2 sm:px-3 py-1 bg-red-600 hover:bg-red-700 text-xs sm:text-sm rounded font-semibold"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                {allUsers.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-400">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>


                    {deletePopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
                                <p className="text-white mb-4 font-semibold">
                                    Are you sure you want to delete this user?
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={handleDeleteConfirmed}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={cancelDelete}
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                <footer className="mt-auto border-t border-gray-800 bg-gray-900 px-4 py-6 text-center text-sm text-gray-500">
                    © 2025 Laptop Store. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
