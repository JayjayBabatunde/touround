import { C } from "../colors/colors";
import { FadeUp } from "../components/Animations";

export function CTA() {
    return (
        <section style={{ padding: "100px 0" }}>
            <style>{`
                .cta-outer {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 64px;
                }
                .cta-box {
                    position: relative;
                    background: ${C.primaryContainer};
                    border-radius: 40px;
                    padding: 80px;
                    text-align: center;
                    overflow: hidden;
                }
                .cta-heading {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 48px;
                    font-weight: 700;
                    color: ${C.white};
                    margin-bottom: 24px;
                    position: relative;
                }
                .cta-body {
                    font-size: 18px;
                    color: rgba(165,189,255,.9);
                    max-width: 560px;
                    margin: 0 auto 40px;
                    line-height: 1.6;
                    position: relative;
                }

                @media (max-width: 1024px) {
                    .cta-outer { padding: 0 40px; }
                    .cta-box { padding: 64px; }
                    .cta-heading { font-size: 40px; }
                }

                @media (max-width: 767px) {
                    .cta-outer { padding: 0 24px; }
                    .cta-box { padding: 48px 32px; border-radius: 28px; }
                    .cta-heading { font-size: 32px; }
                    .cta-body { font-size: 16px; margin-bottom: 32px; }
                }

                @media (max-width: 480px) {
                    .cta-outer { padding: 0 20px; }
                    .cta-box { padding: 40px 24px; border-radius: 24px; }
                    .cta-heading { font-size: 26px; }
                    .cta-body { font-size: 15px; }
                }
            `}</style>

            <div className="cta-outer">
                <FadeUp>
                    <div className="cta-box">

                        <div
                            style={{
                                position: "absolute",
                                top: -60,
                                right: -60,
                                width: 300,
                                height: 300,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,.06)",
                                pointerEvents: "none",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: -40,
                                left: -40,
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                background: "rgba(252,138,64,.15)",
                                pointerEvents: "none",
                            }}
                        />

                        <h2 className="cta-heading">
                            Ready for your next chapter?
                        </h2>
                        <p className="cta-body">
                            Join the thousands of elite travelers who trust VentureGlobal to light the way.
                        </p>
                        <button
                            className="btn-primary"
                            style={{ padding: "20px 48px", fontSize: 15, position: "relative" }}
                        >
                            Start Planning Now
                        </button>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}