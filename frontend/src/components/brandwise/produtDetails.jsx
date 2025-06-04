import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToFeatured, deleteProductThunk } from "../../redux/authSlice";

export default function BrandProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const brandId = localStorage.getItem("brandId");
  const { items: products } = useSelector((state) => state.auth.products || {});
  const [product, setProduct] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [id, products]);

  if (!product) {
    return <div className="text-center text-white">Product not found!</div>;
  }

  const featuredModel = (productId) => {
    dispatch(addToFeatured({ brandId, productId }))
      .then((response) => {
        if (response.payload.message === "Product Added Success") {
          setPopupMessage("Product added to featured models successfully.");
        } else if (response.payload === "Only 2 featured products allowed per brand") {
          setPopupMessage("Only 2 featured products allowed per brand.");
        } else if (response.payload === "This product is already featured") {
          setPopupMessage("This product is already featured.");
        } else {
          setPopupMessage("An unexpected error occurred.");
        }
        setShowPopup(true);
      })
      .catch(() => {
        alert("Failed to add product to featured models.");
      });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductThunk(productId))
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold tracking-wide text-white">NEOTEX</h1>
        <button
          onClick={() => navigate("/brandHome")}
          className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition"
        >
          Back
        </button>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-white-400">Product Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex justify-center items-center">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-full object-center rounded-lg shadow-2xl hover:scale-105 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-4xl font-semibold mb-4 text-yellow-300">{product.productName}</h3>
              <p className="text-2xl font-bold text-green-400 mb-6">{product.productPrice}/-</p>
            </div>

            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Category:</span> {product.productCategory}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Model:</span> {product.productModel}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">GPU:</span> {product.productGpu}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">RAM:</span> {product.productRam}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Processor:</span> {product.productProcessor}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Storage:</span> {product.productStorage}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Stock Left:</span> {product.productStock}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Display Size:</span> {product.displaySize || "N/A"}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Display Resolution:</span> {product.displayResolution || "N/A"}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Refresh Rate (Hz):</span> {product.refreshRate || "N/A"}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Operating System:</span> {product.operatingSystem || "N/A"}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Battery Life:</span> {product.batteryLife || "N/A"}
                </p>
                <p className="text-lg font-semibold text-gray-300">
                  <span className="text-yellow-400">Weight:</span> {product.weight || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-8 text-center space-y-6 sm:space-y-0 sm:flex sm:justify-center sm:items-center sm:space-x-20">
              <button
                onClick={() => featuredModel(product._id)}
                className="px-8 py-2 bg-gradient-to-r from-green-600 to-green-950 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                Choose as a Featured Model
              </button>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => navigate(`/brandProductEdit/${product._id}`)}
                  className="w-full sm:w-auto px-6 py-1.5 bg-gradient-to-r from-blue-600 to-blue-950 text-white rounded-lg font-medium hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
                >
                  Edit Product
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="w-full sm:w-auto px-6 py-1.5 bg-gradient-to-r from-red-600 to-red-900 text-white rounded-lg font-medium hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
                >
                  Delete Product
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="text-center py-12 border-t border-gray-700 text-gray-400 px-4">
        <p>© 2025 Laptop Store. All rights reserved.</p>
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
