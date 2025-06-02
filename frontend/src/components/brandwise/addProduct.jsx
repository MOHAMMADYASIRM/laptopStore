import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/authSlice";

export default function BrandAddProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const brandId = localStorage.getItem("brandId");

    const [error, setError] = useState("");
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const [formData, setFormData] = useState({
        category: "",
        name: "",
        model: "",
        processor: "",
        ram: "",
        storage: "",
        graphics: "",
        displaySize: "",
        displayResolution: "",
        refreshRate: "",
        operatingSystem: "",
        batteryLife: "",
        weight: "",
        price: "",
        stock: "",
        image: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct({
            id: brandId,
            category: formData.category,
            name: formData.name,
            model: formData.model,
            processor: formData.processor,
            ram: formData.ram,
            storage: formData.storage,
            graphics: formData.graphics,
            displaySize: formData.displaySize,
            displayResolution: formData.displayResolution,
            refreshRate: formData.refreshRate,
            operatingSystem: formData.operatingSystem,
            batteryLife: formData.batteryLife,
            weight: formData.weight,
            price: formData.price,
            stock: formData.stock,
            image: formData.image,
            description: formData.description,
        })).then((response) => {
            if (response.payload === "Product Already Exists..!") {
                setError("Product Already Exists..!");
                return console.log(response.payload);
            } else {
                console.log(response.payload);
                setError("Product Added Successfully...!");
                setTimeout(() => navigate("/brandHome"), 2000);
            }
        });
    };
    return (
        <div className="bg-gradient-to-r from-blue-900 to-black min-h-screen text-white font-sans">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-700">
                <h1 className="text-3xl font-bold tracking-wide">NEOTEX</h1>
                <button
                    onClick={() => navigate("/brandHome")}
                    className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition"
                >
                    Back to Dashboard
                </button>
            </nav>


            <div className="max-w-5xl mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold mb-8 text-center tracking-wider">Add New Laptop</h2>
                {error && <p className="text-red-500 font-bold text-xl text-center animate-pulse">{error}</p>}<br />

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900 rounded-xl shadow-2xl p-10 space-y-6 border border-gray-700"
                >
                    <div>
                        <label className="text-gray-300 block mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Professional">Professional</option>
                            <option value="Student">Student</option>
                            <option value="Everyday Use">Everyday Use</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-gray-300 block mb-1">Laptop Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., ASUS TUF"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 block mb-1">Model</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="e.g., FX507Z"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 block mb-1">Processor</label>
                            <select
                                name="processor"
                                value={formData.processor}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Processor</option>

                                {["8th", "9th", "10th", "11th", "12th", "13th", "14th"].map((gen) =>
                                    ["i3", "i5", "i7", "i9"].map((model) => (
                                        <option key={`Intel ${model} ${gen} Gen`} value={`Intel ${model} ${gen} Gen`}>
                                            {`Intel ${model.toUpperCase()} ${gen} Gen`}
                                        </option>
                                    ))
                                )}

                                {[3000, 4000, 5000, 6000, 7000, 8000].map((series) =>
                                    [3, 5, 7, 9].map((tier) => (
                                        <option key={`AMD Ryzen ${tier} ${series} Series`} value={`AMD Ryzen ${tier} ${series} Series`}>
                                            {`AMD Ryzen ${tier} ${series} Series`}
                                        </option>
                                    ))
                                )}

                                {["M1", "M2", "M2 Pro", "M2 Max", "M3", "M3 Pro", "M3 Max"].map((chip) => (
                                    <option key={`Apple ${chip}`} value={`Apple ${chip}`}>
                                        {`Apple ${chip}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">RAM</label>
                            <select
                                name="ram"
                                value={formData.ram}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select RAM</option>

                                {["4GB", "8GB", "16GB", "32GB", "64GB"].map((size) =>
                                    ["DDR3", "DDR4", "DDR5"].map((type) => (
                                        <option key={`${size} ${type}`} value={`${size} ${type}`}>
                                            {`${size} ${type}`}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">Storage</label>
                            <select
                                name="storage"
                                value={formData.storage}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Storage</option>
                                {[
                                    "256GB SSD",
                                    "512GB SSD",
                                    "1TB SSD",
                                    "2TB SSD",
                                    "256GB HDD",
                                    "512GB HDD",
                                    "1TB HDD",
                                    "2TB HDD",
                                    "4TB HDD"
                                ].map((storageOption) => (
                                    <option key={storageOption} value={storageOption}>
                                        {storageOption}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">Graphics Card</label>
                            <select
                                name="graphics"
                                value={formData.graphics}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Graphics Card</option>
                                {[
                                    "NVIDIA GTX 1650",
                                    "NVIDIA GTX 1660 Ti",
                                    "NVIDIA RTX 2050",
                                    "NVIDIA RTX 2060",
                                    "NVIDIA RTX 2070",
                                    "NVIDIA RTX 2080",
                                    "NVIDIA RTX 3050",
                                    "NVIDIA RTX 3060",
                                    "NVIDIA RTX 3070",
                                    "NVIDIA RTX 3080",
                                    "NVIDIA RTX 4050",
                                    "NVIDIA RTX 4060",
                                    "NVIDIA RTX 4070",
                                    "NVIDIA RTX 4080",
                                    "NVIDIA RTX 4090",
                                    "NVIDIA RTX 5050",
                                    "NVIDIA RTX 5060",
                                    "NVIDIA RTX 5070",
                                    "NVIDIA RTX 5080",
                                    "NVIDIA RTX 5090",
                                    "AMD Radeon RX 5500M",
                                    "AMD Radeon RX 5600M",
                                    "AMD Radeon RX 5700M",
                                    "AMD Radeon RX 6600M",
                                    "AMD Radeon RX 6700M",
                                    "AMD Radeon RX 6800M",
                                    "AMD Radeon RX 6900M",
                                    "Intel Iris Xe",
                                    "Integrated Intel UHD Graphics",
                                    "Integrated AMD Radeon Graphics"
                                ].map((gpu) => (
                                    <option key={gpu} value={gpu}>
                                        {gpu}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-300 block mb-1">Display Size</label>
                            <select
                                name="displaySize"
                                value={formData.displaySize}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Display Size</option>
                                {["13.3 inches", "14 inches", "15.6 inches", "16 inches", "17.3 inches"].map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">Display Resolution</label>
                            <select
                                name="displayResolution"
                                value={formData.displayResolution}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Display Resolution</option>
                                {[
                                    "1366x768 HD",
                                    "1920x1080 Full HD",
                                    "2560x1440 QHD",
                                    "3840x2160 4K UHD",
                                    "2880x1800 Retina"
                                ].map(res => (
                                    <option key={res} value={res}>{res}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">Refresh Rate (Hz)</label>
                            <select
                                name="refreshRate"
                                value={formData.refreshRate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Refresh Rate</option>
                                {[30, 60, 75, 120, 144, 165, 240, 300].map(rate => (
                                    <option key={rate} value={rate}>{rate} Hz</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">Operating System</label>
                            <select
                                name="operatingSystem"
                                value={formData.operatingSystem}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select OS</option>
                                {["Windows 10", "Windows 11", "Ubuntu", "macOS", "Other"].map(os => (
                                    <option key={os} value={os}>{os}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">Battery Life</label>
                            <select
                                name="batteryLife"
                                value={formData.batteryLife}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Battery Life</option>
                                {["3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours", "10+ hours"].map(battery => (
                                    <option key={battery} value={battery}>{battery}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-1">Weight</label>
                            <select
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Weight</option>
                                {["< 1.5 kg", "1.5 - 2 kg", "2 - 2.5 kg", "2.5 - 3 kg", "> 3 kg"].map(weight => (
                                    <option key={weight} value={weight}>{weight}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div>
                        <label className="text-gray-300 block mb-1">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g., 75000"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-300 block mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter a detailed description..."
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-300 block mb-1">Stock </label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="e.g., 1-9999"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-300 block mb-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="e.g., https://image.com/laptop.jpg"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 transition-all py-3 rounded-lg font-semibold text-lg tracking-wide"
                        >
                            Add Product to Store
                        </button>
                    </div>
                </form>
            </div>

            <footer className="text-center py-10 border-t border-gray-700 text-gray-400">
                <p>© 2025 Laptop Store. All rights reserved.</p>
            </footer>
        </div>
    );
}
