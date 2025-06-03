import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPopup from "../popups/loading";
import { adminLogin } from "../../redux/authSlice";

export default function AdminLogin() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [load, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!adminEmail || !adminPassword) {
            return setErrorMsg("Please enter email and password!");
        } else {
            dispatch(adminLogin({
                adminEmail: adminEmail,
                adminPassword: adminPassword
            })).then((response) => {
                if (response.payload === "Email Not Exists..!") {
                    return setErrorMsg("Email Not Exists..!");
                } else if (response.payload === "incorrect password") {
                    console.log(response.payload);
                    return setErrorMsg("incorrect password..!");
                }
                console.log("Login successful!", response.payload);
                nav("/adminHome");
            })
                .catch((error) => {
                    console.log("error:", error);
                });
        }

    };

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
            </nav>
            <br />
            <div className="flex justify-center items-center flex-grow px-4">
                <form className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-700" onSubmit={handleLogin}>
                    <h2 className="text-3xl font-bold text-center mb-6 text-white">Admin Login</h2>
                    {errorMsg && <p className="text-red-500 font-semibold text-center animate-pulse">{errorMsg}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-1">Admin Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin@example.com"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>
                <LoadingPopup isOpen={load} />
            </div>

            <footer className="text-center py-8 border-t border-gray-800 text-gray-400 px-4 bg-black mt-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="text-white font-semibold">About Us</h3>
                        <p className="mt-2 text-gray-500">We manage the latest high-performance laptops with futuristic design and cutting-edge technology.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
                            <li><a href="#" className="hover:text-white transition">Users</a></li>
                            <li><a href="#" className="hover:text-white transition">Orders</a></li>
                            <li><a href="#" className="hover:text-white transition">Settings</a></li>
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
                <p className="mt-6 text-gray-500">© 2025 Admin Panel. All rights reserved.</p>
            </footer>
        </div>
    );
}
