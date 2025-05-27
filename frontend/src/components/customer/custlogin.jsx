import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPopup from "../popups/loading";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";

export default function CustomerLogin() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [goOnClose, setGoOnClose] = useState(false);

    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        // reset goOnClose so it doesn't accidentally navigate after an error
        setGoOnClose(false);
    };

    const login = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setPopupMessage("Enter details properly!");
            setShowPopup(true);
            return;
        }

        setLoading(true);
        dispatch(
            loginUser({
                userEmail: email,
                userPassword: password,
            })
        )
            .then((response) => {
                setLoading(false);
                const payload = response.payload;

                if (payload === "User is Banned..!") {
                    setPopupMessage("Your account is banned.");
                    setShowPopup(true);
                    return;
                }
                if (payload === "Email Not Exists..!") {
                    setPopupMessage("Email does not exist.");
                    setShowPopup(true);
                    return;
                }
                if (payload === "incorrect password") {
                    setPopupMessage("Incorrect password.");
                    setShowPopup(true);
                    return;
                }

                // Success!
                setPopupMessage("Login successful!");
                setGoOnClose(true);
                setShowPopup(true);
            })
            .catch(() => {
                setLoading(false);
                setPopupMessage("An unexpected error occurred. Please try again.");
                setShowPopup(true);
            });
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nav("/register");
        }, 500);
    };

    const brandRegister = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nav("/brandRegister");
        }, 500);
    };

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">
                    NEOTEX
                </a>

                <div className="hidden md:flex space-x-6">
                    {["Home", "Shop", "About", "Contact"].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-gray-100 hover:text-white transition"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white focus:outline-none"
                >
                    ☰
                </button>
            </nav>

            {menuOpen && (
                <div className="md:hidden bg-gray-900 py-4 px-6 space-y-2">
                    {["Home", "Shop", "About", "Contact"].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="block text-gray-100 hover:text-white py-2"
                        >
                            {link}
                        </a>
                    ))}
                </div>
            )}

            <div className="flex justify-center items-center min-h-[80vh] px-4">
                <form
                    onSubmit={login}
                    className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold text-center mb-6 animate-bounce">
                        Let's Login
                    </h2>

                    {loading && (
                        <p className="text-center text-blue-400 text-xl">Loading...</p>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Login
                    </button>

                    <p className="text-gray-400 text-center mt-4">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={register}
                            className="text-white hover:underline"
                        >
                            Register
                        </button>
                    </p>
                    <p className="text-gray-400 text-center">
                        Register as a Brand?{" "}
                        <button
                            type="button"
                            onClick={brandRegister}
                            className="text-white hover:underline"
                        >
                            Register
                        </button>
                    </p>
                </form>

                <LoadingPopup isOpen={loading} />
            </div>

            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="text-white font-semibold">About Us</h3>
                        <p className="mt-2 text-gray-500">
                            We bring you the latest high-performance laptops with futuristic
                            design and cutting-edge technology.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            {["Home", "Shop", "About", "Contact"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Follow Us</h3>
                        <div className="mt-2 flex space-x-4 justify-center">
                            {["Twitter", "Facebook", "Instagram"].map((s) => (
                                <a key={s} href="#" className="hover:text-white transition">
                                    {s}
                                </a>
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
                            onClick={() => {
                                closePopup();
                                if (goOnClose) {
                                    nav("/home");
                                }
                            }}
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
