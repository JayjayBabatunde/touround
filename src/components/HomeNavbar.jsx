import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { C } from "../colors/colors";

const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
];

export default function HomeNavbar() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useEffect(() => {
        const handler = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <style>{`
                .nav-desktop-links { display: flex; }
                .nav-desktop-actions { display: flex; }
                .nav-hamburger { display: none; }

                @media (max-width: 767px) {
                    .nav-desktop-links { display: none; }
                    .nav-desktop-actions { display: none; }
                    .nav-hamburger { display: flex; }
                }
            `}</style>

            <header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: scrolled ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: `1px solid ${C.outlineVariant}40`,
                    boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,.07)" : "none",
                    transition: "background .3s, box-shadow .3s",
                    animation: "fadeInDown .6s ease both",
                }}
            >
                <nav
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        padding: "0 clamp(20px, 5vw, 64px)",
                        height: 80,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >

                    <Link
                        to="/"
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 22,
                            fontWeight: 700,
                            color: C.primary,
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        TourRound
                    </Link>

                    <div className="nav-desktop-links" style={{ gap: 32, alignItems: "center" }}>
                        {NAV_LINKS.map((item) => (
                            <Link key={item.name} to={item.path} className="nav-link">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="nav-desktop-actions" style={{ alignItems: "center", gap: 16 }}>

                        <button
                            className="btn-primary"
                            style={{ padding: "10px 24px" }}
                            onClick={() => navigate("/auth")}
                        >
                            Join Now
                        </button>
                    </div>

                    <button
                        className="nav-hamburger"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 5,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 8,
                            borderRadius: 8,
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    display: "block",
                                    width: 22,
                                    height: 2,
                                    borderRadius: 2,
                                    background: C.primary,
                                    transition: "transform .3s, opacity .3s",
                                    transform: menuOpen
                                        ? i === 0 ? "translateY(7px) rotate(45deg)"
                                            : i === 2 ? "translateY(-7px) rotate(-45deg)"
                                                : "none"
                                        : "none",
                                    opacity: menuOpen && i === 1 ? 0 : 1,
                                }}
                            />
                        ))}
                    </button>
                </nav>

                <div
                    style={{
                        flexDirection: "column",
                        padding: "0 24px",
                        gap: 4,
                        maxHeight: menuOpen ? 400 : 0,
                        overflow: "hidden",
                        transition: "max-height .35s ease",
                        background: "rgba(255,255,255,.97)",
                        display: "flex",
                    }}
                >
                    <div style={{ paddingBottom: menuOpen ? 24 : 0, transition: "padding .35s ease" }}>
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="nav-link"
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: "block",
                                    padding: "13px 8px",
                                    borderBottom: `1px solid ${C.outlineVariant}20`,
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                            <button
                                onClick={() => { navigate("/auth"); setMenuOpen(false); }}
                                style={{
                                    flex: 1,
                                    background: "none",
                                    border: `1.5px solid ${C.primary}`,
                                    fontFamily: "'Be Vietnam Pro', sans-serif",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    letterSpacing: ".05em",
                                    color: C.primary,
                                    cursor: "pointer",
                                    padding: "10px 16px",
                                    borderRadius: 999,
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                className="btn-primary"
                                style={{ flex: 1, padding: "10px 16px" }}
                                onClick={() => { navigate("/auth"); setMenuOpen(false); }}
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}