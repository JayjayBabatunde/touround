import { C } from "../colors/colors";

export function Hero() {
    return (
        <section
            style={{
                position: "relative",
                minHeight: 640,
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFoHCb3C6qpWWRtItUPhJOcICuybwhYgVKO_82gSQOv3JC2e2ccf9vU9Op3HBsh7OSovV0M51hLyKdMIBCfNvdzch9I0DYmPix4TBv9Nu3qxnv7g6mRqO6QKpm6f7D6Fm8UthoRlw5TN73JQC81CIVu7qvjBwIWTZYZYTj1xw9hjLpQS0pVaZkJdhK6a8IcOldNCQEClaBfboOW15shpCWUNO2sunXhL4oB41ZtF5TK52sU57nIDEPuyEOplDBSBvdTt9YDdJewuth"
                alt="Himalayan mountains"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(0,50,125,.65) 0%, rgba(0,50,125,.1) 100%)",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    bottom: -80,
                    right: -80,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: "rgba(252,138,64,.15)",
                    animation: "pulse-slow 6s ease-in-out infinite",
                    pointerEvents: "none",
                }}
            />

            <style>{`
                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 80px 64px;
                    width: 100%;
                    box-sizing: border-box;
                }
                .hero-inner {
                    max-width: 640px;
                }
                .hero-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 60px;
                    font-weight: 800;
                    line-height: 1.1;
                    letter-spacing: -.02em;
                    color: #fff;
                    margin-bottom: 24px;
                    animation: heroSlide .7s ease .25s both;
                }
                .hero-body {
                    font-family: 'Be Vietnam Pro', sans-serif;
                    font-size: 18px;
                    line-height: 1.6;
                    color: rgba(255,255,255,.9);
                    margin-bottom: 40px;
                    animation: heroSlide .7s ease .4s both;
                }

                @media (max-width: 1024px) {
                    .hero-content { padding: 64px 40px; }
                    .hero-title { font-size: 48px; }
                }

                @media (max-width: 767px) {
                    .hero-content { padding: 60px 24px; }
                    .hero-inner { max-width: 100%; }
                    .hero-title { font-size: 36px; }
                    .hero-body { font-size: 16px; margin-bottom: 32px; }
                }

                @media (max-width: 480px) {
                    .hero-content { padding: 48px 20px; }
                    .hero-title { font-size: 30px; }
                    .hero-body { font-size: 15px; }
                }
            `}</style>

            <div className="hero-content">
                <div className="hero-inner">
                    <span
                        style={{
                            display: "inline-block",
                            padding: "6px 16px",
                            background: "rgba(252,138,64,.9)",
                            color: C.white,
                            borderRadius: 999,
                            fontFamily: "'Be Vietnam Pro',sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: ".05em",
                            marginBottom: 24,
                            animation: "heroSlide .7s ease .1s both",
                        }}
                    >
                        EST. 2009
                    </span>

                    <h1 className="hero-title">
                        Redefining Modern<br />Exploration
                    </h1>

                    <p className="hero-body">
                        Discover a world beyond the maps. We craft bespoke journeys for those who seek the extraordinary in every corner of the globe.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                            animation: "heroSlide .7s ease .55s both",
                        }}
                    >
                        <button className="btn-primary" style={{ padding: "16px 32px", fontSize: 14 }}>
                            Explore Destinations
                            <span className="msym" style={{ fontSize: 20 }}>arrow_forward</span>
                        </button>
                        <button className="btn-glass" style={{ padding: "16px 32px" }}>
                            Our Story
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}