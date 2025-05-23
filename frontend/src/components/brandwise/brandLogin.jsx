import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { brandLogin } from "../../redux/authSlice";

export default function BrandLogin() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [navigateAfterPopup, setNavigateAfterPopup] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        if(navigateAfterPopup === true){
            nav('/brandHome');
        }
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!password || !email) {
            setPopupMessage("Enter Details Properly...!");
            setShowPopup(true);
            return;
        }

        dispatch(
            brandLogin({
                brandEmail: email,
                brandPassword: password
            })
        )
            .then((response) => {
                if (response.payload === "Brand verification not completed..!") {
                    setPopupMessage("Brand verification not completed..!");
                    setShowPopup(true);
                    return;
                }
                if (response.payload === "Brand banned") {
                    setPopupMessage("Brand banned!");
                    setShowPopup(true);
                    return;
                }
                if (response.payload === "Brand Not Exists..!") {
                    setPopupMessage("Brand Not Exists..!");
                    setShowPopup(true);
                    return;
                }
                if (response.payload === "incorrect password") {
                    setPopupMessage("Incorrect password..!");
                    setShowPopup(true);
                    return;
                }
                setPopupMessage("Login successful!");
                setShowPopup(true);
                setNavigateAfterPopup(true);
            })
            .catch((error) => {
                setPopupMessage("An unexpected error occurred.");
                setShowPopup(true);
            });
    };

    const brandReg = () => {
        nav("/brandRegister");
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <button
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
                    onClick={() => nav("/register")}
                >
                    Customer Login
                </button>
            </nav>

            <div className="flex justify-center items-center min-h-[80vh] px-4">
                <form className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md" onSubmit={handleLogin}>
                    <h2 className="text-2xl font-bold text-center mb-6">Brand Login</h2>

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="brand@example.com"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                        Login
                    </button>

                    <p className="text-gray-400 text-center mt-4">
                        Register as a Brand?{" "}
                        <a href="#" onClick={(e) => { e.preventDefault(); brandReg(); }} className="text-white hover:underline">
                            Register
                        </a>
                    </p>
                </form>
            </div>

            <footer className="text-center py-12 border-t border-gray-700 text-gray-400 px-4">
                <p className="mt-6">© 2025 Laptop Store. All rights reserved.</p>
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
