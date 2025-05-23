import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brandBookingsThunk, updateDeliveryStatusThunk } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function BrandBookings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brandId = localStorage.getItem("brandId");
  const { items: bookings, loading, error } = useSelector((state) => state.brandBookings);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (brandId) {
      dispatch(brandBookingsThunk(brandId));
    }
  }, [dispatch, brandId]);

  const startEditing = (booking) => {
    setEditingStatusId(booking._id);
    setNewStatus(booking.deliveryStatus || "Not Shipped");
  };

  const cancelEditing = () => {
    setEditingStatusId(null);
    setNewStatus("");
  };

  const saveStatus = (bookingId) => {
    if (!newStatus) return;
    dispatch(updateDeliveryStatusThunk({ bookingId, status: newStatus }))
      .unwrap()
      .then(() => {
        const scrollY = window.scrollY;
        localStorage.setItem("scrollY", scrollY);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const y = localStorage.getItem("scrollY");
    if (y) {
      window.scrollTo(0, parseInt(y));
      localStorage.removeItem("scrollY");
    }
  }, []);

  const filtered = bookings.filter((b) =>
    b._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold tracking-wide">NEOTEX</h1>
        <button
          onClick={() => navigate("/brandHome")}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Home
        </button>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-4 text-center">Customer Purchased</h2>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by Booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading && <p className="text-center text-xl">Loading bookings...</p>}
        {error && <p className="text-center text-red-400 text-xl">Error: {error}</p>}
        {!loading && filtered.length === 0 && (
          <div className="text-center text-xl text-gray-400">
            No bookings match your search.
          </div>
        )}

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((booking) => (
            <div
              key={booking._id}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold mb-4"> Booking ID:   <span className="text-xxs">{booking._id}</span></h3>

              <div className="space-y-4">
                {booking.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border border-gray-700 p-3 rounded-md">
                    <img
                      src={item.productId?.productImage}
                      alt={item.productId?.productName}
                      className="w-20 h-20 object-cover rounded-md border border-gray-600"
                    />
                    <div>
                      <p className="font-semibold">{item.productId?.productName}</p>
                      <p className="text-gray-400 text-sm">{item.productId?.productModel}</p>
                      <p className="text-green-400 text-sm">₹{item.productId?.productPrice}</p>
                      <p className="text-gray-300 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-3 text-sm text-gray-300 space-y-2">
                <p><span className="font-semibold">Booked By:</span> {booking.userEmail}</p>
                <p><span className="font-semibold">Total Price:</span> ₹{booking.totalPrice}</p>
                <div className="flex items-center gap-3">Delivery Status:
                  <span className={`font-semibold ${booking.deliveryStatus === "Not Shipped" ? "text-gray-500" : booking.deliveryStatus === "Shipped" ? "text-blue-500" : booking.deliveryStatus === "Out for Delivery" ? "text-orange-500" : booking.deliveryStatus === "Delivered" ? "text-green-600" : ""}`}> {booking.deliveryStatus}</span>
                  {editingStatusId === booking._id ? (
                    <>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="bg-gray-800 text-white px-2 py-1 rounded"
                      >
                        <option disabled={booking.deliveryStatus !== "Not Shipped"} value="Not Shipped">Not Shipped</option>
                        <option disabled={booking.deliveryStatus === "Out for Delivery" || booking.deliveryStatus === "Delivered"} value="Shipped">Shipped</option>
                        <option disabled={booking.deliveryStatus !== "Shipped"} value="Out for Delivery">Out for Delivery</option>
                        <option disabled={booking.deliveryStatus !== "Out for Delivery"} value="Delivered">Delivered</option>

                      </select>
                      <button
                        onClick={() => saveStatus(booking._id)}
                        className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(booking)}
                      className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                      disabled={booking.deliveryStatus === "Delivered"}
                    >
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-12 border-t border-gray-700 text-gray-400">
        <p>© 2025 Laptop Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
