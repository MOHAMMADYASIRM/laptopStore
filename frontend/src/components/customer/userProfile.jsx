import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import useTokenWatcher from '../../components/hooks/tokenWatcher';
import {
    getProfile,
    updateProfile
} from "../../redux/authSlice";

export default function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const { expiresIn } = useTokenWatcher();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);


    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        dispatch(getProfile(userId)); 
    };

    useEffect(() => {
        if (userId) {
            dispatch(getProfile(userId));
        }
    }, [dispatch, userId]);

    const { profile, error, loading } = useSelector((state) => state.profile || {});

    useEffect(() => {
        if (profile) {
            setUsername(profile.userName || "");
            setEmail(profile.userEmail || "");
        }
    }, [profile]);


    const handleSubmit = () => {
        dispatch(updateProfile({ userId, username, password })).then((response) => {
            if (response.payload.message === "Profile updated successfully") {
                setPopupMessage("Profile updated successfully completed");
                setShowPopup(true);
                
            }else{
                setPopupMessage("Profile updation failed");
                setShowPopup(true);
            }
        })
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-sans">
            <nav className="justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="#" className="text-3xl font-extrabold tracking-wide text-white">NEOTEX</a>
                     <div className="hidden md:flex space-x-6 text-sm font-medium tracking-wide">
                        <a href="/home" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Home</a>
                        <a href="/booking" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Shop Now</a>
                        <a href="/cart" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Cart</a>
                        <a href="/history" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Order History</a>
                        <a href="/about" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">About Us</a>
                        <a href="/contact" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Contact Us</a>
                    </div>
                    <div className="hidden md:flex space-x-3 text-sm min-w-[180px]">
                        <p className={expiresIn ? "visible" : "invisible"}>
                            🕒 Token expires in: <span className="font-bold">{expiresIn || "00:00:00"}</span>
                        </p>
                    </div>
                    <div className="hidden md:flex relative z-10">
                        <button onClick={toggleDropdown}>
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border-2 border-gray-500"
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
                                <a href="/userProfile" className="flex items-center px-4 py-2 hover:bg-gray-800"><User size={18} className="mr-2" /> Profile</a>
                                
                                <hr className="border-gray-700" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-800"
                                >
                                    <LogOut size={18} className="mr-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                    <button onClick={toggleMobileMenu} className="md:hidden text-white">
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2">
                        <a href="/home" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Home</a>
<a href="/booking" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Shop Now</a>
<a href="/cart" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Cart</a>
<a href="/history" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Order History</a>
<a href="/about" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">About Us</a>
<a href="/contact" className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Contact Us</a>

                        <div className="px-4 mt-4 border-t border-gray-700 pt-4">
                            <a href="/userProfile" className="flex items-center px-4 py-2 hover:bg-gray-800"><User size={18} className="mr-2" /> Profile</a>
                            <button onClick={handleLogout} className="flex items-center py-2 text-white">
                                <LogOut size={18} className="mr-2" /> Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <header className="flex flex-col justify-center items-center text-center py-20 px-4 relative">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider animate-pulse text-neon-blue drop-shadow-lg">
                        Your Profile
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300">
                        View and update your account details.
                    </p>
                </div>
            </header>
            <main className="max-w-2xl mx-auto px-4 py-12">
                {loading ? (
                    <p className="text-center text-blue-400 text-lg">Loading profile...</p>
                ) : error ? (
                    <p className="text-center text-red-400 text-lg">Error: {error}</p>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-2xl shadow-lg p-8 space-y-6"
                    >
                        <div>
                            <label htmlFor="username" className="block text-gray-300 mb-1 font-medium">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />

                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-300 mb-1 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
                                required
                                readOnly
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-300 mb-1 font-medium">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
                                required
                            />
                            <p className="mt-1 text-gray-500 text-sm">
                                Enter new password and click on update.
                            </p>

                            {password && (
                                <p
                                    className={`mt-1 text-sm font-medium flex items-center gap-2 ${/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)
                                        ? "text-green-400"
                                        : "text-red-400"
                                        }`}
                                >
                                    {/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)
                                        ? "✅ Strong password"
                                        : "❌ Password must be at least 8 characters, include 1 uppercase letter, and 1 special character."}
                                </p>
                            )}
                        </div>



                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg font-semibold text-base bg-green-600 hover:bg-green-500 transition"
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>


                    </form>
                )}
            </main>


            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="text-white font-semibold">About Us</h3>
                        <p className="mt-2 text-gray-500">
                            We bring the latest high-performance laptops to power your future.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            {["Home", "Shop", "About", "Contact"].map((link, idx) => (
                                <li key={idx}>
                                    <a href="#" className="hover:text-white transition">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Follow Us</h3>
                        <div className="mt-2 flex space-x-4 justify-center">
                            {["Twitter", "Facebook", "Instagram"].map((social, i) => (
                                <a key={i} href="#" className="hover:text-white transition">{social}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
            </footer>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-sm text-center">
                        <p className="text-xl font-semibold text-white">{popupMessage}</p>
                        <button
                            onClick={closePopup}
                            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
