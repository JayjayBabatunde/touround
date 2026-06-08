import { C } from "../colors/colors";
import { useInView } from "../components/Animations";

export function Stats() {
    const stats = [
        { value: "10k+", label: "Global Travelers" },
        { value: "450+", label: "Unique Destinations" },
        { value: "15+", label: "Years of Excellence" },
    ];
    const [ref, visible] = useInView();

    return (
        <section style={{ background: C.white, padding: "56px 0" }}>
            <style>{`
                .stats-grid {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 64px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    text-align: center;
                    gap: 0;
                }
                .stat-item {
                    padding: 8px 0;
                }
                .stat-value {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 48px;
                    font-weight: 700;
                    line-height: 1.2;
                    margin-bottom: 8px;
                }
                .stat-label {
                    font-family: 'Be Vietnam Pro', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    letter-spacing: .1em;
                    text-transform: uppercase;
                }

                @media (max-width: 1024px) {
                    .stats-grid { padding: 0 40px; }
                    .stat-value { font-size: 40px; }
                }

                @media (max-width: 767px) {
                    .stats-grid {
                        padding: 0 24px;
                        grid-template-columns: 1fr;
                        gap: 0;
                    }
                    .stat-item {
                        padding: 24px 0;
                        border-right: none !important;
                        border-bottom-color: inherit;
                    }
                    .stat-value { font-size: 44px; }
                }

                @media (max-width: 480px) {
                    .stats-grid { padding: 0 20px; }
                    .stat-value { font-size: 38px; }
                }
            `}</style>

            <div ref={ref} className="stats-grid">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className="stat-item"
                        style={{
                            borderRight: i < 2 ? `1px solid ${C.outlineVariant}` : "none",
                            borderBottom: i < 2
                                ? `1px solid ${C.outlineVariant}`
                                : "none",
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(24px)",
                            transition: `opacity .6s ease ${i * 0.15}s, transform .6s ease ${i * 0.15}s`,
                        }}
                    >
                        <div className="stat-value" style={{ color: C.primary }}>
                            {s.value}
                        </div>
                        <div className="stat-label" style={{ color: C.onSurfaceVariant }}>
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}