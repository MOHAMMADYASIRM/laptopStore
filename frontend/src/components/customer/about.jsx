import { useState } from "react";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import useTokenWatcher from '../../components/hooks/tokenWatcher';
import { useNavigate } from "react-router-dom";






export default function AboutPage() {
    const { expiresIn } = useTokenWatcher();
    const navigate = useNavigate()
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
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-sans">
            <nav className="justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="#" className="text-3xl font-extrabold tracking-wide text-white">NEOTEX</a>


                    <div className="hidden md:flex space-x-6 text-sm font-medium tracking-wide">
                        <a href="/home" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Home</a>
                        <a href="/booking" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Shop Now</a>                        <a href="/cart" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Cart</a>
                        <a href="/history" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Order History</a>
                        <a href="/about" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">About Us</a>
                        <a href="/contact" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Contact Us</a>
                    </div>
                    <div>
                        <div className="hidden md:flex space-x-3 text-sm min-w-[180px]">
                            <p className={expiresIn ? "visible" : "invisible"}>
                                🕒 Token expires in: <span className="font-bold">{expiresIn || "00:00:00"}</span>
                            </p>
                        </div>
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
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700">
                                <a href="/userProfile" className="flex items-center px-4 py-2 hover:bg-gray-800"><User size={18} className="mr-2" /> Profile</a>
                                <hr className="border-gray-700" />
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-800">
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

            <header className="text-center py-16 px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider text-neon-blue drop-shadow-lg">
                    About NEOTEX
                </h2>
                <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium">
                    Your trusted destination for the latest and most powerful laptops.
                </p>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-semibold text-white mb-4">Our Mission</h3>
                    <p className="text-lg text-gray-400">
                        At NEOTEX, we are committed to bringing the most advanced laptops to
                        our customers at the most competitive prices. We believe in combining
                        performance, design, and durability to give you a device that meets all
                        your needs.
                    </p>
                </div>

                <div className="mb-12">
                    <h3 className="text-3xl font-semibold text-white text-center mb-6">Why Choose Us?</h3>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="text-center bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-md">
                            <h4 className="text-2xl font-semibold text-neon-blue mb-4">Top Brands</h4>
                            <p className="text-gray-400">
                                We offer products from the most trusted brands like ASUS, Dell, HP, and
                                Lenovo to ensure top-notch quality and performance.
                            </p>
                        </div>
                        <div className="text-center bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-md">
                            <h4 className="text-2xl font-semibold text-neon-blue mb-4">Customer Support</h4>
                            <p className="text-gray-400">
                                Our support team is available 24/7 to assist you with any queries or
                                issues you may encounter. Your satisfaction is our priority.
                            </p>
                        </div>
                        <div className="text-center bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-md">
                            <h4 className="text-2xl font-semibold text-neon-blue mb-4">Affordable Prices</h4>
                            <p className="text-gray-400">
                                We strive to provide the best prices without compromising on quality.
                                Affordable laptops for every budget.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-3xl font-semibold text-white text-center mb-6">Our Story</h3>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        NEOTEX started with a simple vision: to make powerful and affordable
                        laptops accessible to everyone. Founded by a group of tech enthusiasts, we
                        have spent years perfecting our products and services. We began with a small
                        team, offering only a few select brands, but today, we are a leading laptop
                        store trusted by thousands of customers worldwide.
                    </p>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-6">
                        With a passion for technology and a commitment to customer satisfaction, we
                        continue to grow and innovate, offering the latest laptops to cater to all
                        your needs – whether you are a gamer, a student, or a professional.
                    </p>
                </div>

                <div className="text-center mb-12">
                    <h3 className="text-3xl font-semibold text-white mb-6">Our Values</h3>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-md">
                            <h4 className="text-xl font-semibold text-neon-blue mb-4">Integrity</h4>
                            <p className="text-gray-400">
                                We believe in doing the right thing by our customers, employees, and
                                partners at all times.
                            </p>
                        </div>
                        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-md">
                            <h4 className="text-xl font-semibold text-neon-blue mb-4">Innovation</h4>
                            <p className="text-gray-400">
                                Technology is constantly evolving, and we make sure to stay ahead of the
                                curve by offering the latest products and solutions.
                            </p>
                        </div>
                        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-md">
                            <h4 className="text-xl font-semibold text-neon-blue mb-4">Customer-Centric</h4>
                            <p className="text-gray-400">
                                Our customers are at the heart of everything we do. We aim to provide
                                an exceptional experience from start to finish.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="text-white font-semibold">About Us</h3>
                        <p className="mt-2 text-gray-500">We bring the latest high-performance laptops to power your future.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            {["Home", "Shop", "About", "Contact"].map((link, idx) => (
                                <li key={idx}><a href="#" className="hover:text-white transition">{link}</a></li>
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
        </div>
    );
}
