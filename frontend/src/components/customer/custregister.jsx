import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import LoadingPopup from "../popups/loading";


export default function CustomerRegister() {
    const dispatch = useDispatch();
    const nav = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)
    const [load, setLoading] = useState(false);
    const [error2, setError] = useState()
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState();
    const [hasMinLength, setHasMinLength] = useState(false);
    const [hasUpper, setHasUpper] = useState(false);
    const [hasLower, setHasLower] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecial, setHasSpecial] = useState(false);
    const [confirmPassMatch, setConfirmPassMatch] = useState(false);


    useEffect(() => {
        setHasMinLength(password?.length >= 8);
        setHasUpper(/[A-Z]/.test(password));
        setHasLower(/[a-z]/.test(password));
        setHasNumber(/\d/.test(password));
        setHasSpecial(/[@$!%*?&]/.test(password));
        if(confirmpassword === password) {
            setConfirmPassMatch(true);
        }else {
            setConfirmPassMatch(false);
        }
    }, [password,confirmpassword]);

    const register = (e) => {
        setTimeout(() => {
            setError("")
        }, 3000);
        e.preventDefault();

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!username || !email || !password || !confirmpassword) {
            return setError("Enter All Details Properly...!");
        } else if (password !== confirmpassword) {
            return setError("Password not Matching...!");
        } else if (!strongPasswordRegex.test(password)) {
            return setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
        } else {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
            dispatch(registerUser({
                userName: username,
                userEmail: email,
                userPassword: password
            }))
                .then((response) => {
                    if (response.payload === "Email Already Exists..!") {
                        console.log("actual error:", response.payload);
                        return setError("Email Already Exists..!");
                    }
                    console.log("Registration successful!", response.payload);
                    nav("/login");
                })
                .catch((error) => {
                    console.log("error:", error);
                });

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmpassword('');
        }
    }


    const login = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            nav('/login');
        }, 500);
    }

    const brandlogin = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            nav('/brandLogin');
        }, 500);
    }


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
                <form className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={register}>
                    <h2 className="text-2xl font-bold text-center mb-6 animate-bounce">Let's Start Our Journey</h2>
                    {error2 && <p className="text-red-500 font-semibold text-center animate-pulse">{error2}</p>}

                    <div className="mb-4">
                        <label className="block text-gray-100 mb-1">Full Name</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Your Name" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-100 mb-1">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="example@email.com" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-100 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="••••••••"
                        />
                        <ul className="text-xxs mt-2 text-gray-400 space-y-1">
                            <li className={`${hasMinLength ? 'text-green-500' : 'text-red-500'}`}>
                                {hasMinLength ? '✅' : '❌'} Minimum 8 characters
                            </li>
                            <li className={`${hasUpper ? 'text-green-500' : 'text-red-500'}`}>
                                {hasUpper ? '✅' : '❌'} At least one uppercase letter
                            </li>
                            <li className={`${hasLower ? 'text-green-500' : 'text-red-500'}`}>
                                {hasLower ? '✅' : '❌'} At least one lowercase letter
                            </li>
                            <li className={`${hasNumber ? 'text-green-500' : 'text-red-500'}`}>
                                {hasNumber ? '✅' : '❌'} At least one number
                            </li>
                            <li className={`${hasSpecial ? 'text-green-500' : 'text-red-500'}`}>
                                {hasSpecial ? '✅' : '❌'} At least one special character (@$!%*?&)
                            </li>
                        </ul>
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-100 mb-1">Confirm Password</label>
                        <input type="password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="••••••••" />
                        <ul className="text-xxs mt-2 text-gray-400 space-y-1">
                            <li className={`${confirmPassMatch ? 'text-green-500' : 'text-red-500'}`}>
                                {confirmPassMatch ? '✅' : '❌'} Matching...
                            </li>
                        </ul>
                    </div>

                    <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition">
                        {load ? "Registering..." : "Register"}
                    </button>

                    <p className="text-gray-400 text-center mt-4">Already have an account? <a href={(e) => e.preventDefault()} onClick={() => login()
                    } className="text-white hover:underline">Login</a></p>
                    <p className="text-gray-400 text-center">Are you a Brand? <a href={(e) => e.preventDefault()} onClick={() => brandlogin()
                    } className="text-white hover:underline">Login</a></p>
                </form>
                <LoadingPopup isOpen={load} />
            </div>

            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
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
