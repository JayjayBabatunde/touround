import { C } from "../colors/colors";
import { FadeUp } from "../components/Animations";

export function About() {
    return (
        <section style={{ background: C.surface, padding: "100px 0" }}>
            <style>{`
                .about-section { padding: 100px 0; }
                .about-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 64px;
                    display: flex;
                    align-items: center;
                    gap: 80px;
                    flex-wrap: wrap;
                }
                .about-image-wrap { flex: 1 1 340px; }
                .about-text-wrap { flex: 1 1 340px; }
                .about-heading {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 24px;
                }
                .about-lead {
                    font-size: 18px;
                    line-height: 1.7;
                    margin-bottom: 24px;
                }
                .about-body {
                    font-size: 16px;
                    line-height: 1.7;
                    margin-bottom: 40px;
                }

                @media (max-width: 1024px) {
                    .about-container { padding: 0 40px; gap: 56px; }
                }

                @media (max-width: 767px) {
                    .about-section { padding: 64px 0; }
                    .about-container {
                        padding: 0 24px;
                        gap: 40px;
                        flex-direction: column;
                    }
                    .about-image-wrap,
                    .about-text-wrap { flex: 1 1 100%; width: 100%; }
                    .about-heading { font-size: 26px; }
                    .about-lead { font-size: 16px; }
                    .about-body { font-size: 15px; margin-bottom: 32px; }
                }

                @media (max-width: 480px) {
                    .about-section { padding: 48px 0; }
                    .about-container { padding: 0 20px; gap: 32px; }
                    .about-heading { font-size: 24px; }
                }
            `}</style>

            <div className="about-container">

                <FadeUp className="about-image-wrap">
                    <div
                        style={{
                            borderRadius: 32,
                            overflow: "hidden",
                            boxShadow: "0 24px 64px rgba(0,50,125,.15)",
                            aspectRatio: "4/5",
                            position: "relative",
                        }}
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3pZe8_46vlAL0F1hIZ2gEFoNQYpmdXa0AwFerA6PUcmXOQ7SvYSnBKei012ybEamxoNWvXM42K1gA8mSSjJDYlPC5beJqTmEK83kr_A-jiA3hhEa1RrfmvGdpRIJv945q4mpkT4sPJnQyV2d93OFN8EEciC0ZsM5nRJogBWOZpQdtT9WtKODO3iMeWEov6Y0749q4GoHz3bYFmfirXwk7QKEEdzUjQ08wUtrddnCKSwXMyrlvcIakGCqF6lYg_wIjFgMQc0qZZbNF"
                            alt="Santorini terrace"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            bottom: -40,
                            right: -40,
                            width: 200,
                            height: 200,
                            borderRadius: 24,
                            background: C.secondaryContainer,
                            zIndex: -1,
                            opacity: 0.2,
                            animation: "pulse-slow 7s ease-in-out infinite",
                        }}
                    />
                </FadeUp>

                <div className="about-text-wrap">
                    <FadeUp delay={0.1}>
                        <h2 className="about-heading" style={{ color: C.primary }}>
                            The Journey is Our Purpose
                        </h2>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p className="about-lead" style={{ color: C.onSurfaceVariant }}>
                            Crafting extraordinary travel experiences through curated guidance and a passion for the unknown. We don't just book trips; we architect memories that resonate for a lifetime.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.3}>
                        <p className="about-body" style={{ color: C.onSurfaceVariant }}>
                            Since 2009, TourRound has been the quiet force behind the world's most sophisticated explorations. We believe that true travel is found in the spaces between the landmarks—the authentic connections and the moments of profound stillness.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.4}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                            {[
                                { icon: "verified_user", label: "Luxury Vetted" },
                                { icon: "public", label: "Sustainable Travel" },
                            ].map(item => (
                                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span className="msym" style={{ fontSize: 24, color: C.secondaryContainer }}>
                                        {item.icon}
                                    </span>
                                    <span style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: 14, fontWeight: 600, color: C.onSurface }}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}