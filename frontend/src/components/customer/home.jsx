import { useEffect, useState } from "react";
import { LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X } from "lucide-react";
import { fetchFeaturedProducts } from "../../redux/authSlice";
import useTokenWatcher from '../../components/hooks/tokenWatcher';



export default function Home() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { expiresIn } = useTokenWatcher();
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        nav("/");
    };

        


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    useEffect(() => {
        dispatch(fetchFeaturedProducts());
    }, [dispatch]);

    const { items: featuredProducts, loading, error } = useSelector((state) => state.featuredProducts);



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

            <header className="flex flex-col justify-center items-center text-center py-32 px-4 relative">
                <div className="absolute inset-0 bg-black bg-opacity-60" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neon-green drop-shadow-lg tracking-wider animate-pulse">
                        Future Awaits
                    </h1>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 font-medium">
                        Power, Precision, Performance.
                    </p>
                    <a href="/booking" className="mt-6 inline-block px-6 sm:px-8 py-3 bg-neon-green text-white font-bold text-lg sm:text-2xl rounded-2xl hover:scale-105 transition shadow-lg">
                        Explore Now
                    </a>
                </div>
            </header>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                    Chosen Models From Each Brand
                </h2>
                <div className="grid grid-cols-3 lg:grid-cols-3 gap-8">
                    {featuredProducts && featuredProducts.length > 0 ? (
                        featuredProducts.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => nav(`/singleView/${item.productId._id}`)}
                                className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                            >
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={item.productId.productImage}
                                        alt={item.productId.productName}
                                        className="w-28 h-28 object-cover rounded-lg border border-gray-700"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-center">
                                    {item.productId.productName}
                                </h3>
                                <p className="text-gray-400 text-center mt-1">
                                    {item.productId.productModel}
                                </p>
                                <p className="text-green-400 font-bold text-center mt-3 text-lg">
                                    ₹{item.productId.productPrice}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 col-span-full">
                            No featured products available.
                        </p>
                    )}
                </div>
            </section>


            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-10">Technology That Powers the Future</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "AI Performance", desc: "Experience blazing speed and smart processing with AI-optimized CPUs." },
                        { title: "Thermal Efficiency", desc: "Advanced cooling systems for long-lasting peak performance." },
                        { title: "Immersive Displays", desc: "4K OLED panels with ultra-high refresh rates and color accuracy." }
                    ].map((feature, index) => (
                        <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-950 py-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["Amazing quality!", "Blazing fast!", "Best support ever!"].map((quote, index) => (
                        <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <p className="text-gray-300 italic">“{quote}”</p>
                            <p className="mt-4 text-sm text-gray-500">— Customer {index + 1}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="max-w-6xl mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl font-bold mb-6">Trusted By Top Brands</h2>
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
                    {["Dell", "HP", "ASUS", "Lenovo", "MSI"].map((brand, index) => (
                        <div key={index} className="bg-gray-800 px-6 py-4 rounded-lg text-white text-sm font-semibold shadow-md">
                            {brand}
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gradient-to-r from-gray-800 to-black py-12 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-400 mt-2">Get updates on new arrivals and exclusive deals.</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-3 w-full sm:w-2/3 rounded-md text-black"
                        />
                        <button className="bg-neon-green px-6 py-3 rounded-md text-white font-semibold hover:scale-105 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-6">Latest from Our Blog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((item) => (
                        <div key={item} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-bold">Top 5 Laptops to Look Out for in 2025</h3>
                            <p className="text-gray-400 mt-2">Discover our top picks for the upcoming year with futuristic features and powerful specs.</p>
                            <a href="#" className="mt-4 inline-block text-neon-green hover:underline">Read More →</a>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-950 py-12 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        { title: "Free Shipping", icon: "🚚" },
                        { title: "24/7 Support", icon: "📞" },
                        { title: "Secure Payment", icon: "🔒" }
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                        </div>
                    ))}
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
