import { C } from "../colors/colors";
import { FadeUp } from "../components/Animations";

export function Destinations() {
    const destinations = [
        {
            name: "Iceland",
            sub: "Nordic Wonders",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuComI0tfPDdInT_rm0t1J2SnBBJsbHgvaBDhRAAt5_wnvE8P0sJPjcRjI4VE1rixPDjhAdCfS7cNC2cZuC53cm54nmTOCY3z4Ocwc8-QKjQ7_isDaO4C6nkZzR_2xGsgDLRndcWbi66E-_SQ-TRL-K2u-0iwXJWsw9y3XppU3HK314HCaKY1KaKEN_yY6XCda5DMFvdTj9dqtuNsBjmBGNdQVQYTsurm1rnpKO1a18ultBIGaFvx8pIBrJ1NkHSI2vZJyp5AcvPyzOY",
        },
        {
            name: "Santorini",
            sub: "Aegean Luxury",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8hu3AAhnqxYZLlCq3J1agWB38u05FtuPfAC38UL927skdElt0pJRAT3zf3_GNLq8u9Sk6sDjpvvZsovG7pqIJJ1dABR6DN6icfPa0QjJCUGaKuQKvkJrSOzkUELyebapWfY4SxPv6NbZuRI-x6UzU9-K8j7UJccWWyMxtLEFkqfv73wRbd1Ct5_S2Z2alqe9mV0crzkiQzJz-2feXBct4AYumYbZGbFloesjNd2w78WAKHDVc3ooPtuE3sVv1ZuCTD7PNBLGegH19",
        },
        {
            name: "Tokyo",
            sub: "Ancient Soul",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsTgerhko72rNj0yJbnOhYGYM_H6GgyJVlroAdiinb0AhTCY5IuqVkcYMo_wJiY_rOSr6WQFjTq1uv3iBkEN9C0h-8_aYqEJSEHQRIYRzLYn40iYummCvk6psyu-jFNXTT4NMwE-y8c73tWaAbysPoPpD2aYh5xrsk2lkZtGfjl6Zzxhcx0HMZz85iWhsYhsvuUwcxP-HrWQ23dsMsFq8vjH-qp_QndEs4Sthb0onpylxpihPqvwLlY9kwa04DbyFqVyzlDtRCDozH",
        },
        {
            name: "Swiss Alps",
            sub: "Peak Elegance",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBHEx3HK2hMY5ZIdqX347v03TyEWVTuQeRGEhFmmvj_uqKzFTN5RVcb-rjnA9AvwGOWp0OjletFA-2LXFNCe7G1mv3x3G41XAFTN2pFSj9rJr3UKFqrmYnSNjNQMS29-qOykKt9ZqzBCSNu_oC_bDisggWglqWVp0qqyxaSuGOYKPZKKAMsnPl2vq1YA4vdNHDReyrBJC-p-cSPu_aiLzrTvmxElE0DsPgGEhiiYC92wUF8FT84kPLry5LU3nszRUbxJSCTziInRU2",
        },
    ];

    return (
        <section style={{ background: C.surfaceContainerLow, padding: "100px 0" }}>
            <style>{`
                .dest-section { padding: 100px 0; }
                .dest-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 64px;
                }
                .dest-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }
                .dest-heading {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 16px;
                }

                @media (max-width: 1024px) {
                    .dest-container { padding: 0 40px; }
                    .dest-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
                }

                @media (max-width: 767px) {
                    .dest-section { padding: 64px 0; }
                    .dest-container { padding: 0 24px; }
                    .dest-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                    .dest-heading { font-size: 26px !important; }
                    .dest-header { margin-bottom: 40px !important; }
                }

                @media (max-width: 480px) {
                    .dest-section { padding: 48px 0; }
                    .dest-container { padding: 0 20px; }
                    .dest-grid { grid-template-columns: 1fr; gap: 16px; }
                    .dest-heading { font-size: 24px !important; }
                }
            `}</style>

            <div className="dest-container">
                <FadeUp>
                    <div className="dest-header" style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2
                            className="dest-heading"
                            style={{
                                fontFamily: "'Plus Jakarta Sans',sans-serif",
                                fontSize: 32,
                                fontWeight: 700,
                                color: C.primary,
                                marginBottom: 16,
                            }}
                        >
                            Our Most Visited Destinations
                        </h2>
                        <p style={{ fontSize: 16, color: C.onSurfaceVariant, maxWidth: 480, margin: "0 auto" }}>
                            Handpicked locations that offer the perfect blend of adventure and luxury.
                        </p>
                    </div>
                </FadeUp>

                <div className="dest-grid">
                    {destinations.map((d, i) => (
                        <FadeUp key={d.name} delay={i * 0.12}>
                            <div
                                className="dest-card"
                                style={{
                                    position: "relative",
                                    borderRadius: 24,
                                    overflow: "hidden",
                                    aspectRatio: "3/4",
                                    cursor: "pointer",
                                    boxShadow: "0 8px 24px rgba(0,0,0,.18)",
                                    transition: "box-shadow .4s ease, transform .4s ease",
                                }}
                            >
                                <img
                                    className="dest-img"
                                    src={d.img}
                                    alt={d.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        transition: "transform .6s ease",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,.8) 0%, rgba(0,0,0,.1) 50%, transparent 100%)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 16,
                                        right: 16,
                                        background: C.secondaryContainer,
                                        color: C.white,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        padding: "4px 12px",
                                        borderRadius: 999,
                                        letterSpacing: ".04em",
                                    }}
                                >
                                    Top Rated
                                </div>
                                <div style={{ position: "absolute", bottom: 24, left: 24 }}>
                                    <h3
                                        style={{
                                            fontFamily: "'Plus Jakarta Sans',sans-serif",
                                            fontSize: 22,
                                            fontWeight: 700,
                                            color: C.white,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {d.name}
                                    </h3>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,.75)" }}>{d.sub}</p>
                                </div>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}