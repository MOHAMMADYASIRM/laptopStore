import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandsThunk, getProduct } from "../../redux/authSlice";
import { LogOut, User, Menu, X, Search } from "lucide-react";
import useTokenWatcher from '../../components/hooks/tokenWatcher';
import { FiFilter } from "react-icons/fi";

export default function ProductList() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { expiresIn } = useTokenWatcher();

    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [tempSortOption, setTempSortOption] = useState("");
    const [tempSelectedBrands, setTempSelectedBrands] = useState([]);
    const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpensearch, setdropdownOpensearch] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        window.location.reload();
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleDropdownsearch = () => setdropdownOpensearch(!dropdownOpensearch);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        nav("/");
    };

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getBrandsThunk());
    }, [dispatch]);

    const { products = [], loading, error } = useSelector((state) => state.product || {});
    const { allBrands = [] } = useSelector((state) => state.brand || {});

    const handleSearch = () => {
        setSearchTerm(searchInput.trim());
    };

    const applyFilters = () => {
        setSortOption(tempSortOption);
        setSelectedBrands(tempSelectedBrands);
        setSelectedCategories(tempSelectedCategories);
    };

    const toggleTempBrand = (id) => {
        setTempSelectedBrands((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        );
    };

    const toggleTempCategory = (cat) => {
        setTempSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const filteredProducts = products
        .filter(p =>
            p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.productGpu.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.productModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.productProcessor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(p.productStorage).toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(p.productRam).toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.operatingSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(p.refreshRate).toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedBrands.length === 0 || selectedBrands.includes(p.brandId)) &&
            (selectedCategories.length === 0 || selectedCategories.includes(p.productCategory))
        )
        .sort((a, b) => {
            switch (sortOption) {
                case "low-to-high": return a.productPrice - b.productPrice;
                case "high-to-low": return b.productPrice - a.productPrice;
                case "a-z": return a.productName.localeCompare(b.productName);
                case "z-a": return b.productName.localeCompare(a.productName);
                default: return 0;
            }
        });

    const handleProductClick = (productId) => {
        nav(`/singleView/${productId}`);
    };

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
                    </div>
                )}
            </nav>

            <header className="flex flex-col justify-center items-center text-center py-20 px-4 relative">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider text-neon-green drop-shadow-lg animate-pulse">
                        Start Shopping
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
                        Discover premium laptops crafted for power and performance.
                    </p>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-1 mb-10">
                    <h2 className="text-3xl font-bold text-center md:text-left">Available Models</h2>
                    <div className="flex w-full  md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search laptops..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-2 px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition duration-200"
                        >
                            <Search size={20} />
                        </button>

                        <button
                            onClick={() => toggleDropdownsearch(!dropdownOpensearch)}
                            className="ml-2 px-4 p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                            aria-label="Toggle Filters"
                        >
                            <FiFilter size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative mb-10">


                    {dropdownOpensearch && (
                        <div
                            className="
        absolute z-30 mt-2 
        w-full max-w-3xl
        bg-gray-900 border border-gray-700 rounded-xl shadow-lg
        p-6
        flex flex-col sm:flex-row sm:items-start sm:gap-8
        overflow-y-auto max-h-[360px]
        scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-gray-800
      "
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="filter-heading"
                        >
                            <section className="flex flex-col flex-1 min-w-[160px] mb-6 sm:mb-0">
                                <label htmlFor="sortBy" className="block text-gray-300 mb-2 font-semibold">
                                    Sort By
                                </label>
                                <select
                                    id="sortBy"
                                    value={tempSortOption}
                                    onChange={(e) => setTempSortOption(e.target.value)}
                                    className="
            w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600
            text-white focus:outline-none focus:ring-2 focus:ring-neon-green
            transition
          "
                                >
                                    <option value="">None</option>
                                    <option value="low-to-high">Price: Low to High</option>
                                    <option value="high-to-low">Price: High to Low</option>
                                    <option value="a-z">Name: A-Z</option>
                                    <option value="z-a">Name: Z-A</option>
                                </select>
                            </section>

                            <section className="flex flex-col flex-1 min-w-[180px] max-h-48 overflow-y-auto mb-6 sm:mb-0 pr-2">
                                <span className="block text-gray-300 mb-2 font-semibold">Brands</span>
                                <div className="flex flex-col space-y-3">
                                    {allBrands.map((b) => (
                                        <label
                                            key={b._id}
                                            className="inline-flex items-center space-x-3 cursor-pointer select-none"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={tempSelectedBrands.includes(b._id)}
                                                onChange={() => toggleTempBrand(b._id)}
                                                className="form-checkbox h-5 w-5 text-neon-green bg-gray-800 border-gray-600 rounded"
                                            />
                                            <span className="text-white">{b.brandName}</span>
                                        </label>
                                    ))}
                                </div>
                            </section>

                            <section className="flex flex-col flex-1 min-w-[180px] max-h-48 overflow-y-auto mb-6 sm:mb-0 pr-2">
                                <span className="block text-gray-300 mb-2 font-semibold">Categories</span>
                                <div className="flex flex-col space-y-3">
                                    {["Gaming", "Professional", "Student", "Everyday Use"].map((c) => (
                                        <label
                                            key={c}
                                            className="inline-flex items-center space-x-3 cursor-pointer select-none"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={tempSelectedCategories.includes(c)}
                                                onChange={() => toggleTempCategory(c)}
                                                className="form-checkbox h-5 w-5 text-neon-green bg-gray-800 border-gray-600 rounded"
                                            />
                                            <span className="text-white">{c}</span>
                                        </label>
                                    ))}
                                </div>
                            </section>

                            <section className="flex justify-end gap-4 mt-auto sm:mt-0 sm:flex-col sm:items-center">
                                <button
                                    onClick={() => {
                                        setTempSortOption("");
                                        setTempSelectedBrands([]);
                                        setTempSelectedCategories([]);
                                    }}
                                    className="
            px-5 py-2 bg-gray-700 text-white font-semibold rounded-lg
            hover:bg-gray-600 transition duration-200 whitespace-nowrap
            min-w-[90px]
          "
                                >
                                    Reset
                                </button>

                                <button
                                    onClick={() => {
                                        applyFilters();
                                        setdropdownOpensearch(false);
                                    }}
                                    className="
            px-5 py-2 bg-neon-green text-white font-semibold rounded-lg
            hover:bg-green-400 transition duration-200 whitespace-nowrap
            min-w-[90px]
          "
                                >
                                    Apply
                                </button>
                            </section>
                        </div>
                    )}
                </div>



                {loading && <p className="text-center text-blue-400 text-xl">Loading products...</p>}
                {error && <p className="text-center text-red-400 text-xl">Error: {error}</p>}

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {!loading && !error && filteredProducts.length === 0 && (
                        <p className="text-center col-span-full text-gray-400">No products found.</p>
                    )}
                    {!loading && !error && filteredProducts.map((p) => (
                        <div
                            key={p._id}
                            onClick={() => handleProductClick(p._id)}
                            className="bg-gray-900 bg-opacity-70 rounded-2xl overflow-hidden shadow-xl transition duration-300 border border-gray-700 flex flex-col hover:scale-105 transform cursor-pointer"
                        >
                            <div className="flex justify-center items-center relative">
                                <img
                                    src={p.productImage}
                                    alt={p.productName}
                                    className="w-64 h-64 object-cover"
                                />
                                {p.productStock === 0 && (
                                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                        <img
                                            src="https://res.cloudinary.com/dzaeurrcl/image/upload/v1747164357/sold-out-png-19984_lqavbd.png"
                                            alt="Sold Out"
                                            className="w-32 h-32"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-2xl font-semibold text-white mb-1 tracking-tight">{p.productName}</h3>
                                <p className="text-sm text-gray-400 mb-2">Category: {p.productCategory}</p>
                                <p className="text-xl font-bold text-green-400 mb-2">₹{p.productPrice}/-</p>
                                {p.productStock <= 3 ? (
                                    <p className="text-sm font-medium text-red-500 uppercase tracking-wide">Only {p.productStock} left</p>
                                ) : (
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{p.productStock} in stock</p>
                                )}
                            </div>
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

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-sm text-center">
                        <p className="text-xl font-semibold text-white">{popupMessage}</p>
                        <button onClick={closePopup} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}
