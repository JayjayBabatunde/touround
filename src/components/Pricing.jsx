import { C } from "../colors/colors";
import { FadeUp } from "../components/Animations";

export function Pricing() {
    const cards = [
        {
            icon: "flight_takeoff",
            title: "Return Flights",
            highlight: false,
            items: [
                { label: "London to NYC", note: "Starting from", price: "$450" },
                { label: "Tokyo to Paris", note: "Starting from", price: "$820" },
            ],
        },
        {
            icon: "hotel",
            title: "Luxury Stays",
            highlight: true,
            badge: "Most Popular",
            items: [
                { label: "Amalfi Coast (5★)", note: "Avg. nightly rate", price: "$650" },
                { label: "Kyoto Ryokan (5★)", note: "Avg. nightly rate", price: "$520" },
            ],
        },
        {
            icon: "explore",
            title: "Curated Tours",
            highlight: false,
            items: [
                { label: "Private Ice Cave Tour", note: "Single booking", price: "$290" },
                { label: "Santorini Boat Charter", note: "Group of four", price: "$410" },
            ],
        },
    ];

    return (
        <section style={{ background: C.white, padding: "100px 0" }}>
            <style>{`
                .pricing-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 64px;
                }
                .pricing-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                    align-items: center;
                }
                .pricing-heading {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 16px;
                }
                .pricing-card {
                    position: relative;
                    padding: 40px;
                    border-radius: 24px;
                    transition: transform .3s ease, box-shadow .3s ease;
                    box-sizing: border-box;
                }

                @media (max-width: 1024px) {
                    .pricing-container { padding: 0 40px; }
                    .pricing-card { padding: 32px; }
                }

                @media (max-width: 767px) {
                    .pricing-container { padding: 0 24px; }
                    .pricing-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                        align-items: start;
                    }
                    .pricing-heading { font-size: 26px !important; }
                    .pricing-header { margin-bottom: 40px !important; }
                    .pricing-card { padding: 28px; }
                }

                @media (max-width: 480px) {
                    .pricing-container { padding: 0 20px; }
                    .pricing-heading { font-size: 24px !important; }
                    .pricing-card { padding: 24px; }
                }
            `}</style>

            <div className="pricing-container">
                <FadeUp>
                    <div className="pricing-header" style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2
                            className="pricing-heading"
                            style={{
                                fontFamily: "'Plus Jakarta Sans',sans-serif",
                                fontSize: 32,
                                fontWeight: 700,
                                color: C.primary,
                                marginBottom: 16,
                            }}
                        >
                            Transparent Pricing for Your Next Journey
                        </h2>
                        <p style={{ fontSize: 16, color: C.onSurfaceVariant, maxWidth: 480, margin: "0 auto" }}>
                            Curated travel costs to help you plan your budget with ease and clarity.
                        </p>
                    </div>
                </FadeUp>

                <div className="pricing-grid">
                    {cards.map((card, i) => (
                        <FadeUp key={card.title} delay={i * 0.15}>
                            <div
                                className={`pricing-card${card.highlight ? " price-card-mid" : ""}`}
                                style={{
                                    background: card.highlight ? C.primaryContainer : C.surfaceContainerLow,
                                    border: card.highlight ? "none" : `1px solid ${C.outlineVariant}50`,
                                    boxShadow: card.highlight ? "0 20px 48px rgba(0,50,125,.3)" : "none",
                                }}
                            >
                                {card.badge && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: -14,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            background: C.secondaryContainer,
                                            color: C.white,
                                            fontSize: 10,
                                            fontWeight: 700,
                                            letterSpacing: ".08em",
                                            textTransform: "uppercase",
                                            padding: "4px 16px",
                                            borderRadius: 999,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {card.badge}
                                    </div>
                                )}

                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: "50%",
                                        background: card.highlight ? "rgba(255,255,255,.2)" : C.white,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: 24,
                                        boxShadow: card.highlight ? "none" : "0 2px 8px rgba(0,0,0,.08)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <span className="msym" style={{ fontSize: 22, color: card.highlight ? C.white : C.primary }}>
                                        {card.icon}
                                    </span>
                                </div>

                                <h3
                                    style={{
                                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: card.highlight ? C.white : C.primary,
                                        marginBottom: 24,
                                    }}
                                >
                                    {card.title}
                                </h3>

                                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                    {card.items.map((item, j) => (
                                        <div key={item.label}>
                                            <p
                                                style={{
                                                    fontSize: 12,
                                                    color: card.highlight ? "rgba(255,255,255,.65)" : C.onSurfaceVariant,
                                                    marginBottom: 8,
                                                }}
                                            >
                                                {item.note}
                                            </p>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-end",
                                                    gap: 12,
                                                    borderBottom: j === 0
                                                        ? `1px solid ${card.highlight ? "rgba(255,255,255,.2)" : C.outlineVariant + "50"}`
                                                        : "none",
                                                    paddingBottom: j === 0 ? 16 : 0,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: 500,
                                                        color: card.highlight ? C.white : C.onSurface,
                                                        flex: 1,
                                                    }}
                                                >
                                                    {item.label}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                                                        fontSize: 22,
                                                        fontWeight: 700,
                                                        color: card.highlight ? C.white : C.primary,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {item.price}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}