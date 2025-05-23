import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPopup from "../popups/loading";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";

export default function CustomerLogin() {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth)
    const [menuOpen, setMenuOpen] = useState(false);
    const [load, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error2, setError] = useState();


    const login = (e) => {
        e.preventDefault()
        setTimeout(() => {
            setError("")
        }, 3000);
        if (!password || !email) {
            return setError("Enter Details Properly...!")
        } else {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
            dispatch(loginUser({
                userEmail: email,
                userPassword: password
            }
            )).then((response) => {
                if (response.payload === "User is Banned..!") {
                    return setError("You account is Banned..!");
                }
                if (response.payload === "Email Not Exists..!") {
                    console.log("actual error:", response.payload);
                    return setError("Email Not Exists..!");
                } else if (response.payload === "incorrect password") {
                    console.log(response.payload);
                    return setError("incorrect password..!");
                }
                console.log("Login successful!", response.payload);
                nav("/home");
            })
                .catch((error) => {
                    console.log("error:", error);
                });
        }

    }

    const register = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            nav('/register');
        }, 500);
    };

    const brandRegister = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            nav('/brandRegister');
        }, 500);
    };


    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>

                <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-100 hover:text-white transition">Home</a>
                    <a href="#" className="text-gray-100 hover:text-white transition">Shop</a>
                    <a href="#" className="text-gray-100 hover:text-white transition">About</a>
                    <a href="#" className="text-gray-100 hover:text-white transition">Contact</a>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white focus:outline-none"
                >
                    ☰
                </button>
            </nav>



            {menuOpen && (
                <div className="md:hidden bg-gray-900 py-4 px-6">
                    <a href="#" className="block text-gray-100 hover:text-white transition py-2">Home</a>
                    <a href="#" className="block text-gray-100 hover:text-white transition py-2">Shop</a>
                    <a href="#" className="block text-gray-100 hover:text-white transition py-2">About</a>
                    <a href="#" className="block text-gray-100 hover:text-white transition py-2">Contact</a>
                </div>
            )}

            <div className="flex justify-center items-center min-h-[80vh] px-4">
                <form className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={login}>
                    <h2 className="text-2xl font-bold text-center mb-6 animate-bounce">Let's Login</h2>

                    {loading && <p className="text-center text-blue-400 text-xl">Loading...</p>}
                    {error && <p className="text-center text-red-400 text-xl">{error}</p>}
                    {error2 && <p className="text-red-500 font-semibold text-center animate-pulse">{error2}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Email Address</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="example@email.com" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition">
                        Login
                    </button>

                    <p className="text-gray-400 text-center mt-4">Don't have an account? <a href={(e) => e.preventDefault()} onClick={() => register()
                    } className="text-white hover:underline">Register</a></p>
                    <p className="text-gray-400 text-center ">Register as a Brand? <a href={(e) => e.preventDefault()} onClick={() => brandRegister()
                    } className="text-white hover:underline">Register</a></p>
                </form>
                <LoadingPopup isOpen={load} />

            </div>

            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="text-white font-semibold">About Us</h3>
                        <p className="mt-2 text-gray-500">We bring you the latest high-performance laptops with futuristic design and cutting-edge technology.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Shop</a></li>
                            <li><a href="#" className="hover:text-white transition">About</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
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
                <p className="mt-6 text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
            </footer>
        </div>
    );
}
