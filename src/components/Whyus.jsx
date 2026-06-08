import { C } from "../colors/colors";
import { FadeUp } from "../components/Animations";

export default function WhyUs() {
    const features = [
        {
            icon: "psychology",
            bg: C.primaryContainer,
            title: "Expert Guidance",
            desc: "Our consultants are veteran explorers with an average of 10+ years in their specific regions.",
        },
        {
            icon: "hotel_class",
            bg: C.secondaryContainer,
            title: "Curated Experiences",
            desc: "Access exclusive events and hidden gems that are unavailable to the general public.",
        },
        {
            icon: "support_agent",
            bg: C.primary,
            title: "24/7 Support",
            desc: "From delayed flights to spontaneous changes, our global concierge is always one call away.",
        },
    ];

    return (
        <section style={{ background: C.white, padding: "100px 0" }}>
            <style>{`
                .whyus-section { padding: 100px 0; }
                .whyus-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 64px;
                }
                .whyus-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                }

                @media (max-width: 1024px) {
                    .whyus-container { padding: 0 40px; }
                }

                @media (max-width: 767px) {
                    .whyus-section { padding: 64px 0; }
                    .whyus-container { padding: 0 24px; }
                    .whyus-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .whyus-header { margin-bottom: 40px !important; }
                    .whyus-heading { font-size: 26px !important; }
                    .whyus-card { padding: 28px !important; }
                }

                @media (max-width: 480px) {
                    .whyus-section { padding: 48px 0; }
                    .whyus-container { padding: 0 20px; }
                    .whyus-heading { font-size: 24px !important; }
                }

                @media (min-width: 540px) and (max-width: 767px) {
                    .whyus-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            <div className="whyus-container">
                <FadeUp>
                    <div className="whyus-header" style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2
                            className="whyus-heading"
                            style={{
                                fontFamily: "'Plus Jakarta Sans',sans-serif",
                                fontSize: 32,
                                fontWeight: 700,
                                color: C.primary,
                                marginBottom: 16,
                            }}
                        >
                            Why TourRound?
                        </h2>
                        <p style={{ fontSize: 16, color: C.onSurfaceVariant, maxWidth: 480, margin: "0 auto" }}>
                            Providing more than just a destination, we provide the peace of mind to truly immerse yourself.
                        </p>
                    </div>
                </FadeUp>

                <div className="whyus-grid">
                    {features.map((f, i) => (
                        <FadeUp key={f.title} delay={i * 0.15}>
                            <div
                                className="feature-card whyus-card"
                                style={{
                                    padding: 40,
                                    borderRadius: 32,
                                    background: C.surfaceContainerLow,
                                    border: "1px solid transparent",
                                    transition: "all .4s ease",
                                    cursor: "default",
                                }}
                            >
                                <div
                                    className="feat-icon"
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 16,
                                        background: f.bg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: 32,
                                        transition: "transform .3s ease",
                                    }}
                                >
                                    <span className="msym" style={{ fontSize: 28, color: C.white }}>
                                        {f.icon}
                                    </span>
                                </div>
                                <h3
                                    style={{
                                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                                        fontSize: 22,
                                        fontWeight: 600,
                                        color: C.onSurface,
                                        marginBottom: 16,
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p style={{ fontSize: 15, lineHeight: 1.65, color: C.onSurfaceVariant }}>{f.desc}</p>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}