import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooking } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import useTokenWatcher from '../../components/hooks/tokenWatcher';

export default function UserBookings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const { expiresIn } = useTokenWatcher();

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

    useEffect(() => {
        dispatch(fetchBooking(userId));
    }, [dispatch, userId]);

    const { bookings = [], loading, error, totalPrice } = useSelector((state) => state.booking || {});
    console.log("bookings", bookings);

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
                            <a href="/userProfile" className="flex items-center py-2 text-white">
                                <User size={18} className="mr-2" /> Profile
                            </a>
                            <a href="/settings" className="flex items-center py-2 text-white">
                                <Settings size={18} className="mr-2" /> Settings
                            </a>
                            <button onClick={handleLogout} className="flex items-center py-2 text-white">
                                <LogOut size={18} className="mr-2" /> Logout
                            </button>
                        </div>
                    </div>

                )}
            </nav>

            <header className="flex flex-col justify-center items-center text-center py-20 px-4 relative">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider text-neon-blue drop-shadow-lg animate-pulse">
                        Your Bookings
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
                        Review all the laptops you have booked so far.
                    </p>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-12">
                {loading && <p className="text-center text-blue-400 text-xl">Loading bookings...</p>}
                {error && <p className="text-center text-red-500 text-xl">{error}</p>}

                {!loading && !error && bookings.length === 0 && (
                    <p className="text-center text-gray-400 text-lg">You haven’t placed any bookings yet.</p>
                )}

                <div className="grid gap-10">
                    {!loading &&
                        !error &&
                        bookings.map((booking) => (
                            <div
                                key={booking.itemId}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
                            >
                                <div className="flex flex-col md:flex-row gap-6 p-6">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-1/4">
                                        <img
                                            src={booking.productId.productImage}
                                            alt={booking.productId.productName}
                                            className="w-36 h-36 object-cover rounded-lg border border-gray-700"
                                        />
                                        <p className="text-sm text-gray-400 mt-2">Booking ID: #{booking.bookingId.slice(-6)}</p>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex-1 space-y-3">
                                        {/* Title & Date */}
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-2xl font-semibold text-white">
                                                {booking.productId.productName}
                                            </h3>
                                            <span className="text-sm text-gray-400 whitespace-nowrap">
                                                {new Date(booking.bookingDate).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-300">
                                            <p><span className="font-semibold text-white">Model:</span> {booking.productId.productModel}</p>
                                            <p><span className="font-semibold text-white">Processor:</span> {booking.productId.productProcessor}</p>
                                            <p><span className="font-semibold text-white">RAM:</span> {booking.productId.productRam} GB</p>
                                            <p><span className="font-semibold text-white">Storage:</span> {booking.productId.productStorage} GB</p>
                                            <p><span className="font-semibold text-white">Quantity:</span> {booking.quantity}</p>
                                            <p><span className="font-semibold text-white">Total Price:</span> ₹{booking.price * booking.quantity}/-</p>
                                        </div>

                                        {/* Payment Status */}
                                        <div className="flex items-center gap-3 mt-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.paymentStatus === "Completed"
                                                        ? "bg-green-600 text-white"
                                                        : booking.paymentStatus === "Pending"
                                                            ? "bg-yellow-500 text-black"
                                                            : "bg-red-600 text-white"
                                                    }`}
                                            >
                                                💳 Payment: {booking.paymentStatus}
                                            </span>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.deliveryStatus === "Delivered"
                                                        ? "bg-green-600 text-white"
                                                        : booking.deliveryStatus === "Out for Delivery"
                                                            ? "bg-blue-500 text-white"
                                                            : booking.deliveryStatus === "Shipped"
                                                                ? "bg-yellow-500 text-black"
                                                                : "bg-gray-500 text-white"
                                                    }`}
                                            >
                                                🚚 Delivery: {booking.deliveryStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {!loading && !error && bookings.length > 0 && (
                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-white">Total Amount Paid: ₹{totalPrice}</h2>
                    </div>
                )}
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
