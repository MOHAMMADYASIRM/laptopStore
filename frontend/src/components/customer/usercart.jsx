import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    displayCart,
    removeFromCart,
    clearCart,
    updateCartQuantity,
    cartBookingThunk,
    createOrder
} from "../../redux/authSlice";
import { LogOut, User, Menu, X } from "lucide-react";
import useTokenWatcher from "../../components/hooks/tokenWatcher";

const RAZORPAY_KEY = "rzp_test_i9kC8hJ6A9Asbp";

export default function UserCart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { expiresIn } = useTokenWatcher();
    const userId = localStorage.getItem("userId");
    const loggedEmail = localStorage.getItem("userEmail");

    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [reloadOnClose, setReloadOnClose] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    useEffect(() => {
        dispatch(displayCart(userId));
    }, [dispatch, userId]);

    const { cartItems, loading, error, totalPrice } = useSelector(
        (state) => state.cart || {}
    );

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    const singleDisplay = (productId) => {
        navigate(`/singleView/${productId}`);
    };

    const cartSingleDelete = (cartId) => {
        dispatch(removeFromCart(cartId)).then((response) => {
            setPopupMessage(
                response.payload.message === "Cart item removed successfully"
                    ? "Product successfully removed from cart."
                    : "Something went wrong."
            );
            setShowPopup(true);
        });
    };

    const flushCart = () => {
        dispatch(clearCart(userId)).then((response) => {
            setPopupMessage(
                response.payload.message === "Cart cleared successfully"
                    ? "Cart cleared successfully."
                    : "Something went wrong."
            );
            setShowPopup(true);
        });
    };

    const handleDecrease = async (item) => {
        if (item.quantity <= 1) return;
        await dispatch(
            updateCartQuantity({
                cartId: item.cartId,
                productId: item.productId._id,
                quantity: item.quantity - 1,
            })
        );
        dispatch(displayCart(userId));
    };

    const handleIncrease = async (item) => {
        if (item.quantity >= item.productId.productStock) {
            setPopupMessage("Quantity exceeds available stock");
            setShowPopup(true);
            return;
        }
        await dispatch(
            updateCartQuantity({
                cartId: item.cartId,
                productId: item.productId._id,
                quantity: item.quantity + 1,
            })
        );
        dispatch(displayCart(userId));
    };

    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handleCartBooking = async () => {
        if (!cartItems?.length) {
            setPopupMessage("Your cart is empty.");
            setShowPopup(true);
            return;
        }

        try {
            const sdkLoaded = await loadRazorpayScript();
            if (!sdkLoaded) {
                setPopupMessage("Failed to load Razorpay SDK. Please try again.");
                setShowPopup(true);
                return;
            }

            const orderResponse = await dispatch(createOrder(totalPrice));
            const order = orderResponse.payload;

            const options = {
                key: RAZORPAY_KEY,
                amount: order.amount * 100,
                currency: order.currency,
                order_id: order.id,
                name: "NEOTEX",
                description: "Purchase from NEOTEX cart",
                handler: function (response) {
                    dispatch(
                        cartBookingThunk({
                            userId,
                            userEmail: loggedEmail,
                            items: cartItems.map((item) => ({
                                productId: item.productId._id,
                                brandId: item.productId.brandId,
                                quantity: item.quantity,
                                price: item.productId.productPrice,
                            })),
                            totalPrice,
                            paymentId: response.razorpay_payment_id,
                        })
                    ).then((res) => {
                        if (res.payload?.message === "Bookings created successfully") {
                            setPopupMessage("Products booked successfully.");
                            flushCart();
                            setReloadOnClose(true);
                            setShowPopup(true);
                        } else {
                            setPopupMessage("Something went wrong after payment.");
                            setShowPopup(true);
                        }
                    });
                },
                prefill: {
                    name: userId,
                    email: localStorage.getItem("userEmail") || "",
                },
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    ondismiss: function () {
                        setPopupMessage("Payment was cancelled.");
                        setShowPopup(true);
                    },
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            setPopupMessage(
                error.response?.data?.message || "Failed to initiate payment."
            );
            setShowPopup(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-sans">
            <nav className="justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="#" className="text-3xl font-extrabold tracking-wide text-white">
                        NEOTEX
                    </a>

                    <div className="hidden md:flex space-x-6 text-sm font-medium tracking-wide">
                        <a
                            href="/home"
                            className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Home
                        </a>
                        <a
                            href="/booking"
                            className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Shop Now
                        </a>
                        <a
                            href="/cart"
                            className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Cart
                        </a>
                        <a
                            href="/history"
                            className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Order History
                        </a>
                        <a
                            href="/about"
                            className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            About Us
                        </a>
                        <a
                            href="/contact"
                            className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Contact Us
                        </a>
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
                                <a
                                    href="/userProfile"
                                    className="flex items-center px-4 py-2 hover:bg-gray-800"
                                >
                                    <User size={18} className="mr-2" /> Profile
                                </a>
                                <hr className="border-gray-700" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-800"
                                >
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
                        <a
                            href="/home"
                            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Home
                        </a>
                        <a
                            href="/booking"
                            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Shop Now
                        </a>
                        <a
                            href="/cart"
                            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Cart
                        </a>
                        <a
                            href="/history"
                            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Order History
                        </a>
                        <a
                            href="/about"
                            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            About Us
                        </a>
                        <a
                            href="/contact"
                            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200"
                        >
                            Contact Us
                        </a>

                        <div className="px-4 mt-4 border-t border-gray-700 pt-4">
                            <a
                                href="/userProfile"
                                className="flex items-center px-4 py-2 hover:bg-gray-800"
                            >
                                <User size={18} className="mr-2" /> Profile
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
                        Your Cart
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
                        Review your selected items and proceed to checkout.
                    </p>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <p className="text-lg md:text-2xl text-gray-300 font-semibold">
                        🛒 Total Price:{" "}
                        <span className="text-green-400 font-bold text-2xl">
                            ₹{totalPrice || 0}
                        </span>
                    </p>
                    <button
                        className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={flushCart}
                        disabled={loading || !cartItems?.length}
                    >
                        🧹 Clear Cart
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-blue-400 text-xl">Loading cart...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-xl">{error}</p>
                ) : cartItems?.length ? (
                    <>
                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-gray-900 bg-opacity-70 rounded-2xl overflow-hidden shadow-xl border border-gray-700 flex flex-col"
                                >
                                    <img
                                        onClick={() => singleDisplay(item.productId._id)}
                                        src={item.productId.productImage}
                                        alt={item.productId.productName}
                                        className="cursor-pointer object-cover w-48 h-48 mx-auto"
                                    />

                                    <div className="p-6 flex flex-col flex-1 space-y-2">
                                        <h3
                                            className="text-2xl font-semibold cursor-pointer"
                                            onClick={() => singleDisplay(item.productId._id)}
                                        >
                                            {item.productId.productName}
                                        </h3>
                                        <p className="text-green-400 font-semibold text-lg">
                                            ₹{item.productId.productPrice}
                                        </p>

                                        <div className="flex items-center space-x-4 mt-2">
                                            <button
                                                onClick={() => handleDecrease(item)}
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 rounded"
                                            >
                                                -
                                            </button>
                                            <span className="text-xl font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => handleIncrease(item)}
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 rounded"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => cartSingleDelete(item.cartId)}
                                            className="mt-4 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition"
                                        >
                                            Remove from Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={handleCartBooking}
                                className="bg-green-600 hover:bg-green-500 text-white py-3 px-8 rounded-xl text-xl font-bold transition"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-xl text-gray-400">
                        Your cart is empty. Start adding products!
                    </p>
                )}
            </section>

            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="text-white font-semibold">About Us</h3>
                        <p className="mt-2 text-gray-500">
                            We bring the latest high-performance laptops to power your future.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            {["Home", "Shop", "About", "Contact"].map((link, idx) => (
                                <li key={idx}>
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
                            {["Twitter", "Facebook", "Instagram"].map((social, i) => (
                                <a key={i} href="#" className="hover:text-white transition">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-gray-500">© 2025 Laptop Store. All rights reserved.</p>
            </footer>

            {showPopup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setShowPopup(false)}
                >
                    <div className="bg-gray-800 rounded-lg p-6 max-w-sm text-center cursor-pointer">
                        <p className="text-white text-lg">{popupMessage}</p>
                        <button
                            onClick={() => {
                                setShowPopup(false);
                                if (reloadOnClose) {
                                    dispatch(displayCart(userId));
                                }
                            }}
                            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
