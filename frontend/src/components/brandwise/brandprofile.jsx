import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandDetails, brandProfileUpdate } from "../../redux/authSlice";

export default function BrandProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const brandId = localStorage.getItem("brandId");

    const { brand, loading, error } = useSelector((state) => state.individualbrand);

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleLogout = () => {
        localStorage.removeItem("brandToken");
        localStorage.removeItem("brandId");
        navigate("/");
    };

    useEffect(() => {
        if (brandId) dispatch(getBrandDetails(brandId));
    }, [dispatch, brandId]);

    useEffect(() => {
        if (brand) {
            setFormData({
                name: brand.brandName || "",
                email: brand.brandEmail || "",
                password: "",
            });
        }
    }, [brand]);

    const handleChange = (e) => {
        if (e.target.name === "email") return;
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const password = formData.password;
    const isLengthValid = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    const handleSave = async () => {
        await dispatch(brandProfileUpdate({ brandId, ...formData }))
        dispatch(getBrandDetails(brandId));
        setEditing(false);
        setFormData(prev => ({ ...prev, password: "" }));
    };

    return (
        <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
                <a href="#" className="text-3xl font-bold tracking-wide text-white">NEOTEX</a>
                <button
                    onClick={handleLogout}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                    Logout
                </button>
            </nav>

            <section className="flex flex-col justify-center items-center text-center py-24 px-4 sm:px-6 md:px-8 relative max-w-3xl mx-auto">
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl"></div>
                <div className="relative z-10 w-full bg-gray-900 bg-opacity-80 rounded-2xl p-8 sm:p-10 shadow-2xl border border-gray-700">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider text-neon-blue drop-shadow-lg mb-8">
                        Brand Profile
                    </h2>

                    {loading ? (
                        <p className="text-lg text-gray-300">Loading brand details...</p>
                    ) : error ? (
                        <p className="text-lg text-red-400">Error: {error}</p>
                    ) : (
                        <div className="text-left space-y-6 text-gray-300 text-lg">
                            {["name", "email", "password"].map((field) => (
                                <div
                                    className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
                                    key={field}
                                >
                                    <label
                                        htmlFor={field}
                                        className="font-semibold capitalize mb-1 sm:mb-0"
                                    >
                                        {field}:
                                    </label>

                                    {editing ? (
                                        <div className="w-full sm:w-1/2">
                                            <input
                                                id={field}
                                                type={field === "password" ? "password" : "text"}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                readOnly={field === "email"}
                                                disabled={field === "email"}
                                                placeholder={field === "password" ? "Enter new password" : ""}
                                                className={`bg-gray-800 text-white rounded px-3 py-2 w-full ${field === "email" ? "opacity-60 cursor-not-allowed" : ""
                                                    }`}
                                            />
                                            {field === "password" && (
                                                <div className="mt-2 text-sm text-left flex flex-col space-y-1">
                                                    <span className={`inline-flex items-center gap-1 ${isLengthValid ? "text-green-400" : "text-gray-500"}`}>
                                                        {isLengthValid ? "✅" : "❌"} 8+ characters
                                                    </span>
                                                    <span className={`inline-flex items-center gap-1 ${hasSpecialChar ? "text-green-400" : "text-gray-500"}`}>
                                                        {hasSpecialChar ? "✅" : "❌"} Special characters
                                                    </span>
                                                    <span className={`inline-flex items-center gap-1 ${hasUpperCase ? "text-green-400" : "text-gray-500"}`}>
                                                        {hasUpperCase ? "✅" : "❌"} 1 Uppercase
                                                    </span>
                                                </div>
                                            )}

                                        </div>
                                    ) : (
                                        <span className="w-full sm:w-1/2">
                                            {field === "password" ? "********" : formData[field]}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 flex flex-col sm:flex-row sm:justify-center sm:gap-6 gap-4">
                        {editing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-6 md:px-8 py-3 bg-green-600 text-white rounded-xl font-semibold text-base hover:bg-green-500 transition w-full sm:w-auto"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => {
                                        setFormData({
                                            name: brand.brandName || "",
                                            email: brand.brandEmail || "",
                                            password: "",
                                        });
                                        setEditing(false);
                                    }}
                                    className="px-6 md:px-8 py-3 bg-red-600 text-white rounded-xl font-semibold text-base hover:bg-red-500 transition w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-base hover:bg-blue-500 transition w-full sm:w-auto"
                            >
                                Edit Profile
                            </button>
                        )}
                        <button
                            onClick={() => navigate("/brandHome")}
                            className="px-6 md:px-8 py-3 bg-gray-600 text-white rounded-xl font-semibold text-base hover:bg-gray-500 transition w-full sm:w-auto"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </section>

            <footer className="text-center py-12 border-t border-gray-700 text-gray-400 px-4">
                <p>© 2025 Laptop Store. All rights reserved.</p>
            </footer>
        </div>
    );
}
