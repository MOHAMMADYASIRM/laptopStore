import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import useTokenWatcher from '../../components/hooks/tokenWatcher';
import {
    fetchProduct,
    addToCartThunk,
    productBookingThunk,
} from "../../redux/authSlice";
import {
    createOrder,
    resetPaymentState,
} from "../../redux/authSlice";



export default function UserProductSingleView() {
    const { id } = useParams();
    const userId = localStorage.getItem("userId");
    const loggedEmail = localStorage.getItem("userEmail");


    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [showFullDescription, setShowFullDescription] = useState(false);

    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { product, loading, error } = useSelector((state) => state.product || {});
    const { order, loading: orderLoading, error: orderError } = useSelector(
        (state) => state.payment || {}
    );
    console.log(product);


    const stock = Number(product?.productStock) || 0;

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        dispatch(fetchProduct(id));
    };

    const handleQuantityChange = (e) => {
        const input = e.target.value;
        if (input === '') {
            setQuantity('');
            return;
        }
        let value = parseInt(input);
        if (isNaN(value)) return;
        if (value < 1) value = 1;
        if (value > stock) value = stock;
        setQuantity(value);
    };



    const addToCart = (productId, brandId) => {
        if (quantity > stock) {
            setPopupMessage(`Only ${stock} items in stock. Please reduce quantity.`);
            setShowPopup(true);
            return;
        }

        dispatch(addToCartThunk({ productId, brandId, userId, quantity })).then((response) => {
            if (response.payload === "Item already in cart") {
                setPopupMessage("Item is already in your cart.");
            } else if (response.payload?.message === "Product added to cart") {
                setPopupMessage("Product successfully added to cart.");
            } else {
                setPopupMessage("Something went wrong.");
            }
            setShowPopup(true);
        });
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

    const handleCheckout = async () => {
        if (!product) return;

        if (quantity > stock) {
            setPopupMessage(`Only ${stock} items in stock. Please reduce quantity.`);
            setShowPopup(true);
            return;
        }

        const totalAmount = product.productPrice * quantity;

        const sdkLoaded = await loadRazorpayScript();
        if (!sdkLoaded) {
            setPopupMessage("Failed to load Razorpay SDK. Please try again.");
            setShowPopup(true);
            return;
        }

        dispatch(createOrder(totalAmount));
    };

    useEffect(() => {
        if (order && product) {
            const options = {
                key: "rzp_test_i9kC8hJ6A9Asbp",
                amount: order.amount * 100,
                currency: order.currency,
                order_id: order.id,
                name: "NEOTEX",
                description: "Purchase of laptop",
                handler: function (response) {
                    dispatch(
                        productBookingThunk({
                            productId: product._id,
                            userEmail: loggedEmail,
                            userId,
                            brandId: product.brandId,
                            quantity,
                            paymentId: response.razorpay_payment_id,
                        })
                    ).then((res) => {
                        if (res.payload?.message === "Product booked successfully") {
                            setPopupMessage("Product booked successfully.");
                        } else {
                            setPopupMessage("Something went wrong after payment.");
                        }
                        setShowPopup(true);
                    });
                    dispatch(resetPaymentState());
                },
                prefill: {
                    name: userId,
                    email: loggedEmail,
                },
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    ondismiss: function () {
                        setPopupMessage("Payment was cancelled.");
                        setShowPopup(true);
                        dispatch(resetPaymentState());
                        dispatch(fetchProduct(id));
                    },
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    }, [order, dispatch, product, quantity, userId, loggedEmail]);

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

            <header className="flex flex-col justify-center items-center text-center py-20 px-4 relative">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider text-neon-blue drop-shadow-lg animate-pulse">
                        Your Laptop Details
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
                        Choose your dream machine and own the future.
                    </p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">
                {loading ? (
                    <p className="text-center text-blue-400 text-lg">Loading product...</p>
                ) : error ? (
                    <p className="text-center text-red-400 text-lg">Error: {error}</p>
                ) : product ? (
                    <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-2xl shadow-xl p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-5 relative rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full h-auto object-cover"
                            />
                            {stock === 0 && (
                                <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center">
                                    <img
                                        src="https://res.cloudinary.com/dzaeurrcl/image/upload/v1747164357/sold-out-png-19984_lqavbd.png"
                                        alt="Sold Out"
                                        className="w-32 h-32"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-7 flex flex-col text-gray-200">
                            <h1 className="text-4xl font-extrabold text-neon-blue drop-shadow-md mb-4">
                                {product.productName}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="text-sm text-gray-400 uppercase tracking-wide font-semibold bg-gray-800 px-3 py-1 rounded">
                                    Model: {product.productModel}
                                </span>
                                <span className="text-sm text-gray-400 uppercase tracking-wide font-semibold bg-gray-800 px-3 py-1 rounded">
                                    Category: {product.productCategory}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 mb-8">
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">Processor</h3>
                                        <p className="text-gray-200">{product.productProcessor}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">GPU</h3>
                                        <p className="text-gray-200">{product.productGpu}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">RAM</h3>
                                        <p className="text-gray-200">{product.productRam}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">Storage</h3>
                                        <p className="text-gray-200">{product.productStorage}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">Operating System</h3>
                                        <p className="text-gray-200">{product.operatingSystem}</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">Display</h3>
                                        <p className="text-gray-200 text-xs">{product.displaySize} ({product.displayResolution})</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">Refresh Rate</h3>
                                        <p className="text-gray-200">{product.refreshRate} Hz</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">Battery Life</h3>
                                        <p className="text-gray-200">{product.batteryLife}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg text-gray-300">Weight</h3>
                                        <p className="text-gray-200">{product.weight}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 border-t border-gray-700 pt-4">
                                <h3 className="text-xl font-bold text-gray-300 mb-2">Description</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {showFullDescription ? product.productDescription : `${product.productDescription.slice(0, 150)}${product.productDescription.length > 150 ? "..." : ""}`}
                                </p>
                                {product.productDescription.length > 150 && (
                                    <button
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="mt-2 text-blue-500 hover:underline font-semibold focus:outline-none"
                                    >
                                        {showFullDescription ? "Read Less" : "Read More"}
                                    </button>
                                )}
                            </div>


                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                                <p className="text-2xl font-extrabold text-green-400">₹{product.productPrice.toLocaleString()}</p>
                                <p
                                    className={`text-xl font-semibold ${Number(product.productStock) > 3 ? "text-green-400" : "text-red-500"}`}
                                >
                                    {Number(product.productStock) > 0 ? `In Stock: ${product.productStock}` : "Out of Stock"}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="quantity" className="text-gray-300 font-medium">Quantity:</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        max={stock}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-20 px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>

                                <button
                                    onClick={() => addToCart(product._id, product.brandId)}
                                    disabled={stock === 0}
                                    className={`bg-blue-600 hover:bg-blue-500 transition py-3 px-6 rounded-lg font-semibold text-white text-base w-full sm:w-auto ${stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={handleCheckout}
                                    disabled={stock === 0 || orderLoading}
                                    className={`py-3 px-6 rounded-lg font-semibold text-white text-base w-full sm:w-auto transition ${stock === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"}`}
                                >
                                    {orderLoading ? "Processing..." : "Checkout"}
                                </button>
                            </div>

                            {orderError && (
                                <p className="text-red-500 text-center mt-3">{orderError}</p>
                            )}
                        </div>
                    </div>

                ) : (
                    <p className="text-center text-gray-400">No product found.</p>
                )}
            </main>


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
