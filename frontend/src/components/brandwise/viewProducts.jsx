import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchBrandProducts } from "../../redux/authSlice";

export default function BrandProducts() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const brandId = localStorage.getItem("brandId");

  const { items: products, loading, error } = useSelector(
    (state) => state.auth.products || {}
  );

  useEffect(() => {
    if (brandId) {
      dispatch(fetchBrandProducts(brandId));
    }
  }, [brandId, dispatch]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold tracking-wide text-white">NEOTEX</h1>
        <button
          onClick={() => nav("/brandHome")}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Home
        </button>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold mb-10 text-center">Your Products</h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.length === 0 ? (
            <div className="text-center text-xl">No products available for this brand.</div>
          ) : (
            products.map((product) => (
              <div
                onClick={() => nav(`/brandProductDetail/${product._id}`)}
                key={product._id}
                className="bg-gray-900 bg-opacity-70 rounded-2xl overflow-hidden shadow-xl transition duration-300 border border-gray-700 flex flex-col hover:scale-105 transform"
              >
                <div className="flex justify-center items-center">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-64 h-64 object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{product.productName}</h3>
                  <p className="text-xl font-bold text-green-400 mb-2">{product.productPrice}/-</p>
                  <p className="text-xl font-bold text-green-400 mb-2">{product.productStock} pieces</p>

                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => nav("/addProduct")}
            className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-500 transition"
          >
            Add New Product
          </button>
        </div>
      </section>

      <footer className="text-center py-12 border-t border-gray-700 text-gray-400 px-4">
        <p>© 2025 Laptop Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
