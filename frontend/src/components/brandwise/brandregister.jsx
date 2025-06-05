import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerBrand } from "../../redux/authSlice";
import LoadingPopup from "../popups/loading";

export default function BrandRegister() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error2, setError] = useState("");
    const [brand, setBrandName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();

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
        if (confirmPassword === password) {
            setConfirmPassMatch(true);
        } else {
            setConfirmPassMatch(false);
        }
    }, [password, confirmPassword]);

    const handleRegister = (e) => {
        e.preventDefault();

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (password.toLowerCase() === email.toLowerCase()) {
            return setError("password must be different from email...");
        }

        if (!brand || !email || !password || !confirmPassword) {
            return setError("Enter All Details Properly...!");
        } else if (password !== confirmPassword) {
            return setError("Password not Matching...!");
        } else if (!strongPasswordRegex.test(password)) {
            return setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
        } else {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);

            dispatch(registerBrand({
                brandName: brand,
                brandEmail: email,
                brandPassword: password
            }))
                .then((response) => {
                    if (response.payload === "Brand Already Exists..!") {
                        return setError("Brand Already Exists..!");
                    }
                    nav("/brandLogin");
                })
                .catch((error) => {
                    console.log("error:", error);
                });

            setBrandName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    const brandLogin = () => {
        nav('/brandLogin');
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => nav("/register")}>Customer Login</button>
            </nav>
            <br />
            <div className="flex justify-center items-center min-h-[80vh] px-4">
                <form className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md" onSubmit={handleRegister}>
                    <h2 className="text-2xl font-bold text-center mb-6">Brand Registration</h2>
                    {error2 && <p className="text-red-500 font-semibold text-center animate-pulse">{error2}</p>}

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Brand Name</label>
                        <input type="text" onChange={(e) => setBrandName(e.target.value)} value={brand} className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brand Name" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Email Address</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="brand@example.com" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required />
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
                        <label className="block text-gray-400 mb-1">Confirm Password</label>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required />
                        <ul className="text-xxs mt-2 text-gray-400 space-y-1">
                            <li className={`${confirmPassMatch ? 'text-green-500' : 'text-red-500'}`}>
                                {confirmPassMatch ? '✅' : '❌'} Matching...
                            </li>
                        </ul>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition">
                        {loading ? "Registering..." : "Register Brand"}
                    </button>
                    <p className="text-gray-400 text-center">Already a Brand? <a href={(e) => e.preventDefault()} onClick={() => brandLogin()} className="text-white hover:underline">Login</a></p>
                </form>
            </div>
            <br />
            <footer className="text-center py-12 border-t border-gray-700 text-gray-400 px-4">
                <p className="mt-6">© 2025 Laptop Store. All rights reserved.</p>
            </footer>

            <LoadingPopup isOpen={loading} />
        </div>
    );
}
