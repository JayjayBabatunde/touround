import { useNavigate } from "react-router-dom";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap');
  @keyframes slideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
`;


export default function ContactPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#f7f9fb]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <style>{GLOBAL_STYLES}</style>

            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
                <nav className="max-w-[1280px] mx-auto px-8 h-[60px] flex items-center justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="text-[18px] font-extrabold text-[#00327d]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        VentureGlobal
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500
              hover:text-[#00327d] transition-colors duration-150"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        ← Back to destinations
                    </button>
                </nav>
            </header>

            <main className="max-w-[1100px] mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

                    <div
                        className="rounded-3xl overflow-hidden"
                        style={{ animation: "slideUp .4s ease both" }}
                    >
                        <ContactHero />
                    </div>

                    <div
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm px-8 py-8"
                        style={{ animation: "slideUp .4s ease .08s both" }}
                    >
                        <div className="mb-7">
                            <h1
                                className="text-[24px] font-extrabold text-gray-900 mb-1"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                Send us a message
                            </h1>
                            <p className="text-[13px] text-gray-500">
                                Fill in the form and we'll get back to you shortly.
                            </p>
                        </div>

                        <ContactForm />
                    </div>

                </div>
            </main>
        </div>
    );
}