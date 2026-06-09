import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Destinations", path: "/destinations" },
    { label: "Contact", path: "/contact" },
    { label: "Dashboard", path: "/dashboard" },
];

export default function Navbar({ currentView }) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useEffect(() => {
        const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-200/60
                ${scrolled ? "bg-white/95 shadow-md" : "bg-white/80"} backdrop-blur-xl`}
        >
            <nav className={`max-w-[1280px] mx-auto h-[72px] flex items-center justify-between`}
                style={{ padding: "0 clamp(20px, 5vw, 48px)" }}
            >
                <Link
                    to="/"
                    className="font-bold text-xl text-[#00327d] shrink-0"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: "none" }}
                >
                    VentureGlobal
                </Link>

                <div className="hidden md:flex items-center gap-7">
                    {NAV_LINKS.map(({ label, path }) => {
                        const active = currentView
                            ? path === "/" ? currentView === "home" : path === `/${currentView}`
                            : false;
                        return (
                            <Link
                                key={label}
                                to={path}
                                className={`text-[13px] font-semibold tracking-wide transition-all duration-200
                                    hover:-translate-y-0.5 no-underline
                                    ${active
                                        ? "text-[#00327d] border-b-2 border-[#00327d] pb-0.5"
                                        : "text-gray-500 hover:text-[#00327d]"
                                    }`}
                                style={{ fontFamily: "'Be Vietnam Pro', sans-serif", textDecoration: "none" }}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {/* <button
                        onClick={() => navigate("/auth")}
                        className="text-[13px] font-semibold text-[#00327d] px-4 py-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        Sign In
                    </button> */}
                    <button
                        onClick={() => navigate("/auth")}
                        className="text-[13px] font-bold text-white bg-[#fc8a40] px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 transition-all duration-200 active:scale-95"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        Join Now
                    </button>
                </div>

                <button
                    className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 rounded-lg bg-transparent border-none cursor-pointer"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {[0, 1, 2].map(i => (
                        <span
                            key={i}
                            className="block rounded-sm bg-[#00327d] transition-all duration-300"
                            style={{
                                width: 22,
                                height: 2,
                                transform: menuOpen
                                    ? i === 0 ? "translateY(7px) rotate(45deg)"
                                        : i === 2 ? "translateY(-7px) rotate(-45deg)"
                                            : "scaleX(0)"
                                    : "none",
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }}
                        />
                    ))}
                </button>
            </nav>

            <div
                className="md:hidden flex flex-col bg-white/97 overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: menuOpen ? 400 : 0,
                    borderTop: menuOpen ? "1px solid rgba(0,0,0,.06)" : "none",
                }}
            >
                <div style={{ padding: menuOpen ? "16px 24px 24px" : "0 24px", transition: "padding .3s" }}>
                    {NAV_LINKS.map(({ label, path }) => {
                        const active = currentView
                            ? path === "/" ? currentView === "home" : path === `/${currentView}`
                            : false;
                        return (
                            <Link
                                key={label}
                                to={path}
                                onClick={() => setMenuOpen(false)}
                                className="block no-underline"
                                style={{
                                    fontFamily: "'Be Vietnam Pro', sans-serif",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    padding: "13px 8px",
                                    borderBottom: "1px solid rgba(0,0,0,.06)",
                                    color: active ? "#00327d" : "#6b7280",
                                    textDecoration: "none",
                                }}
                            >
                                {label}
                            </Link>
                        );
                    })}

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => { navigate("/auth"); setMenuOpen(false); }}
                            className="flex-1 text-[13px] font-semibold text-[#00327d] py-2.5 rounded-full border border-[#00327d] bg-transparent hover:bg-blue-50 transition-colors duration-200"
                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { navigate("/auth"); setMenuOpen(false); }}
                            className="flex-1 text-[13px] font-bold text-white bg-[#fc8a40] py-2.5 rounded-full hover:shadow-lg transition-all duration-200"
                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                            Join Now
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}