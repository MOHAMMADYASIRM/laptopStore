export default function UserComplaint() {
    return (
        <div className="bg-black min-h-screen text-white font-sans">
            {/* Header */}
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <h1 className="text-3xl font-bold tracking-wide">NEOTEX</h1>
                <div className="hidden md:flex space-x-6 text-sm font-medium tracking-wide">
                    <a href="/home" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Home</a>
                    <a href="/booking" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Shop Now</a>
                    <a href="/cart" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Cart</a>
                    <a href="/history" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Order History</a>
                    <a href="/about" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">About Us</a>
                    <a href="/contact" className="text-gray-300 hover:text-white hover:underline hover:underline-offset-4 transition duration-200">Contact Us</a>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                    Back to Home
                </button>
            </nav>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">Raise a Complaint</h1>

                <form className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-6">
                    <div>
                        <label className="block mb-2 text-gray-400">Subject</label>
                        <input type="text" placeholder="Complaint Subject" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-400">Order ID (optional)</label>
                        <input type="text" placeholder="Related Order ID" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-400">Message</label>
                        <textarea rows="5" placeholder="Describe your issue in detail" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white"></textarea>
                    </div>

                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium w-full">
                        Submit Complaint
                    </button>
                </form>
            </div>

            {/* Footer */}
            <footer className="text-center py-12 border-t border-gray-800 text-gray-400 px-4">
                <p>© 2025 Laptop Store. All rights reserved.</p>
            </footer>
        </div>
    );
}
