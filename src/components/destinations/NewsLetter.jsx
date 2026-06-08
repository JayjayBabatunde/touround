
export default function NewsLetter() {
    return (
        <section className="w-full flex justify-center py-16 bg-gray-50">
            <div className="bg-white w-full max-w-4xl mx-4 rounded-3xl shadow-lg px-8 py-14 text-center">

                <h2 className="text-4xl font-bold text-blue-900 mb-4">
                    Stay Inspired
                </h2>

                <p className="text-gray-500 max-w-2xl mx-auto mb-10">
                    Join our community of global explorers and receive exclusive early
                    access to new destinations and seasonal deals.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full sm:w-[320px] px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button className="px-8 py-3 rounded-full bg-blue-900 text-white font-medium hover:bg-blue-800 transition">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
}