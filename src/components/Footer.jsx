import { C } from "../colors/colors";

export function Footer() {
    const cols = [
        { head: "Company", links: ["About Us", "Career", "Newsletter"] },
        { head: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service"] },
        { head: "Connect", links: ["Facebook", "Instagram", "Twitter"] },
    ];

    return (
        <footer style={{ background: C.white, borderTop: `1px solid ${C.outlineVariant}40` }}>
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "80px 64px 48px",
                    display: "flex",
                    gap: 64,
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ maxWidth: 300 }}>
                    <div
                        style={{
                            fontFamily: "'Plus Jakarta Sans',sans-serif",
                            fontSize: 22,
                            fontWeight: 700,
                            color: C.primary,
                            marginBottom: 20,
                        }}
                    >
                        TourRound
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: C.onSurfaceVariant, marginBottom: 32 }}>
                        Your global companion for transformative travel experiences. Expertly guided, meticulously planned, and passionately executed.
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                        {["public", "share", "mail"].map(icon => (
                            <a
                                key={icon}
                                href="#"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: C.surfaceContainerLow,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: C.primary,
                                    textDecoration: "none",
                                    transition: "background .2s, color .2s",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = C.primary;
                                    e.currentTarget.querySelector(".msym").style.color = C.white;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = C.surfaceContainerLow;
                                    e.currentTarget.querySelector(".msym").style.color = C.primary;
                                }}
                            >
                                <span className="msym" style={{ fontSize: 18, color: C.primary }}>
                                    {icon}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
                    {cols.map(col => (
                        <div key={col.head} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <h5
                                style={{
                                    fontFamily: "'Be Vietnam Pro',sans-serif",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    letterSpacing: ".1em",
                                    textTransform: "uppercase",
                                    color: C.primary,
                                }}
                            >
                                {col.head}
                            </h5>
                            {col.links.map(link => (
                                <a
                                    key={link}
                                    href="#"
                                    style={{
                                        fontSize: 15,
                                        color: C.onSurfaceVariant,
                                        textDecoration: "none",
                                        transition: "color .2s",
                                    }}
                                    onMouseEnter={e => (e.target.style.color = C.secondary)}
                                    onMouseLeave={e => (e.target.style.color = C.onSurfaceVariant)}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "24px 64px",
                    borderTop: `1px solid ${C.outlineVariant}40`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <span style={{ fontSize: 12, color: C.onSurfaceVariant }}>
                    © 2024 VentureGlobal Travel. All rights reserved.
                </span>
                <div style={{ display: "flex", gap: 24 }}>
                    {["Legal", "Cookies"].map(item => (
                        <a
                            key={item}
                            href="#"
                            style={{ fontSize: 12, color: C.onSurfaceVariant, textDecoration: "none" }}
                            onMouseEnter={e => (e.target.style.textDecoration = "underline")}
                            onMouseLeave={e => (e.target.style.textDecoration = "none")}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}