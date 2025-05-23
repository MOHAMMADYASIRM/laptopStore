export default function UserSettings() {
    return (
        <div className="bg-black min-h-screen text-white font-sans">
            {/* Header */}
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4 border-b border-gray-800">
                <h1 className="text-3xl font-bold tracking-wide">NEOTEX</h1>
                <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                    Back to Home
                </button>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">Account Settings</h1>

                <div className="space-y-8">
                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
                            <input type="email" placeholder="Email Address" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                        <div className="space-y-4">
                            <input type="password" placeholder="Current Password" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
                            <input type="password" placeholder="New Password" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
                            <input type="password" placeholder="Confirm New Password" className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-neon-green text-black px-6 py-3 rounded-lg font-medium hover:scale-105 transition">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
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
