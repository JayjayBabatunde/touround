import { C } from "../colors/colors";
import { FadeUp } from "../components/Animations";

export function TravelerStories() {
    const testimonials = [
        {
            text: "TourRound transformed our honeymoon into a cinematic experience in the Amalfi Coast. Every detail was meticulously handled.",
            name: "Elena Rodriguez",
            trip: "Amalfi Expedition, 2023",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDAc4965v9dg05UMdn9ffymwsjTlG5jCXCJgwgzZyAGh06q97xxw9jGdWssqcy8ISTBzXoW5MdLXF4S1ZVTLPoR8rRNvB1uDrXyhxBVuCTjtQXEf2L91Gb_7znEdVmG0uL6BT4weXJgt5Aq11U-7Nz9N-MNRuReETAexK-cmkADe5IlgzBXEcSZTLFpFTNL9M6KfwWnNY-kP2b3-ryLmKtUb6aHuO67WLFP4-WK0Qwlme0s7xbJBc9tDPcQr2WIADMZ_EnfrHFvDN2G",
        },
        {
            text: "I finally saw the real Tokyo. No crowds, just the soul of the city. Their local guides are truly unmatched experts.",
            name: "Mark Thompson",
            trip: "Kyoto Traditions, 2024",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBYklVkdMduzx6RyFv3FR5mshj85iikXYaSzZGCTv_NIVhkHkpxYMgZuaWAKfOv8lGXwZEc_WcRqsj3qtrdilAD3yUv0M9J4CLHJ912P4UY3e3O7iDprBElzUHMpk2Ibrmh8xdA4eFgAEA9EBh2hkMN8mrpD4F6F6h0n4IqMQF-BOgYTHYCegX_hXEEhMriZiP1h428p_wwC68IYueUC8Ps7RRbSZCtOVB8HhcNKTqa7wxClhAWcoctlz74lCsBQrgMI-g6w3fHNWke",
        },
        {
            text: "The level of service is breathtaking. They anticipate needs I didn't even know I had. A truly seamless journey.",
            name: "Sarah Jenkins",
            trip: "Swiss Alps Luxury, 2024",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAgeYsQSpwmyat54P88mq1bFpZHWW0IqazNdqBTCPvgcksA65s2hHkxETB8E9TTAUjnMgxJ21D7330-ou3cucIZHpn764j1E8QjuA-m_YqaV_h-6GeM5bO1yfAs-6HHbHIgXMfTSO82Z0RYGJE9HoTwF6v7is5RBCYbgLK4WGmrHRlc32QnGCi_9Hv-ZiRtLAUmZM5lZapdYBSBwjR2Z9vc7_fRuVwBg5CYE2ZU06wCHRl24ZVRvMwMyq3Dl56kTyx6wn0dCeY7Gx4I",
        },
        {
            text: "The level of service is breathtaking. They anticipate needs I didn't even know I had. A truly seamless journey.",
            name: "Sarah Jenkins",
            trip: "Swiss Alps Luxury, 2024",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAgeYsQSpwmyat54P88mq1bFpZHWW0IqazNdqBTCPvgcksA65s2hHkxETB8E9TTAUjnMgxJ21D7330-ou3cucIZHpn764j1E8QjuA-m_YqaV_h-6GeM5bO1yfAs-6HHbHIgXMfTSO82Z0RYGJE9HoTwF6v7is5RBCYbgLK4WGmrHRlc32QnGCi_9Hv-ZiRtLAUmZM5lZapdYBSBwjR2Z9vc7_fRuVwBg5CYE2ZU06wCHRl24ZVRvMwMyq3Dl56kTyx6wn0dCeY7Gx4I",
        },
    ];

    return (
        <section style={{ background: C.surface, padding: "100px 0", overflow: "hidden" }}>
            <style>{`
                .stories-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 64px;
                }
                .stories-header {
                    text-align: center;
                    margin-bottom: 64px;
                }
                .stories-heading {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .stories-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }
                .test-card {
                    background: ${C.white};
                    border-radius: 32px;
                    padding: 32px;
                    box-shadow: 0 4px 16px rgba(0,0,0,.06);
                    box-sizing: border-box;
                    height: 100%;
                }

                @media (max-width: 1100px) {
                    .stories-grid { grid-template-columns: repeat(3, 1fr); }
                }

                @media (max-width: 1024px) {
                    .stories-container { padding: 0 40px; }
                }

                @media (max-width: 767px) {
                    .stories-container { padding: 0 24px; }
                    .stories-header { margin-bottom: 40px; }
                    .stories-heading { font-size: 26px !important; }
                    .stories-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                    .test-card { padding: 24px; border-radius: 24px; }
                }

                @media (max-width: 480px) {
                    .stories-container { padding: 0 20px; }
                    .stories-heading { font-size: 24px !important; }
                    .stories-grid { grid-template-columns: 1fr; }
                    .test-card { padding: 20px; }
                }
            `}</style>

            <div className="stories-container">
                <FadeUp>
                    <div className="stories-header">
                        <h2 className="stories-heading" style={{ color: C.primary }}>
                            Traveler Stories
                        </h2>
                        <p style={{ fontSize: 16, color: C.onSurfaceVariant }}>
                            Real experiences from our global community.
                        </p>
                    </div>
                </FadeUp>

                <div className="stories-grid">
                    {testimonials.map((t, i) => (
                        <FadeUp key={i} delay={i * 0.15}>
                            <div className="test-card">
                                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                                    {Array(5).fill(0).map((_, j) => (
                                        <span
                                            key={j}
                                            className="msym msym-filled"
                                            style={{ fontSize: 18, color: C.secondaryContainer }}
                                        >
                                            star
                                        </span>
                                    ))}
                                </div>
                                <p
                                    style={{
                                        fontSize: 15,
                                        lineHeight: 1.7,
                                        fontStyle: "italic",
                                        color: C.onSurface,
                                        marginBottom: 24,
                                    }}
                                >
                                    "{t.text}"
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div>
                                        <div
                                            style={{
                                                fontFamily: "'Be Vietnam Pro',sans-serif",
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: C.onSurface,
                                            }}
                                        >
                                            {t.name}
                                        </div>
                                        <div style={{ fontSize: 11, color: C.onSurfaceVariant, marginTop: 2 }}>
                                            {t.trip}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}